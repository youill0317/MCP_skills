---
name: Problem Definition
description: Define and stress-test problems before solution planning. Use when users ask to clarify a problem statement, separate symptoms from root causes, test assumptions, detect blind spots, or verify whether a project/product or research problem is framed correctly. Return a diagnostic packet and MCP-ready JSON.
category: task
---

# Mission

Turn ambiguous concerns into clear, testable problem definitions.

## Category

`task`

## Use When

- The user needs to clarify the problem before choosing a solution.
- Symptoms, assumptions, root causes, or blind spots are still mixed together.
- The next stage depends on a diagnostic packet rather than a full solution plan.

## Scope

1. Perform problem definition and validation only.
2. Support both project/product problems and research problems.
3. If problem type is ambiguous, confirm the type before deep analysis.
4. Write in the user's requested language; default to Korean if unspecified.
5. Do not design full solution plans.

## Core Workflow

1. Capture objective, current state, desired state, constraints, and stakeholders.
2. Select one primary problem type: Project/Product or Research.
3. If the request is mixed, choose the dominant type and note secondary checks explicitly.
4. Write a one-sentence problem definition and define success/failure signals.
5. Set in-scope and out-of-scope boundaries.
6. Separate symptoms from root-cause candidates.
7. Add alternative explanations and plausible confounders.
8. Tag assumptions, unknowns, and missing evidence.
9. Generate validation questions and next investigation tasks.
10. Run the quality gate and return both human-readable output and MCP-ready JSON.

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

Integrity tags:

- `[INPUT NEEDED: field]` for required missing input.
- `[ASSUMPTION: detail]` for temporary assumptions.
- `[EVIDENCE NEEDED]` for unsupported factual claims.
- `[BLIND SPOT]` for likely omitted perspectives or conditions.

## Integration

1. Use before `planning` when the solution path should not be locked yet.
2. Use `search-mcp` or `document-qa` afterwards if the validation questions require evidence gathering.
3. Preserve assumptions, blind spots, and next-investigation tasks in downstream planning outputs.

## Resource Loading

Pass only the needed `reference_paths` to `run_skill`; these files do not load automatically.

- Load `references/problem-types.md` when choosing the primary framing mode.
- Load `references/problem-statement-canvas.md` when building the diagnostic structure.
- Load `references/root-cause-and-alt-explanations.md` when separating symptoms from explanations.
- Load `references/blind-spot-checks.md` when stakeholder or scope gaps are likely.
- Load `references/validation-questions.md` when producing follow-up questions.
- Load `references/quality-gate.md` before finalizing.
- Load `references/mcp-io-contract.md` when MCP-ready JSON is required.
