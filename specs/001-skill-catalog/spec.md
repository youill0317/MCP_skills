# Feature Specification: Current Repository Baseline

**Feature Branch**: `001-skill-catalog`  
**Created**: 2026-03-19  
**Status**: Baseline Draft  
**Input**: User description: "이 레포의 내용을 기반으로 작성해줘."

## Overview

This specification documents the repository exactly as it exists today so the current implementation can be reproduced inside the Spec Kit workflow. The repository is a Node.js and TypeScript workspace named `skill-registry`. Its purpose is to store reusable skill packages under `skills/`, validate that each skill follows the repository contract, validate that skill-authored internal resource paths actually resolve inside the skill root, load skill metadata and content for downstream consumers, migrate a legacy frontmatter field out of existing `SKILL.md` files, and provide a minimal pre-commit integrity gate for staged repository changes. Authoring quality review against the external best-practice guidance document is intentionally handled outside repository automation through LLM review, so the in-repository validator is limited to structural integrity checks.

The repository is not a web service, does not expose HTTP endpoints, does not persist data to a database, and does not provide runtime MCP servers. Its source of truth is the repository filesystem itself.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Validate the Registry Before Sharing It (Priority: P1)

A maintainer validates the current `skills/` directory to confirm that every installed skill follows the repository naming and `SKILL.md` frontmatter rules before the registry is copied into another environment or consumed by an AI client.

**Why this priority**: Validation is the primary operational safeguard in the repository. If registry validation is wrong or unavailable, every downstream use of the stored skills becomes less reliable.

**Independent Test**: Run the validation CLI against the default repository `skills/` root and against temporary fixture roots containing valid, invalid, missing, malformed, and broken-reference skills. Confirm that the summary counts, issue lists, JSON reports, and exit codes match the observed directory state.

**Acceptance Scenarios**:

1. **Given** the current repository `skills/` directory, **When** the validation CLI runs with no arguments, **Then** it resolves the package-relative `skills` root and reports `valid=14 invalid=0 missing=0 errors=0`.
2. **Given** a temporary skills root containing a folder with an invalid name such as `Bad Skill`, **When** the validation CLI runs against that root, **Then** the output includes the invalid folder, marks it `invalid`, and returns exit code `1`.
3. **Given** a temporary skills root containing a validly named folder without `SKILL.md`, **When** the validation CLI runs against that root, **Then** the output marks the folder `missing` and returns exit code `1`.
4. **Given** a valid skill body that references `references/missing.md`, **When** the validation CLI runs, **Then** the skill is marked `invalid`, includes a `missing-resource-reference` issue, and contributes to the total error count.
5. **Given** the validation CLI runs with `--report json`, **When** validation completes, **Then** it prints JSON containing `skillsRoot`, `summary.records`, and `summary.errors`.

---

### User Story 2 - Load Installed Skill Metadata and Content Programmatically (Priority: P1)

A downstream tool loads one skill or all valid skill manifests from the registry in order to inspect the skill description, body text, and supporting reference file inventory.

**Why this priority**: The loader layer is the programmatic contract that turns a directory tree into usable skill objects. It is the repository's core library behavior.

**Independent Test**: Load known installed skills such as `document-qa`, `report-writing`, and `academic-writing`. Confirm that metadata fields, body text, and selected reference file paths match the contents of the repository.

**Acceptance Scenarios**:

1. **Given** the installed skill `document-qa`, **When** `loadSkill` is called, **Then** the returned object includes id `document-qa`, name `document-qa`, a description containing `evidence mapping`, a body containing `## Use When`, and sorted reference paths under `references/`.
2. **Given** a skill whose frontmatter `name` differs from its folder id, **When** `loadSkill` is called for that folder, **Then** loading fails with an explicit mismatch error.
3. **Given** a skills root containing both valid and broken skills, **When** `listSkillManifests` is called, **Then** only valid manifests are returned and invalid skill folders are skipped.

---

### User Story 3 - Remove Legacy `category` Frontmatter Safely (Priority: P2)

A maintainer scans existing skills for a legacy `category` field and either reports pending changes or rewrites affected `SKILL.md` files to remove only that field.

**Why this priority**: Migration protects current repository standards while preserving the rest of each skill document unchanged.

**Independent Test**: Run the migration library and CLI against temporary fixtures containing both legacy and current skill files. Confirm that `category:` lines are removed only when present, `--check` does not rewrite files, and invalid inputs surface explicit errors.

**Acceptance Scenarios**:

