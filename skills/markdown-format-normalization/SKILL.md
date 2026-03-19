---
name: markdown-format-normalization
description: Preserve the original Markdown wording, tone, sentence order, and page boundaries while aggressively expressing the existing structure with headings, lists, indentation, tables, code fences, Mermaid blocks, limited blockquotes, and a standardized frontmatter schema. Use when lecture notes, slides, handouts, or other source-faithful Markdown should keep the original text exactly but should not remain as flat plain text when Markdown can represent the structure more clearly. Prefer this skill over summary skills when the user asks to organize existing Markdown without asking to compress or summarize its content.
---

# Mission

Adjust Markdown structure aggressively while preserving the original wording, tone, sentence order, document order, and page boundaries.

## Use When

- The input is already Markdown but the structure is hard to read or inconsistently marked.
- The original wording, tone, sentence order, and page order should stay intact and only Markdown notation should change.
- The document uses `---` as page boundaries that must remain in place.
- Headings, lists, indentation, tables, code fences, Mermaid blocks, math expressions, spacing, repeated headers/footers, or frontmatter need normalization.
- The user wants formatting and structural cleanup, not summarization, rewriting, or section reorganization.

## Scope

1. Preserve the original wording, tone, sentence order, document order, page boundaries, links, images, and explicit source content.
2. Adjust Markdown structure with headings, bullet or numbered lists, indentation, spacing, tables, code fences, Mermaid blocks, LaTeX math syntax, limited blockquotes, and a standardized frontmatter schema.
3. Treat every `---` separator as a page boundary and preserve it exactly.
4. Use the full document context to judge whether a text block functions as a major topic, middle topic, minor topic, list item, quote, table-like block, or body paragraph.
5. Apply the structural result only inside the current page; never merge, continue, or reorganize content across page boundaries.
6. Standardize frontmatter so the output always includes `tags`, `previous_lecture`, `next_lecture`, `related_notes`, and `updated`.
7. Preserve the first occurrence of a document-identifying header or footer, but remove later repeated headers, footers, page numbers, and decorative separators when they are clearly repetitive.
8. Allow text edits only when a broken table, Mermaid block, code fence, math expression, or obvious typo must be minimally repaired to restore valid Markdown or readable meaning.
9. Preserve safe existing metadata keys, but convert equivalent legacy keys to the standard snake_case keys.
10. Do not rewrite sentences, split or merge sentences, reorder text, summarize, omit content, or invent new heading titles or sections unsupported by the source.

## Core Workflow

1. Inspect the entire document to understand topic depth, repeated header/footer patterns, and local structure without changing the original wording.
2. Split the work by page using `---` and treat each page as an independent formatting unit.
3. Identify the first occurrence of any document-identifying header or footer, preserve it, and remove only the later repeated occurrences when the repetition is clear.
4. Inside each page, apply headings, lists, indentation, spacing, tables, code fences, Mermaid blocks, LaTeX math syntax, and frontmatter using only structure already supported by the source text.
5. Use `#`, `##`, `###`, and deeper heading levels when an existing line already functions as a title, section label, or subsection label in context.
6. Convert plain text into bullet or numbered lists when parallel, enumerated, or parent-child relationships are already present in the source.
7. Convert recoverable table-like text into tables or, if unsafe as a table, into lists while keeping the original wording.
8. Use `>` for direct quotations, external-source excerpts, standalone figure or table captions, and clearly excerpt-like abstract blocks from papers or source documents.
9. Express mathematical content with LaTeX math syntax: use `$...$` for inline math and `$$...$$` for display math when the source clearly contains a formula or equation block.
10. Apply only the smallest text repair needed when malformed tables, Mermaid syntax, broken code fences, broken math notation, or obvious typos would otherwise break rendering or interpretation.
11. Ensure the frontmatter always contains `tags: []`, `previous_lecture: ""`, `next_lecture: ""`, `related_notes: []`, and `updated: "YYYY-MM-DD"` when values are otherwise missing.
12. Run a final pass to confirm that wording stayed intact, order stayed intact, page boundaries stayed intact, repeated headers/footers after the first occurrence were removed only when clearly repetitive, math was normalized with LaTeX delimiters, and no Markdown-eligible structure was left as unnecessary plain text.

## Output Standard

Every output must:

1. Remain valid Markdown.
2. Preserve original wording, tone, sentence order, document order, and page boundaries unless a minimal repair is required for a broken table, Mermaid block, code fence, math expression, or obvious typo.
3. Keep `---` separators in the same positions and treat each page independently.
4. Use Markdown aggressively enough that lines which clearly function as titles, lists, tables, or quoted material are not left as unnecessary plain text.
5. Use heading depth that matches the text's relative level in the full source context.
6. Use lists and indentation when parallel or parent-child relationships are clear.
7. Use blockquotes only for quotations, external-source material, standalone figure or table captions, or clearly excerpt-like abstract blocks.
8. Keep the first occurrence of a document-identifying header or footer, but remove later repeated headers, footers, page numbers, and decorative separators when repetition is clear.
9. Always emit the standard frontmatter keys `tags`, `previous_lecture`, `next_lecture`, `related_notes`, and `updated`.
10. Express formulas with LaTeX math syntax using `$...$` for inline math and `$$...$$` for display math when formulas are present in the source.
11. Keep links, image references, frontmatter, code, math meaning, and footnotes intact.
12. Avoid commentary about the edits unless the user explicitly asks for notes.

## Integration

1. Use when the original Markdown text should be preserved exactly and only Markdown structure plus standardized frontmatter should change.
2. Use after `markdown-structuring` only when a canonicalized note still needs source-faithful structure cleanup.
3. Use standalone for lecture notes, slide conversions, handouts, or imported Markdown whose wording and page shape should stay intact but whose Markdown structure should be much stronger.
4. Do not use this skill to merge pages, create a new canonical note layout, summarize content, rewrite prose, or change text order; that belongs to other skills.

## Resource Loading

Pass only the needed `reference_paths` to `run_skill`; these files do not load automatically.

- Load `references/normalization-rules.md` for preservation priorities, aggressive structure rules, repeated header/footer handling, and page-boundary rules.
- Load `references/heading-list-table-rules.md` when heading depth, list shape, table repair, math formatting, structure promotion, or blockquote usage needs tighter rules.
- Load `references/frontmatter-and-tags.md` when the standard frontmatter keys, tags, lecture links, or related-note links need cleanup or generation.
- Load `references/output-examples.md` when a page-preserving Markdown shape, structure promotion, or repeated-header removal example is needed.
- Load `references/verification-checklist.md` for final checks on wording preservation, page preservation, aggressive Markdown structure, LaTeX math formatting, and limited repairs.
