# MCP I/O Contract (ProblemDiagnostic v1)

Use this contract to keep outputs interoperable with future MCP workflows.

## Input Contract

Required fields:

1. `objective`: desired outcome of the diagnosis.
2. `problem_context`: short description of where the issue appears.
3. `observed_signals`: known symptoms, metrics, or observations.
4. `desired_state`: expected target condition.
5. `language`: response language.

Optional fields:

1. `problem_type_hint`: `project_product` or `research`.
2. `constraints`: legal, budget, policy, timeline, or technical limits.
3. `stakeholders`: affected groups and decision owners.
4. `time_window`: period where issue is observed.
5. `available_evidence`: links, notes, data summaries, or reports.
6. `must_include`: mandatory dimensions to assess.

## Output Contract

Return Markdown plus JSON with the following top-level fields:

1. `diagnostic_version`
2. `metadata`
3. `problem_type`
4. `problem_definition`
5. `scope`
6. `signals`
7. `root_cause_candidates`
8. `alternative_explanations`
9. `assumptions_unknowns`
10. `blind_spots`
11. `validation_questions`
12. `next_investigation_tasks`
13. `compliance_report`

## JSON Field Definitions

`metadata`:

- `objective`
- `language`
- `assumptions` (array)

`problem_type`:

- `value`: `project_product` or `research`
- `confidence`: `high`, `medium`, or `low`

`problem_definition`:

- `statement`
- `rationale`

`scope`:

- `in_scope` (array)
- `out_of_scope` (array)
- `constraints` (array)

`signals`:

- `success_signals` (array)
- `failure_signals` (array)

`root_cause_candidates[]`:

- `candidate`
- `linked_symptoms` (array)
- `confidence`
- `evidence_needed` (array)

`alternative_explanations[]`:

- `explanation`
- `what_would_falsify` (array)

`assumptions_unknowns`:

- `assumptions` (array)
- `unknowns` (array)

`blind_spots[]`:

- `spot`
- `impact`
- `evidence_to_close` (array)

`validation_questions[]`:

- `question`
- `uncertainty_target`
- `evidence_needed` (array)
- `priority`

`next_investigation_tasks[]`:

- `task`
- `owner_suggestion`
- `expected_output`

`compliance_report`:

- `passed_checks` (array)
- `failed_checks` (array)
- `required_fixes` (array)
- `assumptions_used` (array)

## JSON Example

```json
{
  "diagnostic_version": "1.0",
  "metadata": {
    "objective": "Clarify onboarding drop-off problem before planning fixes",
    "language": "ko",
    "assumptions": ["[ASSUMPTION: tracking event names were unchanged]"]
  },
  "problem_type": {
    "value": "project_product",
    "confidence": "medium"
  },
  "problem_definition": {
    "statement": "For first-week users, activation is below target, creating a conversion gap under current support capacity.",
    "rationale": "Observed conversion decline and support constraints indicate a measurable onboarding performance gap."
  },
  "scope": {
    "in_scope": ["First-week onboarding flow", "Activation metric definition"],
    "out_of_scope": ["Pricing policy changes"],
    "constraints": ["No additional support headcount this quarter"]
  },
  "signals": {
    "success_signals": ["Day-7 activation >= 40%"],
    "failure_signals": ["Day-7 activation < 30% for two consecutive weeks"]
  },
  "root_cause_candidates": [
    {
      "candidate": "Critical setup step is not completed",
      "linked_symptoms": ["High drop at setup step 3"],
      "confidence": "medium",
      "evidence_needed": ["Step-level completion funnel by cohort"]
    }
  ],
  "alternative_explanations": [
    {
      "explanation": "Tracking regression inflated drop-off",
      "what_would_falsify": ["Independent log check confirms event integrity"]
    }
  ],
  "assumptions_unknowns": {
    "assumptions": ["[ASSUMPTION: acquisition mix unchanged]"],
    "unknowns": ["Support ticket reason distribution by segment"]
  },
  "blind_spots": [
    {
      "spot": "Enterprise onboarding path not analyzed",
      "impact": "May hide segment-specific causes",
      "evidence_to_close": ["Segmented funnel by account type"]
    }
  ],
  "validation_questions": [
    {
      "question": "Does drop-off remain after controlling for acquisition channel?",
      "uncertainty_target": "Selection effect",
      "evidence_needed": ["Channel-stratified activation cohorts"],
      "priority": "high"
    }
  ],
  "next_investigation_tasks": [
    {
      "task": "Extract step-level onboarding funnel for last 8 weeks",
      "owner_suggestion": "Product analytics",
      "expected_output": "Cohort funnel table with segment cuts"
    }
  ],
  "compliance_report": {
    "passed_checks": ["Scope boundaries explicit"],
    "failed_checks": [],
    "required_fixes": [],
    "assumptions_used": ["[ASSUMPTION: tracking event names were unchanged]"]
  }
}
```
