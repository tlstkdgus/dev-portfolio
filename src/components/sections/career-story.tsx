"use client";

import { useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { m } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { fmtPeriod, workEntries, workHref } from "@/lib/work";
import { MetaRow } from "@/components/ui/meta-row";

// /career는 전체 케이스 스터디 목록. 본문은 프로젝트마다 /work/<id>로 옮겼다 (2026-09-23).
// 이력서·지원서에 적힌 옛 링크(/career#section-<id>)는 해당 프로젝트 페이지로 보낸다.
export function CareerStoryContent() {
  const t = useTranslations("career_story");
  const tm = useTranslations("meta");
  const locale = useLocale();
  const isKo = locale === "ko";
  const router = useRouter();

  useEffect(() => {
    const id = window.location.hash.match(/^#section-(.+)$/)?.[1];
    if (id && workEntries.some((w) => w.id === id)) router.replace(workHref(locale, id));
  }, [locale, router]);

  return (
    <div className="min-h-screen bg-background">
      {/* 표지 */}
      <div className="gutter flex min-h-[60svh] flex-col bg-ink pb-10 pt-20 text-ink-foreground md:pb-14">
        <MetaRow items={[tm("deck"), tm("role")]} className="text-ink-muted" />
        <div className="flex flex-1 flex-col justify-end pt-16">
          <Link
            href={`/${locale}/#projects`}
            className="hit meta mb-6 inline-flex min-h-11 w-fit items-center gap-1.5 text-ink-muted transition-colors hover:text-ink-foreground"
          >
            <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
            {t("back")}
          </Link>
          <m.h1
            initial={{ y: 24 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="wordmark -ml-[0.04em]"
            style={{ fontSize: "clamp(3.25rem, 14vw, 13rem)" }}
          >
            {t("title")}
          </m.h1>
          <p className="mt-6 max-w-md text-[16px] leading-[1.7] text-ink-muted">{t("subtitle")}</p>
        </div>
      </div>

      {/* 목록 */}
      <div className="gutter py-16 md:py-24">
        <ol className="border-t border-foreground">
          {workEntries.map((w, i) => {
            const period = w.selected
              ? isKo
                ? w.selected.period.ko
                : w.selected.period.en
              : fmtPeriod(isKo ? w.project?.period : w.project?.periodEn);
            return (
              <li key={w.id}>
                <Link
                  href={workHref(locale, w.id)}
                  className="group grid grid-cols-[36px_minmax(0,1fr)_20px] items-center gap-x-4 border-b border-border py-6 transition-colors hover:text-accent md:grid-cols-[56px_minmax(0,1fr)_220px_24px] md:py-7"
                >
                  <span className="meta self-baseline pt-2 text-muted-foreground group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[22px] font-bold tracking-[-0.02em] md:text-[28px]">
                      {isKo ? w.name.ko : w.name.en}
                    </span>
                    <span className="mt-1 block text-[15px] leading-snug text-muted-foreground md:text-[16px]">
                      {isKo ? w.desc.ko : w.desc.en}
                    </span>
                    <span className="meta mt-2 block text-muted-foreground md:hidden">{period}</span>
                  </span>
                  <span className="meta hidden whitespace-nowrap text-muted-foreground md:block">{period}</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent"
                  />
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
