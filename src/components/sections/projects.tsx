"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { projects, otherProjectsShown, otherProjectsFolded, type Project } from "@/data/projects";
import { fmtPeriod, workHref } from "@/lib/work";

const byId = (ids: string[]) =>
  ids.map((id) => projects.find((p) => p.caseId === id)).filter((p): p is Project => Boolean(p));
const shown = byId(otherProjectsShown);
const folded = byId(otherProjectsFolded);

// 대표 4개 외의 작업. 앞 6개만 펼치고 나머지는 접는다 (§G-6, 2026-09-24).
// 접기는 <details>라 JS 없이도 열리고, 키보드·스크린리더가 펼침 상태를 읽는다.
export function Projects() {
  const t = useTranslations("projects");

  return (
    <section id="more-projects" className="gutter py-24 md:py-36">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="display">{t("heading")}</h2>
          <p className="mt-5 max-w-sm text-[16px] leading-[1.7] text-muted-foreground">{t("sub")}</p>
        </div>

        <div>
          <ol className="border-t border-foreground">
            {shown.map((p) => (
              <Row key={p.title} p={p} />
            ))}
          </ol>

          {folded.length > 0 && (
            <details className="group">
              <summary className="flex min-h-14 cursor-pointer border-b border-border list-none items-center justify-between gap-4 py-4 text-[16px] font-semibold transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                {t("more_toggle", { n: folded.length })}
                <ChevronDown aria-hidden="true" className="h-5 w-5 transition-transform group-open:rotate-180 motion-reduce:transition-none" />
              </summary>
              <ol>
                {folded.map((p) => (
                  <Row key={p.title} p={p} />
                ))}
              </ol>
            </details>
          )}
        </div>
      </div>
    </section>
  );
}

function Row({ p }: { p: Project }) {
  const t = useTranslations("projects");
  const locale = useLocale();
  const isKo = locale === "ko";
  const row = (
    <>
      <span className="meta col-span-2 pt-1.5 text-muted-foreground sm:col-span-1">
        {fmtPeriod(isKo ? p.period : p.periodEn)}
      </span>
      <span className="min-w-0">
        <span className="block text-[20px] font-bold tracking-[-0.02em] md:text-[24px]">{isKo ? p.title : p.titleEn}</span>
        <span className="mt-1 block text-[15px] leading-snug text-muted-foreground">
          {isKo ? p.subtitle : p.subtitleEn}
          {p.roles?.length ? ` · ${(isKo ? p.roles : p.rolesEn)?.join(" · ")}` : null}
        </span>
      </span>
      {p.caseId ? (
        <ArrowUpRight
          aria-hidden="true"
          className="mt-1.5 h-5 w-5 text-muted-foreground transition-transform group-hover/row:-translate-y-0.5 group-hover/row:translate-x-0.5 group-hover/row:text-accent"
        />
      ) : (
        <span />
      )}
    </>
  );
  const cls = "group/row grid grid-cols-[1fr_20px] gap-x-6 gap-y-1 border-b border-border py-5 sm:grid-cols-[130px_1fr_20px]";
  return (
    <li>
      {p.caseId ? (
        <Link
          href={workHref(locale, p.caseId)}
          aria-label={`${isKo ? p.title : p.titleEn} — ${t("detail_link")}`}
          className={`${cls} transition-colors hover:text-accent`}
        >
          {row}
        </Link>
      ) : (
        <div className={cls}>{row}</div>
      )}
    </li>
  );
}
