# Markdown Output Contract

Load this reference when applying the final Markdown formatting after source-aligned repair.

## Required Output Shape

1. YAML frontmatter must appear first.
2. Use standard Markdown only.
3. Leave one empty line between paragraphs and major blocks.
4. Use `#` heading depth according to document hierarchy.
5. Use `-` for unordered lists.
6. Use `1.`, `2.`, `3.` style for ordered lists.
7. Preserve recovered content order unless the source clearly supports a different structure.

## Tables

Use Markdown tables only when the source structure is representable without major distortion.

Example:

```markdown
| Item | Detail | Note |
|:---|:---|:---|
| A | Description | None |
```

If merged cells or irregular layouts make a Markdown table misleading, rewrite as a labeled list instead.

## Callouts and Quotes

- Callouts: `> **Note:** ...`
- Warnings: `> **Warning:** ...`
- Quotes: standard blockquote lines beginning with `>`

## Preservation Rules

- Keep URLs exactly as written.
- Keep image references exactly as written.
- Keep numbers, dates, formulas, and identifiers exactly as written unless the extractor visibly split them.
- Keep recovered source wording conservative when multiple imperfect extracts disagree.
- Do not inject commentary, summaries, or editorial notes.
