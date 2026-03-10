# Read And Link Tools

Load this reference when deciding between read, link, and backlink operations.

## Covered Tools

- `read_markdown_toc`
- `read_markdown_section`
- `read_markdown_full`
- `get_linked_files`
- `get_backlinks`

## `read_markdown_toc`

```json
{
  "path": "notes/mcp.md",
  "maxLevel": 3
}
```

Use when the path is known and you need only the heading outline.

## `read_markdown_section`

```json
{
  "path": "notes/mcp.md",
  "header": "Tool Selection Guide",
  "includeSubsections": true
}
```

Use when the path and target section are known.

## `read_markdown_full`

Single file:

```json
{
  "path": "notes/mcp.md"
}
```

Multiple files:

```json
{
  "paths": [
    "notes/mcp.md",
    "notes/agents.md"
  ]
}
```

Constraints:

- Provide `path` or `paths`, not both.
- `paths` is capped by the server max.

## `get_linked_files`

```json
{
  "path": "notes/mcp.md",
  "type": "markdown",
  "checkExists": true
}
```

Allowed `type` values:

- `all`
- `markdown`
- `image`
- `external`
- `embed`

## `get_backlinks`

```json
{
  "path": "notes/mcp.md",
  "directory": ".",
  "maxResults": 20,
  "respectGitignore": true
}
```

Use when you have a target note and need inbound references.