1. **Given** a `SKILL.md` file containing `category: task`, **When** `removeLegacyCategoryFromSkillContent` runs, **Then** the returned content omits only that line and preserves the remaining frontmatter and body.
2. **Given** a legacy skill and a current skill in the same root, **When** `migrateSkillsFrontmatter` runs in apply mode, **Then** the legacy file is rewritten, the current file is left unchanged, and the summary reports `updated=1 unchanged=1`.
3. **Given** a legacy skill in check mode, **When** the migration CLI runs with `--check`, **Then** it reports a pending update, does not rewrite the file, and returns exit code `1`.

---

### User Story 4 - Reproduce and Verify the Workspace Locally (Priority: P3)

A maintainer installs dependencies, compiles the TypeScript sources, runs the test suite, and executes validation commands to reproduce the current repository behavior on a local machine.

**Why this priority**: A baseline specification must capture not just source code behavior but also the exact verification workflow that proves the repository is functioning as documented.

**Independent Test**: On a clean local checkout with Node.js 20 or newer, run `build`, `test`, and `validate:skills`. Confirm that compilation succeeds, the test suite reports 33 passing tests, and the validation command reports 14 valid skills with `errors=0`.

**Acceptance Scenarios**:

1. **Given** a local checkout with dependencies installed, **When** `cmd /c npm run build` runs, **Then** TypeScript source under `src/` compiles into `dist/` without errors.
2. **Given** the current repository contents, **When** `cmd /c npm test` runs, **Then** the test suite reports 33 passing tests and no failures.
3. **Given** the current repository contents, **When** `cmd /c npm run validate:skills` runs, **Then** the command reports all 14 installed skills as valid.

## Edge Cases

- Folder names that are not lowercase kebab-case are treated as invalid even if the contained `SKILL.md` frontmatter looks correct.
- A valid skill folder without `SKILL.md` is treated as `missing`, not `invalid`.
- `SKILL.md` files that do not start with `---` or do not close the frontmatter block with `---` are invalid.
- The frontmatter parser ignores blank lines and comment lines inside frontmatter, but only captures single-line `key: value` pairs.
- Quoted frontmatter values are unwrapped if both ends use matching single or double quotes.
- The loader trims the body text after the closing frontmatter delimiter.
- `listSkillManifests` silently skips invalid skills so one broken folder does not break the whole manifest list.
- `removeLegacyCategoryFromSkillContent` preserves the original line ending style by detecting `\r\n` versus `\n`.
- CLI argument parsers fail on unknown flags or on missing values for `--skills-root`.
- Validation scans raw body text and Markdown links for `references/`, `scripts/`, and `assets/` targets, and missing targets become structural validation errors.
- Referenced resource validation must block absolute-path or traversal escapes by resolving only within the skill root.
- Package root resolution must work even when the current working directory is not the package root.

## Requirements *(mandatory)*

### Functional Requirements

#### Repository and Package Requirements

- **FR-001**: The repository MUST be a private Node.js package named `skill-registry` with version `0.1.0`.
- **FR-002**: The package MUST declare `"type": "module"` and use Node.js `>=20.0.0`.
- **FR-003**: The package MUST expose the scripts `build`, `setup:hooks`, `prepare`, `validate:skills`, `check:pre-commit`, `migrate:skills-frontmatter`, and `test` exactly as package scripts.
- **FR-004**: The runtime dependency set MUST remain empty and the declared development dependencies MUST include `typescript` and `@types/node`.

#### Filesystem Layout Requirements

- **FR-005**: The repository MUST store source code under `src/`, tests under `tests/`, installed skills under `skills/`, helper automation under `scripts/`, Git hooks under `.husky/`, and generated JavaScript output under `dist/` and `dist-test/`.
- **FR-006**: Each installed skill MUST live in a direct child directory of `skills/`.
- **FR-007**: Each skill directory MAY contain `references/`, `scripts/`, and `assets/` subdirectories in addition to `SKILL.md`.
- **FR-008**: The repository MUST include exactly 14 installed skill directories in the current baseline.

#### Skill Identity and Path Policy Requirements

- **FR-009**: A valid skill id MUST match the regular expression `^[a-z0-9-]{1,64}$`.
- **FR-010**: Path policy helpers MUST reject empty paths, absolute paths, and traversals that escape the allowed root.
- **FR-011**: Path normalization MUST convert platform separators to `/` when publishing relative file paths.

#### Skill File Contract Requirements

