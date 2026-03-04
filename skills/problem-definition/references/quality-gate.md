# Quality Gate

Run this checklist before returning final output.

## A. Clarity Checks

1. Problem statement is one sentence and testable.
2. Current state and desired state are explicitly distinguished.
3. Impact is concrete and decision-relevant.

## B. Boundary Checks

1. In-scope and out-of-scope are explicit.
2. Critical constraints are listed.
3. Scope is narrow enough to be investigated.

## C. Causal Framing Checks

1. Symptoms and root-cause candidates are separated.
2. At least one alternative explanation is included.
3. Cause claims without evidence are tagged `[ASSUMPTION: ...]`.

## D. Evidence Checks

1. Unsupported factual claims are tagged `[EVIDENCE NEEDED]`.
2. Missing required inputs are tagged `[INPUT NEEDED: ...]`.
3. Likely omissions are tagged `[BLIND SPOT]`.

## E. Validation Readiness Checks

1. Validation questions are prioritized.
2. Each question maps to specific evidence.
3. Next investigation tasks are minimal and actionable.

## Quality Gate Output

Return:

1. `Passed checks`
2. `Failed checks`
3. `Required fixes`
4. `Assumptions used`
