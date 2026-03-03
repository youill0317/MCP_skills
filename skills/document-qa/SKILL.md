---
name: document-qa
description: Answer questions from local documents and references with citation-friendly excerpts. Use when the user asks for document Q&A, evidence extraction, or source-grounded answers.
---

# Document QA Workflow

Produce accurate, evidence-based answers grounded in loaded documents.

## Core Workflow

1. Parse the user question and identify required evidence types.
2. Load only the references required for the question.
3. For long documents, apply chunking to stay within context limits.
4. Identify exact passages that support the answer.
5. Produce a concise answer with cited file paths and line references.
6. If evidence is missing, state what is missing and what to load next.

## Multi-Document Rules

1. When multiple documents cover the same topic, prefer the most recently modified source.
2. If documents have different authority levels, rank: official spec > internal doc > meeting notes > informal notes.
3. Cross-reference claims across documents when possible.
4. When documents contradict each other, apply the conflict resolution procedure below.

## Conflict Resolution

1. Report both sources with file paths and excerpts.
2. Explain the nature of the conflict (factual, temporal, scope).
3. Prefer the primary or authoritative source if identifiable.
4. If unresolvable, present both positions and mark confidence as Low.
5. Never claim certainty when evidence conflicts.

## Confidence Levels

Assign a confidence level to every answer:

- **High**: answer is directly supported by multiple consistent passages.
- **Medium**: answer is supported by a single passage or by inference from related passages.
- **Low**: evidence is partial, conflicting, or requires assumptions.
- **Insufficient**: cannot answer; state what documents or evidence are needed.

## Output Requirements

Every response must include:

1. **Answer section**: concise answer in 1-3 sentences.
2. **Evidence bullets**: each with file path, line range, and quoted excerpt.
3. **Confidence note**: one of High / Medium / Low / Insufficient with brief justification.
4. **Gaps section** (when applicable): missing documents or evidence areas.

## Resource Loading

- Load `references/qa-guidelines.md` for evidence handling and conflict rules.
- Load `references/chunk-strategy.md` for long document processing.
- Load `references/citation-format.md` for citation formatting standards.
