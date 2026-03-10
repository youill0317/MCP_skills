# Discovery And Navigation Tools

Load this reference when choosing search or directory-navigation tools in `mcp_obsidian`.

## Covered Tools

- `search_markdown`
- `list_directory`
- `get_directory_tree`

## `search_markdown`

Use when the path is unknown and the task starts from topic, tag, body text, or filename pattern.

### Input Shape

```json
{
  "query": "model context protocol",
  "directory": ".",
  "maxResults": 10,
  "respectGitignore": true,
  "useRegex": false,
  "fuzzy": false
}
```

Optional filters:

- `tag`
- `filenamePattern`
- `frontmatterFilter`
- `modifiedAfter`
- `modifiedBefore`

Constraints:

- `useRegex` and `fuzzy` cannot both be true.
- `modifiedAfter` and `modifiedBefore` must be ISO-like date strings.

## `list_directory`

Use for one directory level.

```json
{
  "path": ".",
  "markdownOnly": true,
  "showHidden": false,
  "respectGitignore": true
}
```

## `get_directory_tree`

Use for recursive structure overviews.

```json
{
  "path": ".",
  "depth": 3,
  "markdownOnly": true,
  "showHidden": false,
  "respectGitignore": true
}
```

Constraints:

- `depth` must be an integer and must respect the server max depth.
