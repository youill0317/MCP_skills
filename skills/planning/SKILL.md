---
name: Planning
description: Create decision-complete execution plans for tasks and projects. Use when the user asks for planning, scoping, implementation breakdown, sequencing, risk handling, testing strategy, or acceptance criteria before execution.
category: task
---

# Mission

Produce actionable plans that leave no implementation decisions unresolved.

## Category

`task`

## Use When

- The user asks for planning before implementation.
- The task requires sequencing, scope control, testing strategy, or risk handling.
- Success depends on locking assumptions and decisions before execution starts.

## Scope

1. Define goal, success criteria, and audience.
2. Separate in-scope and out-of-scope items.
3. Capture constraints, dependencies, and assumptions.
4. Specify interfaces or I/O changes when relevant.
5. Break work into ordered steps with completion conditions.
6. Include testing strategy and acceptance criteria.
7. Identify risks and concrete mitigations.
8. Provide effort estimates when scope is clear enough.

## Core Workflow

1. Normalize the request into a clear objective statement.
2. Extract known facts and unknowns.
3. Resolve discoverable unknowns before planning.
4. Select one plan type: Implementation, Project, Migration, or Investigation.
5. Lock major technical decisions and defaults.
6. Draft implementation steps with ownership and order.
7. Estimate effort per step when feasible.
8. Define verification scenarios for normal and failure paths.
9. Finalize assumptions and unresolved questions explicitly.

## Output Standard

Always include:

1. Title
2. Brief summary
3. Plan type indicator
4. API/interface or behavior changes
5. Step-by-step implementation plan with effort indicators
6. Test cases and scenarios
7. Risks and mitigations
8. Explicit assumptions/defaults

Estimation rules:

1. Use relative sizing (`S` / `M` / `L` / `XL`) when absolute time is uncertain.
2. Call out estimation assumptions explicitly.
3. Flag high-uncertainty items.
4. Separate known work from investigation work.
5. Include integration and testing effort.

## Integration

1. Use after `problem-definition` when the core problem still needs to be clarified.
2. Use outputs from `document-summary`, `document-qa`, or `research-strategy` as discovered facts rather than re-researching them.
3. Use `search-mcp` only when the plan depends on unresolved provider/tool selection.
4. Hand completed plans to execution-oriented agents or engineers without leaving key decisions implicit.

## Resource Loading

Pass only the needed `reference_paths` to `run_skill`; these files do not load automatically.

- Load `references/plan-template.md` when the plan needs a fuller structured skeleton.
- Load `references/decision-rules.md` when checking whether the plan is decision-complete.
- Load `references/estimation-guide.md` when estimates need more rigor.
