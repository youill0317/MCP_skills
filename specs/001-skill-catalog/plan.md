# Implementation Plan: Current Repository Baseline

**Branch**: `001-skill-catalog` | **Date**: 2026-03-19 | **Spec**: [spec.md](C:\Users\user\Documents\Projects_src\workspace\skill-registry\specs\001-skill-catalog\spec.md)
**Input**: Baseline specification from `C:\Users\user\Documents\Projects_src\workspace\skill-registry\specs\001-skill-catalog\spec.md`

## Summary

Document the current `skill-registry` repository as a reproducible baseline. The repository is a single-package TypeScript and Node.js workspace that stores 14 installed skills under `skills/`, exposes two user-facing CLIs for validation and frontmatter migration, provides shared library modules for path policy, package-root resolution, skill loading, and migration, and includes lightweight Git hook automation for staged integrity validation.

## Technical Context

**Language/Version**: TypeScript targeting ES2022 on Node.js 20+  
**Primary Dependencies**: Node.js standard library, TypeScript 5.6.3, `@types/node` 22.8.7  
**Storage**: Local filesystem only; no database, cache, or network persistence  
**Testing**: Node test runner via `node:test`, compiled through `tsc -p tsconfig.tests.json`  
**Target Platform**: Cross-platform local CLI execution on Windows, macOS, or Linux with Node.js 20+  
**Project Type**: Single-package CLI and library workspace  
**Performance Goals**: Local registry operations complete in milliseconds to low seconds for the current 14-skill inventory; test run completes in well under one second after compilation  
**Constraints**: ESM modules only, no runtime dependencies, package-root-relative skills resolution, strict path traversal protection, UTF-8 text files, lexicographically deterministic outputs  
**Scale/Scope**: 14 installed skills, 99 files under `skills/`, 8 source modules, 2 CLI entrypoints, 2 helper scripts, 1 Git hook, 5 TypeScript test files, 33 automated tests, 121 indexed baseline files

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Constitution file status: `C:\Users\user\Documents\Projects_src\workspace\skill-registry\.specify\memory\constitution.md` is not present.
- Gate policy used: infer constraints from observable repository conventions instead of an absent constitution file.
- Pre-documentation result: PASS.
- Checks applied:
- PASS: Keep the baseline description aligned to the current single-package Node.js workspace.
- PASS: Treat TypeScript source under `src/` as canonical and `dist/` outputs as generated artifacts.
- PASS: Describe only the two existing CLIs and the currently exported library behaviors.
- PASS: Preserve the repository's current no-network, filesystem-only execution model.

## Project Structure

### Documentation (this feature)

```text
specs/001-skill-catalog/
|-- spec.md
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- installed-skills.md
|-- file-index.md
|-- contracts/
|   |-- module-api.md
|   |-- pre-commit-automation.md
|   |-- skill-format.md
|   |-- validate-skills-cli.md
|   `-- migrate-skills-frontmatter-cli.md
`-- checklists/
    `-- requirements.md
```

### Source Code (repository root)

```text
src/
|-- cli/
|   |-- migrate-skills-frontmatter.ts
|   `-- validate-skills.ts
|-- security/
|   `-- policy.ts
|-- skills/
|   |-- frontmatter-migration.ts
|   |-- loader.ts
|   `-- validate.ts
|-- project-paths.ts
`-- types.ts

tests/
|-- all.test.ts
|-- frontmatter-migration.test.ts
|-- loader.test.ts
|-- policy.test.ts
`-- validate-skills.test.ts

skills/
|-- academic-writing/
|-- canva-mcp/
|-- document-qa/
|-- document-summary/
|-- markdown-format-normalization/
|-- markdown-structuring/
|-- note-exam-prep/
|-- obsidian-mcp/
|-- obsidian-note-linking/
|-- presentation-design/
|-- problem-definition/
|-- report-writing/
|-- research-strategy/
`-- search-mcp/

