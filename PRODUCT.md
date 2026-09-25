# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary: PM/PO hiring managers and interviewers at IT companies.** They arrive from a link in a résumé or application, or from a LinkedIn or blog profile, and skim for one to three minutes while screening documents. They judge how the candidate defines problems, which decisions the candidate made, and what changed as a result.
- They read Korean and English equally. The English pages are not a secondary translation and must carry the same content and weight as the Korean ones.
- They often open the link on a phone, from an email or messenger.

## Product Purpose

The personal portfolio of 신상현 (Sanghyeon Shin), an IT planner who defines problems with data, then builds and ships. Success means a reviewer understands in the first screen who he is and what his main experience is, and can reach evidence (case studies, repos, live services) for any claim within a click.

## Positioning

A service planner who finds the answer in what users actually do, then builds and ships. The proof is that every answer came from observed behavior, not assumption: he analyzed all 390K records rather than a sample, rebuilt FlowPay's problem from scratch when interviews broke the first hypothesis, read every one of 229 hackathon questions and patched the FAQ daily, and keeps revising RumiClean after deploy. Building the tools himself (submission checker, finals console, FAQ bot) is how the planning reaches users, not the headline. Every claim is backed by a verifiable number or a public artifact.

## Operating Context

- Main page: a one-page scroll. Each project has its own page `/work/<id>` (2026-09-23); the main page shows the four selected projects only as a short list (one-line summary, one-line decision, key impact, role, "자세히 보기 →") because the full slide sequences made the page ~30 screens long. `/career` is the list of all projects; legacy `/career#section-<id>` links redirect to `/work/<id>`. Flow diagrams are HTML (career-detail `diagrams`), never PNG, so the copy stays editable and sharp; slide images come from the original PDFs rendered at 2400px. The Korean page is `/ko` and the English page is `/en`.
- Reviewers usually compare it against the résumé PDF, so the facts must match PORTFOLIO.md, the single source for all application documents.
- Deployed on Vercel. Link previews (OG images) appear when the URL is shared.

## Capabilities and Constraints

- Next.js 16 (App Router), TypeScript, Tailwind CSS v4, next-intl (ko/en), next-themes (light/dark), Framer Motion.
- Content lives in `src/data/*.ts` and `src/messages/{ko,en}.json`. Components only render it. When the data changes, PORTFOLIO.md is updated with it.
- Narrative rules (directed 2026-09-13, binding):
  - Identity is the service planner; the LIKELION Community Manager internship (2026.04.27–08.31) is the most recent and strongest evidence: the first Experience entry and selected project #1 (the 14th hackathon). Since HANDOFF §G (2026-09-24) the first-screen paragraph is an about paragraph with no LIKELION affiliation or cohort (it lives in Experience); the first-screen numbers carry the hackathon (2,000+) and the community platform (80 universities).
  - CleanB (RumiClean) is a **project only**. It never appears under experience, and it is ordered after FlowPay.
  - The hero and introduction never describe a current "live-service PM" role.
  - Selected work order (HANDOFF §G-5, 2026-09-24): 14th hackathon → FlowPay → Y:Wave → CleanB. The internal dev course moved to Other projects (its page stays): for an IT planning role only two of the four selected cases were service-planning cases. Other projects show six (SonGeul, WelcomeKit, internal dev course, dotori, NeuroSight, TCP) and fold the other eight under '그 외 프로젝트 8개'. Subtitles never start with 'AI 기반' (tags keep AI).
  - Role label (header, first screen, footer): '서비스 기획 · PM' / 'Service Planning · PM' (§G-1); the old 'PM · PO / FE 개발 · AI 도구 제작' blurred which role he is applying for. Development skill shows in How I work 02 and the What I do chips.
- Role boundaries: judging policy, participant guide, platform specs, warm-up sessions, ideathon scoring sheet, and survey analysis are "co-" (공동). The three ops tools and the internal course are "built/solo" (직접/단독). SonGeul is "led a 6-person team as PM", never "solo" or "personal project". Never write "총괄" or "did every role".
- The CleanB repository is private and must never be linked. Link only to rumiclean.com.

## Brand Commitments

