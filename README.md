# Skills Workspace

공유 스킬 코어를 `skills/` 아래에 보관하고, 로컬에서 형식 검증과 레거시 frontmatter 마이그레이션만 수행하는 저장소입니다.

이 저장소는 자체 MCP 서버를 제공하지 않습니다. `SKILL.md`가 소스 오브 트루스이며, 각 클라이언트는 필요에 따라 이 스킬 코어를 별도 어댑터 계층으로 소비합니다.

## 구조

각 스킬은 다음 구조를 따릅니다.

```text
skills/
  <skill-id>/
    SKILL.md
    references/
    scripts/
    assets/
```

규칙:
- 폴더 이름은 소문자, 숫자, 하이픈만 사용합니다.
- `SKILL.md` frontmatter에는 `name`, `description`이 있어야 합니다.
- frontmatter의 `name`은 폴더 이름과 정확히 일치해야 합니다.
- 레거시 `category` 필드는 허용되지 않습니다.

## 설치 및 사용

```bash
npm install
npm run build
```

검증:

```bash
npm run validate:skills
```

다른 루트를 검증하려면:

```bash
npm run validate:skills -- --skills-root ./path/to/skills
```

레거시 frontmatter 마이그레이션:

```bash
npm run migrate:skills-frontmatter
```

수정 없이 보고만 하려면:

```bash
npm run migrate:skills-frontmatter -- --check
```

## 클라이언트별 사용

- Claude Code: 필요하면 스킬 코어를 Claude가 읽는 스킬 위치로 복사하거나 연결하고, 별도 등록 파일은 클라이언트 쪽에서 관리합니다.
- GitHub Copilot: `.github/skills` 또는 팀에서 정한 스킬 위치에 같은 스킬 코어를 배치합니다.
- Codex / OpenAI: 클라이언트가 요구하는 메타데이터만 추가하고, `SKILL.md` 본문은 공용 코어로 유지합니다.

원칙:
- 먼저 공용 스킬 본문을 작성합니다.
- 그 다음 클라이언트별 메타데이터를 얇게 추가합니다.
- 클라이언트별 제약이 없으면 스킬 본문을 중복 작성하지 않습니다.
