> [English version](README.en.md)

# 신상현 개발자 포트폴리오

**사용자가 실제로 쓰는 화면을 만들고, 배포한 뒤에도 직접 운영하며 고치는 프론트엔드 개발자 신상현의 포트폴리오입니다.**

기획자용 포트폴리오([tlstkdgus/Portfolio](https://github.com/tlstkdgus/Portfolio))와 같은 디자인·같은 사실을 쓰고, 콘텐츠를 개발자 채용 기준으로 다시 짰습니다.

- 📧 **Email**: [a91945840@gmail.com](mailto:a91945840@gmail.com)
- 🔗 **GitHub**: [https://github.com/tlstkdgus](https://github.com/tlstkdgus)

---

## 기획자 포트폴리오와 다른 점

| | 기획자 포트폴리오 | 개발자 포트폴리오 (이 저장소) |
|---|---|---|
| 역할 라벨 | 서비스 기획 · PM | 프론트엔드 개발자 |
| 첫 화면 숫자 | 해커톤 참가자 · 대학 수 · 서비스 수 · 수상 | 서비스 수 · 운영 도구 3종 · 170+ PR · 2.2초 |
| What I do | 기획·리서치 칩 | 프론트엔드 / 백엔드·데이터 / 인프라·도구로 나눈 스택 |
| 섹션 순서 | 소개 → 일하는 방식 → 숫자 → 경력 → 대표 프로젝트 | 소개 → 스택 → **대표 프로젝트** → 도구가 바꾼 것 → 일하는 방식 → 경력 |
| 대표 프로젝트 | 해커톤 기획 → FlowPay → Y:Wave → CleanB | 해커톤 운영 도구 → CleanB → FlowPay → Y:Wave |
| 프로젝트 카드 | 판단 · Key impact · 역할 | + 스택 칩 · GitHub · 서비스 링크 |
| 상세 페이지 | 배경 · 실행 · 결과 · 배운 점 | + 스택, **기술적 도전(문제 → 해결 → 결과)**, 근거 코드 경로 링크, 아키텍처 흐름도 |

기술 내용은 공개 저장소 코드에서 확인한 것만 씁니다(예: animal-league의 `lib/state.ts` 낙관적 잠금, `app/api/vote/route.ts` 서버 검증). 비공개 저장소(CleanB)는 [PORTFOLIO.md](PORTFOLIO.md) 기록만 씁니다.

---

## 기술 스택

| 기술 | 용도 |
|---|---|
| [Next.js 16](https://nextjs.org/) | App Router 기반 React 프레임워크 |
| [TypeScript](https://www.typescriptlang.org/) | 타입 안전성 |
| [Tailwind CSS v4](https://tailwindcss.com/) | 유틸리티 스타일링 |
| [next-intl](https://next-intl-docs.vercel.app/) | 한국어/영어 다국어 지원 |
| [Framer Motion](https://www.framer.com/motion/) | 애니메이션 |

## 콘텐츠 위치

- `src/messages/{ko,en}.json` — 첫 화면, 스택, 일하는 방식, 숫자 섹션 문구
- `src/data/selected.ts` — 대표 프로젝트 4개 (스택 · 저장소 링크 포함)
- `src/data/career-detail.ts` — 프로젝트 상세 본문과 `troubles`(기술적 도전)
- `design/thumbnails/` — 메인 카드 썸네일 원본 HTML

## 로컬 실행

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인하세요. 배포 주소는 `NEXT_PUBLIC_BASE_URL` 환경 변수로 지정합니다(기본값 `https://dev-portfolio-phi-eight.vercel.app`).

---

## 라이선스

[MIT](LICENSE)
