export interface Experience {
  company: string;
  companyEn: string;
  role: string;
  roleEn: string;
  team: string;
  teamEn: string;
  period: string;
  periodEn: string;
  startDate: string;
  endDate: string | null;
  description: string[];
  descriptionEn: string[];
  tags: string[];
}

// 해커톤·캠프·수료 이력은 Projects / Credentials로 옮겼습니다. 여기엔 실제 조직에서 맡은 역할만 둡니다.
// CleanB(루미클린)는 경력이 아니라 프로젝트로만 다룹니다 (2026.09.13 지시). 여기에 추가하지 말 것.
export const experiences: Experience[] = [
  {
    company: "멋쟁이사자처럼",
    companyEn: "LIKELION",
    role: "커뮤니티 매니저 인턴",
    roleEn: "Community Manager Intern",
    team: "유니브 Group 유니브 1팀",
    teamEn: "Univ. Group, Univ. Team 1",
    period: "2026.04.27. ~ 2026.08.31.",
    periodEn: "Apr 27, 2026 — Aug 31, 2026",
    startDate: "2026-04",
    endDate: "2026-08",
    description: [
      "14기 중앙해커톤(80개 대학 · 2,000명+) 운영 도구 3종 단독 개발·현장 투입 — [본선 토너먼트 콘솔](https://github.com/tlstkdgus/animal-league)(Next.js · Supabase, 투표→무대 스크린 실측 2.2초), [562개 레포 제출물 검사 스크립트](https://github.com/tlstkdgus/hackathon-commit-check)(Python), [FAQ 디스코드 봇](https://github.com/tlstkdgus/hackathon-faq-bot)(키워드 우선 + LLM 폴백, 한 달 229건 중 80.8% 즉답)",
      "비개발 직군 대상 사내 개발 교육 6회 기획·강의와 [교육 사이트](https://likelion-dev-site.vercel.app) 개발(React · TypeScript · Vite) — SVG 도식 14종, 브라우저 라이브 실습, 만족도 전원 5/5",
      "80개 대학 2,500여 명이 쓰는 [커뮤니티 플랫폼](https://likelion.community/) 운영 — 행사 상세페이지 3개 설계·QA, 백오피스 기능 추가·수정 제안, 중앙해커톤 기능명세서 작성 후 개발 조직(AXP) 핸드오프",
      "연합 해커톤 플랫폼 기능 명세 — 4단계 권한 격리 · 학교 자동 검증 · 시각 기반 자동화, 페이지 26개 · 기능 영역 10개",
      "전국 연합 아이디어톤(1,822명 · 378개 프로젝트) 본선 심사 자동화 시트(Google Sheets) 공동 제작",
    ],
    descriptionEn: [
      "Built 3 ops tools solo and ran them live for the 14th national hackathon (80 universities, 2,000+ participants) — the [finals tournament console](https://github.com/tlstkdgus/animal-league) (Next.js · Supabase, 2.2 s measured from vote to stage screen), a [Python script that checked 562 submitted repos](https://github.com/tlstkdgus/hackathon-commit-check), and an [FAQ Discord bot](https://github.com/tlstkdgus/hackathon-faq-bot) (keyword-first with LLM fallback, 80.8% of 229 questions answered instantly in a month)",
      "Planned and taught a 6-session internal dev course for non-developers and built its [course site](https://likelion-dev-site.vercel.app) (React · TypeScript · Vite) — 14 SVG diagrams, live in-browser exercises, 5/5 satisfaction from every attendee",
      "Ran the [community platform](https://likelion.community/) used by 2,500+ students at 80 universities — designed and QA'd 3 event detail pages, proposed back-office features and fixes, wrote the national hackathon feature spec and handed it off to the dev team (AXP)",
      "Specified the inter-university hackathon platform — 4-level permission isolation, automatic school verification, time-based automation; 26 pages across 10 feature areas",
      "Co-built the finals scoring automation sheet (Google Sheets) for the national ideathon (1,822 participants · 378 projects)",
    ],
    tags: ["Next.js", "Supabase", "Python", "Automation"],
  },
  {
    company: "SSAFY (삼성 청년 SW·AI 아카데미)",
    companyEn: "SSAFY (Samsung SW·AI Academy For Youth)",
    role: "15기 수료",
    roleEn: "15th Cohort — Completed",
    team: "비전공 Java 트랙",
    teamEn: "Non-CS Java Track",
    period: "2026.01. ~ 2026.04.",
    periodEn: "Jan 2026 — Apr 2026",
    startDate: "2026-01",
    endDate: "2026-04",
    description: [
      "알고리즘 · 자료구조와 Java 백엔드 중심의 비전공 Java 트랙 교육 과정 수료",
      "실전 프로젝트 기반 학습으로 프론트엔드 밖의 백엔드 개발 역량 보강",
    ],
    descriptionEn: [
      "Completed the Non-CS Java track — algorithms, data structures, and Java backend development",
      "Built up backend skills beyond the frontend through project-based learning",
    ],
    tags: ["Java", "Algorithm", "Backend"],
  },
  {
    company: "한국외국어대학교 멋쟁이사자처럼",
    companyEn: "HUFS LIKELION",
    role: "13기 운영진",
    roleEn: "13th Cohort Staff",
    team: "운영팀",
    teamEn: "Operations Team",
    period: "2025.01. ~ 2025.12.",
    periodEn: "Jan 2025 — Dec 2025",
    startDate: "2025-01",
    endDate: "2025-12",
    description: [
      "부원 45명이 쓴 13기 [웰컴키트 PWA](https://github.com/tlstkdgus/WelcomeKit) 프론트엔드 개발 리드(React, 커밋 98개 중 60개) — 앱 안 QR 스캔 출석, 빙고 카드 공개, PWA 설치·서비스 워커로 수기 출석부를 대체",
      "13기 학생 교육 세션 기획·진행, 학생 관리 및 강의 진도 체크",
      "운영과 병행해 16P!ay · TCP · Y:Wave 프로젝트 리드 (교내 최우수상 2회, 전국 예선 진출 2회)",
    ],
    descriptionEn: [
      "Led frontend development (React, 60 of 98 commits) of the 13th cohort [WelcomeKit PWA](https://github.com/tlstkdgus/WelcomeKit) used by 45 members — in-app QR check-in, bingo card reveals, and PWA install with a service worker, replacing the paper roll",
      "Planned and led educational sessions; managed students and lecture progress for the 13th cohort",
      "Led 16P!ay · TCP · Y:Wave projects alongside operations (2 campus Grand Prizes, 2 national semifinals)",
    ],
    tags: ["React", "PWA", "Education"],
  },
  {
    company: "풍생고등학교",
    companyEn: "Pungsaeng High School",
    role: "코딩 교육 봉사",
    roleEn: "Coding Education Volunteer",
    team: "프론트엔드·기획 교육",
    teamEn: "Frontend & Planning Education",
    period: "2025.03. ~ 2025.11.",
    periodEn: "Mar 2025 — Nov 2025",
    startDate: "2025-03",
    endDate: "2025-11",
    description: [
      "HTML · CSS · JS · React · Figma · Notion 등 프론트엔드·기획 전반 교육",
      "학생들과 '수행평가 알리미' 프로젝트를 기획·개발해 3학년 2반에서 실사용 중",
      "이 프로젝트를 기반으로 제 12회 Bring Your Own Ideas 최우수상 수상 (2025.12)",
    ],
    descriptionEn: [
      "Taught frontend and planning: HTML, CSS, JS, React, Figma, Notion",
      "Planned and built an assignment-notification app with students — in live use by class 3-2",
      "The project went on to win the Grand Prize at the 12th Bring Your Own Ideas (Dec 2025)",
    ],
    tags: ["Education", "React", "Figma"],
  },
];
