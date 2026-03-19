# skill-registry Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-03-19

## Active Technologies

- TypeScript targeting ES2022 on Node.js 20+ + Node.js standard library, TypeScript 5.6, `@types/node` for development (001-skill-catalog)

## Project Structure

```text
src/
tests/
```

## Commands

npm run build; npm test; npm run validate:skills

## Code Style

TypeScript targeting ES2022 on Node.js 20+: Follow standard conventions

## Recent Changes

- 001-skill-catalog: Added TypeScript targeting ES2022 on Node.js 20+ + Node.js standard library, TypeScript 5.6, `@types/node` for development

<!-- MANUAL ADDITIONS START -->
- Minimal integrity validation flow:
  - `npm run validate:skills` is the only automated quality gate kept in this repository.
  - The validator checks structural integrity only: frontmatter presence and parsing, `name` validity, folder-name alignment, legacy `category` rejection, and referenced resource existence.
  - Authoring best-practice quality is reviewed separately with LLM feedback using `skill_authoring_best_practices_restructured.md` as context.
- Hook behavior:
  - `pre-commit` runs validation only when staged changes touch skill-registry validation targets.
  - No `pre-push` or CI validation gates are kept in the repository.
<!-- MANUAL ADDITIONS END -->
