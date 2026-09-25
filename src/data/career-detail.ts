export interface SubSection {
  title: string;
  titleEn: string;
  items: CareerDetailItem[];
}

export interface CareerDetailItem {
  text: string;
  textEn: string;
  subItems?: { text: string; textEn: string }[];
}

/** 흐름 다이어그램 — 이미지 대신 HTML로 그린다 (확대해도 선명하고, 문구를 고칠 수 있다).
 *  이전 PNG 4장은 원본 SVG가 남아 있지 않았고 캡션에 v9 금지 표현이 박혀 있었다 (2026-09-23 교체). */
export interface FlowDiagram {
  title: string;
  titleEn: string;
  steps: { label: string; labelEn: string; note: string; noteEn: string; tag?: string; tagEn?: string }[];
  caption?: string;
  captionEn?: string;
}

/** 기술적 도전 — 개발자 포트폴리오에서 흔한 트러블슈팅 형식(문제 → 해결 → 결과).
 *  공개 저장소 코드나 PORTFOLIO.md로 확인되는 내용만 쓴다. 비공개 저장소(CleanB)는 PORTFOLIO.md 기록만 */
export interface Trouble {
  title: string;
  titleEn: string;
  problem: string;
  problemEn: string;
  solution: string;
  solutionEn: string;
  result: string;
  resultEn: string;
  /** 근거 코드 경로 (예: lib/state.ts) — 저장소 링크 옆에 작게 보여 준다 */
  files?: string[];
  /** files가 프로젝트 대표 저장소가 아닌 곳에 있을 때 (해커톤 FAQ 봇 · 제출물 검사) */
  repo?: string;
}

export interface CareerDetailSection {
  id: string;
  title: string;
  titleEn: string;
  images?: string[];
  diagrams?: FlowDiagram[];
  background: CareerDetailItem[];
  role: SubSection[];
  troubles?: Trouble[];
  results: CareerDetailItem[];
  lessons: CareerDetailItem[];
}

