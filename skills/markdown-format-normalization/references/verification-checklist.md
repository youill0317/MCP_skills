# Verification Checklist

Load this reference before finalizing normalized Markdown.

## Structural Checks

1. Markdown is syntactically coherent.
2. Heading depth matches the text's relative level in the full document context.
3. Lines that clearly function as titles, labels, or section markers were not left as unnecessary plain text.
4. Lists render as intended and do not continue across `---`.
5. Table-like text was rendered as a stable table or intentionally rewritten as a list.
6. Mermaid blocks and code fences are valid if they were repaired.
7. Math expressions use LaTeX delimiters consistently: `$...$` for inline math and `$$...$$` for display math.
8. Blockquotes appear only for quotations, external-source material, standalone figure or table captions, or clearly excerpt-like abstract blocks.

## Page Checks

1. The number of `---` separators matches the input.
2. Page order is unchanged.
3. No heading, paragraph, or list was merged across a page boundary.
4. The first document-identifying header or footer was preserved when present.
5. Later repeated headers, footers, and page numbers were removed only when repetition was clear.

## Preservation Checks

1. Original wording, tone, sentence order, and paragraph order were preserved unless a table, Mermaid block, code fence, math expression, or obvious typo required minimal repair.
2. Links and images were not changed.
3. No real content was dropped during cleanup.
4. Frontmatter contains `tags`, `previous_lecture`, `next_lecture`, `related_notes`, and `updated`.
5. `tags` and `related_notes` are YAML lists, while `previous_lecture` and `next_lecture` are strings.
6. `updated` is the current run date in `YYYY-MM-DD` format.

## Final Rule

If a normalization choice would require guessing the intended content, do not guess. Preserve the source text. If a normalization choice can safely expose structure with Markdown without changing the text, do it instead of leaving the text flat.
