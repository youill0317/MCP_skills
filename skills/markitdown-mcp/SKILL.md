---
name: markitdown-mcp
description: Guide for choosing, setting up, and parameterizing MarkItDown or `markitdown-mcp` when the main problem is MCP-side document or URL to Markdown conversion setup rather than task execution, cleanup, or source-aligned repair.
---

# Mission

Choose and parameterize MarkItDown MCP workflows accurately for document or URL to Markdown conversion, while keeping setup questions separate from conversion execution, normalization, and source-aligned repair.

## Use When

- The main problem is converting files, web pages, or media-linked content into Markdown.
- The user needs help choosing or parameterizing `markitdown-mcp`.
- The task is blocked on transport choice, input URI shape, or how to hand off conversion output for cleanup.
- The main blocker is MCP setup or tool discovery rather than the conversion task instructions themselves.

## Scope

1. Cover provider choice, connection shape, input patterns, and output-handling guidance for `MarkItDown MCP`.
2. Focus on operating MarkItDown MCP, not on performing the task-facing conversion workflow itself, repairing damaged extracted text, or polishing final deliverables.
3. Treat converted Markdown as untrusted output that may need review, normalization, or remediation.
4. Prefer the smallest valid input target, such as one file path or one URL, before batch-style conversion.
5. Keep exact MCP tool names release-aware by checking the connected tool list before assuming a specific name.
6. Route task-facing initial conversion work to `markdown-conversion`, damaged source reconciliation to `pdf-markdown-remediation`, and formatting cleanup to `markdown-format-normalization`.

## Core Workflow

1. Identify whether the task is conversion, remediation, or normalization before choosing a tool.
2. Use MarkItDown MCP guidance when the source itself is accessible and the blocker is how to call the conversion tool correctly.
3. Prefer one concrete URI or file path per call unless the connected server explicitly supports batch inputs.
4. Confirm the accepted URI or file input pattern before calling the tool.
5. Check the connected MCP tool list and parameter schema before relying on an exact tool name such as `convert_to_markdown`.
6. Hand off actual first-pass conversion execution to `markdown-conversion` once tool choice and input shape are clear.
7. Review the converted output for truncation, formatting loss, and unsupported elements before further processing.
8. Hand off noisy or structurally damaged output to `pdf-markdown-remediation` only when recovery is needed.
9. Hand off already-readable Markdown to `markdown-format-normalization` when the task is cleanup rather than recovery.

## Output Standard

Return guidance that includes:

1. Whether MarkItDown MCP is the right MCP tool, or whether the issue should go to `markdown-conversion`, remediation, or normalization instead.
2. The recommended transport or connection pattern for the current environment.
3. The expected input shape, such as local file path, URL, or other supported URI.
4. Important parameter or schema checks to make against the connected MCP release.
5. Post-conversion handling guidance, including when to stop, route to `markdown-conversion`, normalize, or remediate.
6. A reminder that converted output should be reviewed rather than trusted blindly.

## Integration

1. Use before `markdown-conversion` when the user still needs MCP-side tool selection, setup, or input-shape guidance.
2. Use before `pdf-markdown-remediation` when the user still has an accessible original file or URL that should be converted first.
3. Use before `markdown-format-normalization` when the task is blocked on getting initial Markdown from the source.
4. Do not replace `search-mcp`; MarkItDown is for conversion workflows, not external search provider selection.
5. Hand off conversion findings and boundaries rather than treating this skill as cleanup or authoring work.

## Resource Loading

- Load `references/tool-selection.md` when deciding whether MarkItDown, remediation, or normalization is the right next step.
- Load `references/setup-and-examples.md` when connection setup, accepted input patterns, or call examples are needed.