- Name: 신상현 / Sanghyeon Shin. Positioning line (2026-09-21, v6): 「사용자의 실제 행동에서 답을 찾아, 직접 만들어 배포하는 서비스 기획자」 / "A service planner who finds the answer in what users actually do, then builds and ships." The v6 proof line ("~가 아니라 ~였다" triplet) was retired by v9 (2026-09-22) because it violates the v9 voice rules below; First screen (HANDOFF §G-1, 2026-09-24; replaces the option-B cover): no 'Portfolio' wordmark cover. The top of the page is a small meta row (name · 서비스 기획 · PM · email), the color photo (never grayscale; a grayscale oval on black read as a memorial portrait), the positioning sentence as h1, one about paragraph (found answers → what he learned → where he is heading: accountant interviews found the handwritten slip after payment; a full merchant-data analysis showed users needed a recommendation list more than a map; a plan convinces through what was decided about the user and on what evidence), and four numbers: 2,000+ hackathon participants · 80 universities (community platform planned and run; https://likelion.community/, developed by AXP — never "built it") · 15+ services planned & shipped · 11 awards. 80.8%, 2.2 s, 5 teams and 2,500+ moved out of the first screen (the numbers section and cases carry them). Acceptance: at 1440×900 and 390×844 the name, headline and the first row of numbers are visible without scrolling; on phones the numbers sit above the paragraph. There is no separate "안녕하세요" section; introducing himself twice read as the page starting over. Right under the introduction (top of the #about section) a "Profile." block lists education, training (SSAFY), certifications (SQLD, ADsP, OPIc IH), and military service like a résumé header — he decided basic facts should always be visible (2026-09-24). Certifications are not listed under Awards. Logo: an SH monogram (DM Serif Display, OFL) in which the S stands in for the H's left stem and the crossbar grows from the S's spine; header mark, favicon (white on the accent blue), and the OG card (white). Markers that must survive any edit: 실제 행동 / 직접 만들어 배포 / 기획부터 본선 운영까지. Planning documents remain a strength; never write "기획서 대신".
- Hackathon is always described as planned-and-run end to end (기획부터 본선 운영까지); never lead with 'co-designed judging policy', and never write '참가자 경험을 설계'. Co-done items (policy, specs, warm-ups) keep '공동/팀과 함께'; the 3 tools and on-site ops are '직접'.
- FlowPay is described by what the product did (8 → 3 steps, 5th of 102), not by the pivot story (at most a half-sentence in How I work). RumiClean is a client project (외주), never '사이드 프로젝트'.
- Voice (v9, from his own cover letters): complete 합니다체 sentences that run to the end; no fragment endings, no "~게." Give the reason for a judgment ("~라고 판단했습니다", "~한 결과 ~였습니다"), never "~라고 생각합니다". Write results as sentences. Banned: aphorisms ("설득은 문서보다 화면이 합니다"), quote-mark contrasts, poetic line-break headlines, the "~가 아니라 ~였다" pattern, "구조", "총괄". Headlines are complete sentences even across two lines. No filler openers ("저는", "그래서", "그 결과", "만드는 데서 끝내지 않고"); each sentence picks up the previous one (problem → action → result). Never admit a mistake, outage, or wrong assumption ("배포 후 깨진 화면", "틀린 전제", "놓쳤다"); the 'before' state he improved (3 h/day by hand, ~2 days of manual checks, Excel→PPT) is evidence and stays. Limits: headline ≤ 2 lines, How-I-work description 2 sentences, case body 3 sentences. Structure every project as problem → action → result. Case structure (FINAL 2026-09-22): each Selected work case shows only three things — who had what problem (1 sentence), what I changed (≤2 sentences), what changed as a result (2–3 before→after stats). No "what I did" list, scope chips, flow diagrams or quotations; tools are mentioned only as the means inside the action sentence. Stats hold improvement figures only, never counts or team sizes ("3종", "170+ PR", "3인 팀"). Links per case: one case study + one service/Behance link; repository links live on /career only. One fact appears once on the page: numbers used in the hero are not repeated in About, numbers used in a case are not repeated in experience bullets. Intern bullets run platform → inter-university hackathon spec → national hackathon → ideathon → training; the community platform (likelion.community) is the first bullet because it was a core duty. The ideathon is "기획부터 운영까지 참여", never "운영 참여". The 13th-cohort item is the WelcomeKit PWA (45 members, paper roll call → QR); "공식 홈페이지" is not used anywhere.
- Fixed facts: GPA 4.13/4.5; email a91945840@gmail.com; SSAFY 15th cohort "completed (2026.01–04)"; the service name is 루미클린 (RumiClean), never "RoomiClean"; Y:Wave was submitted to the LIKELION 13th national hackathon (2025.07–08); FlowPay interviewees were working accountants, not certified accountants.

## Evidence on Hand

- PORTFOLIO.md holds every fact with its figures and sources. Before→after figures (inquiries 3h+/day → 80.8% instant; 562-repo manual check ~2 days estimate → automated; Excel+PPT reveal → 2.2 s console) are his own statements from 2026-09-22; the 2-day figure is an estimate and must stay labeled as one.
- Main list cards (2026-09-24): each shows a one-line "what it is" summary (the headline alone did not say what the project was), a one-line decision ("판단", §G-5, so the reasoning on the project page shows on the home page), and key impact as before → after where a before state exists. Before and after use the same unit (3 h/day → 15 min/day, −92%); the ~2-day manual-check estimate is not used anywhere on the site because an estimate weakens every other number. Card thumbnails (2026-09-25) are designed covers, not cropped screenshots: project name, a short line and his role, with real screens in device mockups (structure borrowed from limdahyun.vercel.app; colors stay the site's black / gray / blue, never per-project brand colors). They carry text, so there is a Korean and an English file per project (public/projects/<id>/thumb-{ko,en}.jpg; Korean uses tight tracking). Sources in design/thumbnails/. Each thumbnail is also the first slide of its project carousel. Never use deck slides that show teammates' names (Y:Wave 01). The Vimeo loop was tried and removed (2026-09-24): the source video ends on a white frame. Big impact numbers in one row share one size, fitted to the longest value (src/lib/fit-stat.ts). Awards: one "representative award per project" (FlowPay, SonGeul, dotori), then the rest.
- Screenshots and slides are in `public/projects/<id>/` (slides re-rendered at 2400px from the original PDFs). Flow diagrams (hackathon funnel and verification pipeline, CleanB state flow, SonGeul transfer flow) are HTML in `career-detail.ts` `diagrams`.
- Public artifacts: GitHub repos (animal-league, likelion-dev-site, FlowPay, songeul, and others), live sites (likelion-dev-site.vercel.app, flowpay.vercel.app); rumiclean.com is deployed but Toss payments are not connected, so it has no real users, and the ANIMAL LEAGUE Behance case study published by LIKELION's Brand Design Lab, with him listed as a co-owner. Five photos and the 'Stage System' passage from that case are used on the hackathon slides with credit; the brand design is the Lab's work, his part is the finals stage/judging/ops console and the hackathon planning.
- Profile photo: `public/profile.jpg` (689×886 portrait; must not be cropped).
- **Do not fabricate:** CleanB has no real users or product metrics yet; never call it a live service with users. There are no testimonials, recommendations, or employer quotes. Do not invent market sizes or statistics without a source. Two awards (1st G-RISE startup competition, 7th College of Business × SPRINT) have no project mapped yet; do not attach one until he confirms.

## Product Principles

1. **Main story first.** A reviewer sees the internship and the hackathon work before anything else.
2. **Every number is verifiable.** If a claim has no source or artifact, it doesn't ship. Activities ("presented") are never framed as outcomes.
3. **Decisions over deliverables.** Show why he chose something and what he gave up, not only what he made.
4. **Evidence within a click.** Every representative claim links to a case study, repo, live site, or public case.
5. **Two languages, one weight.** Korean and English carry the same content, density, and polish.

## Accessibility & Inclusion

- It must work on phone width (390px) without horizontal scroll, since many reviewers open the link on mobile.
- Korean body text uses `word-break: keep-all`. The site supports light and dark themes and respects `prefers-reduced-motion`.
