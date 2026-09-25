// 대표 프로젝트 4개. 메인에서는 한 줄 요약·핵심 수치·역할만(selected-projects.tsx),
// 헤드라인·본문 세 문장·전→후 성과·현장 사진은 /work/<id> 상세 페이지(work-detail.tsx)에서 쓴다.
// 한 일 목록·범위 칩·흐름 도식·인용문은 FINAL(2026.09.22)에서 뺐다.
//
// 순서 (HANDOFF §G, 2026-09-24): 14기 중앙해커톤 → FlowPay → Y:Wave → CleanB.
// 사내 개발 교육은 Other projects로 옮겼다(상세 페이지는 유지). IT 기획 포지션에서 대표 4개 중
// 서비스 기획 케이스가 2개뿐이었다. CleanB는 여전히 FlowPay 뒤(2026.09.13 지시).
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
  /** 서비스 링크. 저장소 링크는 projects.ts(repo)에 두고 상세 페이지에서만 보여준다 */
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
    kicker: { ko: "멋쟁이사자처럼 인턴 · 14기 중앙해커톤", en: "LIKELION Internship · 14th Hackathon" },
    status: { ko: "완료 · 2026.08 본선", en: "Completed · Finals Aug 2026" },
    title: { ko: "14기 중앙해커톤 기획·운영", en: "LIKELION 14th Hackathon" },
    period: { ko: "2026.06 – 2026.08", en: "Jun – Aug 2026" },
    role: { ko: "커뮤니티 매니저 인턴 · 기획·운영", en: "Community Manager Intern · Planning & Ops" },
    headline: {
      ko: "2,000명의 참가자가 평가 기준을\n예측할 수 있는 해커톤을 만들었습니다.",
      en: "I made a hackathon where 2,000 participants could predict how they'd be judged.",
    },
    // '연합 해커톤'은 학생 주최 대학 연합 해커톤(별도 기획물)을 가리키므로 여기서는 쓰지 않는다 (§G-5)
    summary: { ko: "80개 대학 2,000명이 참가한 멋쟁이사자처럼 14기 중앙해커톤 'ANIMAL LEAGUE'의 기획부터 본선 운영까지", en: "LIKELION's 14th national hackathon 'ANIMAL LEAGUE', with 2,000 participants from 80 universities, run from planning through the finals" },
    decision: { ko: "판정 기준은 검사 전에 합의하고, 검사 도구는 근거만 내도록 설계했습니다.", en: "I had the judging criteria agreed before the scan, and designed the checking tool to produce only evidence." },
    thumb: {
      src: { ko: "/projects/hackathon14/thumb-ko.jpg", en: "/projects/hackathon14/thumb-en.jpg" },
      alt: { ko: "검정 바탕 썸네일: ANIMAL LEAGUE, 기획부터 본선 운영까지. 본선 무대 스크린(결승 3 대 2)과 직접 만든 운영 콘솔 화면", en: "Black thumbnail: ANIMAL LEAGUE, planned and run end to end. The finals stage screen (3 to 2) and the ops console I built" },
    },
    body: {
      ko: "314팀이 참가하는 해커톤에서 참가자는 무엇을 제출하면 어떻게 평가받는지 알기 어려웠고, 문의는 운영진이 하루 3시간씩 직접 답하고 있었습니다. 제출 항목과 심사 기준을 1:1로 연결해 평가를 예측할 수 있게 했고, 참가자가 겪는 순서대로 가이드를 짜고 FAQ 봇이 즉답하게 했습니다. 본선 결과는 심사위원 투표가 무대 스크린에 바로 반영되도록 콘솔(Next.js · Supabase)을 DB 스키마부터 직접 개발해 진행했습니다.",
      en: "With 314 teams competing, participants couldn't tell what to submit or how it would be judged, and the staff were answering inquiries by hand for three hours a day. I mapped submission items 1:1 to judging criteria so scoring became predictable, structured the guide in the order participants live it, and had an FAQ bot answer instantly. For the finals I built the console (Next.js · Supabase) from the DB schema up so judges' votes showed on the stage screen as they came in.",
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
    id: "flowpay",
    kicker: { ko: "B2B 핀테크 · FIN:NECT 챌린지", en: "B2B Fintech · FIN:NECT Challenge" },
    status: { ko: "수상 · 102팀 중 5위", en: "Award · 5th of 102" },
    title: { ko: "FlowPay", en: "FlowPay" },
    period: { ko: "2025.06 – 2025.08", en: "Jun – Aug 2025" },
    role: { ko: "PM · 프론트엔드 · IR", en: "PM · Frontend · IR" },
    headline: {
      ko: "무기명 법인카드 정산 8단계를\n3단계로 줄였습니다.",
      en: "I cut anonymous corporate card reconciliation from 8 steps to 3.",
    },
    summary: { ko: "무기명 법인카드의 결제부터 지출보고서까지 자동화하는 B2B 정산 서비스 프로토타입", en: "A B2B prototype that automates anonymous corporate-card spending from payment to expense report" },
    decision: { ko: "회계에 필요한 것은 실명보다 누가 썼는지의 구분이라고 판단해, 가명 토큰으로 결제자를 식별했습니다.", en: "Accounting needs to know who spent, not their real name, so I identified payers with a pseudonymous token." },
    thumb: {
      src: { ko: "/projects/flowpay/thumb-ko.jpg", en: "/projects/flowpay/thumb-en.jpg" },
      alt: { ko: "회색 바탕 썸네일: FlowPay, 무기명 법인카드 정산 8단계에서 3단계로. 노트북의 지출 대시보드와 휴대폰 결제 화면", en: "Gray thumbnail: FlowPay, corporate-card expenses from 8 steps to 3. The spending dashboard on a laptop and the payment screen on a phone" },
    },
    body: {
      ko: "회계담당자는 지출보고서 1건에 20분씩, 월 100건 이상을 처리하고 있었습니다. 인터뷰해 보니 진짜 병목은 결제 이후 수기로 작성하는 전표라고 판단했고, 익명성을 지키는 가명 토큰 Flow ID로 결제 시점부터 사용자를 식별해 지출보고서가 자동 생성되도록 설계했습니다. FIN:NECT 챌린지에서 102팀 중 5위에 올랐습니다.",
      en: "Accountants were spending 20 minutes per expense report, over 100 reports a month. Interviews showed the real bottleneck was the vouchers written by hand after each payment, so I designed Flow ID, a pseudonymous token that identifies the user at the moment of payment while keeping anonymity, so expense reports generate themselves. It placed 5th of 102 teams at the FIN:NECT Challenge.",
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
    liveUrl: "https://flow-pay-seven.vercel.app",
  },
  {
    id: "ywave",
    kicker: { ko: "멋쟁이사자처럼 13기 중앙해커톤", en: "LIKELION 13th Hackathon" },
    status: { ko: "2차 예선 진출 · 247팀 중 상위 12%", en: "2nd round · top 12% of 247" },
    title: { ko: "Y:Wave", en: "Y:Wave" },
    period: { ko: "2025.07 – 2025.08", en: "Jul – Aug 2025" },
    role: { ko: "PM · 프론트엔드 · 디자인 (6인 팀)", en: "PM · Frontend · Design (team of 6)" },
    headline: {
      ko: "가맹점 39만 건을 사용자가 바로 고를 수 있는\n추천 리스트로 바꿨습니다.",
      en: "I turned 390K merchants into a recommendation list users can pick from right away.",
    },
    summary: { ko: "경기도 지역화폐 가맹점 39만 건을 분석해 위치와 소비 카테고리로 가맹점을 추천하는 서비스", en: "A service that analyzes 390K Gyeonggi local-currency merchants and recommends them by location and spending category" },
    decision: { ko: "설문 응답자 53%가 가맹점 찾기를 어려워해, 지도 중심 화면을 추천 리스트 중심으로 바꿨습니다.", en: "53% of surveyed users said merchants were hard to find, so I moved the main screen from a map to a recommendation list." },
    thumb: {
      src: { ko: "/projects/ywave/thumb-ko.jpg", en: "/projects/ywave/thumb-en.jpg" },
      alt: { ko: "블루 바탕 썸네일: Y:Wave, 경기도 가맹점 39만 건을 추천 리스트로. 휴대폰 두 대의 지도 화면과 오늘의 추천 화면", en: "Blue thumbnail: Y:Wave, 390K merchants turned into a recommendation list. A map screen and a today's-picks screen on two phones" },
    },
    body: {
      ko: "직접 진행한 설문에서 응답자 53%가 지역화폐 가맹점을 찾기 어렵다고 답했고, 경기도 가맹점 39만 곳은 데이터로만 공개돼 있었습니다. 39만 건을 전수 분석한 뒤, 사용자가 지도에서 직접 찾아야 하는 화면 대신 위치 반경과 소비 카테고리로 가맹점을 추천하는 리스트를 첫 화면에 두었습니다. React·TypeScript로 프론트엔드를 직접 개발했고, 13기 중앙해커톤에서 247팀 중 상위 12%로 2차 예선에 진출했습니다.",
      en: "In a survey we ran ourselves, 53% of respondents said local-currency merchants were hard to find, and Gyeonggi's 390K merchants were published only as raw data. After analyzing all 390K records, I put a list recommending merchants by distance and spending category on the first screen, instead of making users search the map themselves. I built the frontend myself in React and TypeScript, and the project reached the second round of the LIKELION 13th hackathon, in the top 12% of 247 teams.",
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
  },
  {
    id: "cleanb",
    kicker: { ko: "외주 프로젝트 · 루미클린(RumiClean)", en: "Client Project · RumiClean" },
    status: { ko: "배포 완료 · 결제 연동 전", en: "Deployed · Payments pending" },
    title: { ko: "CleanB", en: "CleanB" },
    period: { ko: "2025.11 – 현재", en: "Nov 2025 – Present" },
    role: { ko: "PM · 프론트엔드 · 디자인 (3인 팀)", en: "PM · Frontend · Design (team of 3)" },
    headline: {
      ko: "호스트와 청소자가 '청소 완료'를 두고\n다투지 않는 서비스를 설계했습니다.",
      en: "I designed a service where hosts and cleaners don't argue over whether the cleaning was done.",
    },
    summary: { ko: "에어비앤비 호스트와 청소자를 잇는 청소 매칭 서비스 루미클린 (외주)", en: "RumiClean, a cleaning-matching service connecting Airbnb hosts and cleaners (client project)" },
    decision: { ko: "완료 기준이 서비스 안에 있어야 분쟁이 생기지 않는다고 판단해, 전·후 사진 5장을 완료 조건으로 정했습니다.", en: "Disputes stop only when the completion standard lives inside the service, so I made five before-and-after photos the condition for completion." },
    thumb: {
      src: { ko: "/projects/cleanb/thumb-ko.jpg", en: "/projects/cleanb/thumb-en.jpg" },
      alt: { ko: "회색 바탕 썸네일: CleanB, 에어비앤비 청소 매칭과 전·후 사진 완료 인증. 청소자 작업 요청 목록과 완료 인증 화면", en: "Gray thumbnail: CleanB, Airbnb cleaning proven with before-and-after photos. The cleaner job list and the completion screen" },
    },
    body: {
      ko: "외주로 맡은 에어비앤비 청소 매칭 서비스입니다. 서로 모르는 호스트와 청소자가 다투지 않으려면 완료 기준이 서비스 안에 있어야 해서, 청소 작업의 상태 흐름 5단계를 먼저 확정하고 전·후 사진 5장을 완료 조건으로 정했습니다. 청소자 화면 전체를 직접 개발해 배포했고, 지금도 수정하고 있습니다.",
      en: "A client project: an Airbnb cleaning matching service. Hosts and cleaners who've never met need the completion standard to live inside the service, so I fixed the five-state job flow first and made five before-and-after photos the condition for completion. I built the entire cleaner-side app myself, shipped it, and I'm still revising it.",
    },
    stats: [
      { v: { ko: "사진 5장", en: "5 photos" }, k: { ko: "청소 완료 인증 조건 · 전·후 사진", en: "completion proof · before/after photos" } },
      { v: { ko: "상태 5단계", en: "5 states" }, k: { ko: "청소자 화면을 도출한 작업 흐름", en: "job flow the cleaner screens were derived from" } },
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
    liveUrl: "https://www.rumiclean.com",
  },
];
