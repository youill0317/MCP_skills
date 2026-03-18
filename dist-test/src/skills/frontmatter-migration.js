import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
export function removeLegacyCategoryFromSkillContent(raw) {
    const eol = raw.includes("\r\n") ? "\r\n" : "\n";
    const lines = raw.split(/\r?\n/);
    if (!raw.startsWith("---")) {
        throw new Error("SKILL.md must start with YAML frontmatter.");
    }
    if (lines[0].trim() !== "---") {
        throw new Error("SKILL.md frontmatter opening must be '---'.");
    }
    const closingOffset = lines.slice(1).findIndex((line) => line.trim() === "---");
    if (closingOffset === -1) {
        throw new Error("SKILL.md frontmatter closing '---' not found.");
    }
    const closingIndex = closingOffset + 1;
    const frontmatterLines = lines.slice(1, closingIndex);
    const filteredFrontmatterLines = frontmatterLines.filter((line) => !/^\s*category\s*:\s*.+\s*$/.test(line));
    if (filteredFrontmatterLines.length === frontmatterLines.length) {
        return {
            changed: false,
            content: raw
        };
    }
    const nextContent = ["---", ...filteredFrontmatterLines, "---", ...lines.slice(closingIndex + 1)].join(eol);
    return {
        changed: true,
        content: nextContent
    };
}
export async function migrateSkillsFrontmatter(options) {
    const { skillsRoot, check = false } = options;
    const entries = await readdir(skillsRoot, { withFileTypes: true });
    const records = [];
    for (const entry of entries) {
        if (!entry.isDirectory()) {
            continue;
        }
        const skillId = entry.name;
        const skillFilePath = path.resolve(skillsRoot, skillId, "SKILL.md");
        let raw;
        try {
            raw = await readFile(skillFilePath, "utf8");
        }
        catch (error) {
            const message = error.message;
            const missing = error.code === "ENOENT";
            records.push({
                skillId,
                status: missing ? "missing" : "invalid",
                skillFilePath,
                message
            });
            continue;
        }
        try {
            const result = removeLegacyCategoryFromSkillContent(raw);
            if (result.changed && !check) {
                await writeFile(skillFilePath, result.content, "utf8");
            }
            records.push({
                skillId,
                status: result.changed ? "updated" : "unchanged",
                skillFilePath
            });
        }
        catch (error) {
            records.push({
                skillId,
                status: "invalid",
                skillFilePath,
                message: error.message
            });
        }
    }
    records.sort((a, b) => a.skillId.localeCompare(b.skillId));
    return {
        records,
        updated: records.filter((record) => record.status === "updated").length,
        unchanged: records.filter((record) => record.status === "unchanged").length,
        invalid: records.filter((record) => record.status === "invalid").length,
        missing: records.filter((record) => record.status === "missing").length
    };
}
