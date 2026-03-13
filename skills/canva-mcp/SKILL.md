---
name: canva-mcp
description: Guide for the official Canva MCP connector and its tools. Use when users ask how to search Canva designs or folders, resolve Canva links, generate or import designs, choose brand kits or assets, export content, manage comments, perform page-level Canva operations, or hand off finished Canva work as a web link plus a short local Markdown design report, especially when the main blocker is tool selection or parameterization rather than writing the content itself.
---

# Mission

Choose and parameterize Canva MCP workflows accurately, while keeping Canva tool-usage guidance separate from the underlying writing, slide-planning, or design-content task.

## Use When

- The user needs help choosing or parameterizing Canva MCP tools.
- The task involves Canva design IDs, shortlinks, design URLs, folder IDs, comments, export settings, or page operations.
- The main blocker is tool selection, identifier handling, or request shape rather than drafting the design content itself.
- The user wants to know whether a Canva task should use generation, import, metadata reads, comments, folder operations, export, or page-level structural edits.

## Scope

1. Cover current Canva MCP tool families for design discovery, generation, import, metadata reads, export, comments, folder operations, structural page operations, and final delivery handoff.
2. Focus on operating Canva MCP, not on producing the actual report, memo, pitch narrative, or design copy from scratch.
3. Treat exact tool inventory as connector-release dependent and check the connected tool list before assuming template search or freeform editing tools exist.
4. Prefer the smallest valid identifier flow, such as resolving one shortlink, searching one design, or inspecting one completed design, before broader operations.
5. Keep `design_id`, `folder_id`, `comment_id`, `candidate_id`, `job_id`, and asset ordering explicit.
6. Treat destructive page operations and remote imports as high-risk calls that need stricter validation than simple reads.
7. Default final delivery to a Canva web link plus a short local Markdown report, not to a downloaded export file.

## Core Workflow

1. Classify the request as discovery, generation, import, read-only retrieval, collaboration, organization, export, or page operations before choosing a tool.
2. If the user provides a `https://canva.link/...` URL, use `resolve-shortlink` first and then extract the real `design_id`.
3. If the user provides a full Canva design URL, extract the `design_id` from the URL and use `get-design` or other design-scoped tools directly.
4. Use `search-designs`, `search-folders`, and `list-folder-items` when the ID is unknown; use design-scoped tools only after the correct ID is known.
5. For generation, ask whether the user wants an on-brand result before `generate-design`; if yes, use `list-brand-kits`, let the user choose a brand kit, and then pass `brand_kit_id`.
6. For generated candidates, call `create-design-from-candidate` before export, comments, folder moves, or other design-scoped actions that require a real `design_id`.
7. When the user wants images or media inserted into generated designs, upload them first with `upload-asset-from-url` and pass `asset_ids` in the intended order.
8. Use `import-design-from-url` only with public HTTPS file URLs that resolve to downloadable files; do not treat local paths, `file://` paths, or Canva design URLs as importable file sources.
9. Use `get-design-content` for read-only text extraction, `get-design-pages` for slide/page enumeration, `get-presenter-notes` for speaker notes, and `get-export-formats` before `export-design`.
10. Use `merge-designs` only for page insertion, reordering, combining, or deletion, and always require explicit user confirmation before the call, with heightened confirmation when pages will be deleted.
11. Use comment tools for collaboration and folder tools for organization; do not overuse design generation when the real task is retrieval or export.
12. When the design is complete, prefer returning the Canva design web link from `get-design` instead of downloading an export file, unless the user explicitly asks for a downloadable artifact.
13. After completion, create a short local Markdown design report summarizing the finished Canva output.

## Output Standard

Return guidance that includes:

1. The recommended Canva tool family and why it fits the task.
2. The identifiers or URL transformations required before the next call.
3. High-risk parameters or guardrails, such as brand-kit selection, public HTTPS import URLs, candidate-to-design conversion, or deletion confirmation.
4. Whether the task is blocked on missing Canva tool availability in the connected release.
5. The default final handoff format: Canva web link first, local Markdown report second, export only on explicit request.
6. Example call shapes when the user needs concrete usage.

Current tool families in this workspace:

- Discovery and organization: `search-designs`, `search-folders`, `list-folder-items`, `create-folder`, `move-item-to-folder`
- Generation and import: `generate-design`, `create-design-from-candidate`, `list-brand-kits`, `upload-asset-from-url`, `import-design-from-url`
- Design reads: `get-design`, `get-design-content`, `get-design-pages`, `get-presenter-notes`, `get-export-formats`
- Collaboration: `list-comments`, `list-replies`, `comment-on-design`, `reply-to-comment`
- Export and structure: `export-design`, `merge-designs`, `resolve-shortlink`

## Integration

1. Use after `presentation-design`, `design-brief`, `report-writing`, or other content-planning skills when the narrative or asset brief is ready and the blocker is Canva execution.
2. Use before writing-heavy skills only when the real problem is Canva ID discovery, asset handling, or export mechanics.
3. Hand off content briefs to `generate-design` rather than turning this skill into a long-form writing skill.
4. Preserve the distinction between read-only retrieval and structural modification.
5. Treat the local Markdown design report as a lightweight delivery artifact, not as a substitute for the Canva design itself.

## Resource Loading

- Load `references/tool-families.md` when choosing among discovery, generation, import, retrieval, collaboration, export, or page-operation tools.
- Load `references/generation-and-assets.md` when the user needs brand-kit selection, asset uploads, candidate conversion, or presentation-query guidance.
- Load `references/access-export-and-ops.md` when design URLs, shortlinks, import URLs, export settings, comments, or `merge-designs` confirmations are involved.
- Load `references/delivery-and-reporting.md` when the task is finishing a Canva job and returning the result as a link plus a local Markdown report.
