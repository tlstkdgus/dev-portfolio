"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

// reducedMotion="user": OS의 '동작 줄이기' 설정을 켠 사람에게는 이동·크기 애니메이션을 끈다.
export function LazyMotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
    </MotionConfig>
  );
}
