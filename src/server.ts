import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema
} from "@modelcontextprotocol/sdk/types.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import type { RunSkillArguments, RunSkillResult } from "./types.js";
import { loadConfig, resolvePathWithinRoot, resolveSkillsRoot, validateSkillId } from "./security/policy.js";
import { compileInstructions, type ReferenceLoad } from "./skills/compiler.js";
import { loadSkill, listSkillManifests } from "./skills/loader.js";
import { runSkillScript } from "./skills/executor.js";
import { buildListSkillsResult } from "./skills/list-skills.js";

const RUN_SKILL_TOOL = {
  name: "run_skill",
  description:
    "Run a skill-like workflow by loading SKILL.md instructions and explicitly requested references or allow-listed scripts.",
  inputSchema: {
    type: "object",
    properties: {
      skill_id: {
        type: "string",
        description: "Skill folder ID (lowercase letters, numbers, hyphens)."
      },
      task: {
        type: "string",
        description: "Task instruction for this skill run."
      },
      inputs: {
        type: "object",
        description: "Optional JSON inputs for the skill."
      },
      reference_paths: {
        type: "array",
        items: { type: "string" },
        description: "Optional list of reference file paths to load from this skill root."
      },
      execution: {
        type: "object",
        properties: {
          mode: {
            type: "string",
            enum: ["guide", "run_script"],
            description: "guide=compile instructions only, run_script=execute an allow-listed script."
          },
          script: {
            type: "string",
            description: "Relative path of script under this skill folder (for run_script mode)."
          },
          args: {
            type: "array",
            items: { type: "string" },
            description: "String arguments passed to the script."
          }
        },
        additionalProperties: false
      }
    },
    required: ["skill_id", "task"],
    additionalProperties: false
  }
};

const LIST_SKILLS_TOOL = {
  name: "list_skills",
  description: "List installed skills with id, name, description, and available reference paths.",
  inputSchema: {
    type: "object",
    properties: {},
    additionalProperties: false
  }
};

function logEvent(event: Record<string, unknown>): void {
  process.stderr.write(`${JSON.stringify({ timestamp: new Date().toISOString(), ...event })}\n`);
}

function safeParseRunSkillArguments(raw: unknown): RunSkillArguments {
  if (!raw || typeof raw !== "object") {
    throw new Error("Arguments must be an object.");
  }

  const args = raw as Record<string, unknown>;
  const skillId = args.skill_id;
  const task = args.task;

  if (typeof skillId !== "string" || !validateSkillId(skillId)) {
    throw new Error("skill_id is required and must match [a-z0-9-]{1,64}.");
  }

  if (typeof task !== "string" || task.trim() === "") {
    throw new Error("task is required and must be a non-empty string.");
  }

  const result: RunSkillArguments = {
    skill_id: skillId,
    task
  };

  if (args.inputs && typeof args.inputs === "object" && !Array.isArray(args.inputs)) {
    result.inputs = args.inputs as Record<string, unknown>;
  }

  if (Array.isArray(args.reference_paths)) {
    const values = args.reference_paths.filter((item): item is string => typeof item === "string");
    result.reference_paths = values;
  }

  if (args.execution && typeof args.execution === "object" && !Array.isArray(args.execution)) {
    const executionRaw = args.execution as Record<string, unknown>;
    const mode =
      executionRaw.mode === "guide" || executionRaw.mode === "run_script"
        ? executionRaw.mode
        : undefined;

    const script = typeof executionRaw.script === "string" ? executionRaw.script : undefined;
    const scriptArgs = Array.isArray(executionRaw.args)
      ? executionRaw.args.filter((item): item is string => typeof item === "string")
      : undefined;

    result.execution = {
      mode,
      script,
      args: scriptArgs
    };
  }

  return result;
}

async function loadReferenceFiles(options: {
  skillRoot: string;
  requestedPaths?: string[];
  maxTotalBytes: number;
}): Promise<{ references: ReferenceLoad[]; warnings: string[] }> {
  const { skillRoot, requestedPaths = [], maxTotalBytes } = options;
  const warnings: string[] = [];
  const references: ReferenceLoad[] = [];

  if (requestedPaths.length === 0) {
    return { references, warnings };
  }

  let totalBytes = 0;
  for (const relativePath of requestedPaths) {
    if (!relativePath.startsWith("references/")) {
      warnings.push(`Skipped '${relativePath}': only files under references/ are allowed.`);
      continue;
    }

    let absolutePath: string;
    try {
      absolutePath = resolvePathWithinRoot(skillRoot, relativePath);
    } catch (error) {
      warnings.push(`Skipped invalid reference path '${relativePath}': ${(error as Error).message}`);
      continue;
    }

    let content: string;
    try {
      content = await readFile(absolutePath, "utf8");
    } catch (error) {
      warnings.push(`Skipped '${relativePath}': ${(error as Error).message}`);
      continue;
    }

    const bytes = Buffer.byteLength(content, "utf8");
    if (totalBytes + bytes > maxTotalBytes) {
      warnings.push(`Skipped '${relativePath}' because reference size limit (${maxTotalBytes} bytes) would be exceeded.`);
      continue;
    }

    totalBytes += bytes;
    references.push({
      path: relativePath,
      content,
      bytes
    });
  }

  return { references, warnings };
}

function skillIdFromManifestUri(uri: string): string | null {
  const match = /^skills:\/\/([a-z0-9-]+)\/manifest$/.exec(uri);
  return match ? match[1] : null;
}

