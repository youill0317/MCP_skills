import { readdir } from "node:fs/promises";
import path from "node:path";
import { validateSkillId } from "../security/policy.js";
import { loadSkillManifest } from "./loader.js";
export async function validateSkills(skillsRoot) {
    const entries = await readdir(skillsRoot, { withFileTypes: true });
    const records = [];
    for (const entry of entries) {
        if (!entry.isDirectory()) {
            continue;
        }
        const skillId = entry.name;
        const skillFilePath = path.resolve(skillsRoot, skillId, "SKILL.md");
        if (!validateSkillId(skillId)) {
            records.push({
                skillId,
                status: "invalid",
                skillFilePath,
                message: "Folder name must use lowercase letters, numbers, and hyphens only."
            });
            continue;
        }
        try {
            await loadSkillManifest(skillsRoot, skillId);
            records.push({
                skillId,
                status: "valid",
                skillFilePath
            });
        }
        catch (error) {
            const err = error;
            records.push({
                skillId,
                status: err.code === "ENOENT" ? "missing" : "invalid",
                skillFilePath,
                message: err.message
            });
        }
    }
    records.sort((a, b) => a.skillId.localeCompare(b.skillId));
    return {
        records,
        valid: records.filter((record) => record.status === "valid").length,
        invalid: records.filter((record) => record.status === "invalid").length,
        missing: records.filter((record) => record.status === "missing").length
    };
}
