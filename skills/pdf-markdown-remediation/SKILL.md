---
name: pdf-markdown-remediation
description: Repair Markdown that is broken, incomplete, or misaligned with its source. Use when OCR errors, dropped sections, paragraph collapse, table or list damage, or conversion mismatches must be reconciled against the original file when available, with fallback comparison against auxiliary extracts when needed.
---

# Mission

Repair Markdown against the source of truth so the document becomes complete, readable, and materially aligned with the original source without inventing content.

## Use When

- The input Markdown does not match the original source file closely enough.
- OCR, extraction, or conversion introduced dropped sections, broken paragraphs, damaged tables or lists, or mistranscribed text.
- The original source file is available and should be treated as the truth boundary.
- Direct source reading is limited, but auxiliary extracts such as MarkItDown output or other extraction views can be compared to recover fidelity.
- The user needs reconstruction or reconciliation rather than formatting-only cleanup.

## Scope

1. Repair Markdown by reconciling it against the original source whenever the source is available.
2. Recover dropped or damaged content conservatively while preserving source meaning.
3. Rebuild document structure in standard Markdown when paragraphs, headings, lists, tables, callouts, code, math, or footnotes were damaged.
4. Preserve URLs, image syntax, numbers, formulas, and footnote references exactly when present.
5. Add or preserve YAML frontmatter conservatively, keeping it minimal when no safe metadata can be recovered or inferred.
6. Keep the source language unchanged.
7. Never summarize, omit, translate, or invent content.

## Core Workflow

1. Identify the best available truth source: original file first, then auxiliary extracts when direct reading is limited.
2. Compare the current Markdown against the source to locate omissions, mistranscriptions, collapsed structure, and artifact noise.
3. Clean repeated non-body artifacts such as page numbers, headers, footers, watermark text, and system tags when the source supports that judgment.
4. Repair broken line wraps, paragraph splits, line-end hyphenation, and OCR token damage only when the source or strong context supports the change.
5. Rebuild structural units: title, sections, body paragraphs, lists, tables, callouts, code, math, images, and footnotes.
6. Reconstruct the document into standard Markdown with readable spacing and stable heading depth.
7. Insert or preserve YAML frontmatter first, then the repaired document body.
8. Run a completeness pass to ensure every recoverable source segment is accounted for and no Markdown-internal tags remain.

## Output Standard

Every output must:

1. Start with YAML frontmatter.
2. Use pure Markdown only.
3. Preserve content order unless local reflow is required to repair extraction damage.
4. Include the entire repaired document from start to finish.
5. Prefer source-aligned repairs over aesthetically nicer guesses.
6. Keep ambiguous repairs conservative; prefer visibly awkward but faithful output over guessed reconstruction.

## Integration

1. Use after `markdown-conversion` when first-pass Markdown must be reconciled against the source.
2. Use before `markdown-format-normalization` only after the document is structurally repaired and materially aligned with the source.
3. Use standalone when a user provides broken extracted text plus the original source context for recovery.
4. Do not use `document-summary` or `report-writing` as substitutes for source-aligned repair.

## Resource Loading

Pass only the needed `reference_paths` to `run_skill`; these files do not load automatically.

- Load `references/cleaning-and-repair.md` for artifact removal and line repair rules.
- Load `references/structure-analysis.md` when headings, tables, callouts, code, math, or footnotes are difficult to classify during repair.
- Load `references/source-comparison-and-fallbacks.md` when choosing the truth source or reconciling against auxiliary extracts.
- Load `references/markdown-output-contract.md` when repaired Markdown formatting rules must be applied strictly.
- Load `references/frontmatter-and-tags.md` when frontmatter or topic-tag selection needs consistency.
- Load `references/verification-checklist.md` for completeness, source alignment, and anti-hallucination checks.
