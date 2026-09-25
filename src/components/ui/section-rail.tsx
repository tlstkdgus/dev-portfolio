"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

// 화면 오른쪽에 고정된 섹션 진행 표시. 긴 한 페이지에서 '지금 어디쯤인지'를 보여준다.
// 번호는 순서 자체가 정보라 둔다(craft-floor 예외). 여백이 64px인 xl(1280px+)에서만 보인다.
const ids = ["hero", ...siteConfig.nav] as const;

export function SectionRail() {
  const t = useTranslations("nav");
  const [active, setActive] = useState<string>("hero");
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // 레일 아래 배경이 검정·파랑이면 글자를 밝게. 섹션 안에 검은 표지·파란 성과 화면이 섞여 있어
  // 섹션 단위가 아니라 실제 레일 위치의 요소로 판단한다.
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      // 레일(right-3, 폭 ~46px) 바깥인 화면 오른쪽 끝 6px 지점을 본다. 레일 자체를 짚으면 .bg-ink를 못 찾는다
      const el = document.elementFromPoint(window.innerWidth - 6, window.innerHeight / 2);
      setOnDark(Boolean(el?.closest(".bg-ink, .bg-accent-surface")));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <nav
      aria-label={t("rail_label")}
      className={cn(
        "pointer-events-none fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 xl:block",
        onDark ? "text-ink-foreground" : "text-foreground"
      )}
    >
      <ol className="flex flex-col items-end gap-3">
        {ids.map((id, i) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "hit pointer-events-auto flex items-center gap-2 text-[12px] font-semibold tracking-[0.04em] transition-opacity",
                  isActive ? "opacity-100" : "opacity-40 hover:opacity-80"
                )}
              >
                {/* 섹션 이름은 화면에 내지 않는다: 이름까지 넣으면 레일 폭이 ~100px라 오른쪽 여백(64px)을 넘어 본문을 덮었다 */}
                <span className="sr-only">{t(id)}</span>
                <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span
                  aria-hidden="true"
                  className={cn("block h-px bg-current transition-all", isActive ? "w-6" : "w-3")}
                />
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
