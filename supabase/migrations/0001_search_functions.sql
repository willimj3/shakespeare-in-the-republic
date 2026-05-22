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
create or replace function search_documents(
  q              text,
  author_ids     text[]    default null,
  year_min       integer   default null,
  year_max       integer   default null,
  doc_types      text[]    default null,
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
  order by m.rank desc, m.date_sort asc nulls last, m.doc_id asc
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
-- Grants
-- ─────────────────────────────────────────────────────────────────────
-- The site queries via the public anonymous role; the functions need
-- to be executable by it. (Supabase's default `service_role` already
-- has execute on everything in public.)
grant execute on function search_documents(text, text[], integer, integer, text[], integer, integer) to anon, authenticated;
grant execute on function search_doc_types()                                                      to anon, authenticated;
