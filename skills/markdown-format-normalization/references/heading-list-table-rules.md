# Heading, List, and Table Rules

Load this reference when Markdown block structure needs page-safe normalization with aggressive structure promotion.

## Headings

1. Judge heading depth from the full document context, not from a single line alone.
2. Use `#`, `##`, `###`, and deeper levels according to whether the text functions as a major topic, middle topic, minor topic, or lower-level subdivision.
3. Apply the chosen heading only inside the current page even when the same topic continues on later pages.
4. Promote an existing line to a heading when it already functions as a title, section label, subsection label, or slide-like title in context.
5. Do not invent new heading titles; use only the source text already present.
6. Do not auto-promote the first line of a page to a heading unless its function is clear.
7. If the level is ambiguous, keep the text as a paragraph or list item instead of guessing.

## Lists

1. Use `-` for unordered lists unless the source clearly indicates an ordered sequence.
2. Use `1.`, `2.`, `3.` format for ordered lists.
3. Convert text into a list when parallel, enumerated, label-value, or repeated sibling intent is clear.
4. If several consecutive lines share the same grammatical role or formatting role, prefer a list over flat plain text.
5. Indent nested lists by four spaces only when a parent-child relationship is clear.
6. Close each list inside the current page; do not continue it across `---`.
7. Preserve checklist syntax if the source already uses task lists.

## Tables

1. Normalize header separators and column counts when the source is recoverable as a Markdown table.
2. Preserve cell text exactly unless spacing damage or a minor typo must be repaired for the table to work.
3. Convert table-like blocks to tables when rows and columns are already implied by the source.
4. If the source cannot be represented safely as a Markdown table, convert it to a list while preserving the original content.

## Math

1. Use LaTeX math syntax for formulas instead of leaving equations as inconsistent plain text.
2. Use `$...$` for inline expressions and `$$...$$` for standalone display equations.
3. Preserve the original mathematical meaning; only normalize notation and delimiters.
4. If the intended formula is ambiguous, preserve the source text rather than guessing a new equation.

## Blockquotes

1. Use `>` for direct quotations, external-source excerpts, standalone figure or table captions, or clearly excerpt-like abstract blocks from papers or source documents.
2. Use a blockquote for a figure or table caption when the caption is presented as a distinct caption block above or below an image, figure placeholder, table, or embedded object.
3. Use a blockquote for an abstract when the source presents it as a distinct abstract-like excerpt block rather than ordinary running prose.
4. Do not use blockquotes for general notes, emphasis, reminders, or speaker commentary.

## Repeated Headers and Footers

1. Keep the first occurrence of a document-identifying header or footer so the user can still recognize the source context.
2. Remove later repeated occurrences when the text is identical or differs only by page numbering or trivial decoration.
3. Keep repeated lines if they carry new information beyond the repeated template.

## Page Boundaries

1. Treat every `---` as a hard page boundary.
2. Use the full document to judge structure, but apply formatting decisions page by page.
3. Do not merge headings, paragraphs, or lists across pages even when the topic continues.
