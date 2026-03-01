---
name: document-qa
description: Answer questions from local documents and references with citation-friendly excerpts. Use when the user asks for document Q&A, evidence extraction, or source-grounded answers.
---

# Document QA Workflow

1. Load only the references required for the user question.
2. Identify exact passages that support the answer.
3. Produce a concise answer with cited file paths.
4. If evidence is missing, state what is missing and what to load next.

## Output Requirements

- Include an answer section.
- Include evidence bullets with file path and excerpt.
- Include a confidence note.
