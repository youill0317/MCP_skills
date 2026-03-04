# Root Cause and Alternative Explanations

Separate observed symptoms from explanatory hypotheses before proposing actions.

## Symptom vs Cause Rule

1. A symptom is an observed effect.
2. A cause candidate is a mechanism that could produce that effect.
3. Do not label a cause as confirmed without disconfirming alternatives.

## Root-Cause Candidate Process

1. List 2-5 observable symptoms.
2. For each symptom, generate at least two plausible cause candidates.
3. Map each cause candidate to required evidence.
4. Rank candidates by plausibility and evidence availability.

## 5 Whys Guardrails

1. Use 5 Whys only to generate hypotheses, not to prove them.
2. Stop when additional "why" steps become speculative.
3. Tag speculative links as `[ASSUMPTION: causal link]`.

## Alternative Explanation Checks

For each primary cause candidate, test:

1. Measurement artifact: could the signal be wrong or biased?
2. Selection effect: is the observed group systematically different?
3. Timing effect: is this temporary or event-driven?
4. External factor: policy, market, seasonality, or platform change?
5. Definition drift: did terms or thresholds change?

## Falsification Prompts

1. What observation would make this cause unlikely?
2. What evidence would support a competing explanation more strongly?
3. What minimal data would reduce uncertainty fastest?
