# Tool Families

Use this reference when the main question is which Canva MCP tool family should handle the task.

## Choose Discovery First When IDs Are Unknown

- Use `search-designs` when the user knows a title, keyword, or document content clue.
- Use `search-folders` when the user is looking for a folder rather than a design.
- Use `list-folder-items` when the parent folder is already known and the user needs to browse inside it.
- Use `resolve-shortlink` before all other design tools when the user starts from a `canva.link` short URL.

## Choose Design Reads When the Goal Is Inspection

- Use `get-design` for title, owner, edit/view URLs, thumbnail, timestamps, and page count.
- Use `get-design-content` for text extraction without making changes.
- Use `get-design-pages` for page indexes and thumbnails in paged designs.
- Use `get-presenter-notes` only for presentation speaker notes.
- Use `get-export-formats` to confirm valid export targets before `export-design`.
- For presentation verification, use these read tools to build an inspection-ready deck package before handing off to `presentation-design`.

## Choose Generation or Import When the User Wants a New Design

- Use `generate-design` when Canva should create a new design from a brief.
- Use `create-design-from-candidate` when a generation result must become a real editable design with a `design_id`.
- Use `import-design-from-url` when the source is an externally hosted file, not an existing Canva design.
- Use `upload-asset-from-url` when the user wants their own images or files inserted into a generated design.

## Choose Collaboration and Organization Separately

- Use `comment-on-design`, `list-comments`, `reply-to-comment`, and `list-replies` for review workflows.
- Use `create-folder` and `move-item-to-folder` for organization.
- Avoid generation or export tools when the real request is folder management or comment handling.

## Choose Structural Operations Carefully

- Use `merge-designs` for page insertion, cross-design combining, page reorder, or page deletion.
- Treat `merge-designs` as structural surgery, not content editing.
- Do not assume freeform editing tools are available unless they appear in the connected tool list.

## Identifier Checklist

- `design_id`: required by most design-scoped tools.
- `folder_id`: required by folder listing or moves.
- `job_id` plus `candidate_id`: required to turn a generated candidate into a real design.
- `comment_id`: required for replies or reply listing.
- `brand_kit_id`: optional, but only after the user explicitly chooses on-brand generation.
