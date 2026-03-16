---
name: markdown-format-normalization
description: Preserve the original Markdown content while adjusting Markdown structure with headings, lists, indentation, tables, code fences, Mermaid blocks, limited blockquotes, and a standardized frontmatter schema. Use when lecture notes, slides, handouts, or other source-faithful Markdown should keep the original wording, order, and page boundaries while only the Markdown symbols, broken syntax, and standardized metadata need cleanup.
---

# Mission

Adjust Markdown structure while preserving the original content, document order, and page boundaries.

## Use When

- The input is already Markdown but the structure is hard to read or inconsistently marked.
- The original wording should stay intact and only Markdown symbols should change.
- The document uses `---` as page boundaries that must remain in place.
- Headings, lists, indentation, tables, code fences, Mermaid blocks, spacing, or frontmatter need normalization.
- The user wants formatting and structural cleanup, not summarization, rewriting, or section reorganization.

## Scope

1. Preserve the original wording, ordering, page boundaries, links, images, and explicit source content.
2. Adjust Markdown structure with headings, bullet or numbered lists, indentation, spacing, tables, code fences, Mermaid blocks, limited blockquotes, and a standardized frontmatter schema.
3. Treat every `---` separator as a page boundary and preserve it exactly.
4. Use the full document context to judge whether a text block functions as a major topic, middle topic, minor topic, list item, quote, or body paragraph.
5. Apply the structural result only inside the current page; never merge, continue, or reorganize content across page boundaries.
6. Standardize frontmatter so the output always includes `tags`, `previous_lecture`, `next_lecture`, `related_notes`, and `updated`.
7. Allow content edits only when a broken table, Mermaid block, code fence, or obvious typo must be minimally repaired to restore valid Markdown or readable meaning.
8. Preserve safe existing metadata keys, but convert equivalent legacy keys to the standard snake_case keys.
9. Do not invent unsupported headings, sections, source text, or cross-page structure.

## Core Workflow

1. Inspect the entire document to understand topic depth and local structure without changing the original wording.
2. Split the work by page using `---` and treat each page as an independent formatting unit.
3. Inside each page, adjust headings, lists, indentation, spacing, tables, code fences, Mermaid blocks, and frontmatter using only the structure supported by the source.
4. Use `#`, `##`, `###`, and deeper heading levels only when the text's relative importance is clear from the full document context.
5. Use `>` only for direct quotations, external-source excerpts, or clearly source-like quoted material.
6. Apply only the smallest content repair needed when malformed tables, Mermaid syntax, broken code fences, or obvious typos would otherwise break rendering or interpretation.
7. Ensure the frontmatter always contains `tags: []`, `previous_lecture: ""`, `next_lecture: ""`, `related_notes: []`, and `updated: "YYYY-MM-DD"` when values are otherwise missing.
8. Run a final pass to confirm that content stayed intact, page boundaries stayed intact, and no structure crosses from one page into another.

## Output Standard

Every output must:

1. Remain valid Markdown.
2. Preserve original wording, order, and page boundaries unless a minimal repair is required for a broken table, Mermaid block, code fence, or obvious typo.
3. Keep `---` separators in the same positions and treat each page independently.
4. Use heading depth that matches the text's relative level in the full source context.
5. Use lists and indentation only when parallel or parent-child relationships are clear.
6. Use blockquotes only for quotations or external-source material.
7. Always emit the standard frontmatter keys `tags`, `previous_lecture`, `next_lecture`, `related_notes`, and `updated`.
8. Keep links, image references, frontmatter, code, math, and footnotes intact.
9. Avoid commentary about the edits unless the user explicitly asks for notes.

## Integration

1. Use when the original Markdown content should be preserved and only Markdown structure plus standardized frontmatter should change.
2. Use after `markdown-structuring` only when a canonicalized note still needs source-faithful structure cleanup.
3. Use standalone for lecture notes, slide conversions, handouts, or imported Markdown whose wording and page shape should stay intact.
4. Do not use this skill to merge pages, create a new canonical note layout, summarize content, or rewrite prose; that belongs to other skills.

## Resource Loading

Pass only the needed `reference_paths` to `run_skill`; these files do not load automatically.

- Load `references/normalization-rules.md` for preservation priorities, allowed repairs, and page-boundary rules.
- Load `references/heading-list-table-rules.md` when heading depth, list shape, table repair, or blockquote usage needs tighter rules.
- Load `references/frontmatter-and-tags.md` when the standard frontmatter keys, tags, lecture links, or related-note links need cleanup or generation.
- Load `references/output-examples.md` when a page-preserving Markdown shape or repair example is needed.
- Load `references/verification-checklist.md` for final checks on wording preservation, page preservation, and limited repairs.
