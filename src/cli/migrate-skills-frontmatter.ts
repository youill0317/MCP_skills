import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { loadConfig, resolveSkillsRoot } from "../security/policy.js";
import { migrateSkillsFrontmatter, type SkillMigrationSummary } from "../skills/frontmatter-migration.js";

interface CliIo {
  stdout(message: string): void;
  stderr(message: string): void;
}

interface CliOptions {
  check: boolean;
  help: boolean;
  skillsRoot?: string;
}

function printUsage(io: CliIo): void {
  io.stdout(
    [
      "Usage: tsx src/cli/migrate-skills-frontmatter.ts [--check] [--skills-root <path>]",
      "",
      "Options:",
      "  --check               Report legacy category fields without rewriting files.",
      "  --skills-root <path>  Override the configured skills root.",
      "  --help                Show this help message."
    ].join("\n")
  );
}

function parseCliOptions(argv: string[]): CliOptions {
  const options: CliOptions = { check: false, help: false };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--check") {
      options.check = true;
      continue;
    }

    if (arg === "--skills-root") {
      const value = argv[index + 1];
      if (!value) {
        throw new Error("--skills-root requires a path value.");
      }
      options.skillsRoot = value;
      index += 1;
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }

    throw new Error(`Unknown argument '${arg}'.`);
  }

  return options;
}

function printSummary(io: CliIo, summary: SkillMigrationSummary, check: boolean, skillsRoot: string): void {
  const modeLabel = check ? "check" : "apply";
  io.stdout(`Skills root: ${skillsRoot}`);
  io.stdout(`Mode: ${modeLabel}`);
  io.stdout(
    `Summary: updated=${summary.updated} unchanged=${summary.unchanged} invalid=${summary.invalid} missing=${summary.missing}`
  );

  for (const record of summary.records) {
    const detail = record.message ? ` (${record.message})` : "";
    io.stdout(`- ${record.skillId}: ${record.status}${detail}`);
  }
}

export async function runFrontmatterMigrationCli(argv: string[], io: CliIo): Promise<number> {
  try {
    const options = parseCliOptions(argv);
    if (options.help) {
      printUsage(io);
      return 0;
    }

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const projectRoot = path.resolve(__dirname, "../..");
    const configPath = path.resolve(projectRoot, "config", "mcp-skills.config.json");
    const config = await loadConfig(configPath);
    const skillsRoot = resolveSkillsRoot(projectRoot, options.skillsRoot ?? config.skillsRoot);
    const summary = await migrateSkillsFrontmatter({
      skillsRoot,
      check: options.check
    });

    printSummary(io, summary, options.check, skillsRoot);

    if (summary.invalid > 0) {
      io.stderr("Invalid SKILL.md files were found. Fix them before starting the server.");
      return 1;
    }

    if (options.check && summary.updated > 0) {
      io.stderr("Legacy category frontmatter still exists. Run the migration without --check.");
      return 1;
    }

    return 0;
  } catch (error) {
    io.stderr((error as Error).message);
    return 1;
  }
}

const invokedPath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : null;
if (invokedPath === import.meta.url) {
  const exitCode = await runFrontmatterMigrationCli(process.argv.slice(2), {
    stdout: (message) => process.stdout.write(`${message}\n`),
    stderr: (message) => process.stderr.write(`${message}\n`)
  });
  process.exitCode = exitCode;
}
