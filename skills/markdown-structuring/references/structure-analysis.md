# Structure Analysis

Load this reference when repaired Markdown still has ambiguous structure and must be reorganized into a better logical order.

## Structural Units to Detect

- document title
- major sections
- subsections
- body paragraphs
- ordered and unordered lists
- examples or supporting details
- tables
- code blocks
- Mermaid blocks
- quotes or external-source excerpts
- tags or related-note metadata candidates

## Heading Heuristics

1. Judge heading depth from the full document context, not from one line alone.
2. Use `#`, `##`, `###`, and deeper levels according to whether a block functions as a major topic, middle topic, minor topic, or lower-level subdivision.
3. Promote text to a heading only when it behaves like a real section boundary.
4. If several separated passages discuss the same topic, merge them into one section when that improves the logical flow without losing content.
5. If the level is ambiguous, prefer a paragraph or list item over a guessed heading.

## Paragraph and List Heuristics

1. Break long paragraphs into smaller units when the source contains distinct claims, examples, or enumerated ideas.
2. Merge adjacent fragments when they clearly belong to the same thought.
3. Convert content into a list when parallel or ordered intent is clear.
4. Use nested lists only when a parent-child relationship is clear.
5. Reorder list items only when the original sequence is visibly damaged or when a clearer logical progression is strongly supported by the source.

## Table and Block Heuristics

1. Treat content as a table when rows show repeated column alignment, label-value grids, or header-like rows followed by parallel entries.
2. If Markdown table rendering would lose meaning, rewrite the structure as a list instead.
3. Keep code and Mermaid blocks fenced and separate from surrounding prose.

## Quotes and Callouts

1. Use `>` only for direct quotations, external-source excerpts, or clearly quoted source material.
2. Do not use blockquotes for general notes, emphasis, reminders, or speaker commentary.
3. Treat note-like material as paragraphs, headings, or list items unless the source explicitly signals a callout that should remain distinct.

## Reordering Principle

1. Use page boundaries and local ordering as clues, not as final constraints.
2. Group related material together even when the source scattered it across pages or sections.
3. Prefer a structure that reads as one coherent Markdown document rather than a page-by-page reconstruction.
