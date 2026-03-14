---
name: markdown-structuring
description: Restructure Markdown into a canonical note format when original order and document shape do not need to be preserved. Use for messy research notes, pasted materials, or mixed Markdown that should be reorganized into consistent frontmatter, tags, related notes, and section hierarchy without inventing content.
---

# Mission

Restructure Markdown into a consistent canonical format when readability and standardized organization matter more than preserving the source order exactly.

## Use When

- The input is already Markdown but the order, sectioning, or note shape is inconsistent.
- The user wants the content rewritten into a standard note template with canonical sections.
- Research notes, pasted excerpts, or mixed materials should be reorganized into a clean hierarchy.
- New frontmatter, tags, or related-note sections may need to be added as part of the canonical format.
- Preserving the exact original order is less important than producing a consistent final structure.

## Scope

1. Reorganize Markdown into a canonical structure and heading hierarchy.
2. Add canonical frontmatter, tags, and related-note sections when the standard format expects them.
3. Clean local formatting artifacts such as repeated system tags, broken line wraps, and obvious line-end hyphenation when the intended text is clear.
4. Preserve meaning, links, image references, numbers, formulas, and explicit source content.
5. Keep the source language unchanged.
6. Never summarize, omit, translate, or invent content.

## Core Workflow

1. Inspect the Markdown to identify the main topics, logical groupings, and reusable note sections.
2. Remove system tags and obvious non-content artifacts that interfere with clean Markdown output.
3. Repair local line-wrap and hyphenation artifacts only when the intended text is clear from nearby context.
4. Map the material into the canonical note template, including heading hierarchy, related-note placement, and section ordering.
5. Insert canonical frontmatter and tags first, then render the body in the standard structure.
6. Run a final pass to confirm that all source content is retained even when the order is reorganized.

## Output Standard

Every output must:

1. Start with YAML frontmatter.
2. Use pure Markdown only.
3. Preserve all source content even when sections are reordered into the canonical layout.
4. Include the entire restructured document from start to finish.
5. Apply the canonical note structure consistently.
6. Keep ambiguous local cleanups conservative; do not invent missing content.

## Integration

1. Use when the user wants Markdown reorganized into a canonical format rather than kept in its original order.
2. Use instead of `markdown-format-normalization` when section order, heading hierarchy, or note template may change.
3. Do not use this skill when the original structure must remain recognizable; use `markdown-format-normalization` for that.
4. Do not use `document-summary` or `report-writing` as substitutes for Markdown restructuring.

## Resource Loading

Pass only the needed `reference_paths` to `run_skill`; these files do not load automatically.

- Load `references/cleaning-and-repair.md` for artifact removal and local line repair rules.
- Load `references/structure-analysis.md` when headings, tables, callouts, code, math, or footnotes are difficult to classify during restructuring.
- Load `references/markdown-output-contract.md` when canonical Markdown formatting rules must be applied strictly.
- Load `references/frontmatter-and-tags.md` when frontmatter, tags, or related-note sections need consistency.
- Load `references/verification-checklist.md` for completeness and anti-hallucination checks.
