# Verification Checklist

Load this reference before finalizing source-aligned repair.

## Completeness Checks

1. The output starts with YAML frontmatter.
2. The document body is present from beginning to end.
3. No section was summarized, omitted, or replaced with placeholder text.
4. URLs, image syntax, formulas, and footnote markers were preserved.
5. No system tags such as `<smtcmp_block>` remain.
6. Frontmatter fields beyond the empty block are limited to safe metadata supported by the source or requested convention.
7. Recovered sections are supported by the source or a trustworthy auxiliary extract.

## Fidelity Checks

1. Meaning was preserved during line repair, paragraph merging, and source reconciliation.
2. Heading depth matches the document structure.
3. Lists and tables are readable and do not distort source relationships.
4. Ambiguous OCR content was not over-corrected into new facts.
5. The repaired Markdown materially matches the best available source of truth.

## Failure Handling

If a repair is uncertain:

- keep the more literal version
- avoid introducing missing content
- prefer incomplete formatting over fabricated reconstruction
