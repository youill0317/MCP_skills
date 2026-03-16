---
name: presentation-design
description: Design visual presentation decks and audit existing presentation content in a tool-neutral way. Use when users ask for PPT or slide deck planning, pitch deck structure, lecture presentation flow, visual hierarchy, chart planning, speaker notes, existing deck review, Canva presentation fact checking, result/interpretation error review, source cross-verification, or slide audit. Focus on what to present, how to visualize it, and how to verify deck claims, not software-specific instructions.
---

# Mission

Produce audience-fit presentation specs and evidence-grounded deck audit reports with clear narrative flow, slide-level messages, actionable visualization guidance, and explicit verification outcomes.

## Use When

- The user wants a deck plan, slide structure, or presentation storyline.
- The user wants to review an existing deck for factual, numerical, or interpretive errors.
- The user wants to cross-check a Canva presentation against original materials.
- The main need is message design or verification guidance rather than software-specific operations.
- The output should be slide-by-slide and ready to map into PPT or another slide tool later, or it should be an audit report that can drive revisions.

## Scope

1. Design presentation structure and visual storytelling, not software operations.
2. Support business, academic, and education presentation contexts.
3. Write in the user's requested language; default to Korean if unspecified.
4. Keep claims and numbers traceable to provided inputs; flag missing support explicitly.
5. Audit existing decks for numeric errors, interpretation overreach, source mismatches, chart distortion, context/date mismatch, and missing support.
6. Prefer source-grounded verification over unsupported judgment.
7. Return outputs that can be mapped to future MCP tools without changing core fields.

## Modes

Select exactly one primary mode before proceeding.

- `design mode`: create or refine a presentation spec.
- `audit mode`: verify an existing deck against source materials and produce a revision-oriented report.

## Core Workflow

### Design Mode

1. Capture objective, audience, duration, decision context, and constraints.
2. Extract one core takeaway sentence for the whole deck.
3. Select one primary deck type and target slide count.
4. If the request is hybrid, choose the dominant type and note secondary conventions explicitly.
5. Build narrative arc and section transitions.
6. Draft slide-by-slide specs: title, single key message, content blocks, visuals, and speaker notes.
7. Apply visual language and data visualization rules.
8. Run quality gate checks and list remaining gaps.
9. Return both human-readable output and MCP-ready JSON.

### Audit Mode

1. Collect the deck input as a Canva URL, `design_id`, or extracted slide package.
2. Extract slide text, page structure, and presenter notes before making audit judgments.
3. Decompose each slide into a claim inventory: numbers, results, interpretations, comparisons, and implications.
4. Map each claim to the best available source material.
5. Verify against local source materials first.
6. Use web verification only for freshness-sensitive or public-fact claims that local materials cannot close.
7. Classify conflicts as `factual`, `temporal`, `scope`, or `interpretation`.
8. Assign `severity` and `confidence` for every material finding.
9. Produce a single audit report with deck checklist, slide findings, inspection log, open risks, and revision priorities.

## Audit Input Contract

Use these fields when the task is in `audit mode`.

- `audit_target`: Canva URL, `design_id`, or equivalent deck identifier.
- `source_materials`: local source files, notes, summaries, reports, or data extracts to treat as primary evidence.
- `verification_scope`: optional; default to `numeric_results, interpretation, chart_integrity, factual_claims, freshness`.
- `web_check_required`: optional; default to `true`.
- `priority_claims`: optional list of high-risk slides or claims to inspect first.

## Output Standard

### Design Mode

Always return:

1. `Metadata`: deck goal, audience, language, deck type, duration, assumptions.
2. `Narrative Arc`: opening tension, core insight, supporting proof, close action.
3. `Slide-by-Slide Spec` with one entry per slide: slide number and role, slide title, one key message, content blocks, visual blueprint, data requirements, and speaker notes.
4. `Visual System`: typography hierarchy, color roles, spacing rhythm, image/icon rules.
5. `Data Visualization Plan`: chart choices, rationale, and integrity checks.
6. `Compliance Report`: passed checks, failed checks, and required fixes.
7. `MCP-ready JSON`: must follow `references/mcp-io-contract.md`.

### Audit Mode

Always return:

1. `Audit Summary`: top risks, overall confidence, and recommended next action.
2. `Deck Audit Checklist`: whole-deck checks for numeric support, interpretation discipline, chart integrity, freshness, and unresolved gaps.
3. `Slide Findings[]`: one entry per material issue with `slide_number`, `claim`, `issue_type`, `severity`, `evidence`, `conflict_type`, `recommended_fix`, and `confidence`.
4. `Inspection Log[]`: one entry per checked source with `checked_at`, `checked_material`, `material_type`, `check_scope`, `method`, and `freshness_note`.
5. `Open Risks`: unresolved claims, missing materials, or verification blockers.
6. `Revision Priorities`: ordered fixes by user impact and confidence.
7. `Audit Report JSON`: must follow `references/audit-report-contract.md`.

Integrity tags:

- `[INPUT NEEDED: field]` for required missing input.
- `[EVIDENCE NEEDED]` for unsupported claims or numbers.
- `[ASSUMPTION: detail]` for temporary assumptions.
- `[VISUAL RISK]` for clutter, ambiguity, or misleading visual choices.
- `[UNVERIFIED]` for claims that remain unresolved after reasonable checking.
- Use absolute dates such as `2026-03-15`, not relative dates such as "today" or "recently", in audit outputs and inspection logs.

## Integration

1. If `research-strategy` output is provided, preserve evidence confidence and unresolved conflicts.
2. Use `search-mcp` only when provider/tool selection guidance is needed for additional evidence gathering.
3. If `report-writing` output is provided, convert section findings into slide narrative without adding facts.
4. If `academic-writing` output is provided, condense paper sections into audience-fit slide messages.
5. Use after `document-summary` when the source material is long and first needs compression.
6. Use `document-qa` to ground ambiguous deck claims in local evidence before escalating to web checks.
7. Use `design-brief` instead when the request is for posters, flyers, card-news, banners, or other non-slide visual assets.

## Resource Loading

Pass only the needed `reference_paths` to `run_skill`; these files do not load automatically.

- Load `references/deck-types.md` when selecting structure, pacing, and slide count.
- Load `references/storyline-and-flow.md` when shaping the narrative arc.
- Load `references/slide-blueprints.md` when drafting slide-by-slide fields.
- Load `references/visual-language-rules.md` when defining the visual system.
- Load `references/data-visualization-rules.md` when chart choice or data integrity is central.
- Load `references/audit-workflow.md` when the task is an existing-deck audit or cross-verification job.
- Load `references/issue-taxonomy.md` when classifying issue type, conflict type, severity, or confidence.
- Load `references/audit-report-contract.md` when audit-mode output or JSON shape must be explicit.
- Load `references/source-priority-and-freshness.md` when deciding source priority, freshness checks, or inspection-log entries.
- Load `references/quality-gate.md` before finalizing.
- Load `references/mcp-io-contract.md` when MCP-ready JSON is required.
