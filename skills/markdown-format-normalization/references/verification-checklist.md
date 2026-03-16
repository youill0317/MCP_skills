# Verification Checklist

Load this reference before finalizing normalized Markdown.

## Structural Checks

1. Markdown is syntactically coherent.
2. Heading depth matches the text's relative level in the full document context.
3. Lists render as intended and do not continue across `---`.
4. Tables are stable or were intentionally rewritten as lists.
5. Mermaid blocks and code fences are valid if they were repaired.
6. Blockquotes appear only for quotations or external-source material.

## Page Checks

1. The number of `---` separators matches the input.
2. Page order is unchanged.
3. No heading, paragraph, or list was merged across a page boundary.

## Preservation Checks

1. Original wording was preserved unless a table, Mermaid block, code fence, or obvious typo required minimal repair.
2. Links and images were not changed.
3. No content was dropped during cleanup.
4. Frontmatter contains `tags`, `previous_lecture`, `next_lecture`, `related_notes`, and `updated`.
5. `tags` and `related_notes` are YAML lists, while `previous_lecture` and `next_lecture` are strings.
6. `updated` is the current run date in `YYYY-MM-DD` format.

## Final Rule

If a normalization choice would require guessing the intended content, do not guess. Preserve the source text and apply only safe structure changes or strictly necessary syntax repairs.
