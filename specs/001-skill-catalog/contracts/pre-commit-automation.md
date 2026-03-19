# Contract: Pre-Commit Automation

## Purpose

Describe the current minimal integrity automation added around validation.

## Files

- `.husky/pre-commit`
- `scripts/run-precommit-check.mjs`
- `scripts/setup-hooks.mjs`

## `.husky/pre-commit`

- Shell entrypoint.
- Runs `npm run check:pre-commit`.

## `scripts/run-precommit-check.mjs`

- Reads staged file paths using `git diff --cached --name-only --diff-filter=ACMR`.
- Filters staged files against these relevant prefixes:
- `skills/`
- `src/`
- `tests/`
- `evals/`
- `.github/workflows/`
- `README.md`
- `AGENTS.md`
- `package.json`
- `package-lock.json`
- When no relevant staged files are present, prints `pre-commit: no skill-registry validation targets staged; skipping.` and exits `0`.
- When relevant staged files are present, runs `npm run validate:skills`.
- Uses `cmd.exe /d /s /c npm.cmd ...` on Windows and `npm` directly on non-Windows platforms.

## `scripts/setup-hooks.mjs`

- Resolves the repository root from the script location.
- Exits early with a skip message when `.git` does not exist.
- Runs `git config core.hooksPath .husky`.
- Attempts to `chmod 755` the known hook files.
- Prints `Git hooks configured to use .husky/.` on success.
