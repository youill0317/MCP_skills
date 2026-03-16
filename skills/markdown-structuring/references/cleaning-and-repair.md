# Cleaning and Repair

Load this reference when Markdown or extracted text contains artifact noise, OCR instability, line-wrap damage, or broken syntax before logical restructuring.

## Artifact Removal

Remove repeated non-body text only when it is clearly an extraction artifact or clearly absent from the truth source:

- page numbers
- running headers and footers
- watermark text
- scanner labels
- system tags such as `<smtcmp_block>` or `<xml>`

Do not remove text that may belong to the real document body.

## Line and Paragraph Repair

1. Merge hard-wrapped lines into normal sentences when punctuation and syntax indicate continuation.
2. Restore line-end hyphenation only when it is clearly an artificial split.
3. Correct obvious OCR spacing and split-token errors only when the intended token is unambiguous.
4. Split a damaged paragraph into smaller logical units when that is required for correct restructuring.
5. Merge related fragments across former page boundaries when they clearly belong to one argument, section, or list.

## Markdown Repair

1. Repair malformed tables when the intended table structure is clear.
2. Repair broken code fences and malformed Mermaid blocks when the intended block is clear.
3. Rewrite an unrecoverable table as a list rather than preserving a misleading layout.
4. Keep literal uncertainty when the source does not support a confident repair.

## Recovery Rules

1. Restore omitted text only when the source or a high-confidence auxiliary extract confirms it.
2. If multiple extracts disagree, prefer the best available source of truth.
3. If no trustworthy source resolves the conflict, preserve the literal evidence and avoid synthesis.

## Repair Priorities

Apply repairs in this order:

1. remove repeated artifacts
2. restore broken words
3. merge or split damaged sentences
4. restore paragraph boundaries
5. repair broken Markdown blocks
6. classify logical structure
7. reorganize content into the final Markdown file
