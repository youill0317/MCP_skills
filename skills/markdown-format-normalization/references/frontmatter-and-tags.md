# Frontmatter and Tags

Load this reference when normalizing or creating the standard frontmatter schema.

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

1. Keep frontmatter at the top of the file.
2. Preserve safe existing metadata keys beyond the standard schema.
3. If frontmatter is missing, create it with the standard keys.
4. If a standard key is missing, add it with the required default value.
5. Use `[]` for missing list values and `""` for missing string link values.

## Legacy Key Normalization

Convert equivalent legacy keys to the standard snake_case keys, then remove the legacy keys.

- `prev`, `previous`, `previous-note`, `previous lecture` -> `previous_lecture`
- `next`, `next-note`, `next lecture` -> `next_lecture`
- `related`, `related-note`, `related_notes_section` -> `related_notes`
- `modified`, `last_modified`, `updated_at` -> `updated`

## Tag Rules

1. Preserve existing valid tags.
2. Normalize `tags` as a YAML list.
3. Add or rename tags only when the task explicitly asks for it or a fixed project convention is already present.
4. Keep tag strings concise and preserve existing meaning.
