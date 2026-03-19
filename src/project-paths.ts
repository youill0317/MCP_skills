import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function findPackageRootFromModule(moduleUrl: string): string {
  let currentPath = path.dirname(fileURLToPath(moduleUrl));

  while (true) {
    const packageJsonPath = path.join(currentPath, "package.json");
    if (existsSync(packageJsonPath)) {
      return currentPath;
    }

    const parentPath = path.dirname(currentPath);
    if (parentPath === currentPath) {
      throw new Error(`Could not find package.json while resolving '${moduleUrl}'.`);
    }

    currentPath = parentPath;
  }
}

export function resolveSkillsRootFromModule(moduleUrl: string, skillsRootOverride?: string): string {
  const packageRoot = findPackageRootFromModule(moduleUrl);
  return path.resolve(packageRoot, skillsRootOverride ?? "skills");
}
