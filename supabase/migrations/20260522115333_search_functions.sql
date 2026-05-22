-- ┌─────────────────────────────────────────────────────────────────┐
-- │ Reference SQL for the Supabase RPCs that power the explorer     │
-- │ pages. This file documents the search-side functions; sister    │
-- │ files in this directory will document the KWIC, candidate-echo, │
-- │ and document-detail RPCs.                                       │
-- │                                                                 │
-- │ It is committed primarily for *methodological* transparency:    │
-- │ the search and KWIC views make scholarly claims and the queries │
-- │ behind them should be auditable from the repo. The functions    │
-- │ already live in the Supabase project; this file is the         │
-- │ canonical record of their definitions and lets a reviewer       │
-- │ reproduce them in a fresh project if needed.                    │
-- │                                                                 │
-- │ Tested against PostgreSQL 15 with the `english` text-search     │
-- │ configuration. The `documents` table is the corpus index:       │
-- │ 82,107 rows = 38 Shakespeare works + every Founders Online      │
-- │ document the project ingested. `documents.full_text` is the     │
-- │ cleaned body text; `documents.full_text_tsv` is the precomputed │
-- │ tsvector used for ranking and snippeting.                       │
-- └─────────────────────────────────────────────────────────────────┘


-- ─────────────────────────────────────────────────────────────────────
-- Schema assumptions
-- ─────────────────────────────────────────────────────────────────────
--
-- documents (
--   doc_id          text primary key,
--   author_id       text,
--   title           text,
--   date_written    text,
--   date_sort       integer,
--   doc_type        text,
--   full_text       text,
--   word_count      integer,
--   full_text_tsv   tsvector generated always as (
--                     to_tsvector('english'::regconfig,
--                                 coalesce(full_text, ''::text))
--                   ) stored
-- );
-- create unique index documents_pkey         on documents (doc_id);
-- create        index documents_author_idx   on documents (author_id);
-- create        index documents_date_sort_idx on documents (date_sort);
-- create        index documents_fts_idx       on documents using gin (full_text_tsv);
--
-- Note: the tsvector indexes only full_text, not title — title hits
-- therefore do not get extra ranking weight in the current schema.
-- Adding setweighted A/B columns is a future schema change.


