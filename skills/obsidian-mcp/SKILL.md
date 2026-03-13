---
name: obsidian-mcp
description: Guide for the `mcp_obsidian` server and its tools. Use when users ask how to search markdown notes, read files or sections, inspect links, navigate directories, or choose parameters and examples for Obsidian markdown tools.
---

# Mission

Use `mcp_obsidian` tools with a strict discovery-first and narrow-read approach.

## Use When

- The user needs help choosing or parameterizing `mcp_obsidian` tools.
- The task involves finding notes, reading markdown sections, or inspecting backlinks.
- The main challenge is tool selection or path handling rather than content synthesis.

## Scope

1. Cover tool selection, parameter usage, path handling, and example calls for `mcp_obsidian`.
2. Cover both tools and server resources when they reduce unnecessary scanning.
3. Focus on local markdown discovery, reading, directory navigation, and link analysis.
4. Keep reads as narrow as possible.
5. Preserve path, header, and line-level evidence when available.

## Core Workflow

1. Use discovery tools when the path is unknown.
2. Use read tools only after the path is known.
3. Use link tools only when note relationships matter.
4. Use directory tools for structure, not for content retrieval.
5. Use `vault-context` when the user needs a fast vault snapshot, recent files, top tags, or base-dir awareness.
6. Use `server-info` when the user needs to confirm tool/resource availability or server capabilities before choosing a tool.
7. Keep `path` and `directory` values inside configured base directories.
8. Call out `MARKDOWN_BASE_DIR` behavior when path visibility or root selection is likely to matter.
9. Recommend the smallest tool family that answers the task.
10. Include representative argument shapes when the user needs command examples.

## Output Standard

Every response should make the next MCP call easier by returning:

1. The recommended tool family and why it fits.
2. Required or high-risk parameters such as `path`, headers, or section names.
3. Whether a resource read is better than a tool call for the current question.
4. Escalation guidance from discovery to narrower reads.
5. Path-safety reminders when user input may escape allowed roots.
6. Config reminders when `MARKDOWN_BASE_DIR`, multi-root behavior, or cwd fallback may affect results.
7. Example call shapes when the user asks for concrete usage.

Tool families:

- Discovery: `search_markdown`
- Directory structure: `list_directory`, `get_directory_tree`
- Reading: `read_markdown_toc`, `read_markdown_section`, `read_markdown_full`
- Link analysis: `get_linked_files`, `get_backlinks`
- Resources: `mcp://markdown-explorer-mcp/vault-context`, `mcp://markdown-explorer-mcp/info`

## Integration

1. Use before `document-qa` or `document-summary` when the right note or section is not known yet.
2. Hand off discovered paths and section names to downstream task skills instead of copying full note content unnecessarily.
3. Preserve narrow-read discipline even when another skill will do the synthesis later.

## Resource Loading

- Load `references/discovery-and-navigation.md` when choosing search or directory tools.
- Load `references/read-and-link-tools.md` when deciding between TOC, section, full-read, or link tools.
- Load `references/resources-and-config.md` when root selection, resources, or startup configuration matter.
- Load `references/io-examples.md` when the user needs concrete argument or output examples.
