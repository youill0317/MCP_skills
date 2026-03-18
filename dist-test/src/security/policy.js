import path from "node:path";
const SKILL_ID_PATTERN = /^[a-z0-9-]{1,64}$/;
export function validateSkillId(skillId) {
    return SKILL_ID_PATTERN.test(skillId);
}
export function assertRelativeSubpath(relativePath) {
    if (!relativePath || relativePath.trim() === "") {
        throw new Error("Path must not be empty.");
    }
    if (path.isAbsolute(relativePath)) {
        throw new Error("Absolute paths are not allowed.");
    }
    const normalized = path.normalize(relativePath);
    const startsWithParent = normalized.startsWith("..") || normalized.startsWith(`..${path.sep}`);
    if (startsWithParent) {
        throw new Error("Path traversal is not allowed.");
    }
}
export function resolvePathWithinRoot(rootPath, relativePath) {
    assertRelativeSubpath(relativePath);
    const resolved = path.resolve(rootPath, relativePath);
    const relativeToRoot = path.relative(rootPath, resolved);
    if (relativeToRoot.startsWith("..") || path.isAbsolute(relativeToRoot)) {
        throw new Error("Resolved path escaped the allowed root.");
    }
    return resolved;
}
export function normalizeToPosix(filePath) {
    return filePath.split(path.sep).join("/");
}