scripts/
|-- run-precommit-check.mjs
`-- setup-hooks.mjs

.husky/
`-- pre-commit
```

**Structure Decision**: The repository is a single TypeScript package. Source logic is split into `src/cli`, `src/skills`, `src/security`, and top-level helper modules. Tests mirror behavior rather than folder structure, and installed content under `skills/` is treated as repository data rather than compiled source.

## Module Responsibilities

### `src/project-paths.ts`

- `findPackageRootFromModule(moduleUrl)` walks upward from a module URL until it finds `package.json`.
- `resolveSkillsRootFromModule(moduleUrl, skillsRootOverride?)` resolves the package-relative `skills` root or an override path.

### `src/security/policy.ts`

- Defines the canonical skill id regex.
- Provides `validateSkillId`, `assertRelativeSubpath`, `resolvePathWithinRoot`, and `normalizeToPosix`.
- Enforces repository-local path safety before loader logic resolves skill paths.

### `src/types.ts`

- Declares the shared TypeScript interfaces used across loader and validation code.
- Current exported interfaces: `SkillFrontmatter`, `ValidationLocation`, `SkillManifest`, `LoadedSkill`, `SkillValidationIssue`, `SkillValidationRecord`, and `SkillValidationSummary`.

### `src/skills/loader.ts`

- Parses minimal YAML-like frontmatter from `SKILL.md`.
- Validates frontmatter against folder id and naming rules.
- Lists optional support files recursively.
- Exposes `loadSkillManifest`, `loadSkill`, `listSkillIds`, and `listSkillManifests`.

### `src/skills/validate.ts`

- Iterates direct child directories under a skills root.
- Produces ordered validation records with status `valid`, `invalid`, or `missing`.
- Emits structured issues with rule ids and file locations.
- Validates inline and Markdown-link references to `references/`, `scripts/`, and `assets/`.
- Aggregates total counts into `SkillValidationSummary`, including an overall `errors` count.

### `src/skills/frontmatter-migration.ts`

- Removes legacy `category:` lines from frontmatter.
- Preserves line ending style and leaves current files untouched.
- Aggregates migration outcomes for apply and check mode.

### `src/cli/validate-skills.ts`

- Parses user arguments.
- Resolves the effective skills root.
- Delegates to `validateSkills`.
- Supports text and JSON reports.
- Prints issue detail lines in text mode and maps validation failures to exit code `1` when structural errors are present.

### `src/cli/migrate-skills-frontmatter.ts`

- Parses user arguments.
- Resolves the effective skills root.
- Delegates to `migrateSkillsFrontmatter`.
- Prints a summary and maps invalid files or pending check-mode updates to exit code `1`.

### `scripts/run-precommit-check.mjs`

- Reads staged file paths from Git.
- Filters staged files to validation-relevant prefixes.
- Skips validation when no relevant files are staged.
- Runs `npm run validate:skills` otherwise.

### `scripts/setup-hooks.mjs`

- Configures `core.hooksPath` to `.husky` when `.git` exists.
- Attempts to mark hook files executable.
- Emits a skip message when the directory is not a Git checkout.

### `.husky/pre-commit`

- Runs `npm run check:pre-commit`.

## Build and Execution Flows

### Build Flow

1. `npm run build` executes `tsc -p tsconfig.json`.
2. TypeScript compiles `src/**/*.ts` into `dist/`.
3. Output mirrors the source folder hierarchy under `dist/`.

### Test Flow

1. `npm test` executes `tsc -p tsconfig.tests.json`.
2. Both `src/**/*.ts` and `tests/**/*.ts` compile into `dist-test/`.
3. Node runs `dist-test/tests/all.test.js`.
4. `tests/all.test.ts` imports the four concrete test files to register all test cases.

### Validation CLI Flow

1. `runValidateSkillsCli` parses `argv`.
2. The default skills root is resolved from `import.meta.url`.
3. `validateSkills` scans each direct child of the skills root.
4. Records are printed in sorted order.
5. Exit code is `0` only when `summary.errors === 0`.

### Migration CLI Flow

1. `runFrontmatterMigrationCli` parses `argv`.
2. The default skills root is resolved from `import.meta.url`.
3. `migrateSkillsFrontmatter` inspects every direct child directory.
4. In apply mode, changed files are rewritten.
5. In check mode, changed files are not rewritten.
6. Exit code is `1` on invalid files or pending check-mode updates.

## Installed Skills Baseline

- Total indexed baseline files: 121
- Total skill directories: 14
- Total files beneath `skills/`: 99
- All installed skills are valid under the current validation rules.
- No installed skill currently contains files under `scripts/` or `assets/`.
- Detailed inventory is captured in [installed-skills.md](C:\Users\user\Documents\Projects_src\workspace\skill-registry\specs\001-skill-catalog\installed-skills.md).

## Verification Baseline

Observed on 2026-03-19:

- `cmd /c npm run build`: PASS
- `cmd /c npm test`: PASS, 33 tests passed, 0 failed
- `node dist/cli/validate-skills.js`: PASS, `valid=14 invalid=0 missing=0 errors=0`
- `node dist/cli/validate-skills.js --report json`: PASS, emitted structured JSON with `summary.errors`
- `cmd /c npm run setup:hooks`: NOT FULLY VERIFIED IN SANDBOX, script reached `spawnSync git EPERM`

## Post-Design Constitution Check

- PASS: The documentation describes only existing code paths.
- PASS: No additional components, external dependencies, or new runtime surfaces were introduced.
- PASS: The specification remains faithful to the current repository contents verified by build, test, and validation runs.

## Complexity Tracking

No constitution waivers or complexity exceptions are required for the current baseline.
