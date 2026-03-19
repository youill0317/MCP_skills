export interface SkillFrontmatter {
  name: string;
  description: string;
}

export interface ValidationLocation {
  path: string;
  line: number;
  column: number;
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

export interface SkillValidationIssue {
  ruleId: string;
  message: string;
  location?: ValidationLocation;
}

export interface SkillValidationRecord {
  skillId: string;
  status: "valid" | "invalid" | "missing";
  skillFilePath: string;
  issues: SkillValidationIssue[];
  errors: number;
  message?: string;
}

export interface SkillValidationSummary {
  records: SkillValidationRecord[];
  valid: number;
  invalid: number;
  missing: number;
  errors: number;
}
