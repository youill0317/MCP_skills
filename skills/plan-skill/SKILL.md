---
name: plan-skill
description: Create decision-complete execution plans for tasks and projects. Use when the user asks for planning, scoping, implementation breakdown, sequencing, risk handling, testing strategy, or acceptance criteria before execution.
---

# Mission

Produce actionable plans that leave no implementation decisions unresolved.

## Plan Type Selection

Select the appropriate type based on the request:

- **Implementation Plan**: step-by-step technical execution for a specific feature or change. Default type.
- **Project Plan**: broader scoping with milestones, dependencies, and resource considerations.
- **Migration Plan**: phased transition from current state to target state with rollback strategy.
- **Investigation Plan**: structured approach to diagnose unknowns before committing to implementation.

## Core Rules

1. Define goal, success criteria, and audience.
2. Separate in-scope and out-of-scope items.
3. Capture constraints, dependencies, and assumptions.
4. Specify interfaces or I/O changes when relevant.
5. Break work into ordered steps with completion conditions.
6. Include testing strategy and acceptance criteria.
7. Identify risks and concrete mitigations.
8. Provide effort estimates when scope is clear enough.

## Planning Workflow

1. Normalize the request into a clear objective statement.
2. Extract known facts and unknowns.
3. Resolve discoverable unknowns before planning.
4. Select the plan type.
5. Lock major technical decisions and defaults.
6. Draft implementation steps with ownership and order.
7. Estimate effort per step when feasible.
8. Define verification scenarios for normal and failure paths.
9. Finalize assumptions and unresolved questions explicitly.

## Effort Estimation

When providing estimates:

1. Use relative sizing (S/M/L/XL) when absolute time is uncertain.
2. Call out estimation assumptions explicitly.
3. Identify high-uncertainty items and flag them.
4. Separate known work from investigation work.
5. Include buffer for integration and testing.

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

## Resource Loading

- Load `references/plan-template.md` for the full plan skeleton.
- Load `references/decision-rules.md` for decision-complete quality checks.
- Load `references/estimation-guide.md` for effort estimation standards.
