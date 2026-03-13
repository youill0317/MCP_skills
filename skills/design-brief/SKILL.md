---
name: design-brief
description: Create lightweight design briefs for non-presentation visual assets. Use when users ask for poster copy and structure, flyer headlines and sections, card-news sequences, social post copy plans, banner messaging, thumbnail text direction, or a concise design brief to hand off to Canva or another production tool.
---

# Mission

Turn non-presentation visual content requests into concise, production-ready design briefs.

## Use When

- The user wants a poster, flyer, card-news set, social post, banner, thumbnail, or similar non-slide visual asset.
- The main need is message hierarchy, copy direction, layout guidance, or a handoff brief rather than tool operation.
- The output should help a production tool or designer build the asset without inventing the content strategy from scratch.
- The request is not for a slide deck, speaker notes, or presentation storyline.

## Scope

1. Support poster, flyer, social post, card-news, banner, thumbnail, and simple event or promo visual briefs.
2. Define message hierarchy, copy stack, required information, and layout direction.
3. Keep the output tool-neutral so it can be handed off to Canva or another production tool later.
4. Exclude presentation decks, long-form reports, detailed brand strategy, and direct Canva tool operation.
5. Write in the user's requested language; default to Korean if unspecified.

## Core Workflow

1. Capture the asset type, audience, purpose, channel, tone, and constraints.
2. Identify one core message the asset must communicate first.
3. List the must-include facts, offers, dates, links, prices, or event details.
4. Build the copy stack: headline, subheadline, support copy, and CTA.
5. Choose a layout pattern that fits the asset type and information density.
6. Suggest a visual direction with emphasis, imagery, and contrast guidance.
7. Prepare a concise production handoff that a designer or Canva workflow can use directly.

## Output Standard

Always return:

1. `Metadata`: asset type, audience, language, purpose, channel, and assumptions.
2. `Core Message`: one sentence describing the primary takeaway.
3. `Copy Stack`: headline, subheadline, support copy, and CTA.
4. `Content Blocks`: required information chunks that must appear in the asset.
5. `Layout Direction`: recommended placement or sequence, such as top/middle/bottom or card 1-5.
6. `Visual Direction`: color mood, imagery style, emphasis method, and density guidance.
7. `Production Handoff`: concise instructions ready for Canva or another production tool.

Quality tags:

- `[INPUT NEEDED: field]` for missing required information.
- `[ASSUMPTION: detail]` for temporary assumptions.
- `[COPY RISK]` for cluttered, vague, or weak messaging.
- `[VISUAL RISK]` for readability, hierarchy, or density risks.

## Integration

1. Use after `document-summary` or `report-writing` when a longer source needs to be compressed into asset messaging.
2. Hand off completed briefs to `canva-mcp` when the next step is actual design generation, editing, export, or delivery.
3. Use `presentation-design` instead when the request is slide-based or presentation-specific.
4. Do not replace `canva-mcp`; this skill plans the content brief and visual direction, but does not operate Canva tools.

## Resource Loading

Pass only the needed `reference_paths` to `run_skill`; these files do not load automatically.

- Load `references/asset-types.md` when choosing the right brief shape for poster, flyer, social, card-news, banner, or thumbnail work.
- Load `references/copy-hierarchy.md` when headline, subheadline, support copy, or CTA wording needs structure.
- Load `references/layout-patterns.md` when placement or sequencing needs a concrete pattern.
- Load `references/quality-gate.md` before finalizing.
