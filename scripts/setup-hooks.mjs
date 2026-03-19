import { chmodSync, existsSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const huskyRoot = path.join(repoRoot, ".husky");
const hookFiles = ["pre-commit"];

function runGit(args) {
  return spawnSync("git", args, {
    cwd: repoRoot,
    stdio: "pipe",
    encoding: "utf8"
  });
}

if (!existsSync(path.join(repoRoot, ".git"))) {
  console.log("setup:hooks skipped because this directory is not a Git repository checkout.");
  process.exit(0);
}

const configResult = runGit(["config", "core.hooksPath", ".husky"]);
if (configResult.status !== 0) {
  const stderr = typeof configResult.stderr === "string" ? configResult.stderr.trim() : "";
  console.warn(stderr || configResult.error?.message || "Failed to configure core.hooksPath.");
  process.exit(0);
}

for (const hookFile of hookFiles) {
  const absolutePath = path.join(huskyRoot, hookFile);
  if (!existsSync(absolutePath)) {
    continue;
  }

  try {
    chmodSync(absolutePath, 0o755);
  } catch {
    // Git for Windows does not require chmod to succeed.
  }
}

console.log("Git hooks configured to use .husky/.");
