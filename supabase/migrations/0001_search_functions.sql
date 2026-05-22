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
-- │ cleaned body text; `documents.tsv` is the precomputed tsvector  │
-- │ used for ranking and snippeting.                                │
-- └─────────────────────────────────────────────────────────────────┘


-- ─────────────────────────────────────────────────────────────────────
-- Schema assumptions
-- ─────────────────────────────────────────────────────────────────────
--
-- documents (
--   doc_id        text primary key,
--   author_id     text references authors,
--   title         text,
--   date_written  text,
--   date_sort     integer,
--   doc_type      text,
--   full_text     text,
--   word_count    integer,
--   tsv           tsvector generated always as (
--                   setweight(to_tsvector('english', coalesce(title, '')), 'A')
--                   ||
--                   setweight(to_tsvector('english', coalesce(full_text, '')), 'B')
--                 ) stored
-- );
-- create index documents_tsv_idx on documents using gin (tsv);
-- create index documents_author_idx  on documents (author_id);
-- create index documents_date_idx    on documents (date_sort);
-- create index documents_doctype_idx on documents (doc_type);


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
-- Ranking is ts_rank_cd over the precomputed tsv, scaled so that
-- title hits weigh more heavily than body hits (the 'A' / 'B' weights
-- assigned at column-generation time).
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
  total_count   bigint
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
      ts_rank_cd(d.tsv, p.tsq, 32) as rank
    from documents d
    cross join parsed p
    where
      d.tsv @@ p.tsq
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

comment on function search_documents(text, text[], integer, integer, text[], integer, integer) is
  'Document-level full-text search. Each row is one matching document; the '
  '`total_count` column carries the unfiltered total for paginator UIs. The '
  '`headline` column is ts_headline output with the matched terms wrapped in '
  '<mark> tags. Snippets are not occurrence-level — use kwic_search() if you '
  'need every occurrence in its concordance context.';


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
-- The function returns a single row of two JSON arrays:
--   authors    = [{ author_id, n }, ...]
--   doc_types  = [{ doc_type,   n }, ...]
--
-- Counts respect the q filter and the year_min/year_max filters
-- but DO NOT respect the author_ids or doc_types filters — the
-- sidebar shows the full per-facet distribution so the user can
-- see what's available, then narrow by clicking. (This matches
-- the convention used by every faceted search interface — Solr,
-- Elasticsearch, Algolia all do it this way.)
create or replace function search_facets(
  q          text,
  year_min   integer default null,
  year_max   integer default null
)
returns table (
  authors_json    jsonb,
  doc_types_json  jsonb
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
    select d.author_id, d.doc_type
    from documents d
    cross join parsed p
    where
      d.tsv @@ p.tsq
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
  )
  select
    coalesce(
      (select jsonb_agg(jsonb_build_object('author_id', author_id, 'n', n)) from by_author),
      '[]'::jsonb
    ) as authors_json,
    coalesce(
      (select jsonb_agg(jsonb_build_object('doc_type', doc_type, 'n', n)) from by_type),
      '[]'::jsonb
    ) as doc_types_json;
$$;

comment on function search_facets(text, integer, integer) is
  'Per-author and per-doc-type counts for the current query. Year filters '
  'apply; author/doc-type filters do not (the sidebar shows the full '
  'distribution so users can see what is available before narrowing).';


-- ─────────────────────────────────────────────────────────────────────
-- Grants
-- ─────────────────────────────────────────────────────────────────────
-- The site queries via the public anonymous role; the functions need
-- to be executable by it. (Supabase's default `service_role` already
-- has execute on everything in public.)
grant execute on function search_documents(text, text[], integer, integer, text[], text, integer, integer) to anon, authenticated;
grant execute on function search_doc_types()                                                              to anon, authenticated;
grant execute on function search_facets(text, integer, integer)                                            to anon, authenticated;
