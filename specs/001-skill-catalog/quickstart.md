# Quickstart: Reproduce the Current Repository

## 1. Prerequisites

- Node.js 20 or newer
- npm available from the Node.js installation
- A local checkout of this repository

## 2. Install dependencies

```powershell
cmd /c npm install
```

Expected result:

- `node_modules/` is populated.
- The installed development dependencies are `typescript` and `@types/node`.
- `prepare` also attempts to configure Git hooks through `npm run setup:hooks`.

## 3. Build the source tree

```powershell
cmd /c npm run build
```

Expected result:

- TypeScript files under `src/` compile into `dist/`.
- Generated files include:
- `dist/project-paths.js`
- `dist/types.js`
- `dist/security/policy.js`
- `dist/skills/frontmatter-migration.js`
- `dist/skills/loader.js`
- `dist/skills/validate.js`
- `dist/cli/validate-skills.js`
- `dist/cli/migrate-skills-frontmatter.js`

## 4. Run the full automated test suite

```powershell
cmd /c npm test
```

Expected result:

- `src/` and `tests/` compile into `dist-test/`.
- Node executes `dist-test/tests/all.test.js`.
- The current baseline reports 33 passing tests and 0 failures.

## 5. Validate the installed skills

```powershell
cmd /c npm run validate:skills
```

Expected result:

- The CLI resolves the default skills root to the package-relative `skills/` directory.
- The summary reports `valid=14 invalid=0 missing=0 errors=0`.
- Every installed skill is listed individually as `valid`.

## 6. Inspect JSON validation output

```powershell
node dist/cli/validate-skills.js --report json
```

Expected result:

- The command prints JSON containing `skillsRoot`, `summary.records`, and `summary.errors`.
- The current baseline reports `summary.errors` as `0`.

## 7. Inspect CLI help text

```powershell
node dist/cli/validate-skills.js --help
node dist/cli/migrate-skills-frontmatter.js --help
```

Expected result:

- The validation CLI documents `--skills-root`, `--report`, and `--help`.
- The migration CLI documents `--check`, `--skills-root`, and `--help`.

## 8. Configure Git hooks

```powershell
cmd /c npm run setup:hooks
```

Expected result:

- In a normal Git checkout, the script configures `core.hooksPath` to `.husky`.
- In restricted environments, Git configuration may fail even though the script exists and is wired through `prepare`.

## 9. Run frontmatter migration in report-only mode

```powershell
node dist/cli/migrate-skills-frontmatter.js --check
```

Expected result:

- On the current baseline, no updates are needed because installed skills do not contain the legacy `category` field.
- The command exits successfully unless a malformed or missing `SKILL.md` is introduced.

## 10. Validate behavior against fixtures

To reproduce failure behavior, create temporary skill roots that contain:

- An invalid folder name such as `Bad Skill`
- A valid folder id with no `SKILL.md`
- A `SKILL.md` containing a legacy `category: task`
- A `SKILL.md` whose frontmatter `name` mismatches the folder id
- A `SKILL.md` body referencing `references/missing.md`

The automated test suite already codifies these scenarios in:

- [validate-skills.test.ts](C:\Users\user\Documents\Projects_src\workspace\skill-registry\tests\validate-skills.test.ts)
- [frontmatter-migration.test.ts](C:\Users\user\Documents\Projects_src\workspace\skill-registry\tests\frontmatter-migration.test.ts)
- [loader.test.ts](C:\Users\user\Documents\Projects_src\workspace\skill-registry\tests\loader.test.ts)
