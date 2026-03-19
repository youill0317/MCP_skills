---
name: markdown-structuring
description: Restructure Markdown into a new, well-structured Markdown document when the original content should be reorganized into a more logical order instead of preserving the original layout. Use for messy research notes, pasted materials, or mixed Markdown that should be rewritten into clearer headings, lists, sections, and a standardized frontmatter schema without summarizing, omitting, translating, or inventing content. Prefer this skill over summary skills when the user wants an existing Markdown note reorganized or rewritten into clearer structure without explicit summary intent.
---

# Mission

Create a new Markdown file that preserves the source content while reorganizing it into a clearer logical structure.

## Use When

- The input is already Markdown but the content order, sectioning, or hierarchy is hard to follow.
- The user wants a newly structured Markdown document rather than a source-faithful cleanup.
- Related material should be grouped together even if the source scattered it across pages or sections.
- Markdown headings, lists, tables, code fences, Mermaid blocks, quotes, frontmatter, tags, lecture links, or related-note links need a stronger overall structure.
- Preserving the exact original order is less important than producing a logically organized final Markdown file.

## Scope

1. Preserve all source content, links, image references, formulas, numbers, identifiers, and explicit source language.
2. Reorganize the material into a clearer logical order with headings, lists, paragraphs, tables, code fences, Mermaid blocks, quotes, frontmatter, tags, and standardized note-link metadata.
3. Split or merge local paragraphs when needed to express the source content in a better structure.
4. Treat `---` page boundaries as analysis hints only; do not preserve them unless the final structure still needs them.
5. Use the full document context to judge whether a block should become a major topic, middle topic, minor topic, list item, quote, table, or supporting paragraph.
6. Allow local cleanup of extraction artifacts, OCR damage, broken Markdown syntax, and obvious split-token errors when the intended source text is clear.
7. Always emit YAML frontmatter with the standard keys `tags`, `previous_lecture`, `next_lecture`, `related_notes`, and `updated`.
8. Never summarize, omit, translate, or invent content.

## Core Workflow

1. Inspect the entire document to understand major themes, supporting details, repeated topics, and strong logical groupings.
2. Remove system tags and obvious extraction artifacts that do not belong in the final Markdown file.
3. Repair broken words, line wraps, and malformed Markdown only when the intended source text is clear.
4. Break the source into logical units such as titles, sections, subsections, list items, examples, quoted material, tables, or code-related blocks.
5. Reorder those units into a clearer document structure, even when related content originally appeared on different pages or in different source regions.
6. Assign `#`, `##`, `###`, and deeper heading levels according to each block's relative importance in the full document.
7. Use `>` only for direct quotations, external-source excerpts, or clearly quoted source-like material.
8. Render the final document as a well-structured new Markdown file with frontmatter first and the reorganized body after it.

## Output Standard

Every output must:

1. Start with YAML frontmatter.
2. Produce a complete new Markdown document from start to finish.
3. Preserve all source information even when the order is reorganized.
4. Use heading depth that matches the logical hierarchy of the full document.
5. Use lists, tables, indentation, code fences, Mermaid blocks, and quotes only when they improve structure without changing meaning.
6. Use blockquotes only for quotations or external-source material.
7. Always emit `tags`, `previous_lecture`, `next_lecture`, `related_notes`, and `updated` in frontmatter.
8. Keep tags and note-link metadata grounded in the source or in a strong project convention.
9. Avoid commentary about the edits unless the user explicitly asks for notes.

## Integration

1. Use when the user wants a better-structured new Markdown file with a standardized frontmatter schema, not a light cleanup of the existing one.
2. Use instead of `markdown-format-normalization` when the section order, hierarchy, grouping, or document shape should change.
3. Do not use this skill when the original wording, tone, sentence order, and page order must remain recognizable; use `markdown-format-normalization` for source-faithful cleanup with aggressive Markdown notation.
4. Do not use summary-oriented skills as substitutes for structural rewriting.

## Resource Loading

Pass only the needed `reference_paths` to `run_skill`; these files do not load automatically.

- Load `references/cleaning-and-repair.md` for artifact cleanup, OCR recovery, and pre-structuring text repair.
- Load `references/structure-analysis.md` when headings, lists, tables, quotes, or logical groupings are difficult to classify.
- Load `references/markdown-output-contract.md` when rendering the final reorganized Markdown document.
- Load `references/frontmatter-and-tags.md` when the standard frontmatter keys, tags, lecture links, or related-note links need grounded metadata rules.
- Load `references/verification-checklist.md` for completeness, logic-flow, and anti-hallucination checks.
