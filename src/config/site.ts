export const siteConfig = {
  url: process.env.NEXT_PUBLIC_BASE_URL || "https://dev-portfolio-phi-eight.vercel.app",

  author: {
    name: { ko: "신상현", en: "Sanghyeon Shin" },
    title: {
      ko: "사용자가 실제로 쓰는 화면을 만들고, 배포한 뒤에도 직접 운영하며 고치는 프론트엔드 개발자",
      en: "A frontend developer who builds the screens people actually use, then keeps running and fixing them after launch",
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
    "projects",
    "experience",
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
    defaultTitle: "신상현 | 사용자가 실제로 쓰는 화면을 만들고, 배포한 뒤에도 직접 운영하며 고치는 프론트엔드 개발자",
    description:
      "React·Next.js·TypeScript로 15개 이상의 서비스를 만들어 배포한 프론트엔드 개발자 신상현의 포트폴리오입니다. 2,000명 해커톤 본선을 진행한 토너먼트 콘솔(Next.js · Supabase), 562개 레포 제출물 검사 스크립트, FAQ 봇, 외주 서비스 루미클린의 청소자 앱까지.",
    keywords: [
      "포트폴리오",
      "개발자 포트폴리오",
      "프론트엔드 개발자",
      "React",
      "Next.js",
      "TypeScript",
      "Supabase",
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