export const careerDetailSections: CareerDetailSection[] = [
// 순서 = 메인 페이지 노출 순서(/career 목록과 상세 페이지 이전·다음도 이 순서). 개발자 포트폴리오 (2026-09-25):
// 대표 4개(해커톤 운영 도구 → CleanB → FlowPay → Y:Wave) → Other 노출 6개(개발 비중 순) → 접힌 8개.
  {
    id: "hackathon14",
    title: "14기 중앙해커톤 본선 콘솔·운영 도구 개발 — ANIMAL LEAGUE",
    titleEn: "Finals Console & Ops Tools for LIKELION's 14th Hackathon — ANIMAL LEAGUE",
    images: [
      "/projects/hackathon14/01.png",
      "/projects/hackathon14/02.png",
      "/projects/hackathon14/03.png",
      "/projects/hackathon14/04.png",
      "/projects/hackathon14/05.png",
    ],
    diagrams: [
      {
        title: "심사위원의 표가 무대 스크린에 뜨기까지",
        titleEn: "How a judge's vote reaches the stage screen",
        steps: [
          { label: "심사 화면", labelEn: "Judge view", note: "심사위원이 승자(A/B)와 코멘트를 제출합니다", noteEn: "A judge submits the winner (A/B) and a comment" },
          { label: "서버 검증", labelEn: "Server checks", tag: "POST /api/vote", tagEn: "POST /api/vote", note: "심사 코드 · 명단 · 경기 live 여부를 확인하고, 제출 시각은 서버가 기록합니다", noteEn: "Judge code, allowlist, and live match are verified; the server stamps the time" },
          { label: "Supabase", labelEn: "Supabase", note: "표는 votes 테이블에 upsert, 브래킷 상태는 한 행에 rev 번호와 함께 저장합니다", noteEn: "Votes are upserted to a votes table; bracket state lives in one row with a rev number" },
          { label: "운영 콘솔", labelEn: "Ops console", tag: "rev 가드", tagEn: "rev guard", note: "운영자가 결과를 공개하면 mutate()가 순수 전이를 적용하고 rev를 대조해 저장합니다", noteEn: "On reveal, mutate() applies a pure transition and saves only if rev still matches" },
          { label: "무대 스크린", labelEn: "Stage screen", tag: "실측 2.2초", tagEn: "2.2 s measured", note: "1.5초 간격으로 공개 스냅샷을 읽어 카드 공개 연출을 띄웁니다", noteEn: "Reads the public snapshot every 1.5 s and plays the card reveal" },
        ],
        caption: "쓰기는 서버의 mutate() 한 곳으로만, 읽기는 비밀값을 벗긴 공개 스냅샷(GET /api/state)으로만 나눠, 스크린과 심사 화면에는 심사 코드와 운영 PIN이 내려가지 않습니다.",
        captionEn: "Writes go only through the server's mutate(), and reads only through a public snapshot with secrets stripped (GET /api/state), so the judge code and ops PIN never reach the screen or judge views.",
      },
      {
        title: "314팀에서 1팀까지, 예측 가능한 3단계 심사",
        titleEn: "From 314 teams to one, in three predictable stages",
        steps: [
          { label: "314팀", labelEn: "314 teams", note: "제출 · 562개 레포 · 80개 대학", noteEn: "submitted · 562 repos · 80 universities" },
          { label: "60팀", labelEn: "60 teams", note: "서류 심사 100점 배점 · 트랙별 15팀", noteEn: "100-point document review · 15 per track" },
          { label: "8팀", labelEn: "8 teams", note: "트랙 피칭 발표 5분 + Q&A · 트랙별 2팀", noteEn: "5-minute track pitch + Q&A · 2 per track" },
          { label: "1팀", labelEn: "1 team", note: "본선 토너먼트 1:1 3라운드 · 2,000명 앞 실시간 발표", noteEn: "1:1 three-round live tournament before 2,000" },
        ],
        caption: "배점의 절반 가까이를 문제 정의(25점)와 실현 가능성(20점)에 두었습니다. 제출 항목과 심사 기준을 1:1로 연결해, 무엇을 쓰면 어떻게 평가받는지 예측할 수 있게 했습니다.",
        captionEn: "Nearly half the points went to problem definition (25) and feasibility (20). Submission items mapped 1:1 to criteria, so teams could predict how they'd be scored.",
      },
      {
        title: "'마감 후 수정 금지'를 집행한 다섯 단계",
        titleEn: "Five steps to enforce 'no edits after deadline'",
        steps: [
          { label: "가설", labelEn: "Hypothesis", note: "마감 후에도 커밋하는 팀이 있고, 562개 레포는 손으로 검사할 수 없습니다", noteEn: "Some teams commit after the deadline, and 562 repos can't be checked by hand" },
          { label: "기준 합의", labelEn: "Agree criteria", tag: "검사 전에 결정", tagEn: "Decided before scanning", note: "기능 수정은 실격, README 수정은 감점, 마감 직후 커밋은 정상참작", noteEn: "Code change = DQ · README = deduction · just-late commit = leniency" },
          { label: "전수 검사", labelEn: "Full scan", tag: "check.py 직접 제작", tagEn: "check.py, built myself", note: "전 브랜치의 마감 후 커밋 · force-push · 비공개 전환 탐지", noteEn: "Every branch swept for late commits, force-pushes, private flips" },
          { label: "근거 리포트", labelEn: "Evidence", note: "결과를 엑셀로 정리해 운영진 회의에 넘기고, 자동 판정은 하지 않습니다", noteEn: "Results go to the staff meeting as a spreadsheet; no automatic verdicts" },
          { label: "사람의 판정", labelEn: "People decide", tag: "결과", tagEn: "Result", note: "위반 5팀 적발, 차등 기준으로 2팀 실격", noteEn: "5 violations found; 2 disqualified under the graded criteria" },
        ],
        caption: "판정 기준을 검사 전에 합의하고 도구는 근거만 제시하도록 해, 위반 5팀을 모두가 받아들인 기준으로 판정했습니다.",
        captionEn: "Criteria were agreed before scanning and the tool only presented evidence, so the five violations were judged against a standard everyone had accepted.",
      },
    ],
    background: [
      {
        text: "80개 대학, 참가자 2,000명+, 314팀 제출(562개 레포) → 본선 8팀 토너먼트로 최종 1팀을 뽑는 역대 최대 규모 중앙해커톤입니다. 커뮤니티 매니저 인턴으로 기획부터 본선 운영까지 맡았고, 기능명세서·워밍업 세션·참가자 가이드·심사 정책은 팀과 함께 만들었으며 운영 도구 3개와 본선 현장 운영은 직접 맡았습니다. (2026.06 ~ 2026.08.25, 본선 코엑스 마곡)",
        textEn:
          "The largest LIKELION hackathon to date: 80 universities, 2,000+ participants, 314 submitting teams (562 repos) → an 8-team finals tournament picking one winner. As a community manager intern I took it from planning through the finals: the feature specs, warm-up sessions, participant guide, and judging policy were made with the team, and I built the 3 ops tools and ran the finals on site myself. (Jun 2026 – Aug 25, 2026; finals at COEX Magok)",
        subItems: [
          {
            text: "참가자·심사위원·파트너의 이해가 충돌하는 지점마다 규칙이 필요했고, 314팀·562개 레포 검증과 2,000명 앞 실시간 토너먼트는 수작업으로 풀 수 없는 문제였습니다.",
            textEn:
              "Every collision point between participants, judges, and partners needed a rule — and verifying 562 repos or running a live tournament for 2,000 people was not a manual job.",
          },
        ],
      },
    ],
    role: [
      {
        title: "본선 토너먼트 콘솔 'ANIMAL LEAGUE' 직접 제작·운영",
        titleEn: "Finals Tournament Console — Built & Operated",
        items: [
          {
            text: "역할별 3개 화면으로 설계한 웹앱입니다(Next.js · React · Supabase): 무대 프로젝터용 스크린(브래킷 실시간 표시·결과 공개 연출), 심사위원용 화면(승자 선택 + 코멘트), 운영팀 콘솔(경기 진행·대진 추첨·결과 공개).",
            textEn:
              "A web app with three role-based views (Next.js · React · Supabase): a stage screen (live bracket, reveal effects), a judge view (winner pick + comment), and an ops console (match control, bracket draw, result reveal).",
            subItems: [
              {
                text: "설계 전제는 '되돌릴 수 없는 현장'입니다. 심사위원 명단제(명단 밖 제출은 서버가 거부 — 코드가 유출돼도 가짜 표가 못 섞임), 결과 공개 롤백 없음(대신 확인 다이얼로그 필수), 네트워크 장애 시 운영자 입력만으로 브래킷이 진행되는 백업 모드, 동표 시 자동 결정 없이 사람이 판정.",
                textEn:
                  "The design premise: an irreversible live event. Judge allowlist (off-list submissions rejected server-side — fake votes can't mix in even if the code leaks), no rollback after reveal (mandatory confirm dialogs instead), a backup mode that advances the bracket on operator input alone during network failure, and no auto-decision on ties — a human rules.",
              },
              {
                text: "SPEC.md를 요구사항 단일 출처로 두고 기능 동결 → 리허설 → 코드·PIN 교체 → 초기화의 출시 절차를 운영했습니다. 운영 런북을 v8까지 직접 작성·배포했고, 콘솔 조작이 무대 스크린에 반영되는 시간은 실측 2.2초였습니다.",
                textEn:
                  "SPEC.md served as the single source of requirements, with a launch procedure of feature freeze → rehearsal → code/PIN rotation → reset. I wrote and shipped the ops runbook through v8; measured console-to-stage-screen latency was 2.2 seconds.",
              },
              {
                text: "무대 연출(결과 공개 카드 연출, 결선 카운트다운→우승 전환)을 음향팀·MC 큐시트와 맞췄습니다. 타이머는 앱에서 빼고 행사장 별도 화면에 위임 — 스코프를 줄이는 결정이었습니다.",
                textEn:
                  "Stage effects (reveal card animation, finals countdown into the winner scene) were synced with the sound team's and MC's cue sheets. The timer was cut from the app and delegated to a separate venue screen — a deliberate scope reduction.",
              },
            ],
          },
        ],
      },
      {
        title: "제출물 무결성 검증 — check.py 직접 제작",
        titleEn: "Submission Integrity — Built check.py Myself",
        items: [
          {
            text: "'마감 후 수정 금지' 규정을 집행하려면 314팀 · 562개 레포를 검사해야 했습니다. Claude를 활용해 check.py를 직접 만들었습니다 — 전 레포·전 브랜치를 순회하며 마감 이후 커밋을 검출하고, 스냅샷 JSON 대조로 force-push · 브랜치 삭제 · Public→Private 전환까지 탐지합니다.",
            textEn:
              "Enforcing 'no edits after deadline' meant checking 562 repos across 314 teams. I built check.py with Claude — it sweeps every branch of every repo for post-deadline commits, and snapshot-JSON comparison catches force-pushes, deleted branches, and public-to-private flips.",
            subItems: [
              {
                text: "판정 기준을 검사 전에 합의했습니다: 기능 추가·개선 범위의 코드 수정 = 실격 / 단순 README 수정 = 감점 / 마감 직후 커밋 = 정상참작. 도구는 엑셀 리포트로 근거만 제시하고, 판정은 운영진 회의가 했습니다.",
                textEn:
                  "The verdict criteria were agreed before scanning: feature-level code changes = disqualification / README-only edits = deduction / just-past-deadline commits = leniency. The tool only presented evidence in an Excel report; the ops meeting made the calls.",
              },
            ],
          },
        ],
      },
      {
        title: "참가자 커뮤니케이션 · FAQ 봇 · 파트너 운영",
        titleEn: "Participant Comms, FAQ Bot & Partner Ops",
        items: [
          {
            text: "참가자 2,000명이 한 달간 참조하는 노션 통합 가이드를 팀과 공동 작성했습니다. 참가자 여정(팀빌딩 → 개발 → 심사 → 현장) 순서로 목차를 설계하고, 변경 사항마다 날짜를 명시해 추적 가능하게 운영했습니다.",
            textEn:
              "Co-wrote the Notion guide that 2,000 participants referenced for a month — structured by participant journey (team building → build → judging → venue), with every change dated and traceable.",
            subItems: [
              {
                text: "FAQ 78문항을 지식으로 쓰는 디스코드 봇을 직접 만들어 운영했습니다. 키워드 매칭 우선(비용 0) + LLM 폴백의 2단 응답, 자료에 없는 내용은 지어내지 않고 '운영진 문의' 안내, 미답변 질문 일일 리포트로 지식을 보강하되 반영 여부는 사람이 판단. 한 달간 229건(사용자 53명)을 응대했고 80.8%가 키워드 즉답, 미응답은 0건이었습니다.",
                textEn:
                  "Built and ran a Discord bot over the 78-item FAQ: keyword matching first (zero cost) with LLM fallback, a strict no-fabrication policy (unknowns route to staff), and a daily unanswered-question report — with humans deciding what gets added. Over a month it answered 229 questions from 53 users — 80.8% via instant keyword match, 0 unanswered.",
              },
              {
                text: "파트너 8종 툴 지원 정책(신청 마감 일원화, 팀장 대표 제출, 과금 리스크 안내)을 운영했고, OpenAI와는 영문으로 직접 커뮤니케이션하며 크레딧 지급 이슈를 추적하고 본선 기술 심사위원 섭외까지 연결했습니다.",
                textEn:
                  "Ran the 8-partner tool support program (unified deadlines, team-lead submission, billing-risk notices), and communicated directly with OpenAI in English — tracking credit issues and landing a finals technical judge.",
              },
            ],
          },
        ],
      },
      {
        title: "심사 정책·프로세스 공동 설계",
        titleEn: "Co-designed the Judging Policy & Process",
        items: [
          {
            text: "3단계 심사 퍼널(서류 심사 60팀 → 트랙 피칭 8팀 → 본선 토너먼트 1팀)과 공통 심사 기준 100점 배점(문제 정의 25 · 실현 가능성 20 · 시장성 15 · UI/UX 10 · 전달력 10 · 트랙 적합성 20)을 설계했습니다.",
            textEn:
              "Designed the 3-stage judging funnel (60 teams by docs → 8 by track pitching → 1 by tournament) and the 100-point common rubric (problem definition 25 · feasibility 20 · market 15 · UI/UX 10 · delivery 10 · track fit 20).",
            subItems: [
              {
                text: "서비스 기획안 제출 항목(문제정의/핵심기능/시장성)을 심사 기준과 1:1로 연계해, 참가자가 무엇을 쓰면 어떻게 평가받는지 예측 가능하게 만들었습니다.",
                textEn:
                  "Mapped submission items (problem/features/market) 1:1 to judging criteria, so teams could predict how what they wrote would be scored.",
              },
              {
                text: "공정성 규칙: 대본 낭독 시 전달력 0점, 발표는 운영팀 기기로 통일, 대진·순서는 현장 랜덤 추첨 후 변경 불가.",
                textEn:
                  "Fairness rules: script-reading scores zero on delivery, all pitches on operator-provided devices, bracket and order drawn live and locked.",
              },
            ],
          },
        ],
      },
      {
        title: "사전 기획 공동 참여 — 플랫폼 기능명세서·워밍업 세션",
        titleEn: "Co-planned the Pre-event Work — Platform Specs & Warm-up Sessions",
        items: [
          {
            text: "해커톤 커뮤니티 플랫폼의 기능명세서 2종(중앙해커톤·연합해커톤)을 팀원들과 공동 작성해 개발(AXP)·디자인(브디랩) 조직에 핸드오프했습니다. 각 항목을 As-Is → To-Be → 기대 산출물 → 세부 명세 순서로 정리하고, 운영팀이 먼저 결정해야 할 사항과 개발 항목을 분리했습니다.",
            textEn:
              "Co-wrote two feature specs for the hackathon community platform (central and inter-university) with the team and handed them off to the dev (AXP) and design (BD Lab) teams. Each item followed As-Is → To-Be → expected output → detailed spec, with ops decisions separated from dev items.",
            subItems: [
              {
                text: "5단계 권한 체계(플랫폼 관리자/대표 운영진/일반 운영진/참가자/미참가자)별 기능 권한 매트릭스, '팀 없으면 제출 불가' 규칙을 제출 시 팀원 등록으로 바꾸는 팀빌딩 재설계, 등록 → 승인 → 노출 워크플로우와 상태 배지를 포함했습니다.",
                textEn:
                  "Included a 5-level permission matrix (platform admin / lead staff / staff / participant / non-participant), a team-building redesign replacing 'no team, no submission' with member registration at submission, and a register → approve → publish workflow with status badges.",
              },
            ],
          },
          {
            text: "워밍업 세션 3회를 '문제 발견 → MVP 범위 결정 → AI 실전 개발' 순서로 공동 기획하고, 세션 간 경계와 takeaway를 정의해 연사 간 중복을 막았습니다.",
            textEn:
              "Co-planned a 3-part warm-up series — problem discovery → MVP scoping → hands-on AI development — defining boundaries and takeaways per session to avoid overlap between speakers.",
          },
        ],
      },
    ],
    troubles: [
      {
        title: "운영자 여러 명이 동시에 조작하면 상태가 덮어써질 수 있었습니다",
        titleEn: "Concurrent operators could overwrite each other's state",
        problem: "브래킷과 경기 상태 전체를 Supabase의 한 행(JSON)에 두고 여러 대의 운영 콘솔에서 조작했습니다. 두 요청이 같은 상태를 읽고 각각 쓰면 먼저 쓴 변경이 조용히 사라질 수 있었습니다.",
        problemEn: "The whole bracket and match state lived in one Supabase row (JSON) and was operated from several consoles. If two requests read the same state and each wrote back, the first change could silently vanish.",
        solution: "쓰기를 모두 mutate() 하나로 모으고 UPDATE … WHERE rev = <읽은 값>으로 낙관적 잠금을 걸었습니다. 0행이 갱신되면 다시 읽어 같은 변형을 최대 3회 재적용하고, 재적용이 안전하도록 브래킷 전이를 입력을 바꾸지 않는 순수 함수로 분리했습니다. 최초 접근 때 두 요청이 동시에 초기 행을 만들면 PK 충돌(23505)을 무시하고 다시 읽게 했습니다.",
        solutionEn: "All writes go through a single mutate() with optimistic locking: UPDATE … WHERE rev = <value read>. If zero rows update, it re-reads and re-applies the same transform up to three times, so every bracket transition is a pure function that never mutates its input. When two first requests race to create the initial row, the PK conflict (23505) is ignored and the row is re-read.",
        result: "전이 로직이 DB·React와 분리돼 Node 내장 테스트 러너로 단위 테스트 59개(거부 경로 위주)를 돌릴 수 있었고, GitHub Actions에서 타입체크 · 린트 · 테스트 · 빌드를 푸시마다 확인했습니다.",
        resultEn: "With transitions decoupled from the DB and React, 59 unit tests (mostly rejection paths) run on Node's built-in test runner, and GitHub Actions checks typecheck, lint, tests, and build on every push.",
        files: ["lib/state.ts", "lib/tournament.ts", "lib/tournament.test.ts", ".github/workflows/ci.yml"],
      },
      {
        title: "심사 제출을 클라이언트 검증만으로 믿을 수 없었습니다",
        titleEn: "Votes couldn't be trusted on client-side checks alone",
        problem: "심사 화면은 코드 하나로 들어오는 가벼운 게이트라 코드가 새면 누구나 표를 낼 수 있었고, 결과 공개 직후 늦게 도착한 제출이 기록을 바꿀 위험도 있었습니다. 운영 콘솔의 PIN도 쿠키에 그대로 둘 수 없었습니다.",
        problemEn: "The judge view sat behind a single light code, so a leaked code would let anyone vote, and a vote arriving just after a reveal could change the record. The ops PIN couldn't sit in a cookie as-is either.",
        solution: "POST /api/vote에서 서버가 심사 코드, 심사위원 명단, 경기의 live 여부를 차례로 검증하고, 제출 시각은 서버가 찍고 코멘트 길이도 서버에서 자릅니다. 운영 세션은 PIN을 HMAC-SHA256으로 파생한 토큰을 httpOnly 쿠키에 담아 timingSafeEqual로 비교하고, /api/admin/*은 proxy에서 쿠키 유무를, 라우트 핸들러에서 토큰을 다시 확인하는 이중 가드로 막았습니다.",
        solutionEn: "POST /api/vote has the server verify the judge code, the judge allowlist, and that the match is live, in that order; the server stamps the time and trims comments. Ops sessions carry an HMAC-SHA256 token derived from the PIN in an httpOnly cookie, compared with timingSafeEqual, and /api/admin/* is double-guarded: the proxy checks the cookie exists, and each route handler re-checks the token.",
        result: "명단 밖 이름은 403, 이미 끝난 경기로 늦게 온 제출은 409로 거부됩니다. PIN을 바꾸면 기존 운영 세션이 모두 무효가 되고, 쿠키가 새어도 PIN 원문은 드러나지 않습니다.",
        resultEn: "Off-list names get a 403 and late votes on a closed match get a 409. Changing the PIN invalidates every existing ops session, and a leaked cookie doesn't reveal the PIN.",
        files: ["app/api/vote/route.ts", "lib/auth.ts", "proxy.ts"],
      },
      {
        title: "네트워크가 끊기거나 표가 0건이어도 본선은 진행돼야 했습니다",
        titleEn: "The finals had to go on even with no network or zero votes",
        problem: "행사장 네트워크나 심사 화면에 문제가 생기면 2,000명 앞의 무대가 멈추고, 한 번 공개한 결과는 되돌릴 수 없었습니다.",
        problemEn: "If the venue network or the judge view failed, the stage in front of 2,000 people would stall, and a revealed result couldn't be taken back.",
        solution: "심사 제출이 0건이어도 운영자가 직접 승자를 지정해 공개하는 백업 모드를 두고, 결과 공개에는 롤백 대신 확인 다이얼로그를 필수로 넣었습니다. 로컬 production 빌드를 LAN IP로 띄우는 오프라인 폴백을 위해 secure 쿠키를 끄는 환경 변수를 따로 두었고, 빌드가 Supabase 키 없이도 통과하는지 CI에서 확인했습니다.",
        solutionEn: "A backup mode lets the operator name the winner and reveal even with zero votes, and reveals require a confirm dialog instead of offering rollback. For an offline fallback that serves a local production build over a LAN IP, a separate env var can turn off the secure cookie flag, and CI checks that the build passes without Supabase keys.",
        result: "본선 8팀 토너먼트를 이 콘솔로 끝까지 진행했고, 콘솔 조작이 무대 스크린에 반영되기까지 실측 2.2초였습니다.",
        resultEn: "The console ran the 8-team finals to the end, with a measured 2.2 seconds from console action to stage screen.",
        files: ["lib/tournament.ts", "lib/auth.ts", "docs/SPEC.md"],
      },
      {
        title: "마감 후 검사만으로는 force-push를 잡을 수 없었습니다",
        titleEn: "Checking after the deadline couldn't catch force-pushes",
        problem: "커밋 시각만 보는 사후 검사로는 히스토리를 다시 쓴 force-push나 삭제된 브랜치가 드러나지 않고, 커밋 날짜도 위조할 수 있었습니다. 마감 시각에 562개 레포를 한 번에 훑어야 했지만 토큰으로도 GitHub API는 시간당 5,000회로 제한됩니다.",
        problemEn: "A post-hoc check of commit times can't reveal a force-push that rewrote history or a deleted branch, and commit dates can be forged. All 562 repos had to be swept right at the deadline, while the GitHub API allows 5,000 calls an hour even with a token.",
        solution: "마감 직후 모든 레포의 전 브랜치 SHA와 pushed_at을 스냅샷 JSON으로 찍고, 이후 대조로 추가 커밋 · force-push · 브랜치 삭제를 가려냈습니다. 표준 라이브러리만으로 스레드 8개를 동시에 돌리고, 2차 레이트리밋의 Retry-After를 받으면 모든 워커가 함께 멈췄다 재개하며, 50개마다 중간 저장해 --resume으로 이어서 돌게 했습니다. 스냅샷을 찍는 1~2분 사이에 푸시한 레포는 pushed_at으로 따로 세어 사람이 확인하게 했습니다.",
        solutionEn: "Right after the deadline it snapshots every branch SHA and pushed_at of every repo to JSON, and later comparison exposes added commits, force-pushes, and deleted branches. Using only the standard library it runs 8 threads; on a secondary rate limit's Retry-After every worker pauses and resumes together, and it checkpoints every 50 repos so --resume can pick up. Repos pushed during the 1–2 minutes the snapshot takes are counted separately from pushed_at for a person to check.",
        result: "실측 40개에 8초 속도로 562개 레포를 전수 검사해 위반 5팀을 찾았고, 판정은 검사 전에 합의한 기준으로 운영진이 내렸습니다. 입력 파싱과 대조 로직은 단위 테스트 34개로 고정했습니다.",
        resultEn: "At a measured 40 repos per 8 seconds it swept all 562 repos and found 5 violating teams, which the staff ruled on by criteria agreed before the scan. Input parsing and comparison are pinned by 34 unit tests.",
        files: ["check.py", "test_check.py"],
        repo: "https://github.com/tlstkdgus/hackathon-commit-check",
      },
      {
        title: "키워드 하나가 조용히 오답을 만들 수 있었습니다",
        titleEn: "A single keyword could quietly produce a wrong answer",
        problem: "FAQ 봇은 키워드 매칭을 먼저 쓰는데, '상'(상금) 같은 1글자 키워드가 '7인 이상'을 가로채거나 '발표'가 엉뚱한 항목을 끌어오는 일이 운영 중에 나왔습니다. 전각 문자로 입력하는 학생도 있었고, LLM 백엔드 하나가 실패하면 답이 끊겼습니다.",
        problemEn: "The FAQ bot matches keywords first, and during operation one-letter keywords like '상' (prize) hijacked '7인 이상' (7 or more), and '발표' pulled in the wrong entry. Some students typed full-width characters, and a single failing LLM backend cut answers off.",
        solution: "입력을 NFKC로 정규화하고, 점수가 동점이면 찍지 않고 LLM에 넘기며, OpenAI와 Claude를 같은 인터페이스로 두어 한쪽이 실패하면 다른 쪽으로 자동 전환했습니다. 질문별로 어느 항목에 가야 하는지를 라우팅 표 형태의 회귀 테스트로 고정하고, 미답변 리포트(digest.py)는 제안만 하고 faq.md는 사람이 고치게 했습니다. 배포는 GitHub Actions가 서버에서 update.sh를 돌리고, 저널에 '로그인 성공'이 찍힐 때까지 기다려 확인합니다.",
        solutionEn: "Input is NFKC-normalized, ties go to the LLM instead of guessing, and OpenAI and Claude sit behind one interface so a failure on one switches to the other. Which entry each question should reach is pinned as a routing-table regression test, and the unanswered-question report (digest.py) only suggests while people edit faq.md. On deploy, GitHub Actions runs update.sh on the server and waits for 'login succeeded' in the journal.",
        result: "한 달간 229건 중 80.8%를 키워드로 즉답(API 비용 0)하고 미응답은 0건이었습니다. 키워드를 늘릴 때마다 인접 주제를 가로채는지 테스트 62개가 바로 잡아냈습니다.",
        resultEn: "Over a month, 80.8% of 229 questions got an instant keyword answer (zero API cost), with none unanswered. Each time keywords grew, 62 tests immediately caught any hijacking of neighboring topics.",
        files: ["faq_engine.py", "llm.py", "test_faq_matching.py", "deploy/lib.sh"],
        repo: "https://github.com/tlstkdgus/hackathon-faq-bot",
      },
    ],
    results: [
      {
        text: "562개 레포 전수 검사 결과 정상 550 · 위반 5팀 — 차등 기준에 따라 2팀 실격, 나머지는 감점·정상참작으로 처리했습니다.",
        textEn:
          "The full 562-repo sweep found 550 clean and 5 violating teams — 2 disqualified under the graded criteria, the rest handled with deductions or leniency.",
      },
      {
        text: "본선 토너먼트(8팀 · 심사위원 5명)를 직접 만든 콘솔로 끝까지 진행했습니다.",
        textEn:
          "Ran the finals tournament (8 teams, 5 judges) end-to-end on the console I built.",
      },
      {
        text: "멋쟁이사자처럼 브랜드 디자인 랩이 'ANIMAL LEAGUE'를 Behance 케이스로 공개했고, 공동작업자로 등재됐습니다.",
        textEn:
          "LIKELION's Brand Design Lab published 'ANIMAL LEAGUE' as a Behance case study, with me credited as a collaborator.",
      },
    ],
    lessons: [
      {
        text: "'마감 후 수정 금지'를 집행하려면 검사 도구가 필요했지만, 판정까지 도구에 맡기면 참가자가 결과를 받아들이기 어렵다고 판단했습니다. 위반 성격별 판정 기준을 검사 전에 먼저 합의하고, 도구는 근거만 내도록 만들었습니다.",
        textEn:
          "Enforcing 'no edits after deadline' needed a checking tool, but I judged that participants would struggle to accept verdicts handed down by a tool. We agreed on graded criteria for each kind of violation before the sweep, and the tool only produced evidence.",
      },
      {
        text: "현장 도구는 기능을 더하기 전에 되돌릴 수 없는 상황부터 닫아야 한다고 판단했습니다. 롤백 없는 결과 공개, 네트워크 백업 모드, 동표 판정의 사람 위임을 먼저 넣었고, 본선 당일 운영진이 확신을 갖고 진행할 수 있었던 이유가 이 안전장치들이었습니다.",
        textEn:
          "For a live-event tool, I decided to close the irreversible situations before adding features: no-rollback reveals, a network backup mode, ties delegated to humans. Those safeguards are what let the crew run finals day with confidence.",
      },
      {
        text: "가이드·FAQ·봇·문의 채널은 결국 하나의 시스템이었습니다. 정보의 단일 출처를 정하고 나머지가 그걸 재사용하게 만들자, 같은 질문에 다른 답이 나가는 일이 줄었습니다.",
        textEn:
          "The guide, FAQ, bot, and inquiry channels were really one system. Designating a single source of truth and making everything else reuse it reduced the 'same question, different answer' failure.",
      },
    ],
  },

  {
    id: "cleanb",
    title: "외주 에어비앤비 청소 매칭 플랫폼 개발·운영 — CleanB",
    titleEn: "Operating a Client's Airbnb Cleaning Matching Platform — CleanB",
    images: [
      "/projects/cleanb/01.png",
      "/projects/cleanb/03.png",
      "/projects/cleanb/05.png",
      "/projects/cleanb/07.png",
    ],
    diagrams: [
      {
        title: "청소 작업의 상태 흐름에서 화면을 도출했습니다",
        titleEn: "Screens derived from the cleaning job's state flow",
        steps: [
          { label: "수락 대기", labelEn: "Pending", note: "작업 요청 목록 — 숙소·일정·옵션·보수 확인 후 수락/거절", noteEn: "Request list — check place, date, options, pay; accept or decline" },
          { label: "진행 예정", labelEn: "Scheduled", note: "작업 상세 + 캘린더 — 출입 방법·숙소 정보 안내", noteEn: "Job detail + calendar — entry method and place info" },
          { label: "진행 중", labelEn: "In progress", note: "진행 상태 표시 — 작업 중에는 추가 입력을 요구하지 않음", noteEn: "Progress shown — no extra input asked while working" },
          { label: "검수 대기", labelEn: "Review", tag: "완료 조건", tagEn: "Completion rule", note: "전·후 사진 최소 5장 + 특이사항으로 완료 인증", noteEn: "Completion proven with 5+ before/after photos and notes" },
          { label: "정산 대기", labelEn: "Settlement", note: "정산 상태 노출 — 청소자가 지급 시점을 화면에서 확인", noteEn: "Settlement status shown — cleaners see when they'll be paid" },
        ],
        caption: "기능 목록보다 상태 흐름을 먼저 확정했고, 각 상태에서 필요한 화면과 입력만 남겼습니다. 개발·QA 범위도 이 흐름을 기준으로 나눴습니다.",
        captionEn: "I fixed the state flow before the feature list and kept only the screens and inputs each state needed. Dev and QA scope were split along the same flow.",
      },
    ],
    background: [
      {
        text: "에어비앤비 호스트는 믿을 만한 청소 인력을 구하기 어렵고, 청소자는 일감을 안정적으로 받기 어렵습니다. 둘을 연결하는 매칭 서비스를 만들되, 해커톤처럼 만들고 끝나는 게 아니라 실제 사용자를 받는 서비스로 '운영'하는 것을 목표로 잡았습니다. (외주 · 2025.11 기획·디자인 시작 ~ 현재, 3인 팀 — 서비스명 루미클린(RumiClean), www.rumiclean.com)",
        textEn:
          "Airbnb hosts struggle to find reliable cleaners; cleaners struggle to get steady work. We set out to build a matching service — and to actually operate it with real users, not finish it like a hackathon project. (Client project · planning and design from Nov 2025 – present, 3-person team — service name RumiClean, www.rumiclean.com)",
        subItems: [
          {
            text: "전체 PM으로 기획·디자인·릴리스 우선순위를 잡고, 청소자용 화면 전체를 직접 개발했습니다.",
            textEn:
              "As overall PM I own planning, design, and release priorities, and built the entire cleaner-side frontend myself.",
          },
        ],
      },
    ],
    role: [
      {
        title: "운영 PM — 우선순위와 배포 의사결정",
        titleEn: "Operating PM — Priorities & Deployment Decisions",
        items: [
          {
            text: "기능 개발부터 배포까지의 우선순위를 정하고, PR 170개가 넘는 저장소의 코드 리뷰·릴리스 머지·QA 프로세스를 관리합니다.",
            textEn:
              "Set priorities from feature work to deployment; manage code review, release merges, and QA across a 170+ PR repository.",
            subItems: [
              {
                text: "3인 팀 규모에 맞춰 배포를 k3s/ArgoCD에서 Docker Compose + Caddy로 단순화해 유지보수 부담을 줄였고, 배포 중에도 화면이 유지되도록 정적 파일을 CDN(CloudFront)으로 분리했습니다.",
                textEn:
                  "Simplified deployment from k3s/ArgoCD to Docker Compose + Caddy to match a 3-person team, and served static files from a CDN (CloudFront) so pages stay up during deploys.",
              },
            ],
          },
        ],
      },
      {
        title: "프로세스 기반 화면 설계",
        titleEn: "Process-Driven Screen Design",
        items: [
          {
            text: "청소 작업의 생애주기를 '수락 대기 → 진행 예정 → 진행 중 → 검수 대기 → 정산 대기' 상태 머신으로 정의하고, 각 상태에서 화면과 입력을 도출했습니다.",
            textEn:
              "Defined the cleaning job lifecycle as a state machine (pending → scheduled → in progress → review → settlement) and derived each screen and its inputs from the states.",
            subItems: [
              {
                text: "완료 인증에 전·후 사진 최소 5장 규칙을 두어, 호스트-청소자 간 '청소가 됐는가' 분쟁의 근거를 서비스가 보관하도록 정책으로 설계했습니다.",
                textEn:
                  "Completion requires at least 5 before/after photos — a policy that makes the service the custodian of evidence in host-cleaner disputes.",
              },
            ],
          },
          {
            text: "카카오맵 지도 검색, Firebase 웹 푸시 등 운영에 필요한 연동을 구현하고, 아토믹 디자인·data-testid QA 규칙으로 팀 코드 일관성을 유지합니다.",
            textEn:
              "Implemented production integrations (Kakao Map search, Firebase Web Push) and keep team code consistent with atomic design and data-testid QA conventions.",
          },
        ],
      },
    ],
    troubles: [
      {
        title: "3인 팀이 k3s를 유지하는 비용이 기능 개발 시간을 잠식했습니다",
        titleEn: "Keeping k3s running was eating a three-person team's feature time",
        problem: "배포를 k3s와 ArgoCD로 구성했지만, 3인 팀이 클러스터를 유지하는 일이 기능 개발과 QA 시간을 가져갔고 배포 중에는 화면이 잠깐씩 끊겼습니다.",
        problemEn: "Deployment ran on k3s and ArgoCD, but maintaining a cluster took a three-person team's time away from features and QA, and pages dropped briefly during deploys.",
        solution: "운영 복잡도를 팀 크기에 맞춰 Docker Compose와 Caddy로 단순화하고, 정적 파일은 CloudFront로 분리했습니다. 배포는 GitHub Actions 자동 배포로 유지했습니다.",
        solutionEn: "I matched ops complexity to team size by simplifying to Docker Compose and Caddy, and moved static files to CloudFront. Deploys stayed automated with GitHub Actions.",
        result: "배포 중에도 화면이 유지되고, 인프라 유지보수 대신 기능과 QA에 시간을 쓰게 됐습니다.",
        resultEn: "Pages stay up during deploys, and the team spends its time on features and QA instead of infrastructure upkeep.",
      },
      {
        title: "기능 목록부터 쓰면 화면 수만 늘어났습니다",
        titleEn: "Starting from a feature list only multiplied screens",
        problem: "호스트·청소자 양쪽 요구를 기능 목록으로 받으니 화면이 계속 늘었고, 어디까지 개발하고 QA할지 범위를 정하기 어려웠습니다.",
        problemEn: "Taking both hosts' and cleaners' needs as a feature list kept adding screens, and it was hard to agree where development and QA should stop.",
        solution: "청소 작업을 '수락 대기 → 진행 예정 → 진행 중 → 검수 대기 → 정산 대기' 상태 머신으로 먼저 확정하고, 상태마다 필요한 화면과 입력만 남겼습니다. 컴포넌트는 아토믹 디자인으로 나누고, 테스트가 잡을 요소에는 data-testid 규칙을 두었습니다.",
        solutionEn: "I fixed the job as a state machine first (pending → scheduled → in progress → review → settlement) and kept only the screens and inputs each state needs. Components follow atomic design, and elements tests target follow a data-testid convention.",
        result: "청소자 화면 전체가 이 흐름에서 나왔고, 개발·QA 범위도 상태 단위로 나눠 PR 170개 이상이 오간 저장소의 릴리스를 관리하고 있습니다.",
        resultEn: "The whole cleaner app came out of this flow, and development and QA scope are split by state, which is how I manage releases on a repo with 170+ PRs.",
      },
    ],
    results: [
      {
        text: "GitHub Actions 자동 배포로 www.rumiclean.com에 배포했습니다. 토스 결제 연동 전이라 아직 실사용자는 받지 않고 있습니다. 기획·디자인·개발·배포·QA까지 서비스의 전 과정을 처음으로 '운영'해보고 있는 프로젝트입니다.",
        textEn:
          "Deployed to www.rumiclean.com with GitHub Actions auto-deployment. Toss payments are not connected yet, so it does not take real users — my first project operating the full cycle: planning, design, development, deployment, and QA.",
      },
    ],
    lessons: [
      {
        text: "운영 복잡도는 팀 크기에 맞춰야 한다고 판단했습니다. 3인 팀이 k3s를 유지하는 비용이 기능 개발 시간을 잠식해 Docker Compose와 Caddy로 단순화했고, 도구를 바꾸는 결정이 기능을 더하는 결정보다 서비스를 더 안정시켰습니다.",
        textEn:
          "Ops complexity has to match team size. Keeping k3s running was eating into a three-person team's feature time, so I simplified to Docker Compose and Caddy, and swapping tools stabilized the service more than adding features would have.",
      },
      {
        text: "기능 목록을 먼저 쓰면 화면 수만 늘어납니다. 상태 흐름을 먼저 확정하니 필요한 화면과 입력이 저절로 추려졌고, 개발·QA 범위 협상도 이 흐름 위에서 이뤄졌습니다.",
        textEn:
          "Write the feature list first and you only multiply screens. Fixing the state flow first distilled the screens and inputs we actually needed — and scope negotiations happened on top of that flow.",
      },
    ],
  },

  {
    id: "flowpay",
    title: "무기명 법인카드 지출·회계 자동화 B2B SaaS — FlowPay",
    titleEn: "Anonymous Corporate Card Expense Automation B2B SaaS — FlowPay",
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
    background: [
      {
        text: "직원 1인당 지출보고서 작성에 20분, 회계담당자는 월 100건 이상을 처리하며 기업당 연간 약 1,000시간·8천만 원의 인건비 손실이 발생합니다. 2025년 기준 무기명 법인카드 간편결제를 지원하는 카드사는 단 3곳뿐입니다.",
        textEn:
          "Employees spend 20 min per expense report; accountants process 100+ per month — resulting in ~1,000 hours and ₩80M in annual labor costs per company. As of 2025, only 3 card issuers support easy payment for anonymous corporate cards.",
        subItems: [
          {
            text: "현업 회계담당자 인터뷰를 통해 가장 큰 Pain Point가 '결제 후 영수증 수집 → 지출보고서 수기 작성 → 회계 전표 입력'의 3중 반복 작업임을 확인했습니다.",
            textEn:
              "Interviews with accountants confirmed the biggest pain point: triple repetitive work of 'collect receipts → manually write expense report → enter accounting voucher.'",
          },
        ],
      },
      {
        text: "FINNECT 챌린지(핀테크 해커톤) 과제로, 3인 팀에서 PM과 프론트엔드 개발, IR 피칭을 맡았습니다. (2025.06 ~ 2025.08)",
        textEn:
          "A FINNECT Challenge (fintech hackathon) project — in a 3-person team, I handled PM, frontend development, and the IR pitch. (Jun–Aug 2025)",
      },
    ],
    role: [
      {
        title: "PM 및 서비스 기획",
        titleEn: "PM & Product Planning",
        items: [
          {
            text: "Flow ID 기반 익명 태깅 시스템 아이디어를 도출했습니다. 무기명 카드 사용자를 자동 식별·기록하여 8단계 → 3단계로 업무 프로세스를 단축합니다.",
            textEn:
              "Conceived the Flow ID-based anonymous tagging system: auto-identify and log anonymous card users, shortening the workflow from 8 steps to 3.",
            subItems: [
              {
                text: "사용자 여정 맵핑 및 정보구조 설계, 3인팀 스프린트 계획 수립 및 주간 회의 주관.",
                textEn:
                  "Mapped user journeys, designed IA, established sprint plans for the 3-person team, and chaired weekly meetings.",
              },
            ],
          },
        ],
      },
      {
        title: "프론트엔드 개발",
        titleEn: "Frontend Development",
        items: [
          {
            text: "React 기반 실시간 대시보드(부서별 예산 현황, AI 이상 거래 탐지)와 데이터 시각화 컴포넌트를 구현했습니다.",
            textEn:
              "Built real-time dashboard (department budget status, AI anomaly transaction detection) and data visualization components in React.",
          },
          {
            text: "FIDO2 API를 연동하여 지문·Face ID 생체인증 1초 결제 시스템을 개발했습니다. 복잡한 인증 과정을 제거하고 보안을 동시에 확보했습니다.",
            textEn:
              "Integrated FIDO2 API to develop a 1-second biometric payment system (fingerprint/Face ID), eliminating complex authentication while maintaining security.",
          },
        ],
      },
      {
        title: "사업 전략 및 IR 피칭",
        titleEn: "Business Strategy & IR Pitching",
        items: [
          {
            text: "TAM·SAM·SOM 3개 유효 시장을 분석하여 총 1조 6,200억 원 시장 규모를 산정했습니다. Phase 1(50개사 확보) → Phase 2(800개사) → Phase 3(Enterprise·IPO) 로드맵을 수립했습니다.",
            textEn:
              "Analyzed TAM/SAM/SOM across 3 addressable markets, sizing the total at ₩1.62T. Built a phased roadmap: Phase 1 (50 companies) → Phase 2 (800) → Phase 3 (Enterprise/IPO).",
          },
          {
            text: "FINNECT 챌린지 IR 발표를 직접 담당하여 102팀 중 5위(장려상)를 수상했습니다.",
            textEn:
              "Personally delivered the FINNECT Challenge IR pitch, winning 5th place (Encouragement Prize) out of 102 teams.",
          },
        ],
      },
    ],
    results: [
      {
        text: "FINNECT 챌린지 장려상 수상 (5등/102팀) — 현업 인터뷰로 문제를 다시 정의하고 정산 단계를 8단계에서 3단계로 줄인 설계가 결과로 이어졌습니다.",
        textEn:
          "Won Encouragement Prize at FINNECT Challenge (5th of 102 teams) — redefining the problem through interviews and cutting reconciliation from 8 steps to 3 led to this outcome.",
      },
      {
        text: "3인 팀에서 PM·프론트엔드·IR 피칭을 모두 수행하며 B2B SaaS 기획의 전 사이클(문제 정의 → 솔루션 설계 → 기술 구현 → 사업화 전략)을 경험했습니다.",
        textEn:
          "Serving as PM, frontend developer, and IR presenter in a 3-person team, I experienced the full B2B SaaS planning cycle: problem definition → solution design → implementation → commercialization strategy.",
      },
    ],
    lessons: [
      {
        text: "현업 회계담당자 인터뷰에서 가장 큰 비용은 결제 이후 수기로 작성하는 전표에 있다고 판단했습니다. 결제 시점에 사용자를 식별하면 전표 자체가 필요 없어지므로 설계의 출발점을 결제 화면에서 결제 데이터로 옮겼고, 이 판단이 정산 8단계 → 3단계로 이어졌습니다.",
        textEn:
          "Interviews with working accountants showed the biggest cost sits in the vouchers written by hand after each payment. Identifying the user at the moment of payment removes the voucher entirely, so I moved the design's starting point from the payment screen to the payment data, and that decision took reconciliation from 8 steps to 3.",
      },
      // TODO(상현): 심사 때 실제 받았던 질문이 기억나면 한 줄 추가하면 더 진짜같아짐
      {
        text: "심사에서 가장 많은 질문을 받은 부분은 기업 구독과 거래 수수료를 합친 수익 모델이었습니다. B2B에서는 기술의 참신함보다 돈이 실제로 도는 경로를 먼저 보여줘야 한다고 판단하게 된 계기입니다.",
        textEn:
          "The part judges asked about most was the revenue model that combines an enterprise subscription with transaction fees. That is when I decided that in B2B, showing how money actually moves comes before technical novelty.",
      },
    ],
  },

  {
    id: "ywave",
    title: "경기도 지역화폐 가맹점 추천 서비스 — Y:Wave",
    titleEn: "Gyeonggi Local Currency Store Recommendation — Y:Wave",
    images: [
      "/projects/ywave/01.png",
      "/projects/ywave/02.png",
      "/projects/ywave/03.png",
      "/projects/ywave/04.png",
      "/projects/ywave/05.png",
      "/projects/ywave/06.png",
    ],
    background: [
      {
        text: "경기도 지역화폐 이용자는 많지만, 가맹점 탐색의 어려움으로 소비가 특정 대형 가맹점에 편중되고 소상공인 수혜가 미미한 문제를 파악했습니다.",
        textEn:
          "Despite a large base of Gyeonggi local currency users, spending concentrated in large merchants due to difficulty discovering stores — leaving small business owners with minimal benefit.",
        subItems: [
          {
            text: "멋쟁이사자처럼 13기 중앙해커톤 제출작으로, 6인 팀에서 경기도 지역화폐 가맹점 추천이라는 공공 문제를 AI로 해결하는 서비스를 기획·개발했습니다.",
            textEn:
              "Submitted to the LIKELION 13th national hackathon — as part of a 6-person team, planned and developed a service solving the public problem of Gyeonggi local currency store discovery with AI.",
          },
        ],
      },
    ],
    role: [
      {
        title: "서비스 기획 및 디자인",
        titleEn: "Product Planning & Design",
        items: [
          {
            text: "사용자의 현재 위치, 소비 패턴, 카테고리 선호도를 분석하여 맞춤형 가맹점을 추천하는 AI 기능을 기획했습니다.",
            textEn:
              "Planned an AI feature that analyzes user's current location, spending patterns, and category preferences to recommend personalized merchants.",
          },
          {
            text: "Figma로 전체 UI/UX를 설계하고, 지역 소상공인 홍보 효과와 사용자 혜택을 동시에 달성하는 서비스 흐름을 설계했습니다.",
            textEn:
              "Designed the full UI/UX in Figma and structured the service to simultaneously achieve local small business promotion and user benefits.",
          },
        ],
      },
      {
        title: "프론트엔드 개발",
        titleEn: "Frontend Development",
        items: [
          {
            text: "React + TypeScript + Tailwind CSS 기반의 반응형 UI를 개발했습니다. 위치 기반 가맹점 지도, AI 추천 리스트, 카테고리 필터 등 핵심 화면을 구현했습니다.",
            textEn:
              "Developed responsive UI in React + TypeScript + Tailwind CSS. Implemented core screens: location-based merchant map, AI recommendation list, and category filters.",
          },
        ],
      },
    ],
    results: [
      {
        text: "멋쟁이사자처럼 13기 중앙해커톤 2차 예선에 진출했습니다 — 247팀 중 상위 12%에 해당하는 성과입니다.",
        textEn:
          "Advanced to the 2nd round of the LIKELION 13th national hackathon — top 12% among 247 teams.",
      },
    ],
    lessons: [
      {
        text: "추천 정확도를 올리는 것보다, 추천 결과를 보고 실제로 가게에 가게 만드는 화면이 더 어려웠습니다. 지도에서 가맹점이 한눈에 들어오게 만드는 일이 알고리즘보다 사용성을 좌우했습니다.",
        textEn:
          "Improving recommendation accuracy was easier than building a screen that makes people actually visit the store. Making merchants legible on the map mattered more than the algorithm.",
      },
      {
        text: "'지역 경제 활성화'는 심사용 문구일 뿐, 사용자에게는 '내 주변 어디서 할인받지?'가 전부였습니다. 거시 목표를 개인의 혜택으로 번역하는 게 기획의 일이라는 걸 배운 프로젝트입니다.",
        textEn:
          "'Revitalizing the local economy' is a phrase for judges; for users it was just 'where near me do I get a discount?' Translating macro goals into personal benefits is the planner's job.",
      },
    ],
  },

  {
    // §G-6에서 추가 (2026-09-24). HANDOFF D-8의 '결정 기록' 중 상현 확인 전(※) 문장은 넣지 않고,
    // 화면에 실제로 반영된 동작만 적었다. 배운 점은 확인된 문장이 없어 비워 둔다(상세 페이지에서 섹션을 그리지 않음).
    id: "welcomekit",
    title: "부원 45명이 쓴 13기 동아리 앱 — 웰컴키트",
    titleEn: "A Club App Used by 45 Members — WelcomeKit",
    background: [
      {
        text: "한국외대 멋쟁이사자처럼 13기 부원 45명의 세션 출석을 운영진이 수기 출석부로 관리하고 있었습니다. 13기 운영진으로 출석과 팀 빙고 미션을 한 앱에서 처리하는 PWA를 기획하고 프론트엔드 개발을 이끌었습니다. (2025.03 ~ 2025.09)",
        textEn:
          "Attendance for the 45 members of HUFS LIKELION's 13th cohort was kept by staff on a paper roll. As 13th-cohort staff, I planned a PWA that handled attendance and team bingo missions in one app, and led its frontend development. (Mar 2025 – Sep 2025)",
      },
    ],
    role: [
      {
        title: "QR 출석",
        titleEn: "QR attendance",
        items: [
          {
            text: "운영진이 QR을 띄우고 부원이 모바일로 스캔하면 서버에 바로 기록되고, 세션 시작 20분이 지난 스캔은 지각으로 자동 판정되게 했습니다.",
            textEn: "Staff show a QR code and members scan it on their phones, so attendance is recorded on the server at once; scans more than 20 minutes after the session starts are marked late automatically.",
          },
          {
            text: "오늘 출석부에서는 지각·결석자만 팀별로 보여주게 했습니다.",
            textEn: "Today's roll shows only late or absent members, grouped by team.",
          },
          {
            text: "데스크톱에서는 QR 띄우기와 출석부 최신화만, 모바일에서는 출석하기 버튼만 보이게 했습니다.",
            textEn: "On desktop only 'show QR' and 'refresh roll' appear; on mobile only the 'check in' button does.",
          },
        ],
      },
      {
        title: "빙고 미션",
        titleEn: "Bingo missions",
        items: [
          {
            text: "승인 대기 중인 칸이 있으면 다른 칸을 선택할 수 없게 하고, 운영진이 승인하면 카드가 뒤집히며 미션이 공개되게 했습니다.",
            textEn: "While one square awaits approval, no other square can be picked; once staff approve it, the card flips and the mission is revealed.",
          },
        ],
      },
    ],
    results: [
      {
        text: "부원 45명이 세션 출석과 빙고 미션에 사용했고, 수기 출석부는 QR 스캔 자동 기록으로 바뀌었습니다.",
        textEn: "All 45 members used it for session attendance and bingo missions, and the paper roll was replaced by automatic QR logging.",
      },
    ],
    lessons: [],
  },

  {
    id: "devsite",
    title: "비개발 직군을 위한 6회 강의와 교육 사이트 — 사내 개발 교육",
    titleEn: "Six Lectures and a Companion Site for Non-Developers — Internal Dev Literacy Course",
    images: [
      "/projects/devsite/01.png",
      "/projects/devsite/02.png",
      "/projects/devsite/03.png",
      "/projects/devsite/04.png",
      "/projects/devsite/05.png",
    ],
    background: [
      {
        text: "회사에는 저처럼 비전공자인 동료가 많았고, 그분들에게 '배포'·'API' 같은 말이 여전히 어렵다는 걸 알게 됐습니다. AI에게 물어보면 답이 나오는 시대지만, 기본 흐름을 모르면 무엇을 물어야 할지조차 모릅니다. 멋쟁이사자처럼 인턴 기간에 기획·제작·강의를 단독으로 맡았습니다. (2026.07 ~ 2026.08)",
        textEn:
          "Many colleagues were non-developers like me, and words like 'deploy' and 'API' were still hard for them. You can ask AI anything now — but without the basic flow, you don't know what to ask. During my LIKELION internship I planned, built, and taught the course on my own. (Jul – Aug 2026)",
      },
    ],
    role: [
      {
        title: "커리큘럼 설계와 강의 — 단독",
        titleEn: "Curriculum & Teaching — Solo",
        items: [
          {
            text: "점심시간 분량 6회 커리큘럼을 설계하고 주 1회, 6주간 직접 강의했습니다 — 소프트웨어 구조 · 개발 용어 · Git과 GitHub · 협업 커뮤니케이션 · AI와 바이브 코딩 · AI 트렌드.",
            textEn:
              "Designed a 6-session lunchtime curriculum and taught it weekly for 6 weeks — software structure, dev vocabulary, Git & GitHub, collaboration communication, AI & vibe coding, AI trends.",
            subItems: [
              {
                text: "모든 개념을 식당 비유 하나로 통일했습니다 — 홀=프론트엔드, 주방=백엔드, 냉장고=DB, 주문서=API. 회차가 바뀌어도 같은 그림 위에 새 개념을 얹도록 했습니다.",
                textEn:
                  "Unified every concept under one restaurant metaphor — dining hall = frontend, kitchen = backend, fridge = DB, order slip = API — so each session added to the same picture.",
              },
            ],
          },
        ],
      },
      {
        title: "교육 사이트 직접 제작",
        titleEn: "Built the Companion Site",
        items: [
          {
            text: "React · TypeScript · Vite로 교육용 사이트를 만들었습니다 — SVG 개념 도식 14종, 브라우저에서 바로 동작하는 라이브 실습(로그인 요청 왕복, Git 협업 시뮬레이터 등), 용어 사전 51개.",
            textEn:
              "Built the site with React · TypeScript · Vite — 14 SVG concept diagrams, live in-browser demos (login round-trip, Git collaboration simulator), and a 51-term glossary.",
            subItems: [
              {
                text: "설치·계정이 필요한 실습은 전부 뺐습니다. 밥 먹으면서 듣는 환경을 전제로, 링크 하나로 바로 따라 할 수 있는 것만 남겼습니다.",
                textEn:
                  "Cut every exercise that needed installs or accounts — assuming people listen over lunch, only what works from a single link stayed.",
              },
            ],
          },
        ],
      },
    ],
    results: [
      {
        text: "수강자 설문(6명): 만족도 전원 5/5, 추천 의향 평균 9.7/10, '개발자와의 대화에서 이해되는 부분이 늘었다' 4.7/5.",
        textEn:
          "Attendee survey (n=6): 5/5 satisfaction across the board, 9.7/10 average recommendation, 4.7/5 on 'I understand more of developer conversations now.'",
      },
      {
        text: "'짧아서 아쉽다'는 피드백과 함께 인프라·DB·협업 방식 등 후속 주제 요청을 받았습니다.",
        textEn:
          "Feedback said it was 'too short,' with requests for follow-ups on infrastructure, databases, and dev collaboration.",
      },
    ],
    lessons: [
      {
        text: "코드를 가르치지 않기로 한 게 가장 큰 결정이었습니다. 목표를 '개발자 되기'에서 '개발자와 대화하기'로 좁히자 6회 안에 담을 것과 버릴 것이 분명해졌습니다 — 교육도 스코프를 자르는 일이었습니다.",
        textEn:
          "The biggest decision was not teaching code. Narrowing the goal from 'becoming a developer' to 'talking with developers' made clear what fit in six sessions and what didn't — teaching, too, was scope cutting.",
      },
    ],
  },

  {
    id: "songeul",
    title: "시니어를 위한 AI-OCR 모바일 뱅킹 — 손글 (SonGeul)",
    titleEn: "Mobile Banking for Seniors, with AI-OCR — SonGeul",
    images: [
      "/projects/songeul/01.png",
      "/projects/songeul/02.png",
      "/projects/songeul/03.png",
      "/projects/songeul/04.png",
      "/projects/songeul/05.png",
      "/projects/songeul/06.png",
    ],
    diagrams: [
      {
        title: "계좌번호를 손글씨로 적던 습관을 그대로 송금 화면으로 옮겼습니다",
        titleEn: "The habit of jotting account numbers by hand became the transfer screen",
        steps: [
          { label: "기존 습관", labelEn: "Existing habit", note: "계좌번호를 손글씨로 메모 — 고령층이 이미 하는 행동을 입력 수단으로", noteEn: "Writing account numbers by hand — something seniors already do, used as input" },
          { label: "① 촬영", labelEn: "① Capture", tag: "AI-OCR", tagEn: "AI-OCR", note: "CLOVA OCR + Google Vision + 자체 파인튜닝 모델의 가중 투표로 인식", noteEn: "Weighted vote of CLOVA OCR, Google Vision, and our fine-tuned model" },
          { label: "② 확인", labelEn: "② Confirm", tag: "사람 확인 1", tagEn: "Human check 1", note: "인식된 수취인·계좌·금액을 큰 글씨로 본인이 확인", noteEn: "The user checks the recognized payee, account, and amount in large type" },
          { label: "③ 승인", labelEn: "③ Approve", tag: "사람 확인 2", tagEn: "Human check 2", note: "송금이 실행되기 전에 가족이 한 번 더 확인하는 2단계 인증", noteEn: "A family member confirms once more before the transfer runs" },
          { label: "송금 완료", labelEn: "Sent", tag: "결과", tagEn: "Result", note: "착오송금의 주요 원인인 계좌번호 직접 입력이 흐름에서 사라짐", noteEn: "Typing the account number, the main cause of mistaken transfers, is gone" },
        ],
        caption: "OCR 인식에는 오차가 있다는 전제에서, 송금 전에 본인과 가족이 한 번씩 확인하는 단계를 두어 인증·보안 요건을 유지했습니다.",
        captionEn: "Starting from the premise that OCR can misread, the user and a family member each confirm once before the transfer, so authentication and security requirements stay intact.",
      },
    ],
    background: [
      {
        text: "65세 이상 고령층의 모바일뱅킹 이용률은 53.4%로, 비고령층(95%) 대비 41.6%p 낮습니다. 2030년에는 65세 이상 인구가 1,000만 명을 넘어설 전망이며(통계청 2024), 상당수 고령층이 금융 업무를 가족에 의존하고 있습니다.",
        textEn:
          "Mobile banking usage among seniors 65+ is 53.4% — 41.6%p below non-seniors (95%). The senior population is expected to exceed 10M by 2030 (Statistics Korea 2024), and many seniors rely on family for financial tasks.",
        subItems: [
          {
            text: "은행 점포 폐쇄와 ATM 축소로 지방 소도시 금융 접근성이 급락했고, 착오송금의 주요 원인은 '계좌번호 입력 오류'입니다. 기존 앱은 인증 절차 복잡·보안 불안감으로 고령층 진입 장벽이 높습니다.",
            textEn:
              "Bank branch closures and ATM reductions have devastated rural financial access. The leading cause of erroneous transfers is 'account number input error.' Existing apps have high barriers for seniors due to complex authentication and security anxiety.",
          },
        ],
      },
      {
        text: "2025 한국정보기술전략혁신학회(KIITI) 동계 학술대회 아이디어 및 앱 개발 콘테스트 출품 작품입니다. 6인 팀(프론트엔드 3 · 백엔드 3)의 PM으로 기획·AI 설계·프론트엔드 개발을 리드했습니다.",
        textEn:
          "Submitted to the 2025 KIITI Winter Academic Conference App Development Contest. I led a 6-person team (3 frontend · 3 backend) as PM across planning, AI architecture, and frontend development.",
      },
    ],
    role: [
      {
        title: "서비스 기획 및 UX 설계",
        titleEn: "Product Planning & UX Design",
        items: [
          {
            text: "'입력 제거' 개념의 UX 플로우를 설계했습니다: 촬영(손글씨 메모) → 확인(AI-OCR 인식 결과) → 승인(가족 2단계 인증) 3단계로 단순화.",
            textEn:
              "Designed an 'eliminate input' UX flow: capture (handwritten memo) → confirm (AI-OCR result) → approve (family 2-step auth) — simplified to 3 steps.",
            subItems: [
              {
                text: "SAFE 프레임워크(Security·Assets·Family Connect·Education) 기반 부가 기능 체계화 및 가족 연동 안전망 설계.",
                textEn:
                  "Systematized supporting features under SAFE framework (Security · Assets · Family Connect · Education) and designed family-linked safety net structure.",
              },
            ],
          },
        ],
      },
      {
        title: "AI 시스템 설계",
        titleEn: "AI System Design",
        items: [
          {
            text: "CLOVA OCR + Google Vision + 자체 파인튜닝 모델 앙상블(가중 투표 방식)을 설계하여 OCR 인식률의 한계를 보완했습니다. 3단계 이상 패턴 감지 로드맵(Rule → 통계 → ML·Isolation Forest·LSTM)을 수립했습니다.",
            textEn:
              "Designed a CLOVA OCR + Google Vision + fine-tuned model ensemble (weighted voting) to compensate for OCR accuracy limitations. Established a 3-stage anomaly detection roadmap (Rule → Statistical → ML: Isolation Forest, LSTM).",
          },
          {
            text: "LLM 역할을 NLU(텍스트 의미 구조화)와 XAI(위험 설명)로 분리 설계하고, 사용자 수정 데이터를 자동 학습하는 피드백 루프를 포함했습니다.",
            textEn:
              "Separated LLM roles into NLU (text semantic structuring) and XAI (risk explanation), and included a feedback loop for auto-learning from user correction data.",
          },
        ],
      },
      {
        title: "비즈니스 모델 설계",
        titleEn: "Business Model Design",
        items: [
          {
            text: "통계청 고령 인구 통계를 기반으로 시장 규모를 직접 산정하고, 4개 수익원을 설계했습니다: B2C 구독 / B2B 라이선싱(금감원 고령자 서비스 의무화 규제 활용) / Financial Brokerage / Government Grants.",
            textEn:
              "Sized the market directly from Statistics Korea senior population data and designed 4 revenue streams: B2C subscription / B2B licensing (leveraging the FSS senior service mandate) / financial brokerage / government grants.",
          },
        ],
      },
    ],
    results: [
      {
        text: "2025 KIITI 동계 학술대회 아이디어 및 앱 개발 콘테스트 우수상 수상.",
        textEn:
          "Won Excellence Award at the 2025 KIITI Winter Academic Conference App Development Contest.",
      },
    
    ],
    lessons: [
      {
        text: "시니어에게 새로운 사용법을 가르치는 대신, 계좌번호를 손글씨로 메모하던 습관을 그대로 인터페이스로 옮겼습니다. 새로운 조작을 익히게 하는 것보다 이미 익숙한 행동을 화면으로 옮기는 편이 시니어의 부담을 줄인다고 판단했습니다.",
        textEn:
          "Instead of teaching seniors a new way, I turned their habit of jotting account numbers by hand into the interface. I judged that carrying a familiar behavior onto the screen asks far less of seniors than teaching them new controls.",
      },
      {
        text: "OCR 인식률에는 한계가 있다는 전제에서 설계를 시작했습니다. 인식 결과를 큰 글씨로 재확인하는 단계를 넣고 앙상블로 보정했습니다. 인식이 어긋나도 잘못된 송금으로 이어지지 않게 막는 확인 단계가 금융 서비스의 신뢰를 만든다고 판단했습니다.",
        textEn:
          "The design started from the premise that OCR has an error rate: an oversized confirmation step for the recognized number, plus ensemble correction. I judged that a confirmation step which stops a misread from becoming a wrong transfer is what builds trust in a financial service.",
      },
    ],
  },

  {
    id: "rzi",
    title: "알뜰 지출관리 플랫폼 — RZi",
    titleEn: "Smart Expense Manager — RZi",
    images: [
      "/projects/rzi/01.png",
      "/projects/rzi/02.png",
      "/projects/rzi/03.png",
      "/projects/rzi/04.png",
      "/projects/rzi/05.png",
      "/projects/rzi/06.png",
    ],
    background: [
      {
        text: "K-HTML 해커톤(서울시 동대문구청 × 경희대학교 공동 주최)의 과제로 시작했습니다. 동대문구에 21,343명의 인구가 신규 유입될 것으로 예상되지만, 청년층의 전통시장 이용률은 8.2%에 불과함을 데이터로 확인했습니다.",
        textEn:
          "Initiated as a challenge for the K-HTML Hackathon (co-hosted by Seoul Dongdaemun-gu and KHU). Data confirmed that while 21,343 new residents are expected to move into Dongdaemun-gu, traditional market usage among youth stands at just 8.2%.",
        subItems: [
          {
            text: "전통시장 6대 불편 요소를 분석했습니다: 가격 불투명, 복잡한 동선, 현금결제 의존, 재고 정보 부재, 디지털 검색 불가, 주차 불편. 이 중 '가격 불투명'과 '상품 탐색 어려움'이 핵심 진입 장벽임을 파악했습니다.",
            textEn:
              "Analyzed 6 major pain points of traditional markets: price opacity, complex layout, cash-only payment, no inventory info, unsearchable online, poor parking. Identified 'price opacity' and 'product discovery difficulty' as the core entry barriers.",
          },
        ],
      },
      {
        text: "B2C 개인 사용자 → B2G 지자체 협력 모델로 확장하는 3단계 전략을 수립했습니다. 전통시장 상인회와의 파트너십을 통해 데이터를 축적하고, 지자체에 지역 경제 활성화 인사이트를 제공하는 모델을 구상했습니다.",
        textEn:
          "Established a 3-phase expansion strategy: B2C individual users → B2G local government partnership. Conceived a model to accumulate data through merchant association partnerships and provide local economic revitalization insights to local governments.",
      },
    ],
    role: [
      {
        title: "기획 및 프로덕트 설계",
        titleEn: "Planning & Product Design",
        items: [
          {
            text: "OCR 기술과 AI 추천을 결합한 종합 쇼핑 도우미 PWA의 전체 서비스 플로우를 기획했습니다.",
            textEn:
              "Planned the complete service flow of a comprehensive shopping assistant PWA combining OCR technology and AI recommendations.",
            subItems: [
              {
                text: "실시간 가격비교(전통시장 vs 대형마트), OCR 영수증 스캔, Google Maps 연동 경로안내, AI 상품 대체 추천 등 4가지 핵심 기능을 정의했습니다.",
                textEn:
                  "Defined 4 core features: real-time price comparison (traditional market vs. large mart), OCR receipt scanning, Google Maps-integrated navigation, and AI alternative product recommendations.",
              },
            ],
          },
        ],
      },
      {
        title: "아키텍처 설계 및 개발 리드",
        titleEn: "Architecture Design & Development Lead",
        items: [
          {
            text: "Next.js 15 + React 19 기반 PWA 아키텍처를 설계하여 오프라인 지원, 홈 화면 추가, 빠른 로딩 등 PWA 핵심 기능을 구현했습니다.",
            textEn:
              "Designed a Next.js 15 + React 19-based PWA architecture and implemented core PWA features: offline support, home screen installation, and fast loading.",
          },
          {
            text: "팀 전체 기획부터 개발, 디자인, 팀 관리까지 프로젝트 리드 역할을 수행했습니다.",
            textEn:
              "Served as project lead covering the entire team — from planning and development to design and team management.",
          },
        ],
      },
    ],
    results: [
      {
        text: "K-HTML 해커톤(2025.07.16 ~ 2025.08.30)을 수료하고, OCR+AI+Google Maps가 통합된 실용적인 지역사회 문제 해결 서비스를 완성했습니다.",
        textEn:
          "Completed K-HTML Hackathon (Jul 16 – Aug 30, 2025) and delivered a practical community service integrating OCR, AI, and Google Maps.",
      },
    ],
    lessons: [
      {
        text: "기능 목록보다 '가격 비교 → 탐색 → 구매'라는 행동 흐름을 먼저 그렸고, 그 흐름에 필요한 기능만 남겼습니다. OCR과 AI는 이 흐름을 매끄럽게 만드는 수단으로 배치했습니다.",
        textEn:
          "I drew the behavior flow first — compare price, explore, buy — and kept only the features that flow needed. OCR and AI were placed as the means to make that flow smooth.",
      },
      {
        text: "지자체·상인회·소비자가 원하는 게 전부 달랐습니다. 셋을 동시에 만족시키는 기능은 없어서, B2C에서 시작해 B2G로 넓히는 3단계 확장 전략으로 순서를 나눠 풀었습니다.",
        textEn:
          "The district office, merchants, and consumers all wanted different things. No single feature satisfied all three, so we sequenced it: a three-stage expansion from B2C to B2G.",
      },
    ],
  },

  {
    id: "connect",
    title: "은둔형 청년 지원 플랫폼 — 커넥트",
    titleEn: "Support Platform for Socially Isolated Youth — Connect",
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
    background: [
      {
        text: "2024년 한국보건사회연구원 조사에 따르면 국내 은둔형 청년이 약 54만 명에 달합니다. 이 중 80% 이상이 은둔 상태를 벗어나길 원하지만, 절반 이상이 지원을 받은 경험이 없습니다.",
        textEn:
          "A 2024 Korea Institute for Health and Social Affairs survey found approximately 540,000 socially isolated youth in Korea. Over 80% want to overcome their isolation, yet more than half have never received any support.",
        subItems: [
          {
            text: "주요 고립 원인은 취업 실패(24.1%)와 대인관계 어려움(23.5%)이며, 삶의 만족도는 일반 청년 대비 절반 수준입니다. 사회적 손실은 연간 7조 원 규모로 추산됩니다.",
            textEn:
              "Primary causes of isolation: employment failure (24.1%) and interpersonal difficulties (23.5%). Life satisfaction is about half that of general youth. Social losses are estimated at ₩7 trillion annually.",
          },
        ],
      },
      {
        text: "기존 지원 사업은 국가 주도의 대면 프로그램 중심으로, 은둔 청년에게 오히려 높은 진입 장벽이었습니다. 비대면·익명 기반의 단계적 접근이 핵심 차별점이라고 판단했습니다.",
        textEn:
          "Existing programs were government-led and face-to-face — paradoxically creating high barriers for isolated youth. Concluded that a non-face-to-face, anonymous, step-by-step approach would be the key differentiator.",
      },
    ],
    role: [
      {
        title: "서비스 기획 및 PM",
        titleEn: "Product Planning & PM",
        items: [
          {
            text: "2단계 사회 적응 커리큘럼을 설계했습니다: 1단계(사회 적응 훈련) - 텍스트 시뮬레이션, AI 역할극 채팅, 사용자 매칭 대화 / 2단계(사회 참여 훈련) - AI 취업 컨설팅, 외부 기관 연계, 일간 뉴스레터.",
            textEn:
              "Designed a 2-stage social adaptation curriculum: Stage 1 (Social Adaptation Training) — text simulation, AI role-play chat, user matching dialogue / Stage 2 (Social Participation Training) — AI job consulting, institution links, daily newsletter.",
          },
          {
            text: "구독 모델(사회 적응 훈련 6,900원/월, 사회 참여 훈련 9,900원/월)과 3단계 확장 전략(B2C → 기술 안정화 → B2B)을 수립하고 3개년 수익 예측을 작성했습니다.",
            textEn:
              "Established subscription model (₩6,900/month for adaptation, ₩9,900/month for participation) and 3-phase growth strategy (B2C → tech stabilization → B2B), including 3-year revenue projections.",
            subItems: [
              {
                text: "첫 해 당기순이익 563만원 → 3년차 3억 987만원 달성 전망의 손익계산서를 작성했습니다.",
                textEn:
                  "Prepared a P&L statement projecting ₩5.63M net profit in year 1, scaling to ₩309.87M by year 3.",
              },
            ],
          },
        ],
      },
      {
        title: "UI/UX 디자인 및 프론트엔드 개발",
        titleEn: "UI/UX Design & Frontend Development",
        items: [
          {
            text: "와이어프레임부터 스타일 가이드, 아이콘·버튼 등 세부 UI 요소까지 Figma로 전체 디자인 시스템을 구축했습니다.",
            textEn:
              "Built the complete design system in Figma — from wireframes and style guides to detailed UI elements like icons and buttons.",
          },
          {
            text: "React 기반으로 40개 이상의 페이지를 구현하고, Spring Boot 백엔드 API(회원가입, 뉴스레터, OpenAI 연동)와 카카오맵 API를 연동했습니다. (3인팀, 멋쟁이사자처럼 12기)",
            textEn:
              "Implemented 40+ pages in React, integrated Spring Boot backend APIs (registration, newsletter, OpenAI) and Kakao Maps API. (3-person team, Likelion 12th cohort)",
          },
        ],
      },
    ],
    results: [
      {
        text: "26명 대상 시장 테스트에서 전반적 유용성 8.9점(목표 8.0점 초과)을 달성했습니다. 주간 인증 챌린지가 9.4점으로 가장 높은 평가를 받았으며, AI 역할극 채팅은 실제 대화 거부감을 최소화했다는 평가를 받았습니다.",
        textEn:
          "Achieved overall usefulness score of 8.9 (exceeding 8.0 target) in market testing with 26 participants. Weekly challenge received the highest rating (9.4), and AI role-play chat was praised for minimizing aversion to real conversation.",
      },
      {
        text: "서비스 기획, UI/UX 디자인, 40페이지 프론트엔드 개발을 완성하고 최종 발표와 시연을 맡았습니다.",
        textEn:
          "Completed the service planning, UI/UX design, and 40-page frontend build, and delivered the final presentation and demo.",
      },
    ],
    lessons: [
      {
        text: "'비대면·익명'이라는 원칙 하나가 서비스 전체를 결정했습니다. 은둔 청년에게는 좋은 프로그램보다 문턱 낮은 입구가 먼저였고, 실제로 테스트에서 가장 높은 9.4점을 받은 것도 가장 부담 없는 기능인 주간 인증 챌린지였습니다.",
        textEn:
          "One principle — contactless and anonymous — decided the whole service. For reclusive youth, a low doorstep beats a good program; fittingly, the least demanding feature, the weekly check-in challenge, scored highest (9.4) in testing.",
      },
      {
        text: "시장 테스트에서 38.5%가 가격이 부담된다고 답해 구독료를 내렸습니다. 26명 규모의 테스트였지만 가설보다 사용자 응답을 우선해 가격을 조정했습니다.",
        textEn:
          "38.5% of testers said the price was a burden, so we lowered the subscription fee. It was a 26-person test, but we put user responses ahead of our own hypothesis and adjusted the price.",
      },
    ],
  },

  {
    id: "ainterview",
    title: "모의 면접 서비스 — AInterview",
    titleEn: "Mock Interview Service — AInterview",
    images: [
      "/projects/ainterview/01.png",
      "/projects/ainterview/02.png",
      "/projects/ainterview/03.png",
      "/projects/ainterview/04.png",
      "/projects/ainterview/05.png",
    ],
    background: [
      {
        text: "취업 준비생의 46%가 면접을 가장 어려워한다는 조사 결과를 확인했습니다. 실전과 유사한 환경에서 반복 연습할 수 있는 기회가 절대적으로 부족하다는 문제의식에서 출발했습니다.",
        textEn:
          "Research showed 46% of job seekers find interviews the hardest part of job hunting. The project was born from recognizing a critical lack of opportunities to practice in a realistic, repeatable environment.",
        subItems: [
          {
            text: "기존 면접 준비 서비스들은 단순 질문 목록 제공에 그쳤습니다. 실시간 음성 상호작용, 직무별 맞춤 질문, AI 피드백이 결합된 서비스는 시장에 없었습니다.",
            textEn:
              "Existing prep services only provided question lists. No service combined real-time voice interaction, role-specific questions, and AI feedback.",
          },
        ],
      },
      {
        text: "멋쟁이사자처럼 12기 최종 프로젝트로, 4인 팀에서 기획·디자인·프론트엔드 개발을 맡았습니다. 2024년 7월부터 11월까지 약 4개월간 진행했습니다.",
        textEn:
          "The Likelion 12th cohort final project — in a 4-person team, I handled planning, design, and frontend development over about 4 months (July–November 2024).",
      },
    ],
    role: [
      {
        title: "서비스 기획 및 PM",
        titleEn: "Product Planning & PM",
        items: [
          {
            text: "취준생의 실제 페인 포인트를 분석하여 세 가지 핵심 기능(음성 인식 면접 시뮬레이션, 직무별 맞춤 질문 자동 생성, AI 피드백)을 정의하고 우선순위를 결정했습니다.",
            textEn:
              "Analyzed actual pain points of job seekers and defined three core features: voice-based interview simulation, auto-generation of role-specific questions, and AI feedback — then prioritized them.",
            subItems: [
              {
                text: "Azure Speech Service를 활용해 음성-텍스트(STT) 및 텍스트-음성(TTS) 변환 시스템을 구현하여 실제 면접과 유사한 음성 기반 인터랙션을 구현했습니다.",
                textEn:
                  "Implemented speech-to-text (STT) and text-to-speech (TTS) conversion using Azure Speech Service, enabling voice-based interaction similar to a real interview.",
              },
              {
                text: "GPT-4o-mini를 직무별 면접 데이터로 Fine-tuning하여 IT, 경영, 마케팅 등 직군별로 적절한 면접 질문을 자동 생성하는 시스템을 설계했습니다.",
                textEn:
                  "Fine-tuned GPT-4o-mini on role-specific interview data to design a system that auto-generates appropriate interview questions for IT, business, marketing, and other fields.",
              },
            ],
          },
          {
            text: "서비스 플로우 설계: 로그인 → 직무 선택 → AI 질문 생성 → 음성 답변 → STT 변환 → 피드백 제공의 전체 사용자 여정을 설계했습니다.",
            textEn:
              "Designed the complete user journey: Login → Role Selection → AI Question Generation → Voice Answer → STT Conversion → Feedback.",
          },
        ],
      },
      {
        title: "UI/UX 디자인 및 프론트엔드 개발",
        titleEn: "UI/UX Design & Frontend Development",
        items: [
          {
            text: "실제 면접 환경을 재현한 인터랙티브 UI를 Figma로 설계하고, React 기반으로 구현했습니다. 음성 녹음 시각화, 타이머, 질문 카드 등 면접 몰입감을 높이는 요소들을 포함했습니다.",
            textEn:
              "Designed an interactive UI replicating a real interview environment in Figma and implemented it in React. Included elements to enhance interview immersion: voice recording visualization, timer, and question cards.",
            subItems: [
              {
                text: "Spring Boot 백엔드와 API를 연동하여 실시간 STT 처리, 질문 생성, 피드백 조회 플로우를 구현했습니다.",
                textEn:
                  "Integrated with Spring Boot backend API to implement real-time STT processing, question generation, and feedback retrieval flow.",
              },
            ],
          },
        ],
      },
    ],
    results: [
      {
        text: "음성 인식 기반 AI 면접 시뮬레이션 서비스를 완성해 멋쟁이사자처럼 12기 최종 프로젝트로 발표했습니다.",
        textEn:
          "Completed the voice-based AI interview simulation service and presented it as the Likelion 12th cohort's final project.",
      },
      {
        text: "Azure Speech + GPT Fine-tuning 조합으로 실제 직무에 맞는 맞춤형 면접 질문 생성과 음성 기반 인터랙션이 가능한 서비스를 구현했습니다.",
        textEn:
          "Delivered a service capable of generating role-specific interview questions and voice-based interaction through the combination of Azure Speech and GPT fine-tuning.",
      },
    ],
    lessons: [
      {
        text: "STT가 답변을 텍스트로 바꾸는 데 몇 초씩 걸렸습니다. 기술로는 줄일 수 없는 시간이라, 그 정적을 타이머와 진행 표시로 채웠습니다. 기술의 한계를 인정하고 UX로 감싸는 법을 처음 연습한 프로젝트입니다.",
        textEn:
          "STT took seconds to transcribe each answer — time we couldn't shrink with tech. So we filled the silence with a timer and progress cues. This was my first practice in accepting a technical limit and wrapping it in UX.",
      },
      {
        text: "GPT fine-tuning 범위를 놓고 개발팀과 계속 조율했습니다. '이상적인 질문 생성'과 '기한 안에 되는 것' 사이에서 스코프를 자르는 일, 그게 PM 역할의 실체였습니다.",
        textEn:
          "We kept negotiating the GPT fine-tuning scope with the dev team. Cutting scope between 'ideal question generation' and 'what ships on time' — that was the real substance of the PM role.",
      },
    ],
  },

  {
    id: "hai",
    title: "개인 맞춤형 커리어 멘토링 서비스 — hai",
    titleEn: "Personalized Career Mentoring Service — hai",
    images: [
      "/projects/hai/01.png",
      "/projects/hai/02.png",
      "/projects/hai/03.png",
      "/projects/hai/04.png",
      "/projects/hai/05.png",
      "/projects/hai/06.png",
    ],
    background: [
      {
        text: "취업 준비생들이 자신의 강점과 적합한 직무를 파악하지 못한 채 무분별하게 지원하는 문제, 그리고 1:1 커리어 멘토링을 받기 어려운 비용·접근성 문제를 확인했습니다.",
        textEn:
          "Identified that job seekers often apply indiscriminately without knowing their strengths or best-fit roles, and face cost and accessibility barriers to 1:1 career mentoring.",
        subItems: [
          {
            text: "CHALLKATHON(한국외국어대학교 컴퓨터공학부 × UMC 공동 주최 해커톤)에서 기획·개발한 프로젝트입니다. 제한된 시간 안에 빠르게 기획하고 구현하는 능력이 요구되는 환경이었습니다.",
            textEn:
              "Planned and developed at CHALLKATHON (joint hackathon by HUFS CS Dept × UMC). An environment requiring rapid planning and implementation within a constrained timeframe.",
          },
        ],
      },
    ],
    role: [
      {
        title: "기획 및 프론트엔드 개발",
        titleEn: "Planning & Frontend Development",
        items: [
          {
            text: "사용자의 경험·역량·관심사를 입력받아 AI가 맞춤형 커리어 로드맵과 취업 전략을 제안하는 서비스 흐름을 기획했습니다.",
            textEn:
              "Planned a service structure where AI proposes personalized career roadmaps and job strategies based on user-inputted experience, competencies, and interests.",
            subItems: [
              {
                text: "AI 멘토와의 대화형 인터페이스를 설계하여 딱딱한 분석 결과 대신 자연스러운 멘토링 경험을 제공하는 UX를 기획했습니다.",
                textEn:
                  "Designed a conversational interface with an AI mentor so the guidance reads as a natural mentoring conversation instead of a rigid analytical report.",
              },
            ],
          },
          {
            text: "해커톤의 시간 제약 안에서 기획·설계·개발 우선순위를 빠르게 결정하고 팀 전체의 방향을 이끌었습니다.",
            textEn:
              "Quickly prioritized planning, design, and development within hackathon time constraints and led the overall team direction.",
          },
        ],
      },
    ],
    results: [
      {
        text: "해커톤 기간 안에 동작하는 AI 커리어 멘토링 서비스를 완성해 배포했습니다. (CHALLKATHON)",
        textEn:
          "Shipped a working AI career mentoring service within the hackathon period. (CHALLKATHON)",
      },
    ],
    lessons: [
      // TODO(상현): 실제로 잘라낸 기능이 뭐였는지 기억나면 괄호로 추가
      {
        text: "마감 몇 시간을 앞두고 기능을 더 붙일지, 있는 걸 다듬을지 골라야 했습니다. 붙이고 싶은 기능 목록을 지우고 핵심 플로우 하나를 끝까지 다듬는 쪽을 택했고, 그게 완성도로 이어졌습니다.",
        textEn:
          "Hours before the deadline we had to choose: add features or polish what exists. We deleted the wishlist and polished one core flow to the end — that became the finish quality.",
      },
    ],
  },

  {
    id: "mealdang",
    title: "당뇨병 환자를 위한 AI 식단 관리 서비스 — Meal당",
    titleEn: "Diet Management Service for Diabetics, with AI — Meal당",
    images: [
      "/projects/mealdang/01.png",
      "/projects/mealdang/02.png",
      "/projects/mealdang/03.png",
      "/projects/mealdang/04.png",
      "/projects/mealdang/05.png",
      "/projects/mealdang/06.png",
    ],
    background: [
      {
        text: "국내 당뇨 인구가 예측보다 30년 빠르게 600만 명을 돌파했습니다. 당뇨병학회 조사에 따르면 당뇨 환자들이 가장 어려워하는 것이 식단 관리(44%)임을 확인했습니다.",
        textEn:
          "Korea's diabetic population surpassed 6M — 30 years ahead of projections. The Korean Diabetes Association survey confirmed that diet management (44%) is the greatest challenge for diabetic patients.",
        subItems: [
          {
            text: "기존 식단 앱(마이피트니스팔, 눔 등)은 일반인 대상으로, 대한당뇨병학회의 식품교환표 기반 칼로리 계산과 혈당 관리를 통합한 의료 수준 서비스는 존재하지 않았습니다.",
            textEn:
              "Existing diet apps (MyFitnessPal, Noom, etc.) targeted general users. No service integrated medical-grade calorie calculation based on the Korean Diabetes Association's food exchange table with blood glucose management.",
          },
        ],
      },
      {
        text: "멋쟁이사자처럼 12기 프로젝트로, 문제 정의부터 비즈니스 모델 설계, UI/UX 디자인, 프론트엔드 개발까지 맡았습니다.",
        textEn:
          "A Likelion 12th cohort project — I handled problem definition, business model design, UI/UX design, and frontend development.",
      },
    ],
    role: [
      {
        title: "서비스 기획 및 BM 설계",
        titleEn: "Product Planning & Business Model Design",
        items: [
          {
            text: "대한당뇨병학회의 식품교환표(6가지 식품군)를 기반으로 사용자의 체중·키·활동량에 따른 개인 맞춤 일일 권장 칼로리를 자동 계산하는 알고리즘을 기획했습니다.",
            textEn:
              "Planned an algorithm to auto-calculate personalized daily recommended calories based on user weight, height, and activity level using the Korean Diabetes Association's food exchange table (6 food groups).",
            subItems: [
              {
                text: "ChatGPT API를 활용해 계산된 칼로리 제한 안에서 사용자 식품교환단위에 맞는 개인화된 식단을 자동 생성하는 기능을 설계했습니다.",
                textEn:
                  "Designed an auto-generation feature that uses the ChatGPT API to create personalized meal plans matching user food exchange units within the calculated calorie limit.",
              },
            ],
          },
          {
            text: "프리미엄 구독(개인화 식단 고도화), 당뇨 관련 제품 쇼핑몰 연계, 익명화 식사 데이터 판매(헬스케어 기업 대상) 등 3가지 수익원을 설계했습니다.",
            textEn:
              "Designed 3 revenue streams: premium subscription (advanced personalization), diabetic product store integration, and anonymized meal data sales (to healthcare companies).",
          },
        ],
      },
      {
        title: "UI/UX 디자인 및 프론트엔드 개발",
        titleEn: "UI/UX Design & Frontend Development",
        items: [
          {
            text: "혈당 모니터링 로그, 식품교환표 기반 식단 생성, 당뇨 친화 식당 지도 등 핵심 기능을 Figma로 설계하고 React로 구현했습니다.",
            textEn:
              "Designed core features — blood glucose logging, exchange-table-based meal generation, and diabetes-friendly restaurant map — in Figma and implemented them in React.",
          },
          {
            text: "당뇨 환자라는 특수 사용자를 고려하여 큰 폰트, 명확한 수치 시각화, 간결한 입력 플로우 등 접근성 중심의 UI를 설계했습니다.",
            textEn:
              "Designed accessibility-centered UI considering the special user group of diabetics: large fonts, clear numerical visualization, and simplified input flow.",
          },
        ],
      },
    ],
    results: [
      {
        text: "mealdang.vercel.app으로 서비스를 실제 배포하여 실사용 가능한 형태로 완성했습니다. 식품교환표 기반 칼로리 계산과 ChatGPT 식단 자동 생성이 정상 작동합니다.",
        textEn:
          "Deployed the service at mealdang.vercel.app in a fully usable form. Food-exchange-table calorie calculation and ChatGPT meal auto-generation work correctly.",
      },
    ],
    lessons: [
      {
        text: "당뇨병학회의 식품교환표를 기획의 뼈대로 삼으니 '이 계산이 왜 맞는데?'라는 질문에 답할 수 있었습니다. 헬스케어에서는 출처가 곧 신뢰였습니다.",
        textEn:
          "Building on the Diabetes Association's food exchange table meant we could answer 'why is this calculation right?' In healthcare, the source is the trust.",
      },
      {
        text: "식품교환표를 그대로 보여주면 아무도 못 씁니다. 키·몸무게 입력 → 개인 교환표 자동 생성 → 식단 추천으로 단계를 감췄습니다. 도메인 지식을 UX 뒤로 숨기는 것이 이 프로젝트에서 배운 기획의 핵심입니다.",
        textEn:
          "Show the raw exchange table and nobody can use it. We hid the steps: enter height/weight, auto-generate a personal table, then recommend meals. Hiding domain knowledge behind UX was the core lesson.",
      },
    ],
  },

  {
    id: "16play",
    title: "MBTI 커뮤니티 — 16P!ay",
    titleEn: "MBTI Community — 16P!ay",
    // 발표 자료(16P!ay(3팀).pdf)에서 2400px로 렌더링. 목차·개발 환경·명세서(글씨가 읽히지 않음)·Q&A는 뺐다
    images: [
      "/projects/16play/01.png",
      "/projects/16play/02.png",
      "/projects/16play/03.png",
      "/projects/16play/04.png",
      "/projects/16play/05.png",
      "/projects/16play/06.png",
      "/projects/16play/07.png",
    ],
    background: [
      {
        text: "멋쟁이사자처럼 13기 운영진으로서 아기사자(13기 부원)들과 함께 MBTI 기반 커뮤니티를 기획·디자인·개발한 미니프로젝트입니다.",
        textEn:
          "A mini project where, as 13th-cohort staff, I planned, designed, and built an MBTI-based community together with the cohort's members.",
      },
    ],
    role: [
      {
        title: "PM · 기획·디자인·프론트엔드",
        titleEn: "PM · Planning, Design & Frontend",
        items: [
          {
            text: "MBTI별 게시판, 밸런스 게임, 단점 보완 체크, 책 추천, 마이페이지로 이어지는 화면 흐름(UX Flow)과 기능·API 명세서를 정리하고, 화면 디자인과 프론트엔드를 맡았습니다.",
            textEn:
              "Laid out the screen flow (UX Flow) and feature/API specs across the MBTI boards, balance game, weakness checklist, book recommendations, and my page, and handled the UI design and frontend.",
          },
        ],
      },
    ],
    results: [
      {
        text: "멋쟁이사자처럼 13기 미니프로젝트 최우수상",
        textEn: "Grand Prize in Likelion 13th cohort mini project",
      },
    ],
    lessons: [
      {
        text: "짧은 기간에 완성도를 만든 방법은 기능을 줄이는 것이었습니다. 처음 그린 화면 흐름에서 곁가지를 계속 쳐냈고, 단순하게 남긴 흐름이 미니프로젝트 최우수상으로 이어졌습니다.",
        textEn:
          "The way to reach polish in a short period was cutting features. I kept pruning branches off the initial flow, and the simplicity that remained is what won the top prize.",
      },
    ],
  },

  {
    id: "dotori",
    title: "시각장애인을 위한 점자 교육 플랫폼 — dotori",
    titleEn: "Braille Education Platform for the Visually Impaired — dotori",
    // 발표 자료(3조_발표자료.pdf)에서 2400px로 렌더링. 팀원 소개(p.21)와 인터뷰이 사진·실명(p.27)은 싣지 않는다
    images: [
      "/projects/dotori/01.png",
      "/projects/dotori/02.png",
      "/projects/dotori/03.png",
      "/projects/dotori/04.png",
      "/projects/dotori/05.png",
      "/projects/dotori/06.png",
      "/projects/dotori/07.png",
      "/projects/dotori/08.png",
      "/projects/dotori/09.png",
    ],
    background: [
      {
        text: "점자를 모르는 시각장애인이 90.4%(보건복지부)이고, 등록 시각장애인은 1990년 14,618명에서 2020년 252,324명으로 늘었습니다(통계청). 점자 교구는 150만~777만 원대라 학습을 시작하기조차 어려웠고, 월 9,900원부터 시작하는 구독형 앱으로 비용 문턱을 낮추는 방향을 잡았습니다.",
        textEn:
          "90.4% of visually impaired people cannot read Braille (Ministry of Health and Welfare), and registered visually impaired people grew from 14,618 in 1990 to 252,324 in 2020 (Statistics Korea). Braille learning devices cost ₩1.5M–7.77M, so even starting was hard; we set out to lower that barrier with a subscription app from ₩9,900 a month.",
      },
      {
        text: "시각장애인의 점자 교육 접근성과 학습 지속성 문제를 창업캠프 과제로 정의하고, 사회적 가치와 수익 모델을 함께 설계했습니다. 2025.06 창업캠프에서 시작해 11월 창업 BM 경진대회까지 세 차례 피칭을 거치며 고도화했습니다.",
        textEn:
          "Framed Braille education access and learning continuity for the visually impaired as a startup camp challenge, designing both social impact and revenue logic. Started at the June 2025 startup camp and refined it through three pitches up to the November startup BM competition.",
      },
    ],
    role: [
      {
        title: "기획·IR 피칭 · 프론트엔드",
        titleEn: "Planning, IR Pitching & Frontend",
        items: [
          {
            text: "서비스 콘셉트·타겟·수익 모델을 정리하고 IR 피칭 경진대회에서 발표를 진행했습니다.",
            textEn:
              "Structured concept, target, and revenue model and delivered the pitch at the IR competition.",
          },
        ],
      },
    ],
    results: [
      {
        text: "2025 창업캠프 실전 IR 피칭 경진대회 최우수상 (한국외대 글로벌창업지원단, 2025.06)",
        textEn: "Grand Prize, 2025 HUFS Startup Camp IR Pitching Competition (Jun 2025)",
      },
      {
        text: "\"PICK YOUR IDEA\" IR PITCHING 우수상 (서울 AI 허브 / MOVE, 2025.07)",
        textEn: "Excellence Award, \"PICK YOUR IDEA\" IR Pitching (Seoul AI Hub / MOVE, Jul 2025)",
      },
      {
        text: "G-RISE × 경상대학 2025 창업 비즈니스 모델 경진대회 대상 (한국외대 경상대학, 2025.11)",
        textEn: "Grand Prize, G-RISE × College of Business 2025 Startup BM Competition (Nov 2025)",
      },
    ],
    lessons: [
      {
        text: "사회적 가치만 강조하면 공감에 그치고, 수익 모델만 강조하면 설득력이 떨어진다고 판단했습니다. 임팩트 지표와 수익 모델을 같은 슬라이드에 올렸을 때 심사위원의 반응이 달라졌습니다.",
        textEn:
          "I judged that social value alone earns sympathy and revenue alone sounds cold. When the impact metrics and the revenue model shared one slide, the judges' response changed.",
      },
    ],
  },

  {
    id: "tcp",
    images: [
      "/projects/tcp/01.png",
      "/projects/tcp/02.png",
      "/projects/tcp/03.png",
      "/projects/tcp/04.png",
      "/projects/tcp/05.png",
      "/projects/tcp/06.png",
    ],
    title: "약관 위험 알림 서비스 — TCP",
    titleEn: "Terms-of-Service Risk Alerts — TCP",
    background: [
      {
        text: "131명 설문조사 결과 93%가 약관을 제대로 읽지 않는다는 것을 확인했습니다. SKT 유심 해킹 사태를 계기로 약관을 읽지 않아 발생하는 소비자 피해가 사회적 문제로 부각되었습니다.",
        textEn:
          "A survey of 131 people revealed that 93% don't read terms of service properly. The SKT SIM hacking incident brought consumer damage from unread ToS to the forefront as a social issue.",
        subItems: [
          {
            text: "국내에는 아직 자동화된 실시간 약관 분석 서비스가 없다는 점을 확인하고, 그 공백이 왜 생겼는지부터 검증했습니다.",
            textEn:
              "Confirmed that no automated real-time ToS analysis service exists in Korea yet — and started by verifying why that gap exists.",
          },
        ],
      },
      {
        text: "기존 약관 검토 서비스는 사용자가 직접 텍스트를 복사해 붙여넣는 방식으로, 복잡한 법률 용어를 쉽게 이해할 수 있는 수단이 없었습니다. 백그라운드에서 자동으로 감지·분석하는 것이 차별점이 될 수 있다고 판단했습니다.",
        textEn:
          "Existing review services required users to manually copy-paste text, with no tools to understand complex legal language. Concluded that background auto-detection and analysis would be the key differentiator.",
      },
    ],
    role: [
      {
        title: "서비스 기획 및 BM 설계",
        titleEn: "Product Planning & Business Model Design",
        items: [
          {
            text: "스크린 오버레이 기술을 활용해 사용자가 약관에 동의하는 순간 백그라운드에서 자동으로 내용을 감지하고 분석하는 시스템을 기획했습니다.",
            textEn:
              "Planned a system that automatically detects and analyzes ToS content in the background at the moment of user agreement, using screen overlay technology.",
            subItems: [
              {
                text: "BERT·GPT 기반 NLP 모델을 법률 특화 데이터셋으로 미세조정하여 핵심 조항과 위험 요소를 자동 추출하는 기술 방향성을 설계했습니다.",
                textEn:
                  "Designed the technical direction: fine-tuning BERT/GPT-based NLP models on legal-domain datasets to auto-extract key clauses and risk factors.",
              },
              {
                text: "복잡한 약관을 쉬운 언어로 요약하고, 위험 조항을 시각적으로 강조(하이라이트·경고 아이콘)하는 UX를 기획했습니다.",
                textEn:
                  "Planned UX to summarize complex ToS in plain language and visually highlight risky clauses with highlights and warning icons.",
              },
            ],
          },
          {
            text: "5가지 수익원을 구조화했습니다: 프리미엄 구독제(B2C), 기업용 API(B2B), 법무법인·핀테크 파트너십, 익명화 데이터 인사이트 판매, 집단대응 중개 서비스.",
            textEn:
              "Structured 5 revenue streams: premium subscription (B2C), enterprise API (B2B), law firm & fintech partnerships, anonymized data insight sales, and collective action brokerage.",
          },
        ],
      },
      {
        title: "시장 조사 및 경쟁 분석",
        titleEn: "Market Research & Competitive Analysis",
        items: [
          {
            text: "국내외 리걸테크 서비스(DoNotPay, Ironclad 등)를 벤치마킹하여 백그라운드 자동 감지 기능의 차별성을 도출했습니다.",
            textEn:
              "Benchmarked domestic and overseas legaltech services (DoNotPay, Ironclad, etc.) to establish the differentiation of background auto-detection.",
          },
          {
            text: "주요 타겟을 '디지털 서비스를 자주 구독하는 20~40대'로 설정하고, B2B 확장 단계에서 금융·구독 플랫폼 기업을 주요 파트너로 정의했습니다.",
            textEn:
              "Defined primary target as '20s–40s who frequently subscribe to digital services,' with financial and subscription platform companies as key B2B partners in the expansion phase.",
          },
        ],
      },
    ],
    results: [
      {
        text: "교내 아이디어톤 최우수상 수상 — 직접 진행한 131명 설문 데이터(93%)로 문제의 심각성과 사업성을 입증했습니다.",
        textEn:
          "Won campus Ideathon Grand Prize — our own 131-person survey data (93%) proved both the severity of the problem and the business case.",
      },
      {
        text: "전국 해커톤 2차 예선 진출 — 기술 구현 가능성(BERT/GPT fine-tuning, 스크린 오버레이)과 수익 모델의 구체성이 심사위원에게 높은 평가를 받았습니다.",
        textEn:
          "Advanced to 2nd round of national hackathon — technical feasibility (BERT/GPT fine-tuning, screen overlay) and specificity of the revenue model received high marks from judges.",
      },
    ],
    lessons: [
      {
        text: "131명 설문에서 나온 '93%가 약관을 읽지 않는다'는 수치를 발표의 출발점으로 삼았습니다. 문제의 크기는 주장보다 설문 데이터로 보여줄 때 심사위원에게 더 분명하게 전달된다고 판단했습니다.",
        textEn:
          "We built the pitch on one figure from our 131-person survey: '93% don't read the terms.' I judged that survey data shows the size of a problem to judges more clearly than any claim.",
      },
      {
        text: "'왜 지금까지 이런 서비스가 없었지?'를 파는 과정에서 더 많이 배웠습니다. 없는 데는 이유가 있었고(법률 해석 리스크, 약관 텍스트 접근성), 그 이유를 하나씩 반박할 수 있을 때에만 블루오션이라 부를 수 있었습니다.",
        textEn:
          "Digging into 'why doesn't this exist yet?' taught us more. There were reasons (legal-interpretation risk, access to terms text) — and only after rebutting each one could we call it a blue ocean.",
      },
    ],
  },

  {
    id: "neurosight",
    title: "마취 시술 보조 서비스 — NeuroSight",
    titleEn: "Anesthesia Guidance System — NeuroSight",
    images: [
      "/projects/neurosight/01.png",
      "/projects/neurosight/02.png",
      "/projects/neurosight/03.png",
      "/projects/neurosight/04.png",
      "/projects/neurosight/05.png",
      "/projects/neurosight/06.png",
      "/projects/neurosight/07.png",
    ],
    background: [
      {
        text: "마취는 사고가 곧 생명과 직결되는 고위험 의료행위인데, 사고 상당수가 마취 비전문의 시술 환경에서 발생합니다. 전문 마취과 의사의 부족과 높은 이탈률이 근본 원인입니다.",
        textEn:
          "Anesthesia is a high-risk procedure where incidents directly threaten lives — and a large share of incidents occur in settings without anesthesia specialists. A chronic shortage and high turnover of anesthesiologists is the structural root cause.",
        subItems: [
          {
            text: "기존 B-mode 초음파는 주관적 해석에 의존하며 정량적 조직 분석과 마취제 확산 범위 실시간 파악이 불가합니다.",
            textEn:
              "Existing B-mode ultrasound relies on subjective interpretation, with no quantitative tissue analysis or real-time anesthetic diffusion tracking.",
          },
        ],
      },
      {
        text: "GRAFFITI 2025: AI Startup (KAIST ICISTS 주최) 해커톤으로, 6인 팀에서 비즈니스 아이디어 기획자 역할을 맡아 4일간 진행했습니다. 배럴아이의 정량적 초음파(QUS) 기술을 마취 분야에 적용하는 컨셉을 설계했습니다.",
        textEn:
          "GRAFFITI 2025: AI Startup (hosted by KAIST ICISTS) hackathon — served as business idea planner in a 6-person team over 4 days. Designed the concept of applying Barrel Eye's QUS technology to anesthesia.",
      },
    ],
    role: [
      {
        title: "시장 조사 및 문제 분석",
        titleEn: "Market Research & Problem Analysis",
        items: [
          {
            text: "마취 의료 사고 현황 및 비전문의 의존 문제의 원인을 분석했습니다. 글로벌 의료 AI 시장의 성장성을 조사하고 진입 기회를 도출했습니다.",
            textEn:
              "Analyzed anesthesia incident trends and the structural over-reliance on non-specialists. Researched the growth of the global medical AI market and identified entry opportunities.",
          },
          {
            text: "배럴아이 QUS 기술의 동향을 연구하고 마취 분야 적용 가능성을 검토하여 세계 최초 정량적 초음파 기반 마취 보조 시스템이라는 포지셔닝을 수립했습니다.",
            textEn:
              "Researched Barrel Eye's QUS technology trends and evaluated applicability to anesthesia, establishing positioning as the world's first QUS-based anesthesia guidance system.",
          },
        ],
      },
      {
        title: "비즈니스 모델 설계",
        titleEn: "Business Model Design",
        items: [
          {
            text: "B2B SaaS(병원 대상 구독) + OEM 파트너십(GE·Philips·Siemens 등 의료기기 제조사 대상 기술 라이선스) 하이브리드 수익 모델을 설계했습니다.",
            textEn:
              "Designed a hybrid revenue model: B2B SaaS (hospital subscriptions) + OEM partnership (technology licensing to medical device manufacturers such as GE, Philips, and Siemens).",
            subItems: [
              {
                text: "OEM 파트너십으로 FDA·CE 규제 리스크를 분산하는 시장 진입 전략을 수립했습니다. Phase 1(북미 3% 점유율) → Phase 2(OEM 글로벌 확대) → Phase 3(아시아·유럽).",
                textEn:
                  "Established a market entry strategy that distributes FDA/CE regulatory risk through OEM partnerships. Phase 1 (3% North American market share) → Phase 2 (global OEM expansion) → Phase 3 (Asia/Europe).",
              },
            ],
          },
        ],
      },
      {
        title: "솔루션 컨셉 설계 및 피칭",
        titleEn: "Solution Concept Design & Pitching",
        items: [
          {
            text: "CNN + PINN + Transformer 멀티모달 AI 아키텍처 활용 방안을 연구하고, 의료진 페르소나와 User Scenario를 작성했습니다. 해커톤 발표자료를 제작하고 아이디어 피칭을 직접 담당했습니다.",
            textEn:
              "Researched CNN + PINN + Transformer multimodal AI architecture use cases, defined medical personnel persona and user scenarios. Created pitch deck and personally delivered the idea pitch.",
          },
        ],
      },
    ],
    results: [
      {
        text: "4일 안에 의료 AI 기술·규제·시장을 학습하고, FDA/CE 규제를 수익원으로 뒤집은 OEM 하이브리드 사업화 전략까지 제안했습니다. (GRAFFITI 2025 AI Startup, KAIST ICISTS 주최)",
        textEn:
          "In 4 days, learned medical AI technology, regulation, and market dynamics, and proposed an OEM hybrid commercialization strategy that turned FDA/CE regulation into a revenue source. (GRAFFITI 2025 AI Startup, hosted by KAIST ICISTS)",
      },
    ],
    lessons: [
      {
        text: "의료 AI는 4일짜리 해커톤으로 기술을 이해할 수 있는 분야가 아니었습니다. 대신 '마취 사고'라는 문제에서 출발해 누가, 언제, 왜 위험해지는지를 파고들었고, 기술(QUS)은 그 답에 맞춰 배치했습니다. 문제가 선명하면 기술 이해가 얕아도 기획이 섭니다.",
        textEn:
          "Four days isn't enough to understand medical AI tech. So we started from the problem — who gets hurt, when, and why — and placed the technology (QUS) around that answer. A sharp problem carries a plan even when tech depth is shallow.",
      },
      {
        text: "FDA/CE 규제를 리스크 목록에 넣는 대신 OEM 파트너십의 수익원으로 뒤집어 제시했을 때 반응이 달라졌습니다. 규제는 피하는 게 아니라 설계에 넣는 것이었습니다.",
        textEn:
          "The response changed when we flipped FDA/CE regulation from a risk item into an OEM revenue source. Regulation isn't something to dodge — it's something to design in.",
      },
    ],
  },

  {
    id: "artliving",
    title: "AR 기반 가구 추천 플랫폼 — ARtliving",
    titleEn: "AR-Powered Furniture Recommendation Platform — ARtliving",
    background: [
      {
        text: "가구 구매 시 '실제 내 공간에 놓으면 어떻게 보일까'를 미리 확인할 수 없다는 불편함이 반품률 증가와 구매 결정 지연의 주요 원인임을 확인했습니다.",
        textEn:
          "Confirmed that the inability to preview 'how will this look in my actual space' before buying furniture is a primary cause of high return rates and delayed purchase decisions.",
        subItems: [
          {
            text: "2025학년도 1학기 HUFS H-UP 진로탐색학점제 참가 프로젝트입니다.",
            textEn:
              "A 2025 Spring HUFS H-UP Career Exploration Program project.",
          },
        ],
      },
    ],
    role: [
      {
        title: "서비스 기획",
        titleEn: "Product Planning",
        items: [
          {
            text: "AR 기술을 활용해 사용자가 스마트폰 카메라로 실제 공간을 비추면 가상 가구가 실시간으로 배치되는 서비스 컨셉을 기획했습니다.",
            textEn:
              "Planned a service concept where users point their smartphone camera at their actual space and virtual furniture is placed in real time using AR technology.",
            subItems: [
              {
                text: "사용자의 인테리어 취향, 공간 크기, 예산 데이터를 결합한 AI 맞춤 가구 추천 알고리즘 기획을 설계했습니다.",
                textEn:
                  "Designed an AI personalized furniture recommendation algorithm that combines user interior preferences, space dimensions, and budget data.",
              },
              {
                text: "B2C 직접 판매 → 가구 브랜드 B2B 파트너십으로 확장하는 비즈니스 모델을 수립했습니다.",
                textEn:
                  "Established a business model expanding from B2C direct sales to B2B furniture brand partnerships.",
              },
            ],
          },
        ],
      },
    ],
    results: [
      {
        text: "2025 HUFS H-UP 진로탐색학점제에서 진리상(최우수상)을 수상했습니다. AR과 AI 추천의 결합이 실질적인 소비자 문제를 해결한다는 점을 심사위원에게 인정받았습니다.",
        textEn:
          "Won the Grand Prize (Truth Award) at the 2025 HUFS H-UP Career Exploration Program. Judges recognized that the combination of AR and AI recommendation addresses a real consumer problem.",
      },
    ],
    lessons: [
      {
        text: "AR이라는 기술이 먼저 있었고 문제를 나중에 찾은 프로젝트라 초반에 방향이 계속 흔들렸습니다. '구매 전에 내 방에 놓아보고 싶다'는 문제 문장을 확정한 뒤에야 기획이 섰습니다. 기술 주도로 시작하면 문제 정의로 되돌아오는 비용이 큽니다.",
        textEn:
          "The tech (AR) came first and the problem later, so the direction kept wobbling early on. Only after fixing the problem statement — 'I want to place it in my room before buying' — did the plan stand. Starting tech-first makes the trip back to problem definition expensive.",
      },
    ],
  },

  {
    id: "huriup",
    title: "웹캠 기반 자세 교정 서비스 — 허리UP!",
    titleEn: "Webcam-Based Posture Correction Service — HuriUP!",
    images: [
      "/projects/huriup/01.png",
      "/projects/huriup/02.png",
      "/projects/huriup/03.png",
      "/projects/huriup/04.png",
      "/projects/huriup/05.png",
    ],
    background: [
      {
        text: "건강보험심사평가원 통계를 통해 20~40대 젊은 층의 허리디스크 및 척추 질환 환자가 급증하고 있음을 확인했습니다. 재택·원격근무 확산으로 장시간 앉아 있는 시간이 늘어나 문제가 심화되고 있었습니다.",
        textEn:
          "HIRA statistics confirmed a surge in back disc and spinal disease patients among people in their 20s–40s, worsened by expanded remote work increasing sedentary time.",
        subItems: [
          {
            text: "도수 치료(10~50만원/회), 수술 등 기존 해결책은 비용이 높고 사후 치료 중심이었습니다. 일상에서 지속적으로 자세를 교정하는 저비용 IT 솔루션이 없다는 점에 주목했습니다.",
            textEn:
              "Existing solutions like manual therapy (₩300,000–500,000/session) and surgery were expensive and reactive. Identified the absence of a low-cost IT solution for continuous daily posture correction.",
          },
        ],
      },
      {
        text: "멋쟁이사자처럼 12기 아이디어톤 프로젝트로, 6인 팀의 PM을 맡아 문제 정의부터 비즈니스 모델 수립, 마케팅 전략, UI/UX 프로토타입까지 이끌었습니다. (2024.05.01 ~ 2024.05.16, 16일)",
        textEn:
          "A Likelion 12th cohort ideathon project — as PM of a 6-person team, I led problem definition, business model, marketing strategy, and the UI/UX prototype. (May 1–16, 2024, 16 days)",
      },
    ],
    role: [
      {
        title: "서비스 기획 및 PM",
        titleEn: "Product Planning & PM",
        items: [
          {
            text: "웹캠 기반 실시간 자세 분석·교정 서비스의 핵심 기능을 기획했습니다: 모션 캡처로 자세 분석, 올바른 자세 가이드라인 오버레이 비교, 잘못된 자세 시 경고 알림, 웨어러블 기기 연동.",
            textEn:
              "Planned core features for a webcam-based real-time posture analysis and correction service: motion capture posture analysis, correct posture guideline overlay comparison, bad posture warning alerts, and wearable device integration.",
          },
          {
            text: "IT 직장인(B2C) → 대기업 HR·복지 담당부서(B2B)로 확장하는 2단계 비즈니스 전략을 수립했습니다. 초기 B2C 크라우드펀딩으로 제품을 검증한 후 B2B 구독 계약으로 매출을 안정화하는 모델입니다.",
            textEn:
              "Established a 2-phase business strategy: IT workers (B2C) → corporate HR/welfare departments (B2B). A model to validate the product through B2C crowdfunding, then stabilize revenue through B2B subscription contracts.",
          },
        ],
      },
      {
        title: "마케팅 전략 기획",
        titleEn: "Marketing Strategy Planning",
        items: [
          {
            text: "체험 마케팅(오피스 투어·웨비나에서 직접 자세 분석 시연), 숏폼 콘텐츠(자세 교정 전후 비교 영상), 피트니스 센터 파트너십 등 단계별 인지도 확보 전략을 수립했습니다.",
            textEn:
              "Established a step-by-step awareness strategy: experiential marketing (posture analysis demos at office tours/webinars), short-form content (before/after posture correction videos), and fitness center partnerships.",
          },
        ],
      },
      {
        title: "UI/UX 설계 및 프로토타입",
        titleEn: "UI/UX Design & Prototype",
        items: [
          {
            text: "Figma로 실시간 웹캠 자세 분석 화면, 사용자 자세 리포트, 교정 히스토리 대시보드 등 핵심 화면의 UI/UX를 설계하고 인터랙티브 프로토타입을 제작했습니다.",
            textEn:
              "Designed UI/UX and built an interactive prototype in Figma for core screens: real-time webcam posture analysis, user posture report, and correction history dashboard.",
          },
        ],
      },
    ],
    results: [
      {
        text: "16일의 짧은 기간 안에 시장 조사, 비즈니스 모델, 마케팅 전략, UI/UX 프로토타입을 완성하여 멋쟁이사자처럼 12기 아이디어톤에 참가했습니다.",
        textEn:
          "Completed market research, business model, marketing strategy, and UI/UX prototype within 16 days and participated in the Likelion 12th cohort Ideathon.",
      },
    ],
    lessons: [
      {
        text: "'젊은 층 허리디스크 급증'이라는 심평원 통계로 문제의 심각성을 먼저 보여준 뒤 아이디어를 소개했습니다. 통계를 앞에 두면 아이디어가 해결해야 할 문제로 읽힌다고 판단했습니다.",
        textEn:
          "We opened with HIRA statistics on spinal disc cases surging among young people, then introduced the idea. I judged that leading with the statistic makes the idea read as the answer to a real problem.",
      },
      {
        text: "16일 안에 시장조사부터 프로토타입까지 가려면 무엇을 버릴지가 전부였습니다. 6인 팀에서 우선순위를 정하고 설득하는 일 — PM 역할의 실체를 처음 체감한 프로젝트입니다.",
        textEn:
          "Getting from market research to prototype in 16 days was all about what to drop. Setting priorities and persuading a six-person team — my first taste of what PM work actually is.",
      },
    ],
  },
];