- **FR-012**: Every valid `SKILL.md` MUST start with a frontmatter opening line of exactly `---`.
- **FR-013**: Every valid `SKILL.md` MUST contain a closing frontmatter delimiter line of exactly `---`.
- **FR-014**: The frontmatter MUST include `name` and `description`.
- **FR-015**: The frontmatter MUST NOT include `category`.
- **FR-016**: The frontmatter `name` MUST itself satisfy the skill id pattern.
- **FR-017**: The frontmatter `name` MUST equal the containing folder id.
- **FR-018**: The body of a loaded skill MUST be the trimmed text after the closing frontmatter delimiter.
- **FR-019**: Validation MUST treat body references to `references/...`, `scripts/...`, and `assets/...` as structural dependencies that must resolve inside the skill root.

#### Loader Requirements

- **FR-020**: `parseSimpleYamlFrontmatter` MUST be exportable and MUST enforce the repository's current minimal frontmatter parsing rules.
- **FR-021**: `validateSkillFrontmatter` MUST be exportable and MUST enforce skill-name syntax and folder-name equality.
- **FR-022**: `listFilesRecursivelyIfExists` MUST be exportable and MUST return sorted POSIX-style relative paths for supported subdirectories.
- **FR-023**: `loadSkillManifest` MUST return a manifest containing `id`, `rootPath`, `skillFilePath`, `name`, `description`, `references`, `scripts`, and `assets`.
- **FR-024**: `loadSkill` MUST return the manifest fields plus a `body` field containing the trimmed skill body text.
- **FR-025**: `listSkillIds` MUST include only direct child directories whose names satisfy the skill id pattern.
- **FR-026**: `listSkillIds` MUST sort ids lexicographically.
- **FR-027**: `listSkillManifests` MUST call manifest loading for each valid skill id and MUST skip folders that fail manifest loading.
- **FR-028**: Recursive file listing for `references/`, `scripts/`, and `assets/` MUST return repository-relative paths sorted lexicographically in POSIX form.

#### Validation Requirements

- **FR-029**: `validateSkills` MUST inspect every direct child directory under the configured skills root.
- **FR-030**: A folder with an invalid directory name MUST produce a validation record with status `invalid`, an `invalid-folder-name` issue, and the message `Folder name must use lowercase letters, numbers, and hyphens only.`
- **FR-031**: A folder whose `SKILL.md` cannot be read because it is missing MUST produce status `missing` and a `missing-skill-file` issue.
- **FR-032**: A folder whose `SKILL.md` exists but violates the skill contract MUST produce status `invalid` and an `invalid-skill-manifest` issue.
- **FR-033**: Missing or escaping body references under `references/`, `scripts/`, or `assets/` MUST produce `missing-resource-reference` issues.
- **FR-034**: Validation records MUST include `issues` and `errors` fields in addition to status metadata.
- **FR-035**: Validation MUST deduplicate identical issues before returning the record.
- **FR-036**: Validation records MUST be sorted by `skillId`.
- **FR-037**: Validation summaries MUST include the total counts of `valid`, `invalid`, `missing`, and `errors`.

#### Migration Requirements

- **FR-038**: `removeLegacyCategoryFromSkillContent` MUST remove only frontmatter lines that match `category: ...`.
- **FR-039**: If no legacy category line exists, migration content output MUST be byte-for-byte equivalent to the original input.
- **FR-040**: `migrateSkillsFrontmatter` MUST inspect every direct child directory under the configured skills root.
- **FR-041**: In apply mode, changed files MUST be rewritten to disk in UTF-8.
- **FR-042**: In check mode, changed files MUST NOT be rewritten.
- **FR-043**: Migration summary records MUST be sorted by `skillId`.
- **FR-044**: Migration record statuses MUST be limited to `updated`, `unchanged`, `invalid`, and `missing`.

#### CLI Requirements

- **FR-045**: The validation CLI MUST accept `--skills-root <path>`, `--report <text|json>`, and `--help`, and MUST reject unknown arguments.
- **FR-046**: The migration CLI MUST accept `--check`, `--skills-root <path>`, and `--help`, and MUST reject unknown arguments.
- **FR-047**: Both CLIs MUST resolve the default skills root relative to the package root determined from the executing module location.
- **FR-048**: The validation CLI MUST support both text output and JSON output.
- **FR-049**: Text validation output MUST include per-record error counts and per-issue detail lines when issues exist.
- **FR-050**: JSON validation output MUST include `skillsRoot` and the full `summary` object.
- **FR-051**: The validation CLI MUST return exit code `1` when `summary.errors > 0`.
- **FR-052**: The validation CLI MUST write `Skill validation reported structural failures.` to standard error on structural failure.
- **FR-053**: The migration CLI MUST return exit code `1` when invalid `SKILL.md` files are found.
- **FR-054**: The migration CLI MUST return exit code `1` in check mode when any legacy category fields remain.

