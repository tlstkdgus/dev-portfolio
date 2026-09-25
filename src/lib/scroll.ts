// OS "동작 줄이기"를 켠 사람에게는 부드러운 스크롤 대신 바로 이동한다.
// CSS의 scroll-behavior는 JS scrollTo/scrollIntoView의 behavior 옵션을 덮지 못한다.
export function scrollBehavior(): ScrollBehavior {
  if (typeof window === "undefined") return "auto";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}
