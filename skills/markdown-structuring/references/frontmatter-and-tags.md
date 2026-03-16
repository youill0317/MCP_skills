# Frontmatter and Tags

Load this reference when creating or normalizing the standard frontmatter schema for the reorganized Markdown document.

## Required Standard Keys

Every output must include these keys in frontmatter:

```yaml
---
tags: []
previous_lecture: ""
next_lecture: ""
related_notes: []
updated: "YYYY-MM-DD"
---
```

## Field Rules

1. `tags` must always be a YAML list.
2. `previous_lecture` must always be a string and use an Obsidian wikilink like `"[[Lecture Note]]"` when known.
3. `next_lecture` must always be a string and use an Obsidian wikilink like `"[[Lecture Note]]"` when known.
4. `related_notes` must always be a YAML list of Obsidian wikilinks.
5. `updated` must always be the current run date in `YYYY-MM-DD` format.

## Preservation Rules

1. Frontmatter is mandatory.
2. Preserve safe existing metadata keys beyond the standard schema.
3. If a standard key is missing, add it with the required default value.
4. Use `[]` for missing list values and `""` for missing string link values.
5. Keep metadata compact and secondary to the main body structure.

## Legacy Key Normalization

Convert equivalent legacy keys to the standard snake_case keys, then remove the legacy keys.

- `prev`, `previous`, `previous-note`, `previous lecture` -> `previous_lecture`
- `next`, `next-note`, `next lecture` -> `next_lecture`
- `related`, `related-note`, `related_notes_section` -> `related_notes`
- `modified`, `last_modified`, `updated_at` -> `updated`

## Tag and Link Rules

1. Preserve or add tags only when they are grounded in the source text or in a strong project convention.
2. Store `previous_lecture`, `next_lecture`, and every item in `related_notes` as Obsidian wikilinks.
3. Do not create a separate body section for related notes; keep this information in frontmatter.
4. Prefer empty defaults over fabricated metadata.
