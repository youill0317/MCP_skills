# Contract: `SKILL.md` Format

## Purpose

Define the exact file contract enforced by the current loader and validation code.

## Required Location

- Every valid skill directory contains a file named `SKILL.md` at the skill root.

## Required Envelope

```markdown
---
name: skill-id
description: One-line description.
---

# Body heading

Body content
```

## Frontmatter Rules

- The first line must be exactly `---`.
- A closing line exactly equal to `---` must appear later in the file.
- Frontmatter is interpreted line by line.
- Blank frontmatter lines are ignored.
- Frontmatter lines beginning with `#` are ignored.
- Only lines matching `key: value` are captured.
- Values wrapped in matching single quotes or double quotes are unwrapped.
- `name` is required.
- `description` is required.
- `category` is forbidden.

## Name Rules

- `name` must match the regex `^[a-z0-9-]{1,64}$`.
- `name` must equal the containing folder id exactly.

## Body Rules

- Body text begins after the closing frontmatter delimiter.
- The loader returns `body` as `join("\n")` of the remaining lines, followed by `.trim()`.
- The body is not otherwise parsed or validated by the repository code.
- The validator scans body text for raw `references/...`, `scripts/...`, and `assets/...` paths.
- The validator also scans Markdown links whose targets start with those prefixes.
- Every referenced target must resolve inside the current skill root and must exist on disk.

## Optional Subdirectories

- `references/`
- `scripts/`
- `assets/`

If present, files under these directories are listed recursively and returned as sorted POSIX-style relative paths.

## Invalid Examples

- Missing opening `---`
- Missing closing `---`
- Missing `name`
- Missing `description`
- Presence of `category`
- `name: Bad Name`
- Folder `folder-id/` containing `name: another-id`
