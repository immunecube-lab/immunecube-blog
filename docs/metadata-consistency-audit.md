# Metadata Consistency Audit

- Generated: 2026-02-19 19:09:31
- Scope: `content/docs/**/*.mdx`
- Rules:
  - filename and frontmatter `slug` must match OR be `YYYY-<slug>` / `YYYY-YYYY-<slug>`
  - if `order > 1800`, treat as publication year and match first `<Paper year={...}>`

- Files scanned: 303
- Findings: 1

## filename-slug-mismatch (1)
- `content\docs\cancer-history\001-earlist-record-of-cancer-imhotep.mdx` :: filename='001-earlist-record-of-cancer-imhotep', slug='001-earliest-record-of-cancer-imhotep'

