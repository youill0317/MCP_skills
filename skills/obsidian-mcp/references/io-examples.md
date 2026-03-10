# Representative I/O Patterns

Load this reference when the user needs concrete example calls or output shapes.

## Discovery Then Read

1. Find candidates with `search_markdown`.
2. Inspect structure with `read_markdown_toc`.
3. Read one section with `read_markdown_section`.
4. Escalate to `read_markdown_full` only if required.

## Example Sequence

### Step 1

```json
{
  "tool": "search_markdown",
  "args": {
    "query": "semantic scholar",
    "directory": ".",
    "maxResults": 5
  }
}
```

### Step 2

```json
{
  "tool": "read_markdown_toc",
  "args": {
    "path": "research/semantic-scholar.md",
    "maxLevel": 2
  }
}
```

### Step 3

```json
{
  "tool": "read_markdown_section",
  "args": {
    "path": "research/semantic-scholar.md",
    "header": "Findings",
    "includeSubsections": true
  }
}
```

## Output Expectations

- Search returns grouped candidate results and structured match metadata.
- Read tools return text blocks with path and line cues when available.
- Link tools return grouped link or backlink records.
