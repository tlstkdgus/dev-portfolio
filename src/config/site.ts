export const siteConfig = {
  url: process.env.NEXT_PUBLIC_BASE_URL || "https://portfolio-tlstkdgus.vercel.app",

  author: {
    name: { ko: "신상현", en: "Sanghyeon Shin" },
    title: {
      ko: "사용자의 실제 행동에서 답을 찾아, 직접 만들어 배포하는 서비스 기획자",
      en: "A service planner who finds the answer in what users actually do, then builds and ships",
    },
    email: "a91945840@gmail.com",
  },

  social: {
    github: "https://github.com/tlstkdgus",
    linkedin: "https://www.linkedin.com/in/%EC%83%81%ED%98%84-%EC%8B%A0-83267a337",
    blog: "https://velog.io/@tlstkdgus",
  },

  nav: [
    "about",
    "experience",
    "projects",
    "certified",
    "contact",
  ] as const,

  sections: {
    hero: true,
    about: true,
    experience: true,
    careerHighlights: true,
    certified: true,
    projects: true,
    contact: true,
  },

  seo: {
    titleTemplate: "%s | 신상현",
    defaultTitle: "신상현 | 사용자의 실제 행동에서 답을 찾아, 직접 만들어 배포하는 서비스 기획자",
    description:
      "사용자의 실제 행동에서 답을 찾아 직접 만들어 배포하는 서비스 기획자 신상현의 포트폴리오입니다. 회계담당자 인터뷰, 가맹점 39만 건 전수 분석, 어르신의 손글씨 습관에서 출발한 서비스들과, 멋쟁이사자처럼 인턴으로 기획부터 본선까지 운영한 2,000명 해커톤.",
    keywords: [
      "포트폴리오",
      "IT 기획",
      "PM",
      "PO",
      "프론트엔드 개발",
      "신상현",
      "SSAFY",
      "신상현 포트폴리오"
    ],
  },
  // Google Search Console 등록 후 메타 태그의 content 값을 여기에 입력
  // 등록 방법: https://search.google.com/search-console → 속성 추가 → HTML 태그 방식
  googleVerification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
};

export type NavKey = (typeof siteConfig.nav)[number];
