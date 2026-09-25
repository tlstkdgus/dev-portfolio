// 대표 프로젝트 4개. 메인에서는 한 줄 요약·핵심 수치·역할만(selected-projects.tsx),
// 헤드라인·본문 세 문장·전→후 성과·현장 사진은 /work/<id> 상세 페이지(work-detail.tsx)에서 쓴다.
// 한 일 목록·범위 칩·흐름 도식·인용문은 FINAL(2026.09.22)에서 뺐다.
//
// 개발자 포트폴리오 순서 (2026-09-25): 해커톤 운영 도구(ANIMAL LEAGUE) → CleanB → FlowPay → Y:Wave.
// 직접 짠 코드의 양과 현장에서 실제로 돌아간 정도 순서다. 기획자 포트폴리오(tlstkdgus/Portfolio)와 사실은 같고,
// 헤드라인·판단·본문을 구현과 설계 판단 중심으로 다시 썼다. 기술 내용은 공개 저장소 코드에서 확인한 것만 쓴다.
// 수치는 PORTFOLIO.md에 출처가 있는 것만 쓴다. 역할 경계("공동"/"직접")도 PORTFOLIO.md를 따른다.

export interface Localized {
  ko: string;
  en: string;
}

export interface SelectedStat {
  /** 개선 전 상태(있을 때만). 목록에서 취소선 → 뒤에 v를 굵게 보여 준다 */
  before?: string | Localized;
  /** 숫자. 단위가 언어마다 다르면(562개 / 562) Localized로 둔다 — 단위를 설명 쪽에 떼어 두면 읽는 사람이 다시 조립해야 한다 */
  v: string | Localized;
  k: Localized;
}

export interface SelectedImage {
  src: string;
  /** 이미지 안의 글·숫자를 대신 전달하는 설명 (다이어그램은 내용 그대로) */
  alt: Localized;
}

/** 메인 카드 썸네일 — 이미지 안에 글자가 있어 언어별로 따로 만든다 (2026-09-25) */
export interface SelectedThumb {
  src: Localized;
  alt: Localized;
}

export interface SelectedProject {
  id: string;
  kicker: Localized;
  /** 상태 뱃지 — 사실 그대로. CleanB는 결제 연동 전이라 'LIVE'라고 쓰지 않는다 */
  status: Localized;
  title: Localized;
  period: Localized;
  role: Localized;
  headline: Localized;
  /** 이 프로젝트가 무엇인지 한 줄 — 메인 목록에서 헤드라인 대신 보인다.
   *  헤드라인("…예측할 수 있는 해커톤을 만들었습니다")만으로는 어떤 프로젝트인지 안 보인다는 상현 지적 (2026-09-24) */
  summary: Localized;
  /** 판단 한 줄 — 상세 페이지에 있는 '왜 그렇게 정했는지'를 메인 카드에서도 보이게 한다 (§G-5) */
  decision: Localized;
  /** 메인 목록 썸네일. 없으면 hero.
   *  2026-09-25: 스크린샷을 그대로 자르던 것을 표지처럼 디자인한 이미지로 바꿨다(레퍼런스 limdahyun.vercel.app 구성,
   *  색은 사이트의 검정·회색·블루). 이름·한 줄·역할 + 기기 목업 속 실제 화면. 1600×1000 @1.5x, Pretendard.
   *  원본 HTML은 design/thumbnails/. 상세 페이지 캐러셀의 첫 장으로도 쓴다 */
  thumb?: SelectedThumb;
  /** 문제 → 조치 → 결과, 완결형 세 문장 (v9 어투 규칙) */
  body: Localized;
  stats: SelectedStat[];
  hero: SelectedImage;
  /** 대표 화면 배경 — 어두운 스크린샷은 ink, 밝은 화면은 muted */
  heroTone: "ink" | "muted";
  gallery: SelectedImage[];
  caseId: string;
  /** 쓴 기술 — 메인 카드와 상세 페이지 메타에 칩으로 보여 준다. 저장소 package.json·README에서 확인한 것만 */
  stack: string[];
  /** 공개 저장소. 개발자 포트폴리오라 메인 카드에서도 바로 연다. CleanB는 비공개라 넣지 않는다 */
  repoUrl?: string;
  /** 같은 프로젝트의 다른 공개 저장소 (해커톤: FAQ 봇 · 제출물 검사). 라벨은 저장소가 무엇인지 */
  extraRepos?: { label: Localized; url: string }[];
  /** 서비스 링크 */
  liveUrl?: string;
  /** 외부 공개 케이스 (예: 브랜드 디자인 랩의 Behance) */
  behanceUrl?: string;
  /** 현장 사진(제3자 기록) — 출처를 반드시 같이 보여준다 */
  field?: {
    images: SelectedImage[];
    source: { label: Localized; url: string };
  };
}

