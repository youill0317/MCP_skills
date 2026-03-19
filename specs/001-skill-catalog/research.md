# Research: Current Repository Baseline

## Decision 1: Use the filesystem as the only source of truth

- **Decision**: The repository stores skills directly under `skills/` and derives all runtime information from directory contents rather than a separate manifest database or registry index.
- **Rationale**: Every library and CLI path starts from the filesystem. `resolveSkillsRootFromModule` locates the package root, and all loader, validation, and migration logic traverses directories and files directly from there.
- **Alternatives considered**:
- A central JSON manifest file. Rejected by the current implementation because no such file exists and the code derives inventories dynamically.
- A database-backed registry. Rejected because the current implementation contains no database code or runtime dependency.

## Decision 2: Keep parsing deliberately simple

- **Decision**: `SKILL.md` frontmatter parsing is a narrow, line-based parser rather than a general YAML parser.
- **Rationale**: The parser accepts only the fields the repository needs today: `name` and `description`, with simple quoted or unquoted one-line values. This keeps the implementation dependency-free and easy to reason about.
- **Alternatives considered**:
- Full YAML parsing through a third-party library. Rejected because the package has no runtime dependencies and the repository does not need full YAML expressiveness.
- Parsing Markdown bodies for structure. Rejected because the loader only needs metadata and raw body text.

## Decision 3: Separate library behavior from CLI behavior

- **Decision**: Core logic lives in `src/skills/` and `src/security/`, while CLI modules focus on argument parsing, summary output, and exit codes.
- **Rationale**: The tests call both library functions and CLI entrypoints directly. This separation makes the library reusable and keeps CLIs thin and testable through the `CliIo` abstraction.
- **Alternatives considered**:
- Putting validation and migration logic directly inside CLI files. Rejected by the current architecture because it would reduce testability and reuse.

## Decision 4: Treat invalid and missing skills differently

- **Decision**: Validation distinguishes between `invalid` and `missing`.
- **Rationale**: A folder with a malformed or rule-breaking `SKILL.md` is semantically different from a folder with no `SKILL.md` at all. The current implementation preserves that distinction in status and summary counts.
- **Alternatives considered**:
- One combined failure state. Rejected because tests explicitly assert distinct handling for invalid folder names and missing `SKILL.md`.

## Decision 5: Validate referenced resource paths as structural integrity, not content quality

- **Decision**: Validation now inspects raw body text and Markdown links for `references/`, `scripts/`, and `assets/` targets, then verifies that each target exists inside the current skill root.
- **Rationale**: The repository's README now frames validation as minimal integrity checking. Broken intra-skill references are structural defects and fit that scope without expanding into subjective content review.
- **Alternatives considered**:
- Ignore body references entirely. Rejected because broken internal references make a skill structurally incomplete.
- Attempt to score prose quality or instructional quality automatically. Rejected because the repository explicitly leaves quality review to a separate LLM-driven process.

## Decision 6: Migration must be safe and minimal

- **Decision**: Frontmatter migration removes only the legacy `category` line and preserves all other file content, including original line endings.
- **Rationale**: `removeLegacyCategoryFromSkillContent` detects `\r\n` versus `\n`, filters only matching `category:` lines from the frontmatter block, and rejoins the untouched remainder of the document.
- **Alternatives considered**:
- Re-serialize full frontmatter from parsed objects. Rejected because it would risk reformatting unrelated lines.
- Rewrite all skill files regardless of need. Rejected because unchanged files should stay byte-stable.

## Decision 7: Deterministic ordering is mandatory

- **Decision**: Skill ids, manifests, validation records, migration records, and recursive file lists are sorted lexicographically.
- **Rationale**: Tests depend on predictable ordering, and deterministic output makes the repository easier to review and consume.
- **Alternatives considered**:
- Preserve OS directory traversal order. Rejected because it is less predictable across environments.

## Decision 8: Package-root-relative resolution must survive cwd changes

- **Decision**: CLI defaults resolve the package root from `import.meta.url` rather than from the current working directory.
- **Rationale**: The validation CLI test changes the current working directory and still expects the default `skills` root to resolve correctly. The current code satisfies that requirement with `findPackageRootFromModule`.
- **Alternatives considered**:
- Resolving from `process.cwd()`. Rejected because it would fail the current test suite and make CLI behavior sensitive to launch location.

## Decision 9: Keep pre-commit automation narrow

- **Decision**: The repository uses a single `pre-commit` hook that runs `npm run check:pre-commit`, and that helper script only invokes validation when staged files intersect a narrow set of relevant prefixes.
- **Rationale**: This keeps the integrity gate cheap and predictable while avoiding unnecessary validation on unrelated commits.
- **Alternatives considered**:
- Always run validation on every commit. Rejected because the script intentionally skips when no relevant files are staged.
- Run prose quality review in Git hooks. Rejected because the current repository keeps that concern outside automated hooks.
