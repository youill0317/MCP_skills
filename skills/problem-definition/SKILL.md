---
name: problem-definition
description: Define and stress-test problems before solution planning. Use when users ask to clarify a problem statement, separate symptoms from root causes, test assumptions, detect blind spots, or verify whether a project/product or research problem is framed correctly. Return a diagnostic packet and MCP-ready JSON.
---

# Mission

Turn ambiguous concerns into clear, testable problem definitions.

## Scope

1. Perform problem definition and validation only.
2. Support both project/product problems and research problems.
3. If problem type is ambiguous, confirm the type before deep analysis.
4. Write in the user's requested language; default to Korean if unspecified.
5. Do not design full solution plans.

## Problem Type Selection

Select one primary type and load `references/problem-types.md`:

1. Project/Product Problem
2. Research Problem

If the user intent is mixed, choose the dominant type and note where secondary checks are applied.

## Core Workflow

1. Capture objective, current state, desired state, constraints, and stakeholders.
2. Write a one-sentence problem definition and define success/failure signals.
3. Set in-scope and out-of-scope boundaries.
4. Separate symptoms from root-cause candidates.
5. Add alternative explanations and plausible confounders.
6. Tag assumptions, unknowns, and missing evidence.
7. Generate validation questions and next investigation tasks.
8. Run quality gate and return both human-readable output and MCP-ready JSON.

## Output Standard

Always return:

1. `Problem Definition`: one-sentence statement plus short rationale.
2. `Scope Boundaries`: in scope, out of scope, and critical constraints.
3. `Signals`: success and failure indicators with measurable definitions when possible.
4. `Symptom vs Root-Cause Candidates`: clear separation with confidence notes.
5. `Alternative Explanations`: competing interpretations and what would falsify them.
6. `Assumptions and Unknowns`: explicit assumptions and missing facts.
7. `Blind Spots`: overlooked stakeholders, time horizons, edge contexts, or measurement bias.
8. `Validation Questions`: ordered list of disambiguating questions.
9. `Next Investigation Tasks`: minimal evidence-gathering tasks before solution planning.
10. `Compliance Report`: passed checks, failed checks, required fixes, assumptions used.
11. `MCP-ready JSON`: must follow `references/mcp-io-contract.md`.

## Integrity Tags

Use these tags when uncertainty is present:

- `[INPUT NEEDED: field]` for required missing input.
- `[ASSUMPTION: detail]` for temporary assumptions.
- `[EVIDENCE NEEDED]` for unsupported factual claims.
- `[BLIND SPOT]` for likely omitted perspectives or conditions.

## Resource Loading

Load references in this order:

1. `references/problem-types.md`
2. `references/problem-statement-canvas.md`
3. `references/root-cause-and-alt-explanations.md`
4. `references/blind-spot-checks.md`
5. `references/validation-questions.md`
6. `references/quality-gate.md`
7. `references/mcp-io-contract.md`
