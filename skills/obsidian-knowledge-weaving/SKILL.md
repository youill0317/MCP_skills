---
name: Obsidian Knowledge Weaving
description: Build and maintain a connected Obsidian knowledge graph using Markdown links, backlinks, hub notes, and progressive note refinement. Use when users want agentic workflows for discovering related notes, adding structured links, accumulating knowledge over time, and retrieving context efficiently.
category: task
---

# Mission

Turn isolated notes into a reusable knowledge graph that supports fast rediscovery and iterative learning.

## Category

`task`

## Use When

- The user wants to connect notes with wiki links (`[[...]]`), backlinks, tags, or MOC/hub notes.
- The user asks for a repeatable method to accumulate knowledge in Obsidian over multiple sessions.
- The task requires finding related prior notes before writing new content.
- The user wants retrieval-ready note structures for later LLM use.

## Scope

1. Design and apply note-linking patterns that improve discoverability.
2. Update notes incrementally instead of rewriting entire vault sections.
3. Preserve provenance and confidence when adding synthesized knowledge.
4. Balance local context (single note) with graph context (neighbors, hubs, clusters).

## Core Workflow

1. Identify the target concept, question, or project note.
2. Discover nearby graph context first (search + candidate related notes).
3. Read only relevant sections from high-signal notes.
4. Extract reusable units: definition, claim, evidence, decision, TODO.
5. Insert links bidirectionally where meaningful:
   - from new note to existing canonical notes,
   - and from hub/index notes back to the new note.
6. Update one hub/MOC note to anchor navigation.
7. Record retrieval cues (aliases, tags, short summary line, key entities).
8. Add a "next-link" list of unresolved or adjacent concepts.

## Output Standard

For each update cycle, produce:

1. **Created/updated notes**: exact paths.
2. **New links added**: source note -> target note.
3. **Backlink reinforcement**: where reverse discoverability was improved.
4. **Knowledge delta**: what was newly learned vs. already known.
5. **Next retrieval queries**: concrete keywords, tags, or note titles to search next.

## Linking Rules

1. Prefer canonical concept notes over duplicate definitions.
2. Keep one concept per note when possible; split oversized notes.
3. Use stable note titles and add aliases instead of renaming frequently.
4. Prefer explicit semantic anchors (e.g., `[[Spaced Repetition]]`) over vague links.
5. Add section-level structure (headings/checklists) so future reads can be narrow.

## Integration

1. Use with `obsidian-mcp` to discover/read/link notes via tools.
2. Hand off extracted evidence to `document-qa`, `report-writing`, or `planning` when synthesis is needed.
3. Re-run this skill after each major writing or research task to keep the graph updated.

## Resource Loading

Pass only the needed `reference_paths` to `run_skill`.

- Load `references/obsidian-linking-playbook.md` for note architecture, backlink strategy, and MOC patterns.
- Load `references/agentic-knowledge-loop.md` for the recurring capture-refine-retrieve loop and session checklist.
