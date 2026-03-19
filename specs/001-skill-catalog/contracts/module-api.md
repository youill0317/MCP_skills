# Contract: Module API

## Purpose

Describe the current TypeScript module surface that another implementation must reproduce to match the repository baseline.

## `src/project-paths.ts`

### `findPackageRootFromModule(moduleUrl: string): string`

- Walks upward from the directory of `fileURLToPath(moduleUrl)`.
- Returns the first directory containing `package.json`.
- Throws an error if no `package.json` is found before the filesystem root.

### `resolveSkillsRootFromModule(moduleUrl: string, skillsRootOverride?: string): string`

- Calls `findPackageRootFromModule`.
- Returns `path.resolve(packageRoot, skillsRootOverride ?? "skills")`.

## `src/security/policy.ts`

### `validateSkillId(skillId: string): boolean`

- Returns whether `skillId` matches `^[a-z0-9-]{1,64}$`.

### `assertRelativeSubpath(relativePath: string): void`

- Throws when the path is empty.
- Throws when the path is absolute.
- Throws when normalization indicates parent traversal out of the allowed root.

### `resolvePathWithinRoot(rootPath: string, relativePath: string): string`

- Calls `assertRelativeSubpath`.
- Resolves the path against `rootPath`.
- Throws if the resolved path escapes `rootPath`.
- Returns the resolved absolute path.

### `normalizeToPosix(filePath: string): string`

- Replaces the platform path separator with `/`.

## `src/skills/loader.ts`

### `parseSimpleYamlFrontmatter(raw: string): FrontmatterParseResult`

- Exported helper used by validation and loading.
- Enforces the repository's current minimal frontmatter parser behavior.

### `validateSkillFrontmatter(frontmatter: SkillFrontmatter, skillId: string): void`

- Exported helper that enforces skill-name syntax and folder-name equality.

### `listFilesRecursivelyIfExists(rootPath: string, subFolder: string): Promise<string[]>`

- Exported helper that returns sorted POSIX-style relative paths for supported subdirectories or `[]` when the subdirectory does not exist.

### `loadSkillManifest(skillsRoot: string, skillId: string): Promise<SkillManifest>`

- Validates the skill id before any filesystem access.
- Resolves the skill root inside the provided `skillsRoot`.
- Reads `SKILL.md` as UTF-8.
- Parses and validates frontmatter.
- Recursively lists files under `references/`, `scripts/`, and `assets/`.

### `loadSkill(skillsRoot: string, skillId: string): Promise<LoadedSkill>`

- Calls `loadSkillManifest`.
- Re-reads `SKILL.md` as UTF-8.
- Parses frontmatter again.
- Returns the manifest plus trimmed body text.

### `listSkillIds(skillsRoot: string): Promise<string[]>`

- Lists direct child entries in `skillsRoot`.
- Includes only directories whose names satisfy `validateSkillId`.
- Sorts ids lexicographically.

### `listSkillManifests(skillsRoot: string): Promise<SkillManifest[]>`

- Calls `listSkillIds`.
- Attempts to load each manifest in order.
- Skips any skill whose manifest loading throws.

## `src/skills/validate.ts`

### `validateSkills(skillsRoot: string): Promise<SkillValidationSummary>`

- Iterates direct child directories under `skillsRoot`.
- Produces one validation record per directory.
- Uses exported loader helpers as the source of truth for frontmatter validation.
- Treats `ENOENT` as `missing` and other loader errors as `invalid`.
- Validates referenced resource paths in skill bodies.
- Aggregates per-record issue arrays and error counts.

## `src/skills/frontmatter-migration.ts`

### `removeLegacyCategoryFromSkillContent(raw: string): FrontmatterMigrationResult`

- Requires a valid frontmatter envelope.
- Removes only frontmatter lines matching `category: ...`.
- Preserves original line ending style.
- Returns `{ changed, content }`.

### `migrateSkillsFrontmatter(options: MigrateSkillsFrontmatterOptions): Promise<SkillMigrationSummary>`

- Iterates direct child directories under `skillsRoot`.
- Reads each `SKILL.md` as UTF-8.
- Returns `missing` when the file is absent.
- Returns `invalid` when parsing fails.
- In apply mode, writes updated content back to disk.
- In check mode, never writes changes.
