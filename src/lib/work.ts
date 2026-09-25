import { careerDetailSections, type CareerDetailSection } from "@/data/career-detail";
import { projects, type Project } from "@/data/projects";
import { selectedProjects, type SelectedProject } from "@/data/selected";

// 프로젝트 상세 페이지(/work/<id>)는 세 데이터를 합쳐서 그린다.
// - career-detail: 배경·역할·결과·배운 점 (상세 본문)
// - projects: 기간·역할·한 줄 설명·저장소 (목록 메타)
// - selected: 대표 4개만 있는 헤드라인·본문 세 문장·전→후 stat·현장 사진
export interface WorkEntry {
  id: string;
  detail: CareerDetailSection;
  project?: Project;
  selected?: SelectedProject;
  /** "Y:Wave" 같은 짧은 이름과 "AI 기반 …" 설명 */
  name: { ko: string; en: string };
  desc: { ko: string; en: string };
}

// "AI 기반 경기도 지역화폐 가맹점 추천 서비스 — Y:Wave" → 이름과 설명으로 분리
function splitTitle(title: string) {
  const idx = title.lastIndexOf(" — ");
  if (idx === -1) return { name: title, desc: "" };
  return { name: title.slice(idx + 3), desc: title.slice(0, idx) };
}

export const workEntries: WorkEntry[] = careerDetailSections.map((detail) => {
  const ko = splitTitle(detail.title);
  const en = splitTitle(detail.titleEn);
  return {
    id: detail.id,
    detail,
    project: projects.find((p) => p.caseId === detail.id),
    selected: selectedProjects.find((s) => s.caseId === detail.id),
    name: { ko: ko.name, en: en.name },
    desc: { ko: ko.desc, en: en.desc },
  };
});

export const workIds = workEntries.map((w) => w.id);

export function getWork(id: string) {
  const i = workEntries.findIndex((w) => w.id === id);
  if (i === -1) return null;
  return {
    entry: workEntries[i],
    index: i,
    prev: i > 0 ? workEntries[i - 1] : null,
    next: i < workEntries.length - 1 ? workEntries[i + 1] : null,
  };
}

export const workHref = (locale: string, id: string) => `/${locale}/work/${id}`;

/** projects.ts의 "2025.07. ~ 2025.08."을 대표 프로젝트 표기("2025.07 – 2025.08")에 맞춘다 */
export function fmtPeriod(period?: string) {
  if (!period) return period;
  // 영문 경력 기간은 em dash(—)로 적혀 있어 다른 섹션의 en dash(–)와 맞춘다
  return period.replace(/\.(?=\s|$|\))/g, "").replace(" ~ ", " – ").replace(" — ", " – ");
}