#### Hook and Automation Requirements

- **FR-055**: The repository MUST provide `.husky/pre-commit` and it MUST execute `npm run check:pre-commit`.
- **FR-056**: `scripts/run-precommit-check.mjs` MUST inspect staged files and skip validation when no relevant validation targets are staged.
- **FR-057**: `scripts/run-precommit-check.mjs` MUST execute `npm run validate:skills` when relevant staged files are present.
- **FR-058**: `scripts/setup-hooks.mjs` MUST configure `git config core.hooksPath .husky` when the repository is a Git checkout.

#### Verification Baseline Requirements

- **FR-059**: The current repository baseline MUST compile successfully with `tsc -p tsconfig.json`.
- **FR-060**: The current repository baseline MUST compile sources and tests successfully with `tsc -p tsconfig.tests.json`.
- **FR-061**: The current repository baseline MUST pass 33 automated tests with no failures.
- **FR-062**: The current repository baseline MUST validate all 14 installed skills successfully and report `errors=0`.

### Key Entities *(include if feature involves data)*

- **SkillFrontmatter**: The required metadata pair `name` and `description` parsed from the top of `SKILL.md`.
- **SkillManifest**: The filesystem-backed representation of a valid skill without body text, including support file inventories.
- **LoadedSkill**: A `SkillManifest` plus the body text below frontmatter.
- **ValidationLocation**: A path, line, and column tuple attached to structural validation issues.
- **SkillValidationIssue**: A rule-based validation failure with a message and optional location.
- **SkillValidationRecord**: A per-folder validation outcome with status `valid`, `invalid`, or `missing`.
- **SkillValidationSummary**: The aggregate validation result containing ordered records and counts.
- **SkillMigrationRecord**: A per-folder migration outcome with status `updated`, `unchanged`, `invalid`, or `missing`.
- **SkillMigrationSummary**: The aggregate migration result containing ordered records and counts.
- **CliIo**: A simple abstraction with `stdout(message)` and `stderr(message)` callbacks used by both CLIs for testability.

### Current Installed Skills

The current baseline contains exactly these 14 installed skills:

1. `academic-writing`
2. `canva-mcp`
3. `document-qa`
4. `document-summary`
5. `markdown-format-normalization`
6. `markdown-structuring`
7. `note-exam-prep`
8. `obsidian-mcp`
9. `obsidian-note-linking`
10. `presentation-design`
11. `problem-definition`
12. `report-writing`
13. `research-strategy`
14. `search-mcp`

Detailed descriptions and reference-file counts are captured in [installed-skills.md](C:\Users\user\Documents\Projects_src\workspace\skill-registry\specs\001-skill-catalog\installed-skills.md).
The source and skill file list is captured in [file-index.md](C:\Users\user\Documents\Projects_src\workspace\skill-registry\specs\001-skill-catalog\file-index.md).

### Assumptions

- This baseline specification describes the repository as observed on 2026-03-19 and does not imply additional unpublished behavior.
- Source TypeScript files are the primary implementation artifacts; generated `dist/` and `dist-test/` outputs are reproducible build artifacts rather than the canonical source.
- The current repository contains no skill-level `scripts/` or `assets/` files, even though the loader supports those directories.
- The current repository includes `.specify/` workflow files in the working tree, but they are bootstrap tooling rather than product source files.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A new maintainer can reconstruct the repository package layout, scripts, and module responsibilities using this specification set without opening the source code first.
- **SC-002**: Running `cmd /c npm test` on the baseline workspace produces 33 passing tests and 0 failures.
- **SC-003**: Running `node dist/cli/validate-skills.js` on the baseline workspace reports `valid=14 invalid=0 missing=0 errors=0`.
- **SC-004**: A recreated `SKILL.md` parser following this specification rejects missing frontmatter delimiters, missing `name` or `description`, legacy `category`, non-kebab `name`, and folder-name mismatches exactly as the current implementation does.
- **SC-005**: A recreated validator following this specification reports missing resource references with rule id `missing-resource-reference`, exports JSON reports, and returns exit code `1` whenever total structural errors are non-zero.
- **SC-006**: A recreated migration implementation removes only the legacy `category` line and preserves all other file content, including line-ending style.
