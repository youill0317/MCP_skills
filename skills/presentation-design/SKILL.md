---
name: presentation-design
description: Design visual presentation decks and slide-by-slide narratives in a tool-neutral way. Use when users ask for PPT or slide deck planning, pitch deck structure, lecture presentation flow, visual hierarchy, chart planning, or speaker notes. Focus on what to present and how to visualize it, not software-specific instructions.
---

# Mission

Produce audience-fit presentation specs with clear narrative flow, slide-level messages, and actionable visualization guidance.

## Scope

1. Design presentation structure and visual storytelling, not software operations.
2. Support business, academic, and education presentation contexts.
3. Write in the user's requested language; default to Korean if unspecified.
4. Keep claims and numbers traceable to provided inputs; flag missing support explicitly.
5. Return outputs that can be mapped to future MCP tools without changing core fields.

## Deck Type Selection

Select one primary type and load `references/deck-types.md`:

1. Pitch Deck
2. Executive Update
3. Research Talk
4. Education Lecture
5. Product Demo
6. Proposal Deck

If the user request is hybrid, choose the dominant type and note where secondary conventions are applied.

## Core Workflow

1. Capture objective, audience, duration, decision context, and constraints.
2. Extract one core takeaway sentence for the whole deck.
3. Select deck type and target slide count.
4. Build narrative arc and section transitions.
5. Draft slide-by-slide specs: title, single key message, content blocks, visuals, and speaker notes.
6. Apply visual language and data visualization rules.
7. Run quality gate checks and list remaining gaps.
8. Return both human-readable output and MCP-ready JSON.

## Output Standard

Always return:

1. `Metadata`: deck goal, audience, language, deck type, duration, assumptions.
2. `Narrative Arc`: opening tension, core insight, supporting proof, close action.
3. `Slide-by-Slide Spec` with one entry per slide:
   - slide number and role
   - slide title
   - one key message
   - content blocks
   - visual blueprint
   - data requirements
   - speaker notes
4. `Visual System`: typography hierarchy, color roles, spacing rhythm, image/icon rules.
5. `Data Visualization Plan`: chart choices, rationale, and integrity checks.
6. `Compliance Report`: passed checks, failed checks, and required fixes.
7. `MCP-ready JSON`: must follow `references/mcp-io-contract.md`.

## Integrity Tags

Use these tags when information is incomplete or risky:

- `[INPUT NEEDED: field]` for required missing input.
- `[EVIDENCE NEEDED]` for unsupported claims or numbers.
- `[ASSUMPTION: detail]` for temporary assumptions.
- `[VISUAL RISK]` for clutter, ambiguity, or misleading visual choices.

## Integration

1. If `research-mode` output is provided, preserve evidence confidence and unresolved conflicts.
2. If `report-writer` output is provided, convert section findings into slide narrative without adding facts.
3. If `paper-writing` output is provided, condense paper sections into audience-fit slide messages.

## Resource Loading

Load references in this order:

1. `references/deck-types.md`
2. `references/storyline-and-flow.md`
3. `references/slide-blueprints.md`
4. `references/visual-language-rules.md`
5. `references/data-visualization-rules.md`
6. `references/quality-gate.md`
7. `references/mcp-io-contract.md`
