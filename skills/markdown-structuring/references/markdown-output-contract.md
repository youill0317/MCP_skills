# Markdown Output Contract

Load this reference when rendering the final reorganized Markdown document.

## Required Output Shape

1. YAML frontmatter must appear first.
2. Use standard Markdown only.
3. Produce a complete new Markdown file from beginning to end.
4. Use `#` heading depth according to the logical hierarchy of the full document.
5. Use `-` for unordered lists.
6. Use `1.`, `2.`, `3.` style for ordered lists.
7. Reorder sections and supporting material into a clearer logical flow when that improves the document structure without losing content.
8. Do not preserve `---` page boundaries unless they still serve the new structure.

## Tables, Code, and Mermaid

1. Use Markdown tables only when the source structure is representable without major distortion.
2. If merged cells or irregular layouts make a Markdown table misleading, rewrite it as a labeled list instead.
3. Keep code fenced and add a language tag when known.
4. Keep Mermaid blocks fenced as `mermaid` when the diagram is representable in Markdown.

## Quotes and Metadata

1. Use `>` only for quotes or external-source excerpts.
2. Always emit `tags`, `previous_lecture`, `next_lecture`, `related_notes`, and `updated` in frontmatter.
3. Keep related-note information in frontmatter rather than a separate body section.
4. Keep metadata compact and secondary to the main body structure.

## Preservation Rules

- Keep all source information even when section order changes.
- Keep URLs exactly as written unless extractor damage clearly split them.
- Keep image references exactly as written.
- Keep numbers, dates, formulas, and identifiers exactly as written unless a visible extraction split must be repaired.
- Do not inject commentary, summaries, or editorial notes.
