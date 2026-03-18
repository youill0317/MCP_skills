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

export interface SkillValidationRecord {
  skillId: string;
  status: "valid" | "invalid" | "missing";
  skillFilePath: string;
  message?: string;
}

export interface SkillValidationSummary {
  records: SkillValidationRecord[];
  valid: number;
  invalid: number;
  missing: number;
}
