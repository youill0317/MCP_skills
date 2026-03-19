import path from "node:path";
import { pathToFileURL } from "node:url";
import { resolveSkillsRootFromModule } from "../project-paths.js";
import { validateSkills } from "../skills/validate.js";
function printUsage(io) {
    io.stdout([
        "Usage: tsx src/cli/validate-skills.ts [--skills-root <path>] [--report text|json]",
        "",
        "Options:",
        "  --skills-root <path>   Override the default package-relative ./skills root.",
        "  --report <format>      Output format: text (default) or json.",
        "  --help                 Show this help message."
    ].join("\n"));
}
function parseCliOptions(argv) {
    const options = {
        help: false,
        report: "text"
    };
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
        if (arg === "--report") {
            const value = argv[index + 1];
            if (value !== "text" && value !== "json") {
                throw new Error("--report requires either 'text' or 'json'.");
            }
            options.report = value;
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
function formatIssue(issue) {
    const location = issue.location
        ? ` (${issue.location.path}:${issue.location.line}:${issue.location.column})`
        : "";
    return `    - ${issue.ruleId}: ${issue.message}${location}`;
}
function printTextSummary(io, summary, skillsRoot) {
    io.stdout(`Skills root: ${skillsRoot}`);
    io.stdout([
        "Summary:",
        `valid=${summary.valid}`,
        `invalid=${summary.invalid}`,
        `missing=${summary.missing}`,
        `errors=${summary.errors}`
    ].join(" "));
    for (const record of summary.records) {
        const detail = record.message ? ` (${record.message})` : "";
        io.stdout(`- ${record.skillId}: ${record.status} errors=${record.errors}${detail}`);
        for (const issue of record.issues) {
            io.stdout(formatIssue(issue));
        }
    }
}
export async function runValidateSkillsCli(argv, io) {
    try {
        const options = parseCliOptions(argv);
        if (options.help) {
            printUsage(io);
            return 0;
        }
        const skillsRoot = resolveSkillsRootFromModule(import.meta.url, options.skillsRoot);
        const summary = await validateSkills(skillsRoot);
        if (options.report === "json") {
            io.stdout(JSON.stringify({
                skillsRoot,
                summary
            }, null, 2));
        }
        else {
            printTextSummary(io, summary, skillsRoot);
        }
        if (summary.errors > 0) {
            io.stderr("Skill validation reported structural failures.");
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
