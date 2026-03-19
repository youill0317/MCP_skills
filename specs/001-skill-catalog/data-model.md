# Data Model: Current Repository Baseline

## Overview

The repository does not model persistent business data. Its effective data model is a set of in-memory records derived from the filesystem during one process execution. The sections below describe every explicit interface and temporary shape that participates in that process.

## Shared Exported Interfaces

### `SkillFrontmatter`

```ts
interface SkillFrontmatter {
  name: string;
  description: string;
}
```

- **Source module**: `src/types.ts`
- **Meaning**: Minimal metadata required in every valid `SKILL.md`.
- **Rules**:
- `name` must be present.
- `description` must be present.
- `name` must satisfy the skill id regex and match the folder id after additional validation.

### `SkillManifest`

```ts
interface SkillManifest extends SkillFrontmatter {
  id: string;
  rootPath: string;
  skillFilePath: string;
  references: string[];
  scripts: string[];
  assets: string[];
}
```

- **Source module**: `src/types.ts`
- **Meaning**: Valid skill metadata plus discovered support-file inventories.
- **Rules**:
- `id` is the validated folder id.
- `rootPath` is the absolute path to the skill folder.
- `skillFilePath` is the absolute path to `SKILL.md`.
- `references`, `scripts`, and `assets` are relative paths from the skill root, normalized to POSIX separators and sorted.

### `LoadedSkill`

```ts
interface LoadedSkill extends SkillManifest {
  body: string;
}
```

- **Source module**: `src/types.ts`
- **Meaning**: A `SkillManifest` plus the trimmed Markdown body of `SKILL.md`.

### `SkillValidationRecord`

```ts
interface SkillValidationRecord {
  skillId: string;
  status: "valid" | "invalid" | "missing";
  skillFilePath: string;
  message?: string;
}
```

- **Source module**: `src/types.ts`
- **Meaning**: Validation result for one direct child directory under the skills root.
- **Rules**:
- `message` is present for invalid directory names and for thrown manifest-loading errors.
- `skillFilePath` is always the expected absolute path to `SKILL.md`, even when the file is missing.
- `issues` contains rule-level structural findings.
- `errors` equals the number of deduplicated issues in the record.

### `SkillValidationSummary`

```ts
interface SkillValidationSummary {
  records: SkillValidationRecord[];
  valid: number;
  invalid: number;
  missing: number;
}
```

- **Source module**: `src/types.ts`
- **Meaning**: Aggregated validation result for the full scan.
- **Rules**:
- `errors` is the sum of `record.errors` across all records.

## Migration Interfaces

### `SkillMigrationRecord`

```ts
interface SkillMigrationRecord {
  skillId: string;
  status: "updated" | "unchanged" | "invalid" | "missing";
  skillFilePath: string;
  message?: string;
}
```

- **Source module**: `src/skills/frontmatter-migration.ts`
- **Meaning**: Migration result for one skill directory.

### `SkillMigrationSummary`

```ts
interface SkillMigrationSummary {
  records: SkillMigrationRecord[];
  updated: number;
  unchanged: number;
  invalid: number;
  missing: number;
}
```

- **Source module**: `src/skills/frontmatter-migration.ts`
- **Meaning**: Aggregated migration result for one skills-root scan.

### `MigrateSkillsFrontmatterOptions`

```ts
interface MigrateSkillsFrontmatterOptions {
  skillsRoot: string;
  check?: boolean;
}
```

- **Source module**: `src/skills/frontmatter-migration.ts`
- **Meaning**: Input options for migration.
- **Rules**:
- `skillsRoot` is required and expected to point to a directory containing skill folders.
- `check` defaults to `false`.

### `FrontmatterMigrationResult`

```ts
interface FrontmatterMigrationResult {
  changed: boolean;
  content: string;
}
```

- **Source module**: `src/skills/frontmatter-migration.ts`
- **Meaning**: Pure-function result from removing a legacy `category` field.

## Internal Loader Shape

### `FrontmatterParseResult`

```ts
interface FrontmatterParseResult {
  frontmatter: SkillFrontmatter;
  body: string;
}
```

- **Source module**: `src/skills/loader.ts`
- **Meaning**: Internal return value from the line-based frontmatter parser.

## CLI-Side Shapes

### `CliIo`

```ts
interface CliIo {
  stdout(message: string): void;
  stderr(message: string): void;
}
```

- **Source modules**: `src/cli/validate-skills.ts`, `src/cli/migrate-skills-frontmatter.ts`
- **Meaning**: Testable I/O abstraction used instead of writing directly to process streams.

### `CliOptions` in `validate-skills.ts`

```ts
interface CliOptions {
  help: boolean;
  report: "text" | "json";
  skillsRoot?: string;
}
```

### `CliOptions` in `migrate-skills-frontmatter.ts`

```ts
interface CliOptions {
  check: boolean;
  help: boolean;
  skillsRoot?: string;
}
```

## Parser and State Transitions

### Frontmatter Parsing Flow

```text
raw file
-> verify file starts with "---"
-> split into lines
-> find closing "---"
-> collect frontmatter lines
-> ignore blanks and comment lines
-> capture "key: value" pairs
-> require name and description
-> reject legacy category
-> return frontmatter + trimmed body
```

### Validation State Flow

```text
directory discovered
-> invalid name      => invalid record
-> valid name + manifest loads => valid record
-> valid name + ENOENT         => missing record
-> valid name + other error    => invalid record
-> valid manifest + broken resource reference => invalid record with rule-level issues
```

### Migration State Flow

```text
directory discovered
-> SKILL.md missing           => missing record
-> file unreadable otherwise  => invalid record
-> file parses and changes    => updated record
-> file parses without change => unchanged record
-> malformed file             => invalid record
```

## Installed Skill Inventory Summary

- Installed skill count: 14
- Total files under `skills/`: 99
- Reference files present across installed skills: 81
- Installed skill scripts: 0
- Installed skill assets: 0
- Validation summary errors on the current repository baseline: 0

Per-skill details are captured in [installed-skills.md](C:\Users\user\Documents\Projects_src\workspace\skill-registry\specs\001-skill-catalog\installed-skills.md).
