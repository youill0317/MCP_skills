---
name: markdown-format-normalization
description: Preserve the original Markdown structure while cleaning up Markdown syntax and formatting. Use when lecture notes, slides, handouts, or other source-faithful Markdown should keep the original order and section shape while headings, bullets, spacing, tables, code fences, callouts, or existing frontmatter need light cleanup.
---

# Mission

Clean up Markdown formatting while preserving the original document order, section boundaries, and overall shape.

## Use When

- The input is already Markdown but is inconsistently formatted or hard to read.
- The original section order and document flow should remain recognizable.
- Headings, bullets, spacing, tables, callouts, code fences, or existing frontmatter need normalization.
- The user wants formatting cleanup, not structural reorganization or summarization.

## Scope

1. Normalize Markdown syntax and spacing without changing the document order.
2. Preserve meaning, ordering, section boundaries, links, images, and explicit source content.
3. Repair malformed headings, lists, tables, callouts, and code fences when the intended structure is already present.
4. Normalize existing YAML frontmatter and tags when present.
5. Do not add new frontmatter when none exists.
6. Avoid inventing missing source text or converting the document into a different note structure.

## Core Workflow

1. Inspect the Markdown for syntax errors, spacing problems, and broken formatting while keeping the original structure in view.
2. Remove system tags and obvious non-content formatting debris when present.
3. Normalize existing frontmatter, heading markers, paragraph spacing, list markers, table layout, code fences, and callout formatting.
4. Preserve inline semantics such as links, images, code, math, and footnotes.
5. Apply the smallest set of changes that makes the document readable without reordering sections.
6. Run a final pass for formatting consistency and meaning preservation.

## Output Standard

Every output must:

1. Remain valid Markdown.
2. Preserve original content, order, and section hierarchy unless a local formatting repair requires minimal reflow.
3. Keep links, image references, and code fences intact.
4. Keep the original note shape recognizable even after cleanup.
5. Use consistent heading and list syntax throughout.
6. Avoid commentary about the edits unless the user explicitly asks for notes.

## Integration

1. Use when the original Markdown structure should be preserved and only formatting should change.
2. Use after `markdown-structuring` only when a canonicalized note still needs light syntax cleanup.
3. Use standalone for lecture notes, slide conversions, handouts, or imported Markdown whose flow should stay intact.
4. Do not use this skill to reorganize sections, add canonical note structure, or create new frontmatter; that belongs to `markdown-structuring`.

## Resource Loading

Pass only the needed `reference_paths` to `run_skill`; these files do not load automatically.

- Load `references/normalization-rules.md` for general cleanup and preservation rules.
- Load `references/heading-list-table-rules.md` when structural blocks are inconsistent.
- Load `references/frontmatter-and-tags.md` when existing YAML frontmatter or tags need cleanup.
- Load `references/output-examples.md` when a paste-ready shape or style example is needed.
- Load `references/verification-checklist.md` for final consistency checks.
