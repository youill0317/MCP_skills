# Structure Analysis

Load this reference when repaired Markdown or extraction views have ambiguous document structure.

## Structural Units to Detect

- document title
- section headings
- body paragraphs
- ordered and unordered lists
- tables
- code blocks
- quotes
- callouts such as Note, Warning, Tip, or Caution
- math expressions
- image references
- footnotes or endnotes

## Heading Heuristics

Treat a line as a heading only when it behaves like a section boundary, not merely emphasized text.

Signals:

- short standalone phrase
- title-style capitalization or numbering
- followed by a new paragraph or subsection
- repeated structural pattern across the document
- confirmed by the source or repeated extraction evidence when available

## List Heuristics

Treat content as a list when there is a repeated marker or enumerated sequence:

- bullets like `-`, `*`, or symbol variants
- numeric items like `1.`, `2.`, `3.`
- short parallel clauses stacked line by line

If markers were lost, infer a list only when parallel structure is strong.
Use the source to break ties when paragraph-vs-list classification is ambiguous.

## Table Heuristics

Treat content as a table when rows show repeated column alignment, label-value grids, or header-like rows followed by parallel data entries.

If Markdown table rendering would lose meaning:

- repeat merged-cell labels in affected rows, or
- rewrite the structure as a list instead of forcing a broken table

If the source clearly shows a table but current Markdown flattened it, prioritize recovering row and column relationships over pretty formatting.

## Special Blocks

- Callouts: render as blockquotes with a bold label
- Code: use fenced code blocks with a language tag when known
- Math: use inline `$...$` or block `$$...$$`
- Footnotes: keep inline references and emit definitions at the end
