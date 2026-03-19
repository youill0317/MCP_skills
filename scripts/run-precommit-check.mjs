import { spawnSync } from "node:child_process";
const relevantPrefixes = [
  "skills/",
  "src/",
  "tests/",
  "evals/",
  ".github/workflows/",
  "README.md",
  "AGENTS.md",
  "package.json",
  "package-lock.json"
];

function run(command, args) {
  return spawnSync(command, args, {
    stdio: "inherit",
    encoding: "utf8"
  });
}

function runNpm(args) {
  if (process.platform === "win32") {
    return run("cmd.exe", ["/d", "/s", "/c", "npm.cmd", ...args]);
  }

  return run("npm", args);
}

const changedFiles = spawnSync("git", ["diff", "--cached", "--name-only", "--diff-filter=ACMR"], {
  stdio: "pipe",
  encoding: "utf8"
});

if (changedFiles.status === 0) {
  const relevantFiles = changedFiles.stdout
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .filter((line) => relevantPrefixes.some((prefix) => line === prefix || line.startsWith(prefix)));

  if (relevantFiles.length === 0) {
    console.log("pre-commit: no skill-registry validation targets staged; skipping.");
    process.exit(0);
  }
}

const validation = runNpm(["run", "validate:skills"]);
process.exit(validation.status ?? 1);
