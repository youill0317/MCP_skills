export interface SkillFrontmatter {
  name: string;
  description: string;
}

export interface SkillManifest extends SkillFrontmatter {
  id: string;
  rootPath: string;
  skillFilePath: string;
  references: string[];
  scripts: string[];
  assets: string[];
}

export interface LoadedSkill extends SkillManifest {
  body: string;
}

export type RunMode = "guide" | "run_script";

export interface RunSkillArguments {
  skill_id: string;
  task: string;
  inputs?: Record<string, unknown>;
  reference_paths?: string[];
  execution?: {
    mode?: RunMode;
    script?: string;
    args?: string[];
  };
}

export interface ScriptExecutionResult {
  allowed: boolean;
  exit_code: number;
  stdout: string;
  stderr: string;
}

export interface RunSkillResult {
  skill_id: string;
  skill_name: string;
  skill_description: string;
  compiled_instructions: string;
  available_references: string[];
  loaded_references: Array<{ path: string; bytes: number }>;
  script_result?: ScriptExecutionResult;
  warnings: string[];
}

export interface ScriptExecutionConfig {
  enabledByDefault: boolean;
  timeoutMs: number;
  maxOutputBytes: number;
  allowedScripts: Record<string, string[]>;
}

export interface ReferenceConfig {
  maxTotalBytes: number;
}

export interface LoggingConfig {
  debug: boolean;
}

export interface AppConfig {
  skillsRoot: string;
  scriptExecution: ScriptExecutionConfig;
  references: ReferenceConfig;
  logging: LoggingConfig;
}
