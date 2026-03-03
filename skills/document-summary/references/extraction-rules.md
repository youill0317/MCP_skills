# Extraction Rules

Criteria for identifying and extracting key information from documents.

## What to Extract

### Primary Targets

1. **Claims**: assertions of fact, conclusions, or recommendations.
2. **Data points**: numbers, percentages, dates, quantities.
3. **Decisions**: choices made, options selected or rejected.
4. **Definitions**: new terms, concepts, or scope boundaries.
5. **Action items**: tasks, deadlines, or responsibilities assigned.

### Secondary Targets

1. **Assumptions**: stated or implied preconditions.
2. **Risks**: identified threats or concerns.
3. **Dependencies**: items that depend on external factors.
4. **Open questions**: unresolved issues or requested follow-ups.

## Extraction Priority

When space is limited, prioritize in this order:

1. Claims with data support
2. Decisions and their rationale
3. Action items with deadlines
4. Risks and blockers
5. Assumptions and definitions
6. Open questions

## Quality Checks

Before finalizing extracted points:

1. Each point must be traceable to a specific section of the source.
2. Numbers must be exact, not rounded unless the source rounds them.
3. Attributions must be preserved (who said or decided what).
4. Negations must be captured accurately (what was rejected, not just what was chosen).
5. Temporal context must be included for time-sensitive claims.

## Handling Ambiguity

1. If a passage can be interpreted multiple ways, note the ambiguity.
2. Do not resolve ambiguity by assuming intent.
3. Mark ambiguous items with a brief note explaining the uncertainty.
