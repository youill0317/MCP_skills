# Normalization Rules

Load this reference when adjusting Markdown structure aggressively without changing the original text.

## Core Principle

Preserve the original text exactly, then express the existing structure as clearly as possible with Markdown.

## Priority Order

1. Preserve original wording, tone, sentence order, and meaning.
2. Preserve `---` page boundaries and page order.
3. Express any clearly available structure with Markdown instead of leaving it as flat plain text.
4. Use the full document context to judge relative structure.
5. Apply the structural result only inside the current page.
6. Repair broken syntax only when valid Markdown or readable meaning would otherwise fail.

## Allowed Changes

- adjust heading depth when the text's relative level is clear from the full document context
- promote an existing title-like line into a heading when its function is clear
- add blank lines between paragraphs and block elements
- convert clear parallel statements into unordered or ordered lists inside a page
- convert clear parent-child blocks into indented list structure inside a page
- normalize list markers and indentation inside a page
- convert recoverable key-value or row-column text into a Markdown table or, if safer, a Markdown list
- repair malformed table separators or table layout when the table is recoverable
- repair malformed Mermaid syntax when the diagram intent is already clear
- standardize broken code fence boundaries
- convert clear mathematical expressions into LaTeX math syntax using `$...$` for inline math and `$$...$$` for display math
- repair broken math delimiters or obvious notation damage only when needed to preserve the intended formula
- keep the first occurrence of a repeated document-identifying header or footer and remove later repeated occurrences
- fix an obvious typo only when it breaks Markdown rendering or makes the intended meaning unreadable
- normalize YAML frontmatter shape and tag list formatting

## Disallowed Changes

- summarizing, shortening, or paraphrasing content
- translating text
- rewriting claims for style alone
- changing tone or wording for readability alone
- splitting one sentence into multiple sentences
- merging multiple sentences into one sentence
- reordering sentences, paragraphs, or pages
- removing URLs or images
- merging two pages into one section
- continuing a heading or list across a `---` page boundary
- inventing new heading titles, tags, or sections unsupported by the source
- treating general notes or emphasis lines as blockquotes
- changing the mathematical meaning while converting notation to LaTeX

## Minimal-Change Rule

Do not minimize structure. Minimize text edits. If Markdown can safely express the structure already present in the source, apply that structure instead of leaving the text flat. When formulas are present, express them with LaTeX math syntax instead of leaving them as inconsistent plain text. Text edits are allowed only when a table, Mermaid block, code fence, math expression, or obvious typo must be minimally repaired to restore valid rendering or interpretation.
