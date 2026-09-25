"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLocale } from "next-intl";
import { scrollBehavior } from "@/lib/scroll";

// 오른쪽 아래 떠 있는 버튼이 본문 오른쪽 끝 글자(카드 설명, 푸터 'Next.js · Vercel')를 가렸다 (2026-09-25 polish).
// - 1280px 이상: 좌우 여백이 64px이라 버튼을 여백 안(right-3)에 두면 본문과 겹치지 않는다. 항상 보인다.
// - 그보다 좁으면 여백이 16~40px뿐이라 어디에 두어도 글자를 덮는다. 위로 스크롤할 때만 꺼내
//   '맨 위로 가려는 순간'에만 보이게 한다.
export function ScrollToTop() {
  const isKo = useLocale() === "ko";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1280px)");
    let lastY = window.scrollY;
    let up = false;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < lastY - 8) up = true;
      else if (y > lastY + 8) up = false;
      if (Math.abs(y - lastY) > 8) lastY = y;
      setVisible(y > 400 && (wide.matches || up));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <m.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: scrollBehavior() })}
          className="scroll-to-top fixed bottom-4 right-4 z-50 border border-background bg-foreground p-3 text-background transition-colors hover:bg-accent-surface hover:text-accent-foreground xl:bottom-5 xl:right-3"
          aria-label={isKo ? "맨 위로" : "Back to top"}
        >
          <ArrowUp aria-hidden="true" className="h-5 w-5" />
        </m.button>
      )}
    </AnimatePresence>
  );
}
