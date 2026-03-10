# Estimation Guide

Load this reference when the plan needs explicit sizing or uncertainty handling.

Standards for estimating effort within plans.

## Sizing Scale

Use this relative scale when absolute time estimates are uncertain:

| Size | Scope | Typical Effort | Example |
|---|---|---|---|
| **S** | Single file, isolated change | < 1 hour | Fix a typo, add a config field |
| **M** | Few files, contained feature | 1-4 hours | Add a new API endpoint |
| **L** | Multiple components, integration | 4-16 hours | New feature with tests and docs |
| **XL** | Cross-cutting, multi-system | 16+ hours | Architecture refactor, migration |

## Estimation Rules

1. Estimate known work and investigation work separately.
2. For investigation tasks, estimate a time-box rather than completion time.
3. Add 20-30% buffer for integration, testing, and edge cases.
4. Flag any step with > 50% uncertainty with a `⚠️ high uncertainty` marker.
5. If not enough information to estimate, state "needs investigation" rather than guessing.

## Confidence Indicators

Attach a confidence level to each estimate:

- **Confident**: similar work done before, scope well understood.
- **Moderate**: scope is clear but some unknowns in implementation.
- **Low**: significant unknowns or first-time work.

## Anti-patterns

Avoid these estimation mistakes:

1. Estimating without understanding scope boundaries.
2. Omitting testing, documentation, and review time.
3. Treating best-case as the estimate.
4. Not separating parallelizable from sequential work.
5. Estimating large blocks without decomposing first.
