# Supabase functions

This directory holds the SQL definitions for the Postgres RPCs that the
explorer pages depend on. They are committed for methodological
transparency — the search, KWIC, and candidate-echoes views make
scholarly claims, and the queries behind them should be auditable from
the repo.

## Migrations

- `migrations/0001_search_functions.sql` — `search_documents()` and
  `search_doc_types()` powering `/search`.

(Additional migration files will document the `kwic_search()`,
`candidate_echoes_facets_filtered()`, `get_document_with_annotations()`,
and `collocate()` functions in subsequent commits.)

## Apply order

```bash
# Local Supabase CLI (preferred)
supabase db push

# Or against a hosted project, paste each file into the SQL editor in
# the order listed above.
```

## Reproducibility note

The functions already exist in the live Supabase project that powers
the deployed site. These migration files are the canonical record of
their definitions and let a reviewer reproduce them in a fresh project.
If the on-disk SQL ever drifts from what the live project is running,
the on-disk SQL is the source of truth — re-apply it.
