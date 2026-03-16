# Verification Checklist

Load this reference before finalizing the reorganized Markdown file.

## Completeness Checks

1. The output starts with YAML frontmatter.
2. The document body is present from beginning to end.
3. No section was summarized, omitted, or replaced with placeholder text.
4. URLs, image syntax, formulas, code, Mermaid, and footnote markers were preserved when present.
5. No system tags such as `<smtcmp_block>` remain.
6. Frontmatter contains `tags`, `previous_lecture`, `next_lecture`, `related_notes`, and `updated`.
7. `tags` and `related_notes` are YAML lists, while `previous_lecture` and `next_lecture` are strings.
8. `updated` is the current run date in `YYYY-MM-DD` format.

## Structure Checks

1. The new order improves logical flow without changing the meaning.
2. Heading depth matches the full-document hierarchy.
3. Paragraphs, lists, tables, code blocks, and Mermaid blocks are organized coherently.
4. Related content that was scattered in the source is grouped without losing any details.
5. Blockquotes appear only for quotations or external-source material.

## Fidelity Checks

1. Meaning was preserved during repair, paragraph splitting, and reordering.
2. Ambiguous OCR or extraction damage was not over-corrected into new facts.
3. The reorganized Markdown remains grounded in the source rather than editorial preference.
4. No separate body section was created just to hold related-note metadata.

## Failure Handling

If a restructuring choice is uncertain:

- keep the more literal content
- prefer a simpler structure over an elegant but speculative one
- avoid introducing missing content or unsupported metadata
