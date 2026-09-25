// 큰 성과 숫자(.stat)가 칸을 넘지 않게 글자 수로 크기를 정한다.
// .stat은 칸 폭의 30%(30cqi)까지 커지는데, "상태 5단계"처럼 한글이 섞인 값은 칸을 넘어 옆 칸을 덮었다 (2026-09-24).
// 글자 폭 근사: 한글 1em, 숫자·영문 0.62em, 공백·구두점 0.3em. 칸 폭의 95% 안에 들어가는 크기로 제한한다.
// 한 줄에 놓인 숫자들은 크기를 하나로 맞춘다(가장 긴 값 기준). 칸마다 크기가 다르면 기준선이 어긋나 보였다.
//
// 값은 두 줄까지 접을 수 있다(§G 이후, 2026-09-25). '하루 15분' 같은 숫자 대신 '투표 즉시 스크린 반영',
// 'Recommended by place & category' 같은 문구 값이 들어오면서, 한 줄에 맞추면 줄 전체가 38px 안팎으로
// 작아졌다(이전 70px대). 한 줄 크기가 칸 폭의 14%(약 58px) 이상이면 예전처럼 한 줄로 두고, 그보다 작아질 때만
// 각 값을 두 줄로 가장 고르게 나눈 폭으로 크기를 정한다. 두 줄일 때 상한은 20cqi — 30까지 열면 FlowPay의
// '자동 생성'·'102팀 중 5위'까지 두 줄로 쪼개지며 칸을 꽉 채웠다.
export function fitStat(texts: string | string[]): React.CSSProperties {
  const list = Array.isArray(texts) ? texts : [texts];
  const size = (em: number, cap: number) => Math.min(cap, Math.floor((95 / Math.max(em, 1)) * 10) / 10);
  const oneLine = size(Math.max(...list.map(width)), 30);
  if (oneLine >= 14) return { fontSize: `min(clamp(3rem, 9vw, 8.5rem), ${oneLine}cqi)` };
  const cqi = size(Math.max(...list.map(twoLineWidth)), 20);
  return {
    fontSize: `min(clamp(3rem, 9vw, 8.5rem), ${cqi}cqi)`,
    // globals.css의 .stat은 한 줄 고정(nowrap)이라 인라인으로 푼다. 두 줄일 때 한글 받침이 겹치지 않게 줄 간격도 조금 연다
    whiteSpace: "normal",
    textWrap: "balance",
    lineHeight: 1.05,
  };
}

/** 단어 경계에서 두 줄로 나눌 때 가장 긴 줄의 폭(최선의 분할). 단어 하나짜리는 그 폭 그대로 */
function twoLineWidth(text: string) {
  const words = text.split(/\s+/).filter(Boolean);
  let best = width(text);
  for (let i = 1; i < words.length; i++) {
    best = Math.min(best, Math.max(width(words.slice(0, i).join(" ")), width(words.slice(i).join(" "))));
  }
  return best;
}

function width(text: string) {
  let em = 0;
  for (const ch of text) {
    if (/[가-힣]/.test(ch)) em += 1;
    else if (/[\s.,·:→/+–-]/.test(ch)) em += 0.32;
    else em += 0.62;
  }
  return em;
}
