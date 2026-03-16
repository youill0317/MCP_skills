# Normalization Rules

Load this reference when adjusting Markdown structure without changing the original content more than necessary.

## Core Principle

Preserve content first, adjust Markdown structure second.

## Priority Order

1. Preserve original wording and meaning.
2. Preserve `---` page boundaries and page order.
3. Use the full document context to judge relative structure.
4. Apply the structural result only inside the current page.
5. Repair broken syntax only when valid Markdown or readable meaning would otherwise fail.

## Allowed Changes

- adjust heading depth when the text's relative level is clear from the full document context
- add blank lines between paragraphs and block elements
- convert clear parallel statements into unordered or ordered lists inside a page
- normalize list markers and indentation inside a page
- repair malformed table separators or table layout when the table is recoverable
- repair malformed Mermaid syntax when the diagram intent is already clear
- standardize broken code fence boundaries
- fix an obvious typo only when it breaks Markdown rendering or makes the intended meaning unreadable
- normalize YAML frontmatter shape and tag list formatting

## Disallowed Changes

- summarizing, shortening, or paraphrasing content
- translating text
- rewriting claims for style alone
- removing URLs or images
- merging two pages into one section
- continuing a heading or list across a `---` page boundary
- inventing headings, tags, or sections unsupported by the source
- treating general notes or emphasis lines as blockquotes

## Minimal-Change Rule

Prefer the smallest structural edit that makes the Markdown readable and internally consistent. Content edits are allowed only when a table, Mermaid block, code fence, or obvious typo must be minimally repaired to restore valid rendering or interpretation.
