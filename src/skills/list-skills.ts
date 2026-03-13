import { listSkillManifests } from "./loader.js";

export interface ListSkillItem {
  id: string;
  name: string;
  description: string;
  references: string[];
}

export interface ListSkillsResult {
  skills: ListSkillItem[];
  count: number;
  warnings: string[];
}

export async function buildListSkillsResult(skillsRoot: string): Promise<ListSkillsResult> {
  const manifests = await listSkillManifests(skillsRoot);
  const skills = manifests
    .map((manifest) => ({
      id: manifest.id,
      name: manifest.name,
      description: manifest.description,
      references: manifest.references
    }))
    .sort((a, b) => a.id.localeCompare(b.id));

  return {
    skills,
    count: skills.length,
    warnings: []
  };
}
