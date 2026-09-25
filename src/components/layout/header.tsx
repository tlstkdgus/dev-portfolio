"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { MobileDrawer } from "@/components/layout/mobile-drawer";
import { LogoMark } from "@/components/ui/logo-mark";
import { scrollBehavior } from "@/lib/scroll";

const navKeys = siteConfig.nav;

// 버튼 공통 — 터치 영역 44px 확보
const iconBtn =
  "inline-flex h-11 min-w-11 items-center justify-center gap-1.5 px-2 transition-colors cursor-pointer";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const isKo = locale === "ko";
  // 시스템 설정을 따르는 경우도 있어 실제 적용된 테마(resolvedTheme) 기준으로 판단한다
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const isSubPage = pathname.includes("/career") || pathname.includes("/work/");
  // /career 표지는 검은 화면 — 스크롤 전에는 헤더 글자를 밝게 해야 이름·언어 전환이 보인다.
  // /work/<id>는 흰 바탕에서 시작하므로 해당 없음
  const overInk = pathname.includes("/career") && !scrolled;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 현재 보고 있는 섹션을 내비에 표시 (aria-current)
  useEffect(() => {
    if (isSubPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navKeys.forEach((key) => {
      const el = document.getElementById(key);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isSubPage]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const switchLocale = () => {
    const next = isKo ? "en" : "ko";
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/"));
  };

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    if (isSubPage) {
      router.push(`/${locale}#${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior() });
  };

  const name = isKo ? "신상현" : "Sanghyeon Shin";
  const muted = overInk ? "text-ink-muted hover:text-ink-foreground" : "text-muted-foreground hover:text-foreground";

  return (
    <>
      <a
        href="#main"
        className="sr-only bg-foreground px-4 py-3 text-[15px] font-semibold text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-2 focus:z-60 focus:px-4 focus:py-3"
      >
        {isKo ? "본문으로 건너뛰기" : "Skip to main content"}
      </a>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300",
          scrolled ? "bg-background border-border" : "bg-transparent border-transparent"
        )}
      >
        <div className="gutter">
          <div className="flex h-14 items-center justify-between">
            <Link
              href={isSubPage ? `/${locale}` : "#top"}
              onClick={(e) => {
                if (!isSubPage) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: scrollBehavior() });
                }
              }}
              className="-ml-1 inline-flex h-11 items-center gap-2 px-1"
            >
              <LogoMark className={cn("h-[18px] w-auto shrink-0", overInk ? "text-ink-foreground" : "text-foreground")} />
              <span
                className={cn(
                  "text-[16px] font-extrabold tracking-[-0.03em]",
                  overInk ? "text-ink-foreground" : "text-foreground"
                )}
              >
                {name}
              </span>
              <span className="sr-only">{isSubPage ? (isKo ? " — 메인으로" : " — home") : isKo ? " — 맨 위로" : " — back to top"}</span>
            </Link>

            {!isSubPage && (
              <nav aria-label={isKo ? "섹션" : "Sections"} className="hidden md:flex items-center">
                {navKeys.map((key) => (
                  <a
                    key={key}
                    href={`#${key}`}
                    aria-current={active === key ? "location" : undefined}
                    className={cn(
                      "inline-flex h-11 items-center px-3 text-[14px] font-medium transition-colors",
                      active === key
                        ? "text-foreground underline decoration-2 underline-offset-8"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {t(key)}
                  </a>
                ))}
              </nav>
            )}

            <div className="flex items-center">
              <button
                onClick={switchLocale}
                lang={isKo ? "en" : "ko"}
                aria-label={isKo ? "EN — View in English" : "KO — 한국어로 보기"}
                className={cn(iconBtn, muted)}
              >
                <Globe aria-hidden="true" className="h-4 w-4" />
                <span className={cn("text-[13px] font-bold uppercase tracking-wide", overInk ? "text-ink-foreground" : "text-foreground")}>
                  {isKo ? "EN" : "KO"}
                </span>
              </button>

              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                aria-label={isKo ? "다크 모드 전환" : "Toggle dark mode"}
                aria-pressed={mounted ? isDark : undefined}
                className={cn(iconBtn, muted)}
              >
                {mounted && isDark ? (
                  <Sun aria-hidden="true" className="h-4 w-4" />
                ) : (
                  <Moon aria-hidden="true" className="h-4 w-4" />
                )}
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={isKo ? "메뉴" : "Menu"}
                aria-expanded={mobileOpen}
                className={cn(iconBtn, muted, "md:hidden")}
              >
                {mobileOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <MobileDrawer navKeys={navKeys} onClose={() => setMobileOpen(false)} onNavigate={scrollTo} />
        )}
      </AnimatePresence>
    </>
  );
}
