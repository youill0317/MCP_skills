# Cleaning and Repair

Load this reference when Markdown or extracted text contains artifact noise, OCR instability, or line-wrap damage during source-aligned repair.

## Artifact Removal

Remove repeated non-body text only when it is clearly an extraction artifact or clearly absent from the truth source:

- page numbers
- running headers and footers
- watermark text
- scanner labels
- system tags such as `<smtcmp_block>` or `<xml>`

Do not remove text that may be part of the document body, even if it looks repetitive, unless repetition is obvious across pages.

## Line and Paragraph Repair

1. Merge hard-wrapped lines into normal sentences when punctuation and syntax indicate continuation.
2. Preserve paragraph boundaries when the source clearly starts a new thought, list item, caption, or section.
3. Restore line-end hyphenation only when it is clearly an artificial split:
   - `pro- cessing` -> `processing`
   - `infor- mation` -> `information`
4. Keep literal hyphenated compounds when they are real words:
   - `state-of-the-art`
   - `long-term`

## OCR Damage Handling

1. Correct obvious OCR spacing and split-token errors only when the intended token is unambiguous from the source or a strong secondary extract.
2. Do not guess missing words, citations, or symbols.
3. Preserve uncertain content rather than replacing it with invented text.

## Recovery Rules

1. Restore omitted text only when the source or a high-confidence auxiliary extract confirms it.
2. If current Markdown and auxiliary extracts disagree, prefer the original source when available.
3. If no trustworthy source view resolves the conflict, preserve the literal evidence and avoid synthesis.

## Repair Priorities

Apply repairs in this order:

1. remove repeated artifacts
2. restore broken words
3. merge broken sentences
4. restore paragraph boundaries
5. recover omitted source content
6. classify structure before formatting
