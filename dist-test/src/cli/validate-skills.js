import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { validateSkills } from "../skills/validate.js";
function printUsage(io) {
    io.stdout([
        "Usage: tsx src/cli/validate-skills.ts [--skills-root <path>]",
        "",
        "Options:",
        "  --skills-root <path>  Override the default ./skills root.",
        "  --help                Show this help message."
    ].join("\n"));
}
function parseCliOptions(argv) {
    const options = { help: false };
    for (let index = 0; index < argv.length; index += 1) {
        const arg = argv[index];
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
function printSummary(io, summary, skillsRoot) {
    io.stdout(`Skills root: ${skillsRoot}`);
    io.stdout(`Summary: valid=${summary.valid} invalid=${summary.invalid} missing=${summary.missing}`);
    for (const record of summary.records) {
        const detail = record.message ? ` (${record.message})` : "";
        io.stdout(`- ${record.skillId}: ${record.status}${detail}`);
    }
}
export async function runValidateSkillsCli(argv, io) {
    try {
        const options = parseCliOptions(argv);
        if (options.help) {
            printUsage(io);
            return 0;
        }
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const projectRoot = path.resolve(__dirname, "../..");
        const skillsRoot = path.resolve(projectRoot, options.skillsRoot ?? "skills");
        const summary = await validateSkills(skillsRoot);
        printSummary(io, summary, skillsRoot);
        if (summary.invalid > 0 || summary.missing > 0) {
            io.stderr("Skill validation failed. Fix invalid or missing SKILL.md files.");
            return 1;
        }
        return 0;
    }
    catch (error) {
        io.stderr(error.message);
        return 1;
    }
}
const invokedPath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : null;
if (invokedPath === import.meta.url) {
    const exitCode = await runValidateSkillsCli(process.argv.slice(2), {
        stdout: (message) => process.stdout.write(`${message}\n`),
        stderr: (message) => process.stderr.write(`${message}\n`)
    });
    process.exitCode = exitCode;
}
