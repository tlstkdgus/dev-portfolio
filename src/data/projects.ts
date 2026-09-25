export interface ProjectStat {
  label: string;
  labelEn: string;
  value: string;
}

export interface Project {
  title: string;
  titleEn: string;
  subtitle?: string;
  subtitleEn?: string;
  period: string;
  periodEn: string;
  goals: string[];
  goalsEn: string[];
  contents: string[];
  contentsEn: string[];
  decisions?: string[];
  decisionsEn?: string[];
  results: string[];
  resultsEn: string[];
  tags: string[];
  featured?: boolean;
  caseId?: string;
  url?: string;
  repo?: string;
  commitsUrl?: string;
  image?: string;
  images?: string[];
  stats?: ProjectStat[];
  roles?: string[];
  rolesEn?: string[];
}

// Other projects 노출 (§G-6, 2026-09-24): 앞의 6개만 펼쳐 두고 나머지는 '그 외 프로젝트' 접기 안에 둔다.
// 15개가 한 번에 펼쳐져 있어 대표가 아닌 작업까지 같은 무게로 읽혔다. 데이터와 상세 페이지는 모두 유지한다.
// 개발자 포트폴리오 (2026-09-25): 직접 코드를 쓴 프로젝트를 앞에 펼치고, 기획·IR 중심 작업은 접기 안으로 보낸다.
export const otherProjectsShown = ["welcomekit", "devsite", "songeul", "rzi", "connect", "ainterview"];
export const otherProjectsFolded = ["hai", "mealdang", "16play", "dotori", "tcp", "neurosight", "artliving", "huriup"];