export const selectedProjects: SelectedProject[] = [
  {
    id: "hackathon14",
    kicker: { ko: "멋쟁이사자처럼 인턴 · 14기 중앙해커톤 운영 도구", en: "LIKELION Internship · 14th Hackathon Ops Tools" },
    status: { ko: "현장 투입 · 2026.08 본선", en: "Used live · Finals Aug 2026" },
    title: { ko: "ANIMAL LEAGUE", en: "ANIMAL LEAGUE" },
    period: { ko: "2026.06 – 2026.08", en: "Jun – Aug 2026" },
    role: { ko: "운영 도구 3종 단독 개발 · 본선 현장 운영", en: "Built 3 ops tools solo · Ran the finals on site" },
    headline: {
      ko: "2,000명 앞에서 멈추면 안 되는\n본선 콘솔을 직접 만들어 운영했습니다.",
      en: "I built and ran a finals console that couldn't stop in front of 2,000 people.",
    },
    // '연합 해커톤'은 학생 주최 대학 연합 해커톤(별도 기획물)을 가리키므로 여기서는 쓰지 않는다 (§G-5)
    summary: { ko: "80개 대학 2,000명이 참가한 14기 중앙해커톤의 본선 토너먼트 콘솔(스크린·심사·운영 3화면)과 제출물 검사 스크립트, FAQ 디스코드 봇", en: "The finals tournament console (stage, judge, and ops views), a submission-checking script, and an FAQ Discord bot for LIKELION's 14th hackathon, with 2,000 participants from 80 universities" },
    decision: { ko: "결과를 되돌릴 수 없는 현장이라고 보고, 심사 제출은 서버가 명단과 경기 상태로 다시 검증하고 상태 쓰기는 버전 번호로 충돌을 막도록 설계했습니다.", en: "Results couldn't be undone on stage, so the server re-validates every vote against the allowlist and match state, and state writes are guarded by a version number against conflicts." },
    thumb: {
      src: { ko: "/projects/hackathon14/thumb-ko.jpg", en: "/projects/hackathon14/thumb-en.jpg" },
      alt: { ko: "검정 바탕 썸네일: ANIMAL LEAGUE, 기획부터 본선 운영까지. 본선 무대 스크린(결승 3 대 2)과 직접 만든 운영 콘솔 화면", en: "Black thumbnail: ANIMAL LEAGUE, planned and run end to end. The finals stage screen (3 to 2) and the ops console I built" },
    },
    body: {
      ko: "본선 토너먼트는 심사위원 5명의 투표가 무대 스크린에 바로 반영돼야 했고, 결과를 공개한 뒤에는 되돌릴 수 없었습니다. 브래킷 전이를 순수 함수로 분리해 단위 테스트 59개로 거부 경로를 확인하고, Supabase의 상태 한 행을 rev 번호로 잠가 운영자가 동시에 조작해도 상태가 꼬이지 않게 했으며, 명단 밖 제출과 늦게 도착한 제출은 서버에서 거부했습니다. 이 콘솔로 본선 8팀 토너먼트를 끝까지 진행했고, 투표에서 무대 스크린까지 실측 2.2초였습니다.",
      en: "In the finals tournament, five judges' votes had to reach the stage screen right away, and a revealed result couldn't be taken back. I split the bracket transitions into pure functions covered by 59 unit tests focused on rejection paths, locked the single Supabase state row with a rev number so concurrent operators couldn't corrupt it, and rejected off-list and late-arriving votes on the server. The console ran the 8-team finals to the end, with a measured 2.2 seconds from vote to stage screen.",
    },
    stats: [
      // §G-4·5: 전후 단위를 맞췄다(하루 3시간 → 하루 15분). 추정치(약 2일)는 숫자 전체의 신뢰도를 깎아 뺐다.
      // 2.2초는 값이 아니라 설명에 둔다. 값이 '투표 즉시 스크린 반영(2.2초)'로 길어지면 상세 성과 칸 글자가 모두 작아진다
      { before: { ko: "하루 3시간", en: "3 hrs/day" }, v: { ko: "하루 15분", en: "15 min/day" }, k: { ko: "참가자 문의 대응 · 229건 중 80.8% 즉답 · 미응답 0건", en: "participant inquiries · 80.8% of 229 answered instantly · none unanswered" } },
      { before: { ko: "집계 후 PPT", en: "Tally, then PPT" }, v: { ko: "투표 즉시 스크린 반영", en: "On screen as votes land" }, k: { ko: "본선 결과 공개 · 투표에서 스크린까지 2.2초", en: "finals reveal · 2.2 s from vote to stage screen" } },
      { before: { ko: "수작업 확인", en: "Manual checks" }, v: { ko: "1회 전수 검사", en: "One full scan" }, k: { ko: "제출물 검사 · 위반 5팀 적발", en: "submission checks · 5 violating teams caught" } },
    ],
    hero: {
      src: "/projects/hackathon14/02.png",
      alt: {
        ko: "본선 결승 무대 스크린: 멋쟁이사자들 3 대 호랑이기운 2, 심사위원 5명의 투표 카드",
        en: "Finals stage screen: 3 to 2 in the final, with the five judges' vote cards",
      },
    },
    heroTone: "ink",
    gallery: [
      {
        src: "/projects/hackathon14/04.png",
        alt: {
          ko: "직접 만든 운영 콘솔: 라운드별 대진, 경기 시작, 결과 공개를 조작하는 운영팀 화면",
          en: "The ops console I built: bracket, match start, and result reveal controls",
        },
      },
      {
        src: "/projects/hackathon14/05.png",
        alt: {
          ko: "심사위원 화면: 두 팀 중 승자를 고르는 투표 화면과 발표 타이머",
          en: "Judge view: picking the winner of a match, with the pitch timer",
        },
      },
    ],
    caseId: "hackathon14",
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "Python", "discord.py", "LLM API"],
    repoUrl: "https://github.com/tlstkdgus/animal-league",
    extraRepos: [
      { label: { ko: "FAQ 봇", en: "FAQ bot" }, url: "https://github.com/tlstkdgus/hackathon-faq-bot" },
      { label: { ko: "제출물 검사", en: "Submission check" }, url: "https://github.com/tlstkdgus/hackathon-commit-check" },
    ],
    // 사진·인용: 멋쟁이사자처럼 브랜드 디자인 랩의 Behance 케이스(공동 소유자로 등재). 브랜드 디자인은 랩의 작업이고,
    // 상현의 몫은 본선 무대·심사·운영 콘솔과 해커톤 기획이다. 사진은 콘솔이 실제 무대에서 쓰인 장면 위주로 골랐다.
    field: {
      images: [
        { src: "/projects/hackathon14/field-console.jpg", alt: { ko: "본선 무대 옆에서 운영 콘솔을 조작하는 운영자. 노트북에 브래킷과 경기 진행 화면이 떠 있다", en: "An operator running the ops console beside the stage, bracket and match controls on the laptop" } },
        { src: "/projects/hackathon14/field-stage.jpg", alt: { ko: "본선 무대: 발표 팀 뒤 대형 스크린에 심사 점수가 실시간으로 표시된다", en: "Finals stage: the live judging score on the big screen behind a presenting team" } },
        { src: "/projects/hackathon14/field-pitch.jpg", alt: { ko: "ANIMAL LEAGUE 무대에서 발표 중인 참가 팀", en: "A team pitching on the ANIMAL LEAGUE stage" } },
        { src: "/projects/hackathon14/field-gate.jpg", alt: { ko: "행사장 입구의 ANIMAL LEAGUE 미디어 게이트를 지나는 참가자들", en: "Participants passing the ANIMAL LEAGUE media gate at the venue entrance" } },
        { src: "/projects/hackathon14/field-keyvisual.jpg", alt: { ko: "ANIMAL LEAGUE 키 비주얼: 80개 대학을 상징하는 동물 캐릭터들과 트로피", en: "ANIMAL LEAGUE key visual: animal characters for 80 universities and the trophy" } },
      ],
      source: {
        label: { ko: "멋쟁이사자처럼 브랜드 디자인 랩, Behance 케이스 'STAGE SYSTEM' (사진 · 브랜드 디자인: 브랜드 디자인 랩)", en: "LIKELION Brand Design Lab, Behance case study, 'Stage System' (photos and brand design: Brand Design Lab)" },
        url: "https://www.behance.net/gallery/255861853/ANIMAL-LEAGUE-LIKELION-HACKATHON-2026",
      },
    },
    behanceUrl: "https://www.behance.net/gallery/255861853/ANIMAL-LEAGUE-LIKELION-HACKATHON-2026",
  },
  {
    id: "cleanb",
    kicker: { ko: "외주 프로젝트 · 루미클린(RumiClean)", en: "Client Project · RumiClean" },
    status: { ko: "배포 완료 · 결제 연동 전", en: "Deployed · Payments pending" },
    title: { ko: "CleanB", en: "CleanB" },
    period: { ko: "2025.11 – 현재", en: "Nov 2025 – Present" },
    role: { ko: "프론트엔드 · PM · 디자인 (3인 팀)", en: "Frontend · PM · Design (team of 3)" },
    headline: {
      ko: "청소자 화면 전체를 직접 개발하고,\n3인 팀이 운영할 수 있게 배포 구성을 줄였습니다.",
      en: "I built the entire cleaner-side app and cut the deployment down to what a team of three can run.",
    },
    summary: { ko: "에어비앤비 호스트와 청소자를 잇는 청소 매칭 서비스 루미클린 (외주 · Next.js)", en: "RumiClean, a cleaning-matching service connecting Airbnb hosts and cleaners (client project · Next.js)" },
    decision: { ko: "3인 팀이 직접 운영할 수 있어야 한다고 판단해 k3s·ArgoCD 대신 Docker Compose와 Caddy로 배포를 단순화하고, 정적 파일은 CloudFront로 분리해 배포 중에도 화면이 유지되게 했습니다.", en: "A team of three had to be able to run it, so I simplified deployment from k3s and ArgoCD to Docker Compose and Caddy, and moved static files to CloudFront so the screens stay up during a deploy." },
    thumb: {
      src: { ko: "/projects/cleanb/thumb-ko.jpg", en: "/projects/cleanb/thumb-en.jpg" },
      alt: { ko: "회색 바탕 썸네일: CleanB, 에어비앤비 청소 매칭과 전·후 사진 완료 인증. 청소자 작업 요청 목록과 완료 인증 화면", en: "Gray thumbnail: CleanB, Airbnb cleaning proven with before-and-after photos. The cleaner job list and the completion screen" },
    },
    body: {
      ko: "외주로 맡은 에어비앤비 청소 매칭 서비스에서 청소자 화면 전체(요청 수신 → 진행 → 완료 인증)를 Next.js·TypeScript로 직접 개발했습니다. 청소 작업의 상태 흐름 5단계를 먼저 확정해 화면을 도출하고, 전·후 사진 5장을 완료 조건으로 두었으며, 카카오맵과 Firebase 웹 푸시를 연동했습니다. PR 170개 이상이 오간 저장소의 릴리스를 관리하며 아토믹 디자인과 data-testid QA 규칙을 세웠고, 지금도 배포본을 수정하고 있습니다.",
      en: "On this client project, an Airbnb cleaning-matching service, I built the entire cleaner-side app (receive request → in progress → proof of completion) in Next.js and TypeScript. I fixed the five-state job flow first and derived the screens from it, made five before-and-after photos the completion condition, and integrated Kakao Map and Firebase web push. I manage releases for a repo with 170+ PRs, set up atomic design and data-testid QA rules, and I'm still revising the deployed app.",
    },
    stats: [
      { v: { ko: "170+ PR", en: "170+ PRs" }, k: { ko: "저장소 릴리스 관리", en: "repo releases managed" } },
      { before: "k3s · ArgoCD", v: "Docker Compose", k: { ko: "3인 팀 배포 구성 · Caddy · CloudFront", en: "deploys for a team of 3 · Caddy · CloudFront" } },
      { v: { ko: "배포 완료", en: "Deployed" }, k: { ko: "rumiclean.com · 결제 연동 전", en: "rumiclean.com · payments not yet connected" } },
    ],
    hero: {
      src: "/projects/cleanb/01.png",
      alt: { ko: "루미클린 첫 화면: 에어비앤비 청소, 이제 루미클린과 함께", en: "RumiClean home screen: Airbnb cleaning, now with RumiClean" },
    },
    heroTone: "muted",
    gallery: [
      {
        src: "/projects/cleanb/03.png",
        alt: { ko: "청소자용 작업 요청 목록과 일정 달력 화면", en: "Cleaner-side job request list and schedule calendar" },
      },
      {
        src: "/projects/cleanb/05.png",
        alt: {
          ko: "청소 완료 인증 화면: 청소 전·후 사진 업로드와 작업 특이사항 입력",
          en: "Completion screen: uploading before/after photos and work notes",
        },
      },
    ],
    caseId: "cleanb",
    stack: ["Next.js", "TypeScript", "Kakao Map", "Firebase", "Docker Compose", "Caddy", "CloudFront"],
    liveUrl: "https://www.rumiclean.com",
  },
  {
    id: "flowpay",
    kicker: { ko: "B2B 핀테크 · FIN:NECT 챌린지", en: "B2B Fintech · FIN:NECT Challenge" },
    status: { ko: "수상 · 102팀 중 5위", en: "Award · 5th of 102" },
    title: { ko: "FlowPay", en: "FlowPay" },
    period: { ko: "2025.06 – 2025.08", en: "Jun – Aug 2025" },
    role: { ko: "프론트엔드 · PM · IR", en: "Frontend · PM · IR" },
    headline: {
      ko: "무기명 법인카드 정산 8단계를\n3단계로 줄인 화면을 만들었습니다.",
      en: "I built the screens that cut anonymous corporate-card reconciliation from 8 steps to 3.",
    },
    summary: { ko: "무기명 법인카드의 결제부터 지출보고서까지 자동화하는 B2B 정산 서비스 프로토타입 (React · TypeScript PWA)", en: "A B2B prototype that automates anonymous corporate-card spending from payment to expense report (React · TypeScript PWA)" },
    decision: { ko: "회계에 필요한 것은 실명보다 누가 썼는지의 구분이라고 판단해, 가명 토큰으로 결제자를 식별했습니다.", en: "Accounting needs to know who spent, not their real name, so I identified payers with a pseudonymous token." },
    thumb: {
      src: { ko: "/projects/flowpay/thumb-ko.jpg", en: "/projects/flowpay/thumb-en.jpg" },
      alt: { ko: "회색 바탕 썸네일: FlowPay, 무기명 법인카드 정산 8단계에서 3단계로. 노트북의 지출 대시보드와 휴대폰 결제 화면", en: "Gray thumbnail: FlowPay, corporate-card expenses from 8 steps to 3. The spending dashboard on a laptop and the payment screen on a phone" },
    },
    body: {
      ko: "회계담당자 인터뷰에서 진짜 병목은 결제 이후 수기로 쓰는 전표라고 판단해, 가명 토큰 Flow ID로 결제 시점부터 사용자를 식별하고 지출보고서가 자동 생성되는 흐름을 설계했습니다. React·TypeScript·Tailwind CSS로 부서별 예산과 지출을 보여 주는 대시보드, FIDO2 생체인증 결제 화면, Tesseract.js로 영수증에서 가맹점·금액을 읽어 오는 OCR 업로드를 직접 개발하고 PWA로 배포했습니다. FIN:NECT 챌린지에서 102팀 중 5위에 올랐습니다.",
      en: "Interviews with accountants showed the real bottleneck was the vouchers written by hand after each payment, so I designed a flow where Flow ID, a pseudonymous token, identifies the user at the moment of payment and expense reports generate themselves. I built the budget and spending dashboard, the FIDO2 biometric payment screens, and an OCR receipt upload that reads merchant and amount with Tesseract.js, in React, TypeScript, and Tailwind CSS, and shipped it as a PWA. It placed 5th of 102 teams at the FIN:NECT Challenge.",
    },
    stats: [
      { before: { ko: "8단계", en: "8 steps" }, v: { ko: "3단계", en: "3 steps" }, k: { ko: "법인카드 지출 정산 단계", en: "corporate-card reconciliation steps" } },
      { before: { ko: "건당 20분", en: "20 min each" }, v: { ko: "자동 생성", en: "Automatic" }, k: { ko: "지출보고서 작성", en: "expense report writing" } },
      { v: { ko: "102팀 중 5위", en: "5th of 102" }, k: { ko: "FIN:NECT 챌린지 장려상", en: "FIN:NECT Challenge, Encouragement Prize" } },
    ],
    hero: {
      src: "/projects/flowpay/01.png",
      alt: { ko: "FlowPay 소개 화면: 무기명 카드부터 회계까지, 클릭 한 번으로 끝", en: "FlowPay title screen: from anonymous card to accounting in one click" },
    },
    heroTone: "muted",
    gallery: [
      {
        src: "/projects/flowpay/04.png",
        alt: {
          ko: "해결 방식: 결제 이후의 증빙·전표·세금 신고를 자동화하는 흐름과 지출 내역 화면",
          en: "Solution: automating receipts, vouchers, and tax filing after payment, with the expense list screen",
        },
      },
      {
        src: "/projects/flowpay/02.png",
        alt: {
          ko: "문제 정의: 직원 1건당 20분, 회계담당자 주당 20시간 이상, 기업당 연 약 1,000시간·8천만 원. 회계담당자 인터뷰 '경비 처리에 매달 한 주 가량을 씁니다'",
          en: "Problem: 20 minutes per report for staff, 20+ hours a week for accountants, about 1,000 hours and ₩80M a year per company. An accountant: 'Expense processing takes about a week every month'",
        },
      },
    ],
    caseId: "flowpay",
    stack: ["React", "TypeScript", "Tailwind CSS", "Tesseract.js", "PWA"],
    repoUrl: "https://github.com/tlstkdgus/FlowPay",
    liveUrl: "https://flow-pay-seven.vercel.app",
  },
  {
    id: "ywave",
    kicker: { ko: "멋쟁이사자처럼 13기 중앙해커톤", en: "LIKELION 13th Hackathon" },
    status: { ko: "2차 예선 진출 · 247팀 중 상위 12%", en: "2nd round · top 12% of 247" },
    title: { ko: "Y:Wave", en: "Y:Wave" },
    period: { ko: "2025.07 – 2025.08", en: "Jul – Aug 2025" },
    role: { ko: "프론트엔드 · PM · 디자인 (6인 팀)", en: "Frontend · PM · Design (team of 6)" },
    headline: {
      ko: "가맹점 39만 건을 사용자가 바로 고를 수 있는\n추천 리스트 화면으로 만들었습니다.",
      en: "I turned 390K merchants into a recommendation list users can pick from right away.",
    },
    summary: { ko: "경기도 지역화폐 가맹점 39만 건을 분석해 위치와 소비 카테고리로 가맹점을 추천하는 서비스", en: "A service that analyzes 390K Gyeonggi local-currency merchants and recommends them by location and spending category" },
    decision: { ko: "설문 응답자 53%가 가맹점 찾기를 어려워해, 지도 중심 화면을 추천 리스트 중심으로 바꿨습니다.", en: "53% of surveyed users said merchants were hard to find, so I moved the main screen from a map to a recommendation list." },
    thumb: {
      src: { ko: "/projects/ywave/thumb-ko.jpg", en: "/projects/ywave/thumb-en.jpg" },
      alt: { ko: "블루 바탕 썸네일: Y:Wave, 경기도 가맹점 39만 건을 추천 리스트로. 휴대폰 두 대의 지도 화면과 오늘의 추천 화면", en: "Blue thumbnail: Y:Wave, 390K merchants turned into a recommendation list. A map screen and a today's-picks screen on two phones" },
    },
    body: {
      ko: "직접 진행한 설문에서 응답자 53%가 지역화폐 가맹점을 찾기 어렵다고 답했고, 경기도 가맹점 39만 곳은 데이터로만 공개돼 있었습니다. 39만 건을 전수 분석한 뒤, 사용자가 지도에서 직접 찾아야 하는 화면 대신 위치 반경과 소비 카테고리로 가맹점을 추천하는 리스트를 첫 화면에 두었습니다. 프론트엔드 커밋 209개 중 184개를 맡아 React·TypeScript로 지도(마커 클러스터링 · GPS 정확도 보정)와 드래그 바텀시트, 재시도하는 API 계층을 만들었고, 13기 중앙해커톤에서 247팀 중 상위 12%로 2차 예선에 진출했습니다.",
      en: "In a survey we ran ourselves, 53% of respondents said local-currency merchants were hard to find, and Gyeonggi's 390K merchants were published only as raw data. After analyzing all 390K records, I put a list recommending merchants by distance and spending category on the first screen, instead of making users search the map themselves. Writing 184 of the frontend's 209 commits in React and TypeScript, I built the map (marker clustering, GPS accuracy fallback), a draggable bottom sheet, and a retrying API layer; the project reached the second round of the LIKELION 13th hackathon, in the top 12% of 247 teams.",
    },
    stats: [
      { before: { ko: "지도에서 직접 찾기", en: "Searching the map" }, v: { ko: "위치·카테고리 기반 추천", en: "Recommended by place & category" }, k: { ko: "가맹점 탐색", en: "finding a merchant" } },
      { v: { ko: "39만 건 전수 분석", en: "All 390K analyzed" }, k: { ko: "근거 데이터 · 경기도 가맹점 · 설문 53%", en: "evidence · Gyeonggi merchants · 53% in our survey" } },
      { v: { ko: "247팀 중 상위 12%", en: "Top 12% of 247" }, k: { ko: "13기 중앙해커톤 · 2차 예선 진출", en: "LIKELION 13th hackathon · 2nd round" } },
    ],
    hero: {
      src: "/projects/ywave/03.png",
      alt: { ko: "Y:Wave 서비스 소개: 선호 카테고리와 ChatGPT API로 가맹점을 추천하는 앱 화면 3개", en: "Y:Wave overview: three app screens recommending merchants from preferred categories and the ChatGPT API" },
    },
    heroTone: "muted",
    gallery: [
      {
        src: "/projects/ywave/02.png",
        alt: {
          ko: "문제 인식: 용인와이페이 가맹점 감소 기사와 자체 설문 결과(가맹점 찾기 불편함 27%, 가맹점 수 부족 26%)",
          en: "Problem: a news story on Yongin Pay merchants shrinking, and our survey (27% found merchants hard to find, 26% said there were too few)",
        },
      },
      {
        src: "/projects/ywave/04.png",
        alt: {
          ko: "핵심 기능: 경기도 39만 개 가맹점 데이터 기반 지도와 카테고리·지역 필터",
          en: "Core feature: a map built on 390K Gyeonggi merchant records, with category and region filters",
        },
      },
    ],
    caseId: "ywave",
    stack: ["React 19", "TypeScript", "Vite", "styled-components", "Google Maps API", "PWA"],
    repoUrl: "https://github.com/yong2gether/FE",
  },
];