async function main(): Promise<void> {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  // dist/server.js -> project root (one level up from dist/)
  const projectRoot = path.resolve(__dirname, "..");
  const configPath = path.resolve(projectRoot, "config", "mcp-skills.config.json");
  const config = await loadConfig(configPath);
  const skillsRoot = resolveSkillsRoot(projectRoot, config.skillsRoot);

  const server = new Server(
    {
      name: "mcp-skills-bridge",
      version: "0.1.0"
    },
    {
      capabilities: {
        tools: {},
        resources: {}
      }
    }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [LIST_SKILLS_TOOL, RUN_SKILL_TOOL]
    };
  });

  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    const manifests = await listSkillManifests(skillsRoot);
    const resources = [
      {
        uri: "skills://index",
        name: "skills index",
        description: "List of all installed skills with metadata.",
        mimeType: "application/json"
      },
      ...manifests.map((manifest) => ({
        uri: `skills://${manifest.id}/manifest`,
        name: `${manifest.id} manifest`,
        description: manifest.description,
        mimeType: "application/json"
      }))
    ];

    return { resources };
  });

  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const uri = request.params.uri;

    if (uri === "skills://index") {
      const manifests = await listSkillManifests(skillsRoot);
      const payload = manifests.map((manifest) => ({
        id: manifest.id,
        name: manifest.name,
        description: manifest.description,
        references: manifest.references
      }));
      return {
        contents: [
          {
            uri,
            mimeType: "application/json",
            text: JSON.stringify(payload, null, 2)
          }
        ]
      };
    }

    const skillId = skillIdFromManifestUri(uri);
    if (!skillId) {
      throw new Error(`Unsupported resource URI: ${uri}`);
    }

    const manifest = await loadSkill(skillsRoot, skillId);
    const payload = {
      id: manifest.id,
      name: manifest.name,
      description: manifest.description,
      references: manifest.references,
      scripts: manifest.scripts,
      assets: manifest.assets
    };

    return {
      contents: [
        {
          uri,
          mimeType: "application/json",
          text: JSON.stringify(payload, null, 2)
        }
      ]
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === LIST_SKILLS_TOOL.name) {
      const startedAt = Date.now();
      try {
        const result = await buildListSkillsResult(skillsRoot);

        const durationMs = Date.now() - startedAt;
        logEvent({
          tool: LIST_SKILLS_TOOL.name,
          duration_ms: durationMs,
          status: "ok",
          count: result.count,
          warnings_count: result.warnings.length
        });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2)
            }
          ]
        };
      } catch (error) {
        const durationMs = Date.now() - startedAt;
        const message = (error as Error).message;

        logEvent({
          tool: LIST_SKILLS_TOOL.name,
          duration_ms: durationMs,
          status: "error",
          error_code: "LIST_SKILLS_FAILED",
          error: message
        });

        return {
          isError: true,
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  error_code: "LIST_SKILLS_FAILED",
                  message
                },
                null,
                2
              )
            }
          ]
        };
      }
    }

    if (request.params.name !== RUN_SKILL_TOOL.name) {
      throw new Error(`Unsupported tool '${request.params.name}'.`);
    }

    const startedAt = Date.now();
    const args = safeParseRunSkillArguments(request.params.arguments);
    const mode = args.execution?.mode ?? "guide";

    try {
      const skill = await loadSkill(skillsRoot, args.skill_id);
      const referenceResult = await loadReferenceFiles({
        skillRoot: skill.rootPath,
        requestedPaths: args.reference_paths,
        maxTotalBytes: config.references.maxTotalBytes
      });

      const compiledInstructions = compileInstructions({
        skill,
        task: args.task,
        inputs: args.inputs,
        references: referenceResult.references
      });

      let scriptResult;
      if (mode === "run_script") {
        if (!args.execution?.script) {
          throw new Error("execution.script is required when execution.mode is 'run_script'.");
        }

        scriptResult = await runSkillScript({
          config,
          skill,
          relativeScriptPath: args.execution.script,
          args: args.execution.args
        });
      }

      const result: RunSkillResult = {
        skill_id: skill.id,
        skill_name: skill.name,
        skill_description: skill.description,
        compiled_instructions: compiledInstructions,
        available_references: skill.references,
        loaded_references: referenceResult.references.map((reference) => ({
          path: reference.path,
          bytes: reference.bytes
        })),
        script_result: scriptResult,
        warnings: referenceResult.warnings
      };

      const durationMs = Date.now() - startedAt;
      logEvent({
        skill_id: skill.id,
        mode,
        duration_ms: durationMs,
        status: "ok",
        warnings_count: result.warnings.length
      });

      if (config.logging.debug) {
        logEvent({
          skill_id: skill.id,
          mode,
          task_chars: args.task.length,
          references_loaded: result.loaded_references.length,
          script_requested: Boolean(args.execution?.script),
          script_exit_code: result.script_result?.exit_code ?? null
        });
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      const durationMs = Date.now() - startedAt;
      const message = (error as Error).message;

      logEvent({
        skill_id: args.skill_id,
        mode,
        duration_ms: durationMs,
        status: "error",
        error_code: "RUN_SKILL_FAILED",
        error: message
      });

      return {
        isError: true,
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                error_code: "RUN_SKILL_FAILED",
                message
              },
              null,
              2
            )
          }
        ]
      };
    }
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
  logEvent({ status: "started", mode: "stdio", skills_root: skillsRoot });
}

main().catch((error) => {
  logEvent({
    status: "fatal",
    error: (error as Error).message
  });
  process.exitCode = 1;
});
