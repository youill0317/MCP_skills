Use this contract for `audit mode` outputs.

## Input Fields

Required:

1. `audit_target`
2. `source_materials`

Optional:

1. `verification_scope`
2. `web_check_required`
3. `priority_claims`

Default values:

- `verification_scope`: `numeric_results, interpretation, chart_integrity, factual_claims, freshness`
- `web_check_required`: `true`

## Markdown Output Shape

Return one integrated report with these sections in order:

1. `Audit Summary`
2. `Deck Audit Checklist`
3. `Slide Findings`
4. `Inspection Log`
5. `Open Risks`
6. `Revision Priorities`

## JSON Output Shape

```json
{
  "audit_spec_version": "1.0",
  "audit_summary": {
    "overall_status": "revise_before_use",
    "top_risks": ["Slide 4 interpretation overreach"],
    "overall_confidence": "medium",
    "recommended_next_action": "Revise slides 4 and 7 before external presentation."
  },
  "deck_audit_checklist": {
    "passed_checks": ["Numeric claims on slides 1-2 trace to source table"],
    "failed_checks": ["Freshness-sensitive market size on slide 7 lacks verified date"],
    "required_fixes": ["Add source date to slide 7 benchmark"],
    "assumptions_used": ["[ASSUMPTION: presenter notes reflect final spoken claim]"]
  },
  "slide_findings": [
    {
      "slide_number": 4,
      "claim": "The intervention caused a 25% retention lift.",
      "issue_type": "interpretation",
      "severity": "high",
      "evidence": ["Local report says association, not causation."],
      "conflict_type": "interpretation",
      "recommended_fix": "Rewrite as an observed association and state the study limitation.",
      "confidence": "high"
    }
  ],
  "inspection_log": [
    {
      "checked_at": "2026-03-15",
      "checked_material": "retention-study-summary.pdf",
      "material_type": "local_report",
      "check_scope": "slides 3-5 results and interpretation",
      "method": "local",
      "freshness_note": "Primary source for reported study result; freshness check not required."
    }
  ],
  "open_risks": ["Slide 8 benchmark source not provided."],
  "revision_priorities": ["Fix slide 4 interpretation before all other content edits."]
}
```

## Field Rules

- `checked_at` must use an absolute date.
- `method` must be `local` or `web`.
- `evidence` may mix direct quotes and short paraphrases, but keep them source-grounded.
- `slide_findings` should include only material issues; minor style notes belong in `revision_priorities` only when they affect evidence interpretation.
