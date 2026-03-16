# Heading, List, and Table Rules

Load this reference when Markdown block structure needs page-safe normalization.

## Headings

1. Judge heading depth from the full document context, not from a single line alone.
2. Use `#`, `##`, `###`, and deeper levels according to whether the text functions as a major topic, middle topic, minor topic, or lower-level subdivision.
3. Apply the chosen heading only inside the current page even when the same topic continues on later pages.
4. Do not auto-promote the first line of a page to a heading unless its function is clear.
5. If the level is ambiguous, keep the text as a paragraph or list item instead of guessing.

## Lists

1. Use `-` for unordered lists unless the source clearly indicates an ordered sequence.
2. Use `1.`, `2.`, `3.` format for ordered lists.
3. Convert text into a list only when parallel or enumerated intent is clear.
4. Indent nested lists by four spaces only when a parent-child relationship is clear.
5. Close each list inside the current page; do not continue it across `---`.
6. Preserve checklist syntax if the source already uses task lists.

## Tables

1. Normalize header separators and column counts when the source is recoverable as a Markdown table.
2. Preserve cell text exactly unless spacing damage or a minor typo must be repaired for the table to work.
3. If the source cannot be represented safely as a Markdown table, convert it to a list while preserving the original content.

## Blockquotes

1. Use `>` only for direct quotations, external-source excerpts, or clearly quoted source material.
2. Do not use blockquotes for general notes, emphasis, reminders, or speaker commentary.

## Page Boundaries

1. Treat every `---` as a hard page boundary.
2. Use the full document to judge structure, but apply formatting decisions page by page.
3. Do not merge headings, paragraphs, or lists across pages even when the topic continues.
