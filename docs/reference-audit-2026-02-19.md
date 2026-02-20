# Reference Audit Report

- Generated: 2026-02-19
- Scope: `content/**/*.mdx`
- Method: rule-based static scan (year consistency, journal-url mismatch, sparse references, possible author typo)
- Note: This is a triage list for manual verification, not a final truth set.

## High-priority findings

1. `content/docs/imm-classic/1965-discovery-of-b-cells-and-bursa.mdx:111`
- Type: `journal-url-mismatch`
- Issue: Citation text says `Journal of Experimental Medicine`, but URL points to `nature.com/articles/205143a0`.

2. `content/docs/pd-1/2002-carter-pdl-inhibitory-pathway-il2.mdx:78`
- Type: `year-mismatch`
- Issue: File/topic year is 2002, but key citation line is marked as 2003.

3. `content/docs/B7/1991-nadler-1991-ifng-b7-induction.mdx:114`
- Type: `possible-author-typo`
- Issue: Author appears as `Freedman, Arnold S.` for the Nadler 1991 B7/BB-1 paper. Needs source metadata verification.

## Year-mismatch candidates

1. `content/docs/B7/1995-linsley-b7-tumor-rejection-1992-1995.mdx`
- Issue: filename year range includes 1995, but references do not explicitly include 1995.

2. `content/docs/cancer-history/1983-helicobacter-pylori-marshall-self-experiment.mdx`
- Issue: filename year 1983 not explicitly found in reference block.

3. `content/docs/imm-classic/1925-pyrogen-discovery-seibert-endotoxin.mdx`
- Issue: filename year 1925 not explicitly found in reference block.

4. `content/docs/imm-classic/1961-origin-of-t-cells-and-thymus.mdx`
- Issue: filename year 1961 not explicitly found in reference block.

5. `content/docs/imm-classic/1965-discovery-of-b-cells-and-bursa.mdx`
- Issue: filename year 1965 not explicitly found in reference block.

6. `content/docs/pd-1/2002-carter-pdl-inhibitory-pathway-il2.mdx`
- Issue: filename year 2002 not explicitly found in reference block.

## Possible missing references (sparse reference blocks)

1. `content/docs/B7/1991-nadler-1991-ifng-b7-induction.mdx`
- Signal: reference block has 1 entry while body appears to discuss multiple studies.

2. `content/docs/imm-classic/1925-pyrogen-discovery-seibert-endotoxin.mdx`
- Signal: reference block has 1 entry while body appears to discuss Seibert/LPS/LAL timeline.

3. `content/docs/imm-classic/1968-brunner-cr51-cell-mediated-cytotoxicity-1968.mdx`
- Signal: reference block has 1 entry while body appears to discuss broader methodological context.

4. `content/docs/immunology/tlr4-inflammation-phagocytosis-myd88-trif.mdx`
- Signal: reference block has 1 entry while body appears to discuss multiple claims/materials.

## Suggested review order

1. `content/docs/imm-classic/1965-discovery-of-b-cells-and-bursa.mdx`
2. `content/docs/pd-1/2002-carter-pdl-inhibitory-pathway-il2.mdx`
3. `content/docs/B7/1991-nadler-1991-ifng-b7-induction.mdx`
4. Remaining year-mismatch files
5. Remaining sparse-reference files

## Audit summary

- Files scanned: 311
- Issues flagged: 12
- Breakdown:
  - `journal-url-mismatch`: 1
  - `possible-author-typo`: 1
  - `year-mismatch`: 6
  - `possible-missing-refs`: 4