-- ─────────────────────────────────────────────────────────────────────
-- extract_search_terms / count_search_term_occurrences
-- ─────────────────────────────────────────────────────────────────────
-- Helpers for the per-document occurrence count that search_documents
-- returns alongside each match.
--
-- extract_search_terms parses the raw user query string the same way
-- the websearch_to_tsquery() input grammar does, but keeps the
-- literal forms rather than reducing them to lexemes. Returns an
-- array of strings, each one a literal phrase or word we should
-- regex-match in the document body:
--
--   '"body politic"'              → ['body politic']
--   'honour OR honor'             → ['honour', 'honor']
--   'honour -honourable'          → ['honour']        (the - excludes)
--   '"tide in the affairs"  brutus' → ['tide in the affairs', 'brutus']
--
-- The 'OR' / 'or' keyword is dropped (it's a separator, not a term);
-- bare '-prefix' tokens are also dropped because the document already
-- matched the parent tsquery — exclusion has done its work upstream.
create or replace function extract_search_terms(q text)
returns text[]
language plpgsql
immutable
set search_path = public, pg_catalog
as $$
declare
  result text[] := '{}';
  remainder text := coalesce(q, '');
  open_pos integer;
  close_pos integer;
  phrase text;
  word text;
begin
  -- Step 1: pull out every "quoted phrase" first and drop them from
  -- the remainder so step 2 doesn't double-match the same characters.
  loop
    open_pos := strpos(remainder, '"');
    exit when open_pos = 0;
    close_pos := strpos(substr(remainder, open_pos + 1), '"');
    exit when close_pos = 0;
    phrase := substr(remainder, open_pos + 1, close_pos - 1);
    phrase := trim(phrase);
    if phrase <> '' then
      result := array_append(result, phrase);
    end if;
    remainder := substr(remainder, 1, open_pos - 1)
              || ' '
              || substr(remainder, open_pos + close_pos + 1);
  end loop;
  -- Step 2: tokenize what's left, dropping OR-separators and
  -- -excluded terms.
  foreach word in array regexp_split_to_array(trim(remainder), '\s+')
  loop
    if word is null or word = '' then continue; end if;
    if word in ('OR','or','AND','and') then continue; end if;
    if word like '-%' then continue; end if;
    result := array_append(result, word);
  end loop;
  return result;
end $$;

comment on function extract_search_terms(text) is
  'Parse a websearch_to_tsquery-style user query into the literal '
  'phrases and words it asks for, for use in per-document occurrence '
  'counting. Drops OR/AND separators and -excluded terms.';


create or replace function count_search_term_occurrences(
  haystack text,
  terms    text[]
)
returns integer
language plpgsql
immutable
set search_path = public, pg_catalog
as $$
declare
  total integer := 0;
  t text;
  escaped text;
begin
  if haystack is null or terms is null or array_length(terms, 1) is null then
    return 0;
  end if;
  foreach t in array terms loop
    if t is null or t = '' then continue; end if;
    -- Escape regex metacharacters so an accidentally-included '*' or
    -- '(' in the user's query string doesn't break the regex. Word
    -- boundaries (\m, \M) keep the match honest: 'honour' matches
    -- 'honour' but not 'honourable'.
    escaped := regexp_replace(t, '([\.\+\*\?\^\$\(\)\[\]\{\}\|\\])', '\\\1', 'g');
    total := total + (
      select count(*)::integer
      from regexp_matches(haystack, '\m' || escaped || '\M', 'gi') m
    );
  end loop;
  return total;
end $$;

comment on function count_search_term_occurrences(text, text[]) is
  'Count word-bounded, case-insensitive occurrences of each term in '
  'haystack, summed. Used to populate hit_count in search_documents.';


-- ─────────────────────────────────────────────────────────────────────
-- search_documents
-- ─────────────────────────────────────────────────────────────────────
-- The document-level search behind /search.
--
-- Query language: Postgres `websearch_to_tsquery('english', q)`. This
-- gives us, in the same string:
--   • plain words      → AND-joined ('honour reputation')
--   • OR keyword       → 'honour OR honor'
--   • exclusion        → 'honour -honourable'
--   • quoted phrases   → '"body politic"'  (exact-phrase match)
-- with case-folding and the project-default English stemmer applied
-- to non-quoted terms. Phrases inside quotes are matched verbatim
-- (no stemming).
--
-- Ranking is ts_rank_cd over the precomputed full_text_tsv. The
-- current schema indexes full_text only (no setweighted title), so
-- the rank reflects body-text relevance alone; title-weighting is
-- a future schema change.
--
-- The returned `headline` column is the standard
-- ts_headline output: a 250-char snippet centred on the best match,
-- with the matched terms wrapped in <mark>...</mark>. The frontend
-- runs the output through lib/sanitize-snippet.ts before rendering
-- with dangerouslySetInnerHTML, so any HTML the source documents
-- happen to contain is escaped and only <mark> tags survive.
--
-- The `total_count` column is the same number for every row in a
-- given response — it's the count of all matching documents under
-- the same filters, computed by a window aggregate. The frontend
-- reads it from the first row for pagination.
--
-- The `sort_by` parameter takes one of:
--   'relevance'  (default) — ts_rank_cd descending, then date asc
--   'date_asc'              — oldest first, then relevance
--   'date_desc'             — newest first, then relevance
--   'author'                — author_id asc, then date asc
--   'title'                 — title asc (nulls last), then date asc
-- Anything else is treated as 'relevance' so the RPC can never blow
-- up on a malformed sort.
create or replace function search_documents(
  q              text,
  author_ids     text[]    default null,
  year_min       integer   default null,
  year_max       integer   default null,
  doc_types      text[]    default null,
  sort_by        text      default 'relevance',
  result_limit   integer   default 25,
  result_offset  integer   default 0
)
returns table (
  doc_id        text,
  author_id     text,
  title         text,
  date_written  text,
  date_sort     integer,
  doc_type      text,
  word_count    integer,
  headline      text,
  rank          real,
  hit_count     integer,
  total_count   bigint
)
language sql
stable
security invoker
set search_path = public, pg_catalog
as $$
  with parsed as (
    select
      websearch_to_tsquery('english', coalesce(q, '')) as tsq,
      extract_search_terms(coalesce(q, '')) as raw_terms
  ),
  matched as (
    select
      d.doc_id,
      d.author_id,
      d.title,
      d.date_written,
      d.date_sort,
      d.doc_type,
      d.word_count,
      ts_headline(
        'english',
        coalesce(d.full_text, ''),
        p.tsq,
        'MaxFragments=1, MaxWords=40, MinWords=12, '
        || 'StartSel=<mark>, StopSel=</mark>, '
        || 'FragmentDelimiter= … '
      ) as headline,
      ts_rank_cd(d.full_text_tsv, p.tsq, 32) as rank,
      count_search_term_occurrences(coalesce(d.full_text, ''), p.raw_terms)
        as hit_count
    from documents d
    cross join parsed p
    where
      d.full_text_tsv @@ p.tsq
      and (author_ids is null or d.author_id = any(author_ids))
      and (year_min   is null or d.date_sort >= year_min)
      and (year_max   is null or d.date_sort <= year_max)
      and (doc_types  is null or d.doc_type = any(doc_types))
  )
  select
    m.doc_id,
    m.author_id,
    m.title,
    m.date_written,
    m.date_sort,
    m.doc_type,
    m.word_count,
    m.headline,
    m.rank,
    m.hit_count,
    count(*) over () as total_count
  from matched m
  order by
    -- Each CASE branch picks a single column for that sort mode and
    -- nulls the others, so Postgres can apply the multi-key sort
    -- without a CASE explosion. Ties fall through to date then doc_id.
    case when coalesce(sort_by, 'relevance') = 'date_asc'  then m.date_sort end asc  nulls last,
    case when coalesce(sort_by, 'relevance') = 'date_desc' then m.date_sort end desc nulls last,
    case when coalesce(sort_by, 'relevance') = 'author'    then m.author_id end asc  nulls last,
    case when coalesce(sort_by, 'relevance') = 'title'     then m.title    end asc  nulls last,
    case when coalesce(sort_by, 'relevance') not in ('date_asc','date_desc','author','title')
         then m.rank end desc nulls last,
    m.date_sort asc nulls last,
    m.doc_id    asc
  limit  greatest(result_limit, 1)
  offset greatest(result_offset, 0);
$$;

comment on function search_documents(text, text[], integer, integer, text[], text, integer, integer) is
  'Document-level full-text search. Each row is one matching document; the '
  '`hit_count` column carries the per-document occurrence count (word-bounded, '
  'case-insensitive regex count of every term/phrase the user asked for); '
  '`total_count` carries the unfiltered document count for paginator UIs. The '
  '`headline` column is ts_headline output with the matched terms wrapped in '
  '<mark> tags. Snippets are still not occurrence-level — use kwic_search() if '
  'you want every occurrence rendered in its concordance context.';


-- ─────────────────────────────────────────────────────────────────────
-- search_doc_types
-- ─────────────────────────────────────────────────────────────────────
-- Distinct doc_type facet for the filter <select>. Replaces the
-- previous frontend approach of pulling the first 2,000 documents
-- and collecting doc_type from the rows, which could miss rare
-- categories.
create or replace function search_doc_types()
returns table (doc_type text)
language sql
stable
security invoker
set search_path = public, pg_catalog
as $$
  select distinct d.doc_type
  from documents d
  where d.doc_type is not null
  order by d.doc_type;
$$;

comment on function search_doc_types() is
  'Distinct doc_type values for the search filter. Returns the full set '
  'rather than a sample so rare types are not missed.';


-- ─────────────────────────────────────────────────────────────────────
-- search_facets
-- ─────────────────────────────────────────────────────────────────────
-- Per-author and per-doc-type counts for the current query and
-- filters. Used by the facet sidebar so a user can see how many
-- matching documents exist for each author / type without paging
-- through the result set.
--
-- The function returns a single row of three JSON arrays:
--   authors    = [{ author_id,  n }, ...]
--   doc_types  = [{ doc_type,   n }, ...]
--   years      = [{ decade,     n }, ...]   -- decade is the integer
--                                              start year (1700, 1710,
--                                              1720, …); documents with
--                                              null date_sort are
--                                              omitted.
--
-- Counts respect the q filter and the year_min/year_max filters
-- but DO NOT respect the author_ids or doc_types filters — the
-- sidebar shows the full per-facet distribution so the user can
-- see what's available, then narrow by clicking. (This matches
-- the convention used by every faceted search interface — Solr,
-- Elasticsearch, Algolia all do it this way.) The year facet
-- intentionally does respect the year-range filter because the
-- histogram zooms in when the user narrows the range, which is the
-- behavior users expect.
create or replace function search_facets(
  q          text,
  year_min   integer default null,
  year_max   integer default null
)
returns table (
  authors_json    jsonb,
  doc_types_json  jsonb,
  years_json      jsonb
)
language sql
stable
security invoker
set search_path = public, pg_catalog
as $$
  with parsed as (
    select websearch_to_tsquery('english', coalesce(q, '')) as tsq
  ),
  matched as (
    select d.author_id, d.doc_type, d.date_sort
    from documents d
    cross join parsed p
    where
      d.full_text_tsv @@ p.tsq
      and (year_min is null or d.date_sort >= year_min)
      and (year_max is null or d.date_sort <= year_max)
  ),
  by_author as (
    select author_id, count(*)::bigint as n
    from matched
    where author_id is not null
    group by author_id
    order by n desc, author_id asc
  ),
  by_type as (
    select doc_type, count(*)::bigint as n
    from matched
    where doc_type is not null
    group by doc_type
    order by n desc, doc_type asc
  ),
  by_decade as (
    -- Floor each year to its decade start: 1758 → 1750, 1812 → 1810.
    -- Date_sort is the year as integer; nulls excluded.
    select (date_sort / 10) * 10 as decade, count(*)::bigint as n
    from matched
    where date_sort is not null
    group by (date_sort / 10) * 10
    order by decade asc
  )
  select
    coalesce(
      (select jsonb_agg(jsonb_build_object('author_id', author_id, 'n', n)) from by_author),
      '[]'::jsonb
    ) as authors_json,
    coalesce(
      (select jsonb_agg(jsonb_build_object('doc_type', doc_type, 'n', n)) from by_type),
      '[]'::jsonb
    ) as doc_types_json,
    coalesce(
      (select jsonb_agg(jsonb_build_object('decade', decade, 'n', n)) from by_decade),
      '[]'::jsonb
    ) as years_json;
$$;

comment on function search_facets(text, integer, integer) is
  'Per-author, per-doc-type, and per-decade counts for the current query. '
  'Year filters apply (so the decade histogram zooms in when the user '
  'narrows the range); author and doc-type filters do not (the sidebar '
  'shows the full distribution so users can see what is available before '
  'narrowing).';


-- ─────────────────────────────────────────────────────────────────────
-- Grants
-- ─────────────────────────────────────────────────────────────────────
-- The site queries via the public anonymous role; the functions need
-- to be executable by it. (Supabase's default `service_role` already
-- has execute on everything in public.)
grant execute on function search_documents(text, text[], integer, integer, text[], text, integer, integer) to anon, authenticated;
grant execute on function search_doc_types()                                                              to anon, authenticated;
grant execute on function search_facets(text, integer, integer)                                            to anon, authenticated;
grant execute on function extract_search_terms(text)                                                       to anon, authenticated;
grant execute on function count_search_term_occurrences(text, text[])                                      to anon, authenticated;
