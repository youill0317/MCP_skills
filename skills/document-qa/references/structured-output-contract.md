# Structured Output Contract

Use this reference when the answer should be reusable by downstream skills or tools, or when conflicts or gaps are large enough that a machine-readable block adds value.

## When to Include a Structured Block

Include a structured QA block when one or more of these are true:

1. downstream reuse is expected
2. the answer is `conflicted`
3. the answer is `not_found_in_loaded_docs`
4. gaps are material enough that next-load guidance matters

## Required Fields When Included

Every structured QA block must include:

1. `question_type`
2. `answer`
3. `answer_status`
4. `evidence`
5. `conflicts`
6. `gaps`
7. `confidence`
8. `next_load_targets`

## Evidence Item Shape

Each evidence item should include:

1. `source`
2. `position`
3. `excerpt`
4. `support_type`
5. `note` when the support is partial or inferential

## Consistency Rules

1. The human-readable answer and the structured block must not contradict each other.
2. `answer_status` must match the evidence quality.
3. If `conflicts` is non-empty, confidence should not be `High`.
4. If `answer_status` is `not_found_in_loaded_docs`, `next_load_targets` should be populated when possible.
5. `Insufficient` is a confidence value, not an `answer_status` value.
