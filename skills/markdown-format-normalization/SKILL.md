---
name: markdown-format-normalization
description: Normalize messy existing Markdown into a consistent, readable structure without changing meaning. Use when headings, lists, tables, frontmatter, callouts, spacing, or general Markdown formatting are inconsistent or damaged.
---

# Mission

Normalize existing Markdown into a clean, consistent, readable document without rewriting its meaning.

## Use When

- The input is already Markdown but is inconsistently formatted or hard to read.
- Heading depth, spacing, lists, tables, callouts, or frontmatter need normalization.
- A document converted from PDF is structurally complete but still stylistically inconsistent.
- The user wants formatting cleanup, not source reconstruction or summarization.

## Scope

1. Normalize Markdown structure and spacing.
2. Preserve meaning, ordering, links, images, and explicit source content.
3. Repair malformed headings, lists, tables, and callouts when the intended structure is clear.
4. Normalize YAML frontmatter and tags when requested or when the document clearly expects them.
5. Avoid inventing missing source text or converting the document into a different style guide than requested.

## Core Workflow

1. Inspect the Markdown for structural inconsistencies and broken formatting.
2. Normalize frontmatter, heading depth, paragraph spacing, list markers, table layout, and block formatting.
3. Preserve inline semantics such as links, images, code, math, and footnotes.
4. Apply the smallest set of changes that makes the document consistent and readable.
5. Run a final pass for formatting consistency and meaning preservation.

## Output Standard

Every output must:

1. Remain valid Markdown.
2. Preserve original content and order unless a local formatting repair requires reflow.
3. Keep links, image references, and code fences intact.
4. Use consistent heading depth and list styles throughout.
5. Avoid commentary about the edits unless the user explicitly asks for notes.

## Integration

1. Use after `markdown-conversion` when a converted document is structurally readable but needs formatting cleanup.
2. Use after `pdf-markdown-remediation` when a source-aligned repair pass needs a final normalization pass.
3. Use standalone for messy notes, imported Markdown, or mixed-format documents.
4. Do not use this skill to reconstruct raw PDF text or recover source truth; that belongs to `pdf-markdown-remediation`.

## Resource Loading

Pass only the needed `reference_paths` to `run_skill`; these files do not load automatically.

- Load `references/normalization-rules.md` for general cleanup and preservation rules.
- Load `references/heading-list-table-rules.md` when structural blocks are inconsistent.
- Load `references/frontmatter-and-tags.md` when YAML frontmatter or tag cleanup is needed.
- Load `references/output-examples.md` when a paste-ready shape or style example is needed.
- Load `references/verification-checklist.md` for final consistency checks.
