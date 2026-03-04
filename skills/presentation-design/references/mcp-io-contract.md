# MCP I/O Contract (Tool-Neutral)

Use this contract so outputs can be mapped to PPT, Figma, or other slide-oriented MCP tools later.

## Input Contract

Required input fields:

1. `objective`: one-sentence presentation goal.
2. `audience`: primary audience description.
3. `duration_minutes`: target presentation duration.
4. `language`: output language.
5. `deck_type`: one of `pitch`, `executive_update`, `research_talk`, `education_lecture`, `product_demo`, `proposal`.

Optional input fields:

1. `constraints`: brand, compliance, or formatting constraints.
2. `tone`: formal, neutral, persuasive, instructional.
3. `source_summary`: key facts, numbers, and claims from provided materials.
4. `must_include`: required sections or points.
5. `must_avoid`: prohibited claims, terms, or visual styles.
6. `target_slide_count`: preferred number of slides.

## Output Contract

Return both Markdown and JSON. JSON must include:

1. `deck_spec_version`
2. `metadata`
3. `narrative_arc`
4. `slides`
5. `visual_system`
6. `data_visualization_plan`
7. `compliance_report`

## JSON Field Definitions

`metadata`:

- `objective`
- `audience`
- `language`
- `deck_type`
- `duration_minutes`
- `assumptions` (array)

`narrative_arc`:

- `opening_tension`
- `core_insight`
- `supporting_proof`
- `close_action`

`slides[]` (one item per slide):

- `slide_number` (integer)
- `role` (string)
- `title` (string)
- `key_message` (string)
- `content_blocks` (string array)
- `visual_blueprint` (string)
- `data_requirements` (string array)
- `speaker_notes` (string)
- `tags` (string array, optional)

`visual_system`:

- `typography_hierarchy`
- `color_roles`
- `layout_principles`
- `imagery_rules`

`data_visualization_plan[]`:

- `slide_number`
- `question_type` (comparison, trend, composition, distribution, relationship)
- `chart_type`
- `rationale`
- `integrity_checks` (string array)

`compliance_report`:

- `passed_checks` (string array)
- `failed_checks` (string array)
- `required_fixes` (string array)
- `assumptions_used` (string array)

## JSON Example

```json
{
  "deck_spec_version": "1.0",
  "metadata": {
    "objective": "Secure pilot approval",
    "audience": "Operations leadership",
    "language": "ko",
    "deck_type": "proposal",
    "duration_minutes": 15,
    "assumptions": ["[ASSUMPTION: baseline budget unchanged]"]
  },
  "narrative_arc": {
    "opening_tension": "Current process causes delay and rework.",
    "core_insight": "A phased rollout reduces risk while improving cycle time.",
    "supporting_proof": "Pilot metrics and benchmark comparison.",
    "close_action": "Approve phase-1 pilot by Q3."
  },
  "slides": [
    {
      "slide_number": 1,
      "role": "Hook",
      "title": "Why This Decision Matters Now",
      "key_message": "Delay cost is already material this quarter.",
      "content_blocks": ["Current delay rate", "Cost impact", "Decision urgency"],
      "visual_blueprint": "Headline + single metric callout",
      "data_requirements": ["Delay trend by month"],
      "speaker_notes": "Set urgency without overclaiming.",
      "tags": []
    }
  ],
  "visual_system": {
    "typography_hierarchy": "Title > key number > body",
    "color_roles": "Primary for core claim, neutral for context, accent for one highlight",
    "layout_principles": "Consistent grid and whitespace",
    "imagery_rules": "Use only visuals that clarify the claim"
  },
  "data_visualization_plan": [
    {
      "slide_number": 1,
      "question_type": "trend",
      "chart_type": "line chart",
      "rationale": "Shows month-over-month delay trajectory.",
      "integrity_checks": ["Consistent axis scale", "Unit labels visible"]
    }
  ],
  "compliance_report": {
    "passed_checks": ["Narrative flow"],
    "failed_checks": [],
    "required_fixes": [],
    "assumptions_used": ["[ASSUMPTION: baseline budget unchanged]"]
  }
}
```
