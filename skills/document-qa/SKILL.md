---
name: document-qa
description: Answer questions from local documents and references with evidence mapping, conflict-aware reasoning, citation-friendly excerpts, and optional structured QA blocks when needed.
---

# Mission

Produce accurate, evidence-based answers grounded in loaded documents, with explicit evidence mapping, conflict handling, and confidence control.

## Use When

- The user asks a question about local files, notes, or loaded references.
- The answer must be grounded in quoted evidence rather than general knowledge.
- Evidence extraction, contradiction handling, source comparison, or citation-friendly excerpts are required.

## Scope

1. Answer from loaded documents and references only.
2. Preserve file-path and line-level evidence whenever available.
3. Support multi-document comparison, synthesis, and contradiction handling.
4. Distinguish direct support, partial support, narrow inference, and unsupported claims.
5. Distinguish explicit absence, not found in loaded documents, and conflict-driven uncertainty.
6. Default to a human-readable answer and add a structured QA block only when it materially helps reuse or ambiguity handling.

## Core Workflow

1. Parse the user question and classify the question type only when that classification improves evidence selection or answer structure.
2. Identify the exact evidence needed and load only the references required for the question.
3. For long documents, apply chunking to stay within context limits.
4. Rank sources using repo-aware authority, recency, and scope-match heuristics when multiple documents cover the same topic.
5. Identify exact supporting passages and label each passage as direct support, partial support, or narrow inference.
6. If sources conflict, report both positions, classify the conflict type, and explain which source is more authoritative.
7. If the answer is negative, distinguish explicit absence from not found in the loaded documents.
8. Produce a concise answer and evidence map by default, then add conflict notes, gap notes, or a structured QA block only when needed.
9. If evidence is missing, state what is missing and what to load next.

## Output Standard

Every response must include:

1. **Answer**: concise answer in 1-3 sentences.
2. **Evidence Map**: bullets with file path, position, quoted excerpt, and support type.
3. **Confidence**: `High`, `Medium`, `Low`, or `Insufficient` with brief justification.

Add these sections only when applicable:

4. **Conflicts**: conflicting positions, conflict type, and source priority note.
5. **Gaps**: missing documents, missing sections, or unresolved evidence areas.
6. **Structured QA Block**: reusable block for downstream reuse, complex conflicts, or major evidence gaps.

Confidence rules:

- **High**: directly supported by multiple consistent passages.
- **Medium**: supported by a single passage or a narrow inference with low ambiguity.
- **Low**: partial support, narrow inference with notable uncertainty, or conflicting support.
- **Insufficient**: cannot answer from the loaded material.

Answer status rules:

These statuses are separate from the confidence scale.

- `supported`: directly supported by the loaded material.
- `partially_supported`: partly supported, but some requested detail remains unconfirmed.
- `explicitly_absent`: the loaded documents directly indicate the thing is absent.
- `not_found_in_loaded_docs`: the loaded documents do not provide enough evidence to confirm or deny it.
- `conflicted`: loaded documents disagree in a way that prevents a single confident answer.

## Integration

1. Use after `obsidian-mcp` when note discovery or narrow file reads are needed first.
2. Feed outputs into `document-summary` or `report-writing` when the next step is synthesis.
3. Preserve exact excerpts, conflict notes, and confidence notes when downstream skills reuse the answer.

## Resource Loading

Pass only the needed `reference_paths` to `run_skill`; these files do not load automatically.

- Load `references/qa-guidelines.md` when evidence handling or conflict resolution needs stricter rules.
- Load `references/chunk-strategy.md` when documents are long enough to require sectioning.
- Load `references/citation-format.md` when the output must follow a strict evidence citation format.
- Load `references/question-types-and-answer-modes.md` when question classification will improve evidence selection or answer structure.
- Load `references/source-hierarchy-and-authority.md` when multiple documents differ in authority, recency, or scope.
- Load `references/conflict-and-negative-answer-policy.md` when the answer depends on contradiction handling, negative evidence, or explicit gap reporting.
- Load `references/structured-output-contract.md` when downstream reuse, complex conflicts, or machine-readable output matters.
- Load `references/inference-boundaries.md` when inference risk must be controlled tightly.