export const projects: Project[] = [
  // 순서 = 사이트 노출 순서. 멋사 인턴 경험(중앙해커톤·사내 교육)이 항상 앞,
  // CleanB는 경력이 아니라 프로젝트로만, FlowPay 뒤 (2026.09.13 서사 우선순위 지시).
  {
    title: "14기 중앙해커톤 기획·운영",
    caseId: "hackathon14",
    featured: true,
    titleEn: "LIKELION 14th Hackathon — Planning & Ops",
    subtitle: "80개 대학 · 2,000명+ 14기 중앙해커톤의 기획부터 본선 운영까지",
    subtitleEn: "Planning through the finals of an 80-university, 2,000+ participant hackathon",
    period: "2026.06. ~ 2026.08.",
    periodEn: "Jun 2026 — Aug 2026",
    roles: ["PM", "운영"],
    rolesEn: ["PM", "Ops"],
    repo: "https://github.com/tlstkdgus/animal-league",
    goals: [
      "참가자·심사위원·파트너의 이해가 충돌하는 지점마다 규칙이 필요했습니다. 심사 기준, 제출 요건, 수료 기준, 위반 처리까지 — 정책으로 풀어야 하는 문제였습니다",
      "314팀이 제출한 562개 레포의 '마감 후 수정 금지' 검증과 2,000명 앞 실시간 토너먼트 진행은 수작업으로 불가능했습니다. 없는 도구는 직접 만들어야 했습니다",
    ],
    goalsEn: [
      "Every point where participants, judges, and partners collided needed a rule — judging criteria, submission requirements, completion standards, violation handling",
      "Verifying 562 repos from 314 teams against a 'no edits after deadline' rule, and running a live tournament in front of 2,000 people, was impossible by hand — the missing tools had to be built",
    ],
    contents: [
      "심사 정책 공동 설계 — 3단계 퍼널(서류 60팀 → 트랙 피칭 8팀 → 토너먼트 1팀), 공통 심사 기준 100점 배점, 제출 항목과 심사 기준의 1:1 연계, 공정성 규칙(대본 낭독 0점 · 기기 통일 · 랜덤 추첨)",
      "제출물 무결성 검사 도구 check.py 직접 제작(Claude 활용) — 562개 레포 전 브랜치의 마감 후 커밋·force-push·비공개 전환 전수 검사",
      "본선 토너먼트 콘솔 'ANIMAL LEAGUE' 직접 제작·운영 — 스크린·심사·운영 3화면(Next.js · Supabase), 무대 연출과 음향팀·MC 큐시트 조율 포함",
      "FAQ 디스코드 봇 직접 제작·운영 — FAQ 78문항 기반, 키워드 우선 + LLM 폴백 2단 응답, 미답변 일일 리포트 개선 루프",
      "참가자 가이드 공동 작성(참가자 여정 순서로 목차 설계, 날짜별 변경 이력 관리), 파트너 8종 툴 지원 정책 운영 및 OpenAI 영문 커뮤니케이션(크레딧 지급 · 심사위원 섭외)",
      "사전 기획 공동 참여 — 해커톤 플랫폼 기능명세서 2종(중앙·연합: As-Is→To-Be 정리, 5단계 권한 매트릭스, 팀빌딩·승인 워크플로우) 작성 후 개발(AXP)·디자인(브디랩) 핸드오프, 워밍업 세션 3회(문제 발견 → MVP 범위 → AI 실전 개발) 커리큘럼 설계",
    ],
    contentsEn: [
      "Co-designed judging policy — 3-stage funnel (docs → track pitching → tournament), a 100-point common rubric, 1:1 mapping between submission items and judging criteria, and fairness rules (script-reading scores zero, uniform devices, random draw)",
      "Built check.py (with Claude) — swept every branch of all 562 repos for post-deadline commits, force-pushes, and public-to-private flips",
      "Built and operated the finals tournament console 'ANIMAL LEAGUE' — screen/judge/ops views (Next.js · Supabase), including stage effects and cue-sheet coordination with the sound team and MC",
      "Built and ran the FAQ Discord bot — 78-item knowledge base, keyword-first with LLM fallback, daily unanswered-question report loop",
      "Co-wrote the participant guide (structured by participant journey, dated change log), ran the 8-partner tool support program, and handled OpenAI communications in English (credits, judge recruitment)",
      "Co-planned the pre-event work — two platform feature specs (central & inter-university: As-Is→To-Be structure, 5-level permission matrix, team-building and approval workflows) handed off to dev (AXP) and design (BD Lab), plus a 3-part warm-up curriculum (problem discovery → MVP scoping → hands-on AI development)",
    ],
    decisions: [
      "도구는 근거만 제시하고 판정은 운영진이 — 위반 성격별 차등 기준(기능 수정 실격 / README 수정 감점 / 마감 직후 커밋 정상참작)을 검사 전에 합의",
      "콘솔은 '되돌릴 수 없는 현장'을 전제로 설계 — 심사위원 명단제(코드 유출에도 가짜 표 차단), 결과 공개 롤백 없음, 네트워크 장애 시 운영자 입력만으로 진행되는 백업 모드",
      "동표 시 시스템은 경고만 하고 판정은 사전 합의 규칙으로 사람이 — 도구와 사람의 역할 분리",
    ],
    decisionsEn: [
      "The tool presents evidence only; humans decide — graded violation criteria (code changes = disqualification / README edits = deduction / just-past-deadline commits = leniency) agreed before scanning",
      "The console assumes an irreversible live event — judge allowlist (fake votes blocked even if the code leaks), no rollback after reveal, and a backup mode that runs the bracket on operator input alone during network failure",
      "On a tie the system only warns; a pre-agreed rule and a human decide — separating the tool's job from people's",
    ],
    results: [
      "562개 레포 전수 검사로 위반 5팀 적발 — 차등 기준에 따라 2팀 실격, 나머지 감점·정상참작 처리",
      "본선 토너먼트(8팀 · 심사위원 5명)를 직접 만든 콘솔로 진행 완료 — 콘솔 조작이 무대 스크린에 반영되는 시간 실측 2.2초",
      "FAQ 봇으로 한 달간 질문 229건 응대(사용자 53명) — 80.8%를 키워드 즉답으로 처리(API 비용 0), 미응답 0건 — 자료에 없는 내용은 지어내지 않는 무허구 정책",
      "멋쟁이사자처럼 브랜드 디자인 랩이 'ANIMAL LEAGUE'를 Behance 케이스로 공개 — 공동작업자로 등재",
    ],
    resultsEn: [
      "Full sweep of 562 repos caught 5 violating teams — 2 disqualified under the graded criteria, the rest handled with deductions or leniency",
      "Ran the finals tournament (8 teams, 5 judges) on the self-built console — measured 2.2s from console action to stage screen",
      "The FAQ bot answered 229 questions from 53 users over a month — 80.8% via instant keyword match (zero API cost), 0 unanswered",
      "LIKELION's Brand Design Lab published 'ANIMAL LEAGUE' as a Behance case study, crediting me as a collaborator",
    ],
    stats: [
      { label: "규모", labelEn: "Scale", value: "80개 대학 · 2,000명+" },
      { label: "검사 레포", labelEn: "Repos swept", value: "562개" },
      { label: "직접 만든 도구", labelEn: "Tools built", value: "3개" },
    ],
    tags: ["Next.js", "React", "TypeScript", "Supabase", "Python", "discord.py", "LLM"],
    image: "/projects/hackathon14/01.png",
    images: [
      "/projects/hackathon14/01.png",
      "/projects/hackathon14/02.png",
      "/projects/hackathon14/03.png",
      "/projects/hackathon14/04.png",
      "/projects/hackathon14/05.png",
    ],
  },
  {
    title: "사내 개발 교육",
    caseId: "devsite",
    featured: true,
    titleEn: "Internal Dev Literacy Course",
    subtitle: "비개발 직군 동료를 위한 점심 강의 6회와 교육 사이트",
    subtitleEn: "Six lunchtime sessions and a course site for non-developer colleagues",
    period: "2026.07. ~ 2026.08.",
    periodEn: "Jul 2026 — Aug 2026",
    roles: ["기획·제작·강의"],
    rolesEn: ["Planned, built & taught"],
    url: "https://likelion-dev-site.vercel.app",
    repo: "https://github.com/tlstkdgus/likelion-dev-site",
    goals: [
      "회사에는 저처럼 비전공자인 동료가 많았고, 그분들에게 '배포'·'API' 같은 말이 여전히 어렵다는 걸 알게 됐습니다. AI에게 물어보면 답이 나오는 시대지만, 기본 흐름을 모르면 무엇을 물어야 할지 모릅니다",
    ],
    goalsEn: [
      "Many colleagues were non-developers like me, and words like 'deploy' and 'API' were still hard for them. In the age of asking AI anything, you still can't ask a good question without knowing the basic flow",
    ],
    contents: [
      "점심시간 분량 6회 커리큘럼을 직접 설계하고 주 1회, 6주간 직접 강의 — 소프트웨어 구조 · 개발 용어 · Git과 GitHub · 협업 커뮤니케이션 · AI와 바이브 코딩 · AI 트렌드",
      "모든 개념을 식당 비유 하나로 통일 (홀=프론트엔드, 주방=백엔드, 냉장고=DB, 주문서=API)",
      "교육용 웹사이트 직접 제작(React · TypeScript · Vite) — SVG 개념 도식 14종, 브라우저에서 바로 동작하는 라이브 실습(로그인 요청 왕복, Git 협업 시뮬레이터 등), 용어 사전 51개",
    ],
    contentsEn: [
      "Designed a 6-session lunchtime curriculum and taught it weekly for 6 weeks — software structure, dev vocabulary, Git & GitHub, collaboration communication, AI & vibe coding, AI trends",
      "Unified every concept under one restaurant metaphor (dining hall = frontend, kitchen = backend, fridge = DB, order slip = API)",
      "Built the companion website myself (React · TypeScript · Vite) — 14 SVG concept diagrams, live in-browser demos (login round-trip, Git collaboration simulator), and a 51-term glossary",
    ],
    decisions: [
      "코드를 가르치지 않기로 결정 — 목표를 개발자와 대화할 수 있는 수준으로 좁혀 점심시간 6회에 담았습니다",
      "설치·계정 없이 브라우저에서 바로 동작하는 실습만 — 밥 먹으면서 듣는 환경을 전제로 설계",
    ],
    decisionsEn: [
      "Decided not to teach code — narrowed the goal to being able to talk with developers, so it fits in six lunch breaks",
      "Demos run in the browser with no installs or accounts — designed for an audience listening over lunch",
    ],
    results: [
      "수강자 설문(6명): 만족도 전원 5/5, 추천 의향 평균 9.7/10, '개발자와의 대화에서 이해되는 부분이 늘었다' 4.7/5",
      "'짧아서 아쉽다'는 피드백과 함께 인프라·DB·협업 방식 등 후속 주제 요청 접수",
    ],
    resultsEn: [
      "Attendee survey (n=6): 5/5 satisfaction across the board, 9.7/10 average recommendation, 4.7/5 on 'I understand more of developer conversations now'",
      "Feedback that it was 'too short' — with requests for follow-up topics like infrastructure, databases, and dev collaboration",
    ],
    stats: [
      { label: "만족도", labelEn: "Satisfaction", value: "5/5 전원" },
      { label: "추천 의향", labelEn: "Recommend", value: "9.7/10" },
    ],
    tags: ["Education", "React", "TypeScript", "Vite", "Content Design"],
    image: "/projects/devsite/01.png",
    images: [
      "/projects/devsite/01.png",
      "/projects/devsite/02.png",
      "/projects/devsite/03.png",
      "/projects/devsite/04.png",
      "/projects/devsite/05.png",
    ],
  },
  {
    title: "FlowPay",
    caseId: "flowpay",
    featured: true,
    titleEn: "FlowPay",
    subtitle: "무기명 법인카드 지출·회계 자동화 B2B SaaS",
    subtitleEn: "Anonymous Corporate Card Expense Automation B2B SaaS",
    period: "2025.06. ~ 2025.08.",
    periodEn: "Jun 2025 — Aug 2025",
    repo: "https://github.com/tlstkdgus/FlowPay",
    url: "https://flow-pay-seven.vercel.app",
    roles: ["PM", "프론트엔드"],
    rolesEn: ["PM", "Frontend"],
    goals: [
      "직원은 지출보고서 한 건에 20분을 쓰고, 회계담당자는 월 100건 이상을 처리합니다. 무기명 법인카드 정산에 기업당 연간 약 1,000시간·8천만 원이 사라집니다",
      "누가 썼는지 기록되지 않는 카드라서, 지출 내역을 사람이 일일이 맞춰야 한다는 점이 문제였습니다",
    ],
    goalsEn: [
      "Employees spend 20 minutes per expense report; accountants process 100+ a month. Anonymous corporate card reconciliation drains ~1,000 hours and ₩80M per company each year",
      "The root problem: the card records no user, so someone has to match every expense by hand",
    ],
    contents: [
      "현업 회계담당자 인터뷰로 Pain Point를 발굴하고 솔루션 재정의",
      "Flow ID 기반 익명 태깅 시스템 아이디어 도출, 사용자 여정 맵핑·정보구조 설계 — 업무 프로세스를 8단계에서 3단계로 단축",
      "React 기반 실시간 대시보드 및 FIDO2 API 연동 생체인증 결제 시스템 개발",
      "3개 유효 시장 분석으로 시장 규모 산정, FINNECT IR 발표 담당",
    ],
    contentsEn: [
      "Discovered Pain Points and redefined the solution through interviews with working accountants",
      "Conceived the Flow ID anonymous tagging system, mapped user journeys, and designed the IA — cutting the workflow from 8 steps to 3",
      "Built a real-time dashboard with React and integrated FIDO2 biometric payment",
      "Analyzed 3 addressable markets to size the opportunity; delivered the FINNECT IR pitch",
    ],
    decisions: [
      "가명토큰 vs 실명인증 방식 비교 후, 무기명 카드의 익명성 유지를 위해 Flow ID 기반 가명토큰 방식을 채택",
      "회계 자동화 범위를 전체 ERP 연동에서 지출보고서 자동 생성으로 축소하여 MVP 스코프 확정",
    ],
    decisionsEn: [
      "Compared pseudonymous token vs. real-name auth; adopted Flow ID–based pseudonymous tokens to preserve anonymity for corporate cards",
      "Reduced accounting automation scope from full ERP integration to auto expense reports to fix MVP scope",
    ],
    results: [
      "FINNECT 챌린지 장려상 수상 (102팀 중 5위)",
    ],
    resultsEn: [
      "Won Encouragement Prize at FINNECT Challenge (5th out of 102 teams)",
    ],
    stats: [
      { label: "프로세스", labelEn: "Process", value: "8→3단계" },
      { label: "순위", labelEn: "Rank", value: "102팀 중 5위" },
    ],
    tags: ["React", "TypeScript", "FIDO2", "B2B SaaS", "Figma"],
    image: "/projects/flowpay/01.png",
    images: [
      "/projects/flowpay/01.png",
      "/projects/flowpay/02.png",
      "/projects/flowpay/03.png",
      "/projects/flowpay/04.png",
      "/projects/flowpay/05.png",
      "/projects/flowpay/06.png",
      "/projects/flowpay/07.png",
      "/projects/flowpay/08.png",
    ],
  },
  {
    title: "CleanB",
    caseId: "cleanb",
    featured: true,
    titleEn: "CleanB",
    subtitle: "외주 프로젝트 · 에어비앤비 청소 매칭 플랫폼 '루미클린(RumiClean)'",
    subtitleEn: "Client Project · Airbnb Cleaning Matching Platform 'RumiClean'",
    period: "2025.11. ~ 현재 (배포 완료 · 결제 연동 전)",
    periodEn: "Nov 2025 — Present (deployed · payments not yet connected)",
    roles: ["PM", "프론트엔드", "디자인"],
    rolesEn: ["PM", "Frontend", "Design"],
    url: "https://www.rumiclean.com",
    goals: [
      "외주로 맡은 프로젝트입니다. 에어비앤비 호스트는 믿을 만한 청소 인력을 구하기 어렵고, 청소자는 일감을 안정적으로 받기 어렵습니다. 이 둘을 연결하는 매칭 서비스를 만들고 있습니다",
      "해커톤처럼 만들고 끝나는 게 아니라, 실제 사용자를 받는 서비스로 운영하는 것이 목표",
    ],
    goalsEn: [
      "Productize the full cleaning operation flow — from request to completion — connecting Airbnb hosts with cleaners",
      "Build a production-grade deployment, QA, and release pipeline beyond student-project scope",
    ],
    contents: [
      "전체 PM을 맡아 기능 개발부터 배포까지의 우선순위를 정하고, PR 170개가 넘는 저장소의 코드 리뷰와 릴리스 머지를 담당",
      "청소자가 쓰는 화면 전체를 개발: 작업 요청을 받고, 진행 상황을 관리하고, 완료를 보고하는 흐름의 UI와 API 연동",
      "카카오맵 기반 지도 검색, Firebase 웹 푸시 알림 등 운영에 필요한 연동 작업",
      "컴포넌트 체계(아토믹 디자인)와 QA 테스트 규칙(data-testid)을 정해 팀의 코드 일관성 유지",
    ],
    contentsEn: [
      "As overall PM, managed merges for features, CI workflows, QA, and prod releases across a 170+ PR repository",
      "Built the cleaner-side domain: request list → progress management → completion pages (UI, API, types)",
      "Integrated Kakao Map / SGIS map search and Firebase Web Push notifications",
      "Introduced atomic design component architecture and data-testid QA conventions",
    ],
    decisions: [
      "3인 팀 규모에 맞춰 배포를 k3s/ArgoCD에서 Docker Compose + Caddy로 단순화해 유지보수 부담을 줄임",
      "배포 중에도 화면이 유지되도록 정적 파일을 CDN(CloudFront)으로 분리",
    ],
    decisionsEn: [
      "Migrated production deployment from k3s/ArgoCD to Docker Compose + Caddy, matching ops complexity to team size",
      "Served Next.js static chunks from a CDN (CloudFront) for deployment stability and load speed",
    ],
    results: [
      "GitHub Actions 자동 배포로 rumiclean.com 배포 완료. 토스 결제 연동 전이라 아직 실사용자는 받지 않는 상태",
      "기획, 디자인, 개발, 배포, QA까지 서비스의 전 과정을 처음으로 '운영'해보고 있는 프로젝트",
    ],
    resultsEn: [
      "Deployed to rumiclean.com with GitHub Actions auto-deployment. Toss payments are not connected yet, so it does not take real users",
      "An ongoing project covering the full cycle: planning, design, development, deployment, and QA",
    ],
    stats: [
      { label: "PR", labelEn: "PRs", value: "170+" },
      { label: "상태", labelEn: "Status", value: "배포 완료 · 결제 연동 전" },
    ],
    tags: ["Next.js", "TypeScript", "Kakao Map", "Firebase", "Docker", "CI/CD"],
    image: "/projects/cleanb/01.png",
    images: [
      "/projects/cleanb/01.png",
      "/projects/cleanb/02.png",
      "/projects/cleanb/03.png",
      "/projects/cleanb/04.png",
      "/projects/cleanb/05.png",
      "/projects/cleanb/06.png",
      "/projects/cleanb/07.png",
    ],
  },
  {
    title: "Y:Wave",
    caseId: "ywave",
    featured: true,
    titleEn: "Y:Wave",
    subtitle: "경기도 지역화폐 가맹점 추천 서비스",
    subtitleEn: "Gyeonggi Local Currency Store Recommendation",
    period: "2025.07. ~ 2025.08.",
    periodEn: "Jul 2025 — Aug 2025",
    repo: "https://github.com/yong2gether/FE",
    commitsUrl: "https://github.com/yong2gether/FE/commits/main/?author=tlstkdgus",
    roles: ["PM", "프론트엔드", "디자인"],
    rolesEn: ["PM", "Frontend", "Design"],
    goals: [
      "직접 진행한 설문에서 응답자 53%가 '지역화폐 가맹점을 찾기 어렵다'고 답했습니다. 경기도 가맹점 39만 곳이 데이터로는 공개돼 있지만, 탐색할 수 있는 형태가 아니었습니다",
    ],
    goalsEn: [
      "In our own survey, 53% of respondents said local-currency merchants are hard to find. Gyeonggi publishes ~390K merchant records as open data — but not in a form people can actually explore",
    ],
    contents: [
      "경기도 39만 건 가맹점 데이터 전수 분석으로 추천 알고리즘 방향 확정",
      "사용자 위치 반경 + 소비 카테고리 기반 AI 가맹점 추천 기능 설계 및 구현",
      "React + TypeScript + Tailwind CSS 기반 반응형 UI 개발 (위치 기반 지도, AI 추천 리스트, 카테고리 필터)",
      "멋쟁이사자처럼 13기 중앙해커톤 제출작 — 6인 팀에서 PM·프론트엔드·디자인 담당",
    ],
    contentsEn: [
      "Analyzed all ~390K Gyeonggi merchant records to set the recommendation direction",
      "Designed and built AI store recommendation based on user radius + spending category",
      "Built responsive UI with React + TypeScript + Tailwind CSS (location map, AI recommendation list, category filters)",
      "Submitted to the LIKELION 13th national hackathon — PM, frontend, and design in a 6-person team",
    ],
    decisions: [
      "설문의 '탐색 어려움' 응답을 근거로, 지도 중심 UI에서 추천 리스트 중심 UI로 전환",
    ],
    decisionsEn: [
      "Shifted from a map-first UI to a recommendation-list UI, based on the 'hard to discover' survey signal",
    ],
    results: [
      "멋쟁이사자처럼 13기 중앙해커톤 2차 예선 진출 (247팀 중 상위 12%)",
    ],
    resultsEn: [
      "Advanced to the 2nd round of the LIKELION 13th national hackathon (top 12% of 247 teams)",
    ],
    stats: [
      { label: "데이터", labelEn: "Data", value: "39만 건" },
      { label: "해커톤", labelEn: "Hackathon", value: "상위 12%" },
      { label: "탐색 어려움", labelEn: "Hard to discover", value: "53%" },
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "AI", "Figma"],
    image: "/projects/ywave/01.png",
    images: [
      "/projects/ywave/01.png",
      "/projects/ywave/02.png",
      "/projects/ywave/03.png",
      "/projects/ywave/04.png",
      "/projects/ywave/05.png",
      "/projects/ywave/06.png",
    ],
  },
  {
    title: "손글 (SonGeul)",
    caseId: "songeul",
    featured: true,
    titleEn: "SonGeul",
    subtitle: "시니어를 위한 AI-OCR 모바일 뱅킹",
    subtitleEn: "Mobile Banking for Seniors, with AI-OCR",
    period: "2025.09. ~ 2025.12.",
    periodEn: "Sep 2025 — Dec 2025",
    repo: "https://github.com/tlstkdgus/songeul",
    roles: ["PM", "프론트엔드"],
    rolesEn: ["PM", "Frontend"],
    goals: [
      "고령층의 모바일뱅킹 이용률은 53.4%로, 비고령층(95%)의 절반 수준입니다. 복잡한 입력 단계가 고령층을 모바일 금융 밖으로 밀어내고 있습니다",
    ],
    goalsEn: [
      "Mobile banking usage among seniors is 53.4% — barely half the 95% of everyone else. Complex input flows push seniors out of mobile finance",
    ],
    contents: [
      "손으로 쓴 메모를 촬영하면 AI-OCR이 인식하고, 가족 승인을 거쳐 송금이 완료되는 '입력 제거' UX 플로우 설계 (촬영 → 확인 → 승인 3단계)",
      "CLOVA OCR + Google Vision + 자체 파인튜닝 앙상블 아키텍처 설계 및 이상 패턴 감지 로드맵",
      "SAFE 프레임워크(Security·Assets·Family·Education) 기반 부가 기능 체계화",
      "시장 규모 산정 및 4개 수익원 설계",
    ],
    contentsEn: [
      "Designed an 'input-free' UX flow — photograph a handwritten memo, AI-OCR reads it, family approves, transfer completes (capture → confirm → approve)",
      "Designed CLOVA OCR + Google Vision + fine-tuned ensemble architecture with an anomaly detection roadmap",
      "Systematized features using the SAFE framework (Security · Assets · Family · Education)",
      "Sized the market and designed 4 revenue streams",
    ],
    results: [
      "2025 한국정보기술전략혁신학회(KIITI) 동계 학술대회 우수상 수상",
      "6인 팀(프론트엔드 3 · 백엔드 3)의 PM으로 기획·AI 설계·프론트엔드 개발을 리드",
    ],
    resultsEn: [
      "Won Excellence Award at the 2025 KIITI Winter Academic Conference",
      "Led a 6-person team (3 frontend · 3 backend) as PM across planning, AI architecture, and frontend development",
    ],
    tags: ["React", "TypeScript", "AI-OCR", "FinTech", "Figma"],
    image: "/projects/songeul/01.png",
    images: [
      "/projects/songeul/01.png",
      "/projects/songeul/02.png",
      "/projects/songeul/03.png",
      "/projects/songeul/04.png",
      "/projects/songeul/05.png",
      "/projects/songeul/06.png",
    ],
  },
  {
    // 13기 운영진 때 만든 동아리 앱 (§G-6에서 Other projects에 추가). 기간은 저장소 커밋 기준:
    // 첫 커밋 2025-03-18, 88개 중 75개가 3월, 마지막 커밋 2025-09-10. React(JavaScript) PWA
    title: "웰컴키트",
    caseId: "welcomekit",
    titleEn: "WelcomeKit",
    subtitle: "부원 45명이 쓴 13기 동아리 앱(QR 출석·빙고)",
    subtitleEn: "A club app used by 45 members of the 13th cohort (QR attendance, bingo)",
    period: "2025.03. ~ 2025.09.",
    periodEn: "Mar 2025 — Sep 2025",
    repo: "https://github.com/tlstkdgus/WelcomeKit",
    roles: ["PM", "프론트엔드 리드"],
    rolesEn: ["PM", "Frontend lead"],
    goals: ["한국외대 멋쟁이사자처럼 13기 부원 45명의 세션 출석을 수기 출석부로 관리하고 있었습니다"],
    goalsEn: ["Attendance for the 45 members of HUFS LIKELION's 13th cohort was kept on a paper roll"],
    contents: [
      "운영진이 QR을 띄우고 부원이 모바일로 스캔하면 서버에 바로 기록, 세션 시작 20분이 지난 스캔은 지각으로 자동 판정",
      "오늘 출석부에는 지각·결석자만 팀별로 표시",
      "빙고 미션: 승인 대기 중인 칸이 있으면 다른 칸 선택 불가, 승인되면 카드가 뒤집히며 미션 공개",
    ],
    contentsEn: [
      "Staff show a QR code, members scan it on their phones, and it's recorded on the server; scans more than 20 minutes after the start are marked late automatically",
      "Today's roll shows only late or absent members, by team",
      "Bingo missions: no other square can be picked while one awaits approval; once approved, the card flips to reveal the mission",
    ],
    results: ["부원 45명이 세션 출석과 빙고 미션에 사용"],
    resultsEn: ["Used by 45 members for session attendance and bingo missions"],
    tags: ["React", "PWA", "QR"],
  },
  {
    title: "커넥트",
    caseId: "connect",
    featured: true,
    titleEn: "Connect",
    subtitle: "은둔형 청년 지원 플랫폼",
    subtitleEn: "Support Platform for Socially Isolated Youth",
    period: "2024.09. ~ 2024.12.",
    periodEn: "Sep 2024 — Dec 2024",
    repo: "https://github.com/Connect-GBT/Front",
    commitsUrl: "https://github.com/Connect-GBT/Front/commits/main/?author=tlstkdgus",
    roles: ["PM", "프론트엔드"],
    rolesEn: ["PM", "Frontend"],
    goals: [
      "국내 은둔형 청년은 54만 명, 그중 80% 이상이 벗어나고 싶어 합니다. 하지만 대면 중심의 지원 프로그램은 정작 이들에게 닿지 않습니다",
    ],
    goalsEn: [
      "Korea has 540,000 socially isolated youth, and over 80% want a way out — but in-person support programs rarely reach them",
    ],
    contents: [
      "텍스트 시뮬레이션, AI 역할극 채팅, 사용자 매칭 대화 등 사회 적응 훈련 기능 설계",
      "AI 취업 컨설팅, 외부 기관 연계, 일간 뉴스레터 등 사회 참여 훈련 기능 개발",
      "구독 모델(사회 적응 6,900원 / 사회 참여 9,900원) 및 3단계 확장 전략 수립",
      "React 기반 40개 페이지 UI 구현, Spring Boot 백엔드 연동, 카카오맵 API 연동",
      "멋쟁이사자처럼 12기 3인 팀 프로젝트 — 기획·디자인·프론트엔드 담당",
    ],
    contentsEn: [
      "Designed social adaptation training features: text simulation, AI role-play chat, and user matching dialogue",
      "Developed social participation training: AI job consulting, institution links, and daily newsletters",
      "Established subscription model (₩6,900 / ₩9,900/month) and 3-phase growth strategy",
      "Implemented 40-page React UI, integrated Spring Boot backend and Kakao Maps API",
      "A 3-person team project (Likelion 12th cohort) — planning, design, and frontend",
    ],
    results: [
      "시장 테스트 평균 유용성 8.9점 달성 (목표 8.0점 초과)",
      "주간 챌린지 9.4점으로 최고 기능 평가",
      "가격 부담 응답(38.5%)을 근거로 구독료 인하",
    ],
    resultsEn: [
      "Achieved average market test usefulness score of 8.9 (exceeded 8.0 target)",
      "Weekly challenge feature received highest rating of 9.4",
      "Lowered the subscription price after 38.5% of testers flagged it as a burden",
    ],
    tags: ["React", "Spring Boot", "AI", "Figma", "Kakao Maps"],
    image: "/projects/connect/01.png",
    images: [
      "/projects/connect/01.png",
      "/projects/connect/02.png",
      "/projects/connect/03.png",
      "/projects/connect/04.png",
      "/projects/connect/05.png",
      "/projects/connect/06.png",
      "/projects/connect/07.png",
      "/projects/connect/08.png",
    ],
  },
  {
    title: "NeuroSight",
    caseId: "neurosight",
    titleEn: "NeuroSight",
    subtitle: "마취 시술 보조 서비스",
    subtitleEn: "Anesthesia Guidance System",
    period: "2025.07.",
    periodEn: "Jul 2025",
    roles: ["PM", "IR"],
    rolesEn: ["PM", "IR"],
    goals: [
      "마취 사고 대부분이 마취 비전문의 시술 환경에서 발생하는 구조적 문제 정의",
      "배럴아이의 정량적 초음파(QUS) 기술을 기반으로 실시간 조직 분석·니들 트래킹·3D 마취제 확산 예측 기능 컨셉 설계",
    ],
    goalsEn: [
      "Framed the structural problem: most anesthesia incidents occur in settings without anesthesia specialists",
      "Design concept features using Barrel Eye's QUS technology: real-time tissue analysis, needle tracking, and 3D anesthetic diffusion prediction",
    ],
    contents: [
      "마취 의료 사고 현황 및 비전문의 의존 구조 문제 분석, 글로벌 의료 AI 시장 조사",
      "B2B SaaS + OEM 파트너십 하이브리드 수익 모델 설계, 3년 내 3% 시장 점유율 단계별 로드맵 수립",
      "멀티모달 AI 아키텍처(CNN + PINN + Transformer) 활용 방안 연구 및 의료진 페르소나 설정",
      "해커톤 발표자료 작성 및 아이디어 피칭 담당 (6인팀, GRAFFITI 2025: AI Startup by KAIST ICISTS)",
    ],
    contentsEn: [
      "Analyzed anesthesia incident trends and over-reliance on non-specialists; researched the global medical AI market",
      "Designed hybrid B2B SaaS + OEM partnership revenue model with phased roadmap targeting 3% market share in 3 years",
      "Researched multimodal AI architecture (CNN + PINN + Transformer) and defined medical personnel persona",
      "Produced pitch deck and led idea pitching (6-person team, GRAFFITI 2025: AI Startup by KAIST ICISTS)",
    ],
    decisions: [
      "마취 보조 시스템의 타겟을 전문 마취과의에서 비전문의로 재설정하여 시장 규모 확대",
      "B2B SaaS 단독 모델에서 OEM 파트너십 하이브리드 모델로 전환하여 의료기기 규제 리스크 분산",
    ],
    decisionsEn: [
      "Refocused the assist system target from specialist anesthesiologists to non-specialists to expand addressable need",
      "Moved from B2B SaaS–only to a hybrid OEM partnership model to spread medical-device regulatory risk",
    ],
    results: [
      "GRAFFITI 2025 AI Startup 해커톤 참가 (KAIST ICISTS 주최)",
      "의료 AI 규제 환경(FDA/CE) 기반 현실적 사업화 전략 수립",
      "2025 1학기 HUFStudy 최우수상 — 한국외대 교육혁신단 (NeuroSight · RZi 활동 기반)",
    ],
    resultsEn: [
      "Participated in GRAFFITI 2025 AI Startup Hackathon (hosted by KAIST ICISTS)",
      "Developed realistic commercialization strategy based on FDA/CE medical AI regulatory environment",
      "Grand Prize, 2025 Spring HUFStudy — HUFS Center for Educational Innovation (based on NeuroSight · RZi work)",
    ],
    tags: ["Medical AI", "QUS", "B2B SaaS", "Figma"],
    image: "/projects/neurosight/01.png",
    images: [
      "/projects/neurosight/01.png",
      "/projects/neurosight/02.png",
      "/projects/neurosight/03.png",
      "/projects/neurosight/04.png",
      "/projects/neurosight/05.png",
      "/projects/neurosight/06.png",
      "/projects/neurosight/07.png",
    ],
  },
  {
    title: "TCP",
    caseId: "tcp",
    titleEn: "TCP",
    subtitle: "약관 위험 알림 서비스",
    subtitleEn: "Terms-of-Service Risk Alerts",
    period: "2025.04. ~ 2025.05.",
    periodEn: "Apr 2025 — May 2025",
    roles: ["PM"],
    rolesEn: ["PM"],
    goals: [
      "131명 설문조사 결과 93%가 약관을 제대로 읽지 않는 문제를 해결하는 AI 기반 실시간 약관 분석 서비스 기획",
      "스크린 오버레이 기술로 백그라운드에서 자동 약관 감지 및 위험 조항 알림 시스템 설계",
    ],
    goalsEn: [
      "Planned an AI-based real-time ToS analysis service addressing the fact that 93% of 131 surveyed users skip reading terms",
      "Designed a system to auto-detect ToS in the background via screen overlay and alert users to risky clauses",
    ],
    contents: [
      "BERT·GPT 기반 NLP 모델을 법률 특화 데이터셋으로 미세조정하여 핵심 조항·위험 요소 자동 추출 설계",
      "복잡한 약관을 쉬운 언어로 요약하고 잠재적 위험 조항을 시각적으로 강조하는 시스템 기획",
      "프리미엄 구독, 기업용 API, 파트너십 등 5가지 수익원 구조화 및 글로벌 리걸테크 시장 분석",
      "기획 담당 (멋쟁이사자처럼 13기)",
    ],
    contentsEn: [
      "Designed auto-extraction of key clauses and risk terms using BERT/GPT models fine-tuned on legal datasets",
      "Planned a system to summarize complex ToS in plain language and visually highlight risky clauses",
      "Structured 5 revenue streams and analyzed the global legaltech market",
      "Led overall planning as Likelion 13th cohort",
    ],
    results: [
      "교내 아이디어톤 최우수상 수상",
      "전국 해커톤 2차 예선 진출",
    ],
    resultsEn: [
      "Won campus Ideathon Grand Prize",
      "Advanced to 2nd round of national hackathon",
    ],
    tags: ["AI", "NLP", "BERT", "GPT"],
    image: "/projects/tcp/01.png",
    images: [
      "/projects/tcp/01.png",
      "/projects/tcp/02.png",
      "/projects/tcp/03.png",
      "/projects/tcp/04.png",
      "/projects/tcp/05.png",
      "/projects/tcp/06.png",
    ],
  },
  {
    title: "hai",
    caseId: "hai",
    titleEn: "hai",
    subtitle: "개인 맞춤형 커리어 멘토링 서비스",
    subtitleEn: "Personalized Career Mentoring Service",
    period: "2025.06.",
    periodEn: "Jun 2025",
    repo: "https://github.com/CHALLKATHON-Official/2025_CHALLKATHON_Hi-High_FE",
    commitsUrl: "https://github.com/CHALLKATHON-Official/2025_CHALLKATHON_Hi-High_FE/commits?author=tlstkdgus",
    roles: ["PM", "프론트엔드"],
    rolesEn: ["PM", "Frontend"],
    goals: [
      "취업 준비생이 겪는 '직무 선택의 불확실성'을 AI가 구조적으로 해소하는 맞춤형 커리어 멘토링 서비스 기획",
      "강점·경험·목표를 입력하면 AI가 직무별 적합도를 분석하고 커리어 로드맵을 제시하는 대화형 흐름 설계",
    ],
    goalsEn: [
      "Planned an AI-powered career mentoring service that structurally resolves 'job direction uncertainty' for job seekers",
      "Designed a conversational flow where AI analyzes user strengths, experience, and goals to present a personalized career roadmap",
    ],
    contents: [
      "커리어 탐색 과정을 '자기 이해 → 직무 매칭 → 로드맵 수립' 3단계로 구조화하고 AI 대화 흐름 기획",
      "React + TypeScript 기반 대화형 UI 개발 및 AI 추천 결과 시각화 구현",
      "기획·프론트엔드 개발 담당 (CHALLKATHON, 한국외국어대학교 컴퓨터공학부 × UMC 공동 주최)",
    ],
    contentsEn: [
      "Structured career exploration into 3 phases (self-understanding → job matching → roadmap building) and planned the AI conversation flow",
      "Developed conversational UI with React + TypeScript and implemented AI recommendation visualization",
      "Led planning and frontend development (CHALLKATHON, co-hosted by HUFS CS Dept × UMC)",
    ],
    results: [
      "해커톤 기간 내 AI 커리어 추천 MVP를 완성해 배포",
    ],
    resultsEn: [
      "Shipped a working AI career recommendation MVP within the hackathon period",
    ],
    tags: ["React", "TypeScript", "AI", "Figma"],
    image: "/projects/hai/01.png",
    images: [
      "/projects/hai/01.png",
      "/projects/hai/02.png",
      "/projects/hai/03.png",
      "/projects/hai/04.png",
      "/projects/hai/05.png",
      "/projects/hai/06.png",
    ],
  },
  {
    title: "AInterview",
    caseId: "ainterview",
    titleEn: "AInterview",
    subtitle: "모의 면접 서비스",
    subtitleEn: "Mock Interview App",
    period: "2024.07. ~ 2024.11.",
    periodEn: "Jul 2024 — Nov 2024",
    repo: "https://github.com/Team2-AInterview/frontend",
    commitsUrl: "https://github.com/Team2-AInterview/frontend/commits?author=tlstkdgus",
    roles: ["PM", "프론트엔드"],
    rolesEn: ["PM", "Frontend"],
    goals: [
      "취업 준비생 46%가 면접을 가장 어려워한다는 문제 확인, 실전 연습 기회 부족 해결",
      "음성 인식과 GPT Fine-tuning을 결합한 AI 기반 실시간 모의 면접 서비스 개발",
    ],
    goalsEn: [
      "Addressed the problem that 46% of job seekers find interviews most difficult with insufficient practice opportunities",
      "Developed an AI-based real-time mock interview service combining voice recognition and GPT fine-tuning",
    ],
    contents: [
      "Azure Speech Service 활용 음성-텍스트 변환(STT/TTS) 처리 시스템 구현",
      "Fine-tuned GPT-4o-mini 기반 직무별 맞춤 면접 질문 자동 생성",
      "React 기반 인터랙티브 UI 설계 및 Spring Boot 백엔드 연동",
      "기획·디자인·프론트엔드 개발 담당 (멋쟁이사자처럼 12기 최종 프로젝트)",
    ],
    contentsEn: [
      "Implemented voice-to-text (STT/TTS) processing with Azure Speech Service",
      "Built auto job-specific question generation using fine-tuned GPT-4o-mini",
      "Designed interactive React UI and integrated with Spring Boot backend",
      "Led planning, design, and frontend development (Likelion 12th cohort final project)",
    ],
    results: [
      "음성 인식 기반 실시간 AI 면접 플로우를 완성해 12기 최종 프로젝트로 발표",
    ],
    resultsEn: [
      "Completed the voice-based real-time AI interview flow and presented it as the 12th cohort final project",
    ],
    tags: ["React", "Spring Boot", "Azure Speech", "GPT-4o", "AI", "Figma"],
    image: "/projects/ainterview/01.png",
    images: [
      "/projects/ainterview/01.png",
      "/projects/ainterview/02.png",
      "/projects/ainterview/03.png",
      "/projects/ainterview/04.png",
      "/projects/ainterview/05.png",
    ],
  },
  {
    title: "RZi",
    caseId: "rzi",
    titleEn: "RZi",
    subtitle: "알뜰 지출관리 플랫폼",
    subtitleEn: "Smart Expense Manager",
    period: "2025.07. ~ 2025.08.",
    periodEn: "Jul 2025 — Aug 2025",
    repo: "https://github.com/Gongdori-Moondori/Gongdori-Moondori-FE",
    commitsUrl: "https://github.com/Gongdori-Moondori/Gongdori-Moondori-FE/commits/main/?author=tlstkdgus",
    roles: ["PM", "풀스택"],
    rolesEn: ["PM", "Full-stack"],
    goals: [
      "동대문구 청년층 전통시장 이용률(8.2%) 저조 문제를 전통시장·대형마트 실시간 가격 비교로 해결",
      "K-HTML 해커톤(서울시 동대문구청 × 경희대) 과제 해결",
    ],
    goalsEn: [
      "Address low traditional market usage (8.2%) among youth in Dongdaemun-gu through real-time price comparison with large marts",
      "Address the challenge set by K-HTML Hackathon (Dongdaemun-gu × KHU)",
    ],
    contents: [
      "OCR 기술 + AI 추천을 결합한 종합 쇼핑 도우미 PWA 개발",
      "실시간 가격비교, OCR 스캔, Google Maps 경로안내, AI 상품추천 핵심 기능 구현",
      "Next.js 15 + React 19 기반 PWA 아키텍처 설계 및 개발 리드",
    ],
    contentsEn: [
      "Built a comprehensive shopping assistant PWA combining OCR and AI recommendations",
      "Implemented real-time price comparison, OCR scanning, Google Maps navigation, and AI product recommendations",
      "Led PWA architecture design and development on Next.js 15 + React 19",
    ],
    results: [
      "Next.js 15 + PWA 기반 종합 쇼핑 도우미 서비스 해커톤 기간 내 완성 배포",
      "OCR·AI 추천·Google Maps 경로안내를 단일 앱으로 통합한 실사용 MVP 완성 (K-HTML 해커톤 수료)",
      "2025 1학기 HUFStudy 최우수상 — 한국외대 교육혁신단 (NeuroSight · RZi 활동 기반)",
    ],
    resultsEn: [
      "Shipped a comprehensive Next.js 15 PWA shopping assistant within the hackathon period",
      "Delivered a working MVP integrating OCR, AI recommendation, and Google Maps navigation in one app (K-HTML Hackathon completed)",
      "Grand Prize, 2025 Spring HUFStudy — HUFS Center for Educational Innovation (based on NeuroSight · RZi work)",
    ],
    tags: ["Next.js", "React", "PWA", "OCR", "Google Maps API", "AI"],
    image: "/projects/rzi/01.png",
    images: [
      "/projects/rzi/01.png",
      "/projects/rzi/02.png",
      "/projects/rzi/03.png",
      "/projects/rzi/04.png",
      "/projects/rzi/05.png",
      "/projects/rzi/06.png",
    ],
  },
  {
    title: "ARtliving",
    caseId: "artliving",
    titleEn: "ARtliving",
    subtitle: "AR 기반 가구 추천 플랫폼",
    subtitleEn: "AR-Powered Furniture Recommendation Platform",
    period: "2024.12. ~ 2025.06.",
    periodEn: "Dec 2024 — Jun 2025",
    roles: ["PM"],
    rolesEn: ["PM"],
    goals: [
      "가구 구매 후 '실제 공간과의 불일치'로 발생하는 반품·실패 경험을 AR 시뮬레이션으로 사전에 해결하는 플랫폼 기획",
      "사용자의 공간 치수·취향 데이터를 AI가 분석해 개인화 추천까지 이어지는 통합 UX 설계",
    ],
    goalsEn: [
      "Planned an AR simulation platform to solve post-purchase disappointment caused by size/style mismatches before buying",
      "Designed an integrated UX where AI analyzes user space dimensions and preferences to deliver personalized recommendations",
    ],
    contents: [
      "AR 기반 실공간 가구 시각화 기능 설계 (공간 치수 인식 → 3D 가구 배치 → 색상·소재 커스터마이징) 및 서비스 IA 구성",
      "사용자 공간·취향 데이터 기반 AI 추천 알고리즘 기획 및 추천 결과 화면 설계",
      "HUFS H-UP 진로탐색학점제 기획 담당 — 문제 정의부터 프로덕트 설계까지 주도",
    ],
    contentsEn: [
      "Designed AR furniture visualization (space measurement → 3D placement → color/material customization) and structured the service IA",
      "Planned AI recommendation algorithm based on user space/preference data and designed recommendation result UI",
      "Led overall planning for HUFS H-UP Career Exploration Program — directed from problem definition to product design",
    ],
    results: [
      "2025 HUFS H-UP 진로탐색학점제 진리상 [최우수상] 수상",
    ],
    resultsEn: [
      "Won Grand Prize (Truth Award) at 2025 HUFS H-UP Career Exploration Program",
    ],
    tags: ["AR", "React", "AI", "Figma"],
  },
  {
    title: "Meal당",
    caseId: "mealdang",
    titleEn: "Meal당",
    subtitle: "당뇨병 환자를 위한 AI 식단 관리 서비스",
    subtitleEn: "Diet Management Service for Diabetics, with AI",
    period: "2024.07. ~ 2024.08.",
    periodEn: "Jul 2024 — Aug 2024",
    repo: "https://github.com/MealSugar/FE",
    commitsUrl: "https://github.com/MealSugar/FE/commits/master/?author=tlstkdgus",
    roles: ["PM", "프론트엔드"],
    rolesEn: ["PM", "Frontend"],
    goals: [
      "예측보다 30년 빠르게 600만 명을 돌파한 국내 당뇨 인구의 가장 큰 어려움인 식단 관리(44%) 문제 해결",
      "대한당뇨병학회 식품교환표 기반 개인 맞춤 권장 칼로리 계산 및 ChatGPT 활용 식단 자동 생성",
    ],
    goalsEn: [
      "Address the #1 difficulty (diet management, 44%) for Korea's diabetic population of 6M, 30 years ahead of projections",
      "Calculate personalized recommended calories using the Korean Diabetes Association's food exchange table and auto-generate meal plans via ChatGPT",
    ],
    contents: [
      "식품교환표 기반 맞춤 칼로리 계산 알고리즘 설계 및 ChatGPT 연동 개인화 식단 생성 기능 개발",
      "혈당 모니터링, 당뇨 친화 식당 지도 등 핵심 기능 포함한 React 기반 웹 애플리케이션 개발",
      "프리미엄 구독, 데이터 판매, 당뇨 관련 제품 쇼핑몰 등 다각적 비즈니스 모델 구축",
      "서비스 기획·UI/UX 디자인·프론트엔드 개발 담당 (멋쟁이사자처럼 12기)",
    ],
    contentsEn: [
      "Designed food-exchange-table calorie algorithm and developed ChatGPT-integrated personalized meal generation",
      "Built React web app including blood glucose monitoring and diabetes-friendly restaurant map",
      "Established multi-channel business model: premium subscription, data sales, and diabetic product store",
      "Led entire process from planning to UI/UX design to frontend development (Likelion 12th cohort)",
    ],
    results: [
      "서비스 배포 완료 (mealdang.vercel.app)",
      "멋쟁이사자처럼 12기 프로젝트 완성",
    ],
    resultsEn: [
      "Service deployed (mealdang.vercel.app)",
      "Completed as Likelion 12th cohort project",
    ],
    tags: ["React", "ChatGPT", "AI", "Healthcare", "Figma"],
    url: "https://mealdang.vercel.app",
    image: "/projects/mealdang/01.png",
    images: [
      "/projects/mealdang/01.png",
      "/projects/mealdang/02.png",
      "/projects/mealdang/03.png",
      "/projects/mealdang/04.png",
      "/projects/mealdang/05.png",
      "/projects/mealdang/06.png",
    ],
  },
  {
    title: "허리UP!",
    caseId: "huriup",
    titleEn: "HuriUP!",
    subtitle: "웹캠 기반 자세 교정 서비스",
    subtitleEn: "Webcam-Based Posture Correction Service",
    period: "2024.05.",
    periodEn: "May 1 — May 16, 2024",
    roles: ["PM"],
    rolesEn: ["PM"],
    goals: [
      "20~40대 젊은 층 허리디스크 환자 급증 문제를 해결하는 웹캠 기반 실시간 자세 분석·교정 서비스 기획",
      "IT 직장인 및 대기업 HR을 타겟으로 한 B2C → B2B 구독 모델 서비스 전략 수립",
    ],
    goalsEn: [
      "Planned a webcam-based real-time posture analysis and correction service to address the surge in back disc problems among people in their 20s–40s",
      "Established B2C → B2B subscription model strategy targeting IT workers and corporate HR departments",
    ],
    contents: [
      "건강보험심사평가원 통계 기반 시장 조사 및 Pain Point 도출",
      "웹캠 자세 분석, 실시간 가이드라인 비교, 경고 알림, 웨어러블 연동 핵심 기능 설계",
      "체험 마케팅, 웨비나, 숏폼 콘텐츠 중심 마케팅 전략 기획",
      "UI/UX 설계 및 프로토타입 제작 완료 (PM 역할, 6인팀, 멋쟁이사자처럼 12기)",
    ],
    contentsEn: [
      "Conducted market research based on Health Insurance Review & Assessment Service statistics and identified Pain Points",
      "Designed core features: webcam posture analysis, real-time guideline overlay, warning alerts, and wearable integration",
      "Planned marketing strategy centered on experiential marketing, webinars, and short-form content",
      "Completed UI/UX design and prototype (PM role, 6-person team, Likelion 12th cohort)",
    ],
    results: [
      "B2C → B2B 구독 수익 모델 전략 및 핵심 기능 PoC 완성 (웹캠 자세 분석·알림·웨어러블 연동)",
      "6인팀 PM으로서 문제 정의·솔루션 설계·UI/UX 프로토타입 전 과정 주도 (멋쟁이사자처럼 12기 아이디어톤)",
    ],
    resultsEn: [
      "Completed B2C → B2B subscription model strategy and core PoC (webcam posture analysis, alerts, wearable integration)",
      "Led a 6-person team as PM through the full process: problem definition, solution design, and UI/UX prototype (Likelion 12th Ideathon)",
    ],
    tags: ["Figma", "UX/UI", "Healthcare"],
    image: "/projects/huriup/01.png",
    images: [
      "/projects/huriup/01.png",
      "/projects/huriup/02.png",
      "/projects/huriup/03.png",
      "/projects/huriup/04.png",
      "/projects/huriup/05.png",
    ],
  },
  {
    title: "dotori",
    caseId: "dotori",
    titleEn: "dotori",
    subtitle: "시각장애인 점자 교육 플랫폼",
    subtitleEn: "Braille Education Platform for the Visually Impaired",
    period: "2025.06. ~ 2025.11.",
    periodEn: "Jun 2025 — Nov 2025",
    roles: ["PM", "IR", "프론트엔드"],
    rolesEn: ["PM", "IR", "Frontend"],
    goals: [
      "시각장애인의 점자 교육 콘텐츠 접근성 부재 문제를 IT 플랫폼으로 해소하는 서비스 기획",
      "소셜 임팩트와 비즈니스 실현 가능성을 함께 설득하는 IR 피칭 전략 수립",
    ],
    goalsEn: [
      "Planned a platform to solve the lack of accessible Braille educational content for the visually impaired",
      "Built an IR pitching strategy that convinces on both social impact and business viability simultaneously",
    ],
    contents: [
      "시각장애인 점자 교육 문제 구조 분석, 학습 단계별 콘텐츠 설계 및 수익 모델 수립 (구독·기관 파트너십 기반)",
      "HUFS 창업캠프 IR 피칭 경진대회 발표 담당 — 사업성·임팩트·기술 실현 가능성 3축 중심으로 스토리 구성",
    ],
    contentsEn: [
      "Analyzed Braille education problem structure; designed step-by-step learning content and revenue model (subscription + institutional partnership)",
      "Delivered IR pitch at HUFS Startup Camp competition — structured narrative around 3 axes: business viability, social impact, and technical feasibility",
    ],
    results: [
      "2025 창업캠프 실전 IR 피칭 경진대회 최우수상 (2025.06)",
      "\"PICK YOUR IDEA\" IR PITCHING 우수상 — 서울 AI 허브 / MOVE (2025.07)",
      "G-RISE × 경상대학 2025 창업 비즈니스 모델 경진대회 대상 (2025.11)",
    ],
    resultsEn: [
      "Grand Prize, 2025 Startup Camp IR Pitching Competition (Jun 2025)",
      "Excellence Award, \"PICK YOUR IDEA\" IR Pitching — Seoul AI Hub / MOVE (Jul 2025)",
      "Grand Prize, G-RISE × College of Business 2025 Startup BM Competition (Nov 2025)",
    ],
    tags: ["Startup", "Social Impact"],
  },
  {
    title: "16P!ay",
    caseId: "16play",
    titleEn: "16P!ay",
    subtitle: "MBTI 커뮤니티",
    subtitleEn: "MBTI Community Service",
    period: "2025.03. ~ 2025.06.",
    periodEn: "Mar 2025 — Jun 2025",
    roles: ["PM", "디자인", "프론트엔드"],
    rolesEn: ["PM", "Design", "Frontend"],
    goals: [
      "MBTI 16가지 성격 유형을 기반으로, 같은 유형끼리는 공감·소통하고 다른 유형과는 차이를 탐색하는 커뮤니티 서비스 기획",
      "멋쟁이사자처럼 13기 운영진으로서 아기사자(13기 부원)들과 함께 기획·디자인·개발까지 완성",
    ],
    goalsEn: [
      "Planned a community service where same MBTI types connect over shared traits while exploring differences with other types",
      "Built with the 13th-cohort members as their staff lead — from planning and design to development",
    ],
    contents: [
      "16가지 MBTI 유형별 전용 게시판, 유형 간 교류 공간, MBTI 성격 분석 콘텐츠 등 서비스 흐름 설계",
      "PM으로 UI 기획·Figma 와이어프레임을 맡고 React 프론트엔드 개발에 참여",
    ],
    contentsEn: [
      "Designed service structure: type-specific boards, cross-type interaction spaces, and MBTI personality analysis content",
      "As PM, owned UI planning and Figma wireframes and worked on the React frontend",
    ],
    results: [
      "멋쟁이사자처럼 13기 미니프로젝트 최우수상",
    ],
    resultsEn: [
      "Won Grand Prize in Likelion 13th cohort mini project",
    ],
    tags: ["React", "TypeScript", "Community", "Figma"],
  },
];
