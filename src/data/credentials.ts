export interface Certification {
  name: string;
  nameEn: string;
  date: string;
  issuer: string;
  issuerEn: string;
}

export interface Award {
  title: string;
  titleEn: string;
  issuer: string;
  issuerEn: string;
  date: string;
  highlight?: boolean;
  /** 상장 스캔 경로 (public/awards/<slug>.jpg). 파일이 오면 채운다. 없으면 이미지 자리 없이 렌더 */
  image?: string;
}

// 상장 파일명 예정: byoi-12.jpg, grise-startup.jpg, kiiti.jpg, grise-bm.jpg, finnect.jpg,
// hufstudy.jpg, pick-your-idea.jpg, startup-camp-ir.jpg, hup.jpg, startup-platform.jpg, sprint.jpg

export const certifications: Certification[] = [
  {
    name: "SQL 개발자 (SQLD)",
    nameEn: "SQL Developer (SQLD)",
    date: "2024.06.",
    issuer: "한국데이터산업진흥원",
    issuerEn: "Korea Data Agency",
  },
  {
    name: "데이터 분석 준전문가 (ADsP)",
    nameEn: "Advanced Data Analytics Semi-Professional (ADsP)",
    date: "2025.09.",
    issuer: "한국데이터산업진흥원",
    issuerEn: "Korea Data Agency",
  },
  {
    name: "OPIc IH",
    nameEn: "OPIc IH",
    date: "2025.10.",
    issuer: "ACTFL",
    issuerEn: "ACTFL",
  },
];

// highlight = 프로젝트별 대표 수상 하나(FlowPay·손글·dotori). 외부 기관·학회 심사를 우선한다 (2026-09-24 상현: 손글 포함). 최신순.
export const awards: Award[] = [
  {
    title: "제 12회 Bring Your Own Ideas 최우수상 (풍생고 수행평가 알리미)",
    titleEn: "12th Bring Your Own Ideas — Grand Prize (Pungsaeng HS assignment notifier)",
    issuer: "한국외국어대학교",
    issuerEn: "HUFS",
    date: "2025.12.",
  },
  {
    title: "제 1회 G-RISE 창업경진대회 최우수상",
    titleEn: "1st G-RISE Startup Competition — Grand Prize",
    issuer: "한국외국어대학교 G-RISE 사업단",
    issuerEn: "HUFS G-RISE",
    date: "2025.12.",
  },
  {
    title: "KIITI 동계 학술대회 아이디어/앱 콘테스트 우수상 (손글)",
    titleEn: "KIITI Winter Conference Idea/App Contest — Excellence Award (SonGeul)",
    issuer: "한국정보기술전략혁신학회",
    issuerEn: "KIITI",
    date: "2025.11.",
    highlight: true,
  },
  {
    title: "G-RISE × 경상대학 2025 창업 비즈니스 모델 경진대회 대상 (dotori)",
    titleEn: "G-RISE × College of Business 2025 Startup BM Competition — Grand Prize (dotori)",
    issuer: "한국외국어대학교 경상대학",
    issuerEn: "HUFS College of Business",
    date: "2025.11.",
    highlight: true,
  },
  {
    title: "FIN:NECT 챌린지 장려상 (FlowPay, 102팀 중 5위)",
    titleEn: "FIN:NECT Challenge — Encouragement Prize (FlowPay, 5th of 102 teams)",
    issuer: "한국핀테크지원센터 × 카카오뱅크",
    issuerEn: "Korea Fintech Center × KakaoBank",
    date: "2025.08.",
    highlight: true,
  },
  {
    title: "2025 1학기 HUFStudy 최우수상 (NeuroSight · RZi)",
    titleEn: "2025 Spring HUFStudy — Grand Prize (NeuroSight · RZi)",
    issuer: "한국외국어대학교 교육혁신단",
    issuerEn: "HUFS Center for Educational Innovation",
    date: "2025.08.",
  },
  {
    title: '"PICK YOUR IDEA" IR PITCHING 우수상 (dotori)',
    titleEn: '"PICK YOUR IDEA" IR Pitching — Excellence Award (dotori)',
    issuer: "서울 AI 허브 / MOVE",
    issuerEn: "Seoul AI Hub / MOVE",
    date: "2025.07.",
  },
  {
    title: "2025 창업캠프 실전 IR 피칭 경진대회 최우수상 (dotori)",
    titleEn: "2025 Startup Camp IR Pitching Competition — Grand Prize (dotori)",
    issuer: "한국외국어대학교 글로벌창업지원단",
    issuerEn: "HUFS Global Startup Center",
    date: "2025.06.",
  },
  {
    title: "2025 HUFS H-UP 진로탐색학점제 진리상 [최우수상] (ARtliving)",
    titleEn: "2025 HUFS H-UP Career Exploration — Truth Award [Grand Prize] (ARtliving)",
    issuer: "한국외국어대학교",
    issuerEn: "HUFS",
    date: "2025.06.",
  },
  {
    title: "2025 HUFS Start-up Platform 학생창업팀 선발 (ARtliving)",
    titleEn: "Selected as a Student Startup Team, 2025 HUFS Start-up Platform (ARtliving)",
    issuer: "한국외국어대학교 글로벌 창업지원단",
    issuerEn: "HUFS Global Startup Center",
    date: "2025.03.",
  },
  {
    title: "제 7회 경상대 × SPRINT 학술제 우수상",
    titleEn: "7th College of Business × SPRINT Academic Festival — Excellence Award",
    issuer: "한국외국어대학교 경상대학",
    issuerEn: "HUFS College of Business",
    date: "2024.11.",
  },
];
