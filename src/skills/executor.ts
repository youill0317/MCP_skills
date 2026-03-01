import { access } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import type { AppConfig, LoadedSkill, ScriptExecutionResult } from "../types.js";
import { isScriptAllowed, normalizeToPosix, resolvePathWithinRoot } from "../security/policy.js";

function commandForScript(absoluteScriptPath: string): { command: string; args: string[] } {
  const ext = path.extname(absoluteScriptPath).toLowerCase();
  if (ext === ".js" || ext === ".mjs" || ext === ".cjs") {
    return { command: process.execPath, args: [absoluteScriptPath] };
  }

  if (ext === ".ps1") {
    return {
      command: "powershell",
      args: ["-ExecutionPolicy", "Bypass", "-File", absoluteScriptPath]
    };
  }

  return { command: absoluteScriptPath, args: [] };
}

export async function runSkillScript(options: {
  config: AppConfig;
  skill: LoadedSkill;
  relativeScriptPath: string;
  args?: string[];
}): Promise<ScriptExecutionResult> {
  const { config, skill, relativeScriptPath, args = [] } = options;
  const normalizedScript = normalizeToPosix(relativeScriptPath);
  const allowed = config.scriptExecution.enabledByDefault || isScriptAllowed(config, skill.id, normalizedScript);

  if (!allowed) {
    return {
      allowed: false,
      exit_code: -1,
      stdout: "",
      stderr: `Script '${normalizedScript}' is not in the allow list for skill '${skill.id}'.`
    };
  }

  const absoluteScriptPath = resolvePathWithinRoot(skill.rootPath, normalizedScript);
  await access(absoluteScriptPath, constants.R_OK);

  const launch = commandForScript(absoluteScriptPath);
  const maxOutputBytes = config.scriptExecution.maxOutputBytes;
  const timeoutMs = config.scriptExecution.timeoutMs;

  return new Promise<ScriptExecutionResult>((resolve) => {
    const child = spawn(launch.command, [...launch.args, ...args], {
      cwd: skill.rootPath,
      windowsHide: true
    });

    let stdout = "";
    let stderr = "";
    let didTruncate = false;
    let timedOut = false;

    const appendChunk = (current: string, chunk: Buffer): string => {
      if (didTruncate) {
        return current;
      }

      const next = current + chunk.toString("utf8");
      if (Buffer.byteLength(next, "utf8") > maxOutputBytes) {
        didTruncate = true;
        return next.slice(0, maxOutputBytes) + "\n[output truncated]";
      }

      return next;
    };

    const timeoutHandle = setTimeout(() => {
      timedOut = true;
      child.kill();
    }, timeoutMs);

    child.stdout?.on("data", (chunk: Buffer) => {
      stdout = appendChunk(stdout, chunk);
    });

    child.stderr?.on("data", (chunk: Buffer) => {
      stderr = appendChunk(stderr, chunk);
    });

    child.on("error", (error) => {
      clearTimeout(timeoutHandle);
      resolve({
        allowed: true,
        exit_code: -1,
        stdout,
        stderr: `${stderr}\n${error.message}`.trim()
      });
    });

    child.on("close", (exitCode) => {
      clearTimeout(timeoutHandle);

      if (timedOut) {
        resolve({
          allowed: true,
          exit_code: -1,
          stdout,
          stderr: `${stderr}\nScript execution timed out after ${timeoutMs}ms.`.trim()
        });
        return;
      }

      resolve({
        allowed: true,
        exit_code: exitCode ?? -1,
        stdout,
        stderr
      });
    });
  });
}
