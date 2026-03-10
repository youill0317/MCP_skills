---
name: Presentation Design
description: Design visual presentation decks and slide-by-slide narratives in a tool-neutral way. Use when users ask for PPT or slide deck planning, pitch deck structure, lecture presentation flow, visual hierarchy, chart planning, or speaker notes. Focus on what to present and how to visualize it, not software-specific instructions.
category: task
---

# Mission

Produce audience-fit presentation specs with clear narrative flow, slide-level messages, and actionable visualization guidance.

## Category

`task`

## Use When

- The user wants a deck plan, slide structure, or presentation storyline.
- The main need is message design and visualization guidance rather than tool-specific operations.
- The output should be slide-by-slide and ready to map into PPT or another slide tool later.

## Scope

1. Design presentation structure and visual storytelling, not software operations.
2. Support business, academic, and education presentation contexts.
3. Write in the user's requested language; default to Korean if unspecified.
4. Keep claims and numbers traceable to provided inputs; flag missing support explicitly.
5. Return outputs that can be mapped to future MCP tools without changing core fields.

## Core Workflow

1. Capture objective, audience, duration, decision context, and constraints.
2. Extract one core takeaway sentence for the whole deck.
3. Select one primary deck type and target slide count.
4. If the request is hybrid, choose the dominant type and note secondary conventions explicitly.
5. Build narrative arc and section transitions.
6. Draft slide-by-slide specs: title, single key message, content blocks, visuals, and speaker notes.
7. Apply visual language and data visualization rules.
8. Run quality gate checks and list remaining gaps.
9. Return both human-readable output and MCP-ready JSON.

## Output Standard

Always return:

1. `Metadata`: deck goal, audience, language, deck type, duration, assumptions.
2. `Narrative Arc`: opening tension, core insight, supporting proof, close action.
3. `Slide-by-Slide Spec` with one entry per slide: slide number and role, slide title, one key message, content blocks, visual blueprint, data requirements, and speaker notes.
4. `Visual System`: typography hierarchy, color roles, spacing rhythm, image/icon rules.
5. `Data Visualization Plan`: chart choices, rationale, and integrity checks.
6. `Compliance Report`: passed checks, failed checks, and required fixes.
7. `MCP-ready JSON`: must follow `references/mcp-io-contract.md`.

Integrity tags:

- `[INPUT NEEDED: field]` for required missing input.
- `[EVIDENCE NEEDED]` for unsupported claims or numbers.
- `[ASSUMPTION: detail]` for temporary assumptions.
- `[VISUAL RISK]` for clutter, ambiguity, or misleading visual choices.

## Integration

1. If `search-mcp` output is provided, preserve evidence confidence and unresolved conflicts.
2. If `report-writing` output is provided, convert section findings into slide narrative without adding facts.
3. If `academic-writing` output is provided, condense paper sections into audience-fit slide messages.
4. Use after `document-summary` when the source material is long and first needs compression.

## Resource Loading

Pass only the needed `reference_paths` to `run_skill`; these files do not load automatically.

- Load `references/deck-types.md` when selecting structure, pacing, and slide count.
- Load `references/storyline-and-flow.md` when shaping the narrative arc.
- Load `references/slide-blueprints.md` when drafting slide-by-slide fields.
- Load `references/visual-language-rules.md` when defining the visual system.
- Load `references/data-visualization-rules.md` when chart choice or data integrity is central.
- Load `references/quality-gate.md` before finalizing.
- Load `references/mcp-io-contract.md` when MCP-ready JSON is required.
