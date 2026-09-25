"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { selectedProjects, type Localized } from "@/data/selected";
import { workHref } from "@/lib/work";
import { cn } from "@/lib/utils";

// 메인에서는 프로젝트마다 한 줄 요약 · 핵심 수치 · 역할만 보여주고, 나머지는 /work/<id>로 넘긴다.
// 이전에는 프로젝트마다 표지 → 헤드라인 → 대표 화면 → 본문 → 현장 → 성과 슬라이드 6장이라
// 대표 4개가 메인 높이의 65%(1440px 기준 17,900px)를 차지했다 (2026-09-23 "첫 페이지가 너무 길다" 피드백).
// 레퍼런스: limdahyun.vercel.app 'FEATURED PROJECTS' 목록.
export function SelectedProjects() {
  const t = useTranslations("selected");
  const locale = useLocale();
  const isKo = locale === "ko";
  const tr = (v: Localized) => (isKo ? v.ko : v.en);

  return (
    <section id="projects" className="gutter scroll-mt-16 py-24 md:py-36">
      <h2 className="display max-w-4xl">{t("index_heading")}</h2>
      <p className="mt-6 max-w-xl text-[17px] leading-[1.75] text-muted-foreground">{t("sub")}</p>

      <ol className="mt-14 border-t border-foreground md:mt-20">
        {selectedProjects.map((p, i) => {
          const href = workHref(locale, p.caseId);
          const title = tr(p.title);
          return (
            <li
              key={p.id}
              className="grid gap-8 border-b border-border py-10 md:py-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14"
            >
              <Link
                href={href}
                tabIndex={-1}
                aria-hidden="true"
                className={cn(
                  // 오른쪽 글(판단·Key impact·역할)이 길어 이미지가 위에 붙으면 아래가 크게 비었다 → 글 높이의 가운데로
                  "group relative block aspect-[16/10] overflow-hidden lg:self-center",
                  p.heroTone === "ink" ? "bg-ink" : "bg-muted"
                )}
              >
                <Image
                  src={p.thumb ? tr(p.thumb.src) : p.hero.src}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </Link>

              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-4">
                  <span className="meta font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="meta rounded-full border border-foreground/30 px-3 py-1 font-semibold">
                    {tr(p.status)}
                  </span>
                </div>

                <h3 className="mt-4 text-[30px] font-extrabold leading-[1.1] tracking-[-0.04em] md:text-[40px]">
                  <Link href={href} className="transition-colors hover:text-accent">
                    {title}
                  </Link>
                </h3>
                <p className="meta mt-2 text-muted-foreground">
                  {tr(p.kicker)} · {tr(p.period)}
                </p>
                {/* 무엇인지 한 줄 — 헤드라인만으로는 어떤 프로젝트인지 안 보였다 (2026-09-24) */}
                <p className="mt-5 text-[18px] font-semibold leading-[1.55] tracking-[-0.01em] md:text-[20px]">
                  {tr(p.summary)}
                </p>
                {/* 판단 한 줄 — 상세 페이지의 '왜 그렇게 정했는지'를 목록에서도 보이게 (§G-5) */}
                <p className="mt-4 text-[16px] leading-[1.7] text-foreground/80 md:text-[17px]">
                  <span className="mr-2 font-bold text-accent">{t("decision")}</span>
                  {tr(p.decision)}
                </p>

                <p lang="en" className="eyebrow mt-8 text-muted-foreground">
                  {t("key_impact")}
                </p>
                {/* sm부터 한 카드의 줄들이 열을 나눠 쓴다(subgrid): 이전 값 · 화살표 · 값 · 설명.
                    줄마다 flex로 두면 이전 값 길이에 따라 큰 숫자의 시작점이 줄마다 달랐다.
                    화살표도 따로 한 열이라 이전 값이 없는 줄(102팀 중 5위)도 같은 x에서 시작한다.
                    열 사이 간격은 gap이 아니라 padding이라, 이전 값이 없는 카드는 빈 열이 폭 0으로 접힌다.
                    설명 열은 최소 12rem. 없으면 영문 긴 값('Recommended by place & category')이 설명 열을 0으로 밀어
                    설명이 한 글자씩 세로로 쌓이고 줄 높이가 수백 px가 됐다(1280px, 2026-09-25). 긴 값은 값 열 안에서 줄바꿈 */}
                <dl className="mt-3 border-t border-foreground sm:grid sm:grid-cols-[auto_auto_minmax(0,auto)_minmax(12rem,1fr)]">
                  {p.stats.map((s) => (
                    <div
                      key={s.k.en}
                      className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border py-3 sm:col-span-4 sm:grid sm:grid-cols-subgrid sm:gap-x-0"
                    >
                      <dt className="text-[14px] leading-snug text-muted-foreground order-last sm:order-none sm:col-start-4 sm:row-start-1 sm:pl-3 sm:text-right md:text-[15px]">
                        {tr(s.k)}
                      </dt>
                      <dd className="flex flex-wrap items-baseline gap-x-3 sm:col-span-3 sm:row-start-1 sm:grid sm:grid-cols-subgrid sm:gap-x-0">
                        {s.before && (
                          <span className="text-[16px] font-semibold text-muted-foreground line-through decoration-1 sm:pr-3 md:text-[18px]">
                            {typeof s.before === "string" ? s.before : tr(s.before)}
                          </span>
                        )}
                        {s.before && (
                          <span className="self-center sm:col-start-2 sm:pr-3">
                            <ArrowRight aria-hidden="true" className="h-4 w-4 text-accent" />
                            <span className="sr-only">{isKo ? "에서" : "to"}</span>
                          </span>
                        )}
                        <span className="text-balance text-[24px] font-extrabold leading-tight tracking-[-0.03em] sm:col-start-3 md:text-[28px]">
                          {typeof s.v === "string" ? s.v : tr(s.v)}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>

                <dl className="mt-5 grid grid-cols-[64px_1fr] gap-x-4 gap-y-3 text-[15px]">
                  <dt className="eyebrow pt-0.5 text-muted-foreground">{t("role")}</dt>
                  <dd className="font-semibold">{tr(p.role)}</dd>
                  {/* 스택 칩 — 개발자 포트폴리오에서 카드마다 기대하는 정보. 저장소에서 확인한 것만 */}
                  <dt className="eyebrow pt-1 text-muted-foreground">{t("stack")}</dt>
                  <dd>
                    <ul className="flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <li key={s} className="meta rounded-full border border-border px-2.5 py-0.5 font-semibold">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </dl>

                <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
                  <Link
                    href={href}
                    className="hit inline-flex w-fit items-center gap-2 border-b-2 border-foreground pb-1 text-[16px] font-bold transition-colors hover:border-accent hover:text-accent"
                  >
                    {t("more")}
                    <span className="sr-only">: {title}</span>
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  {/* 코드와 배포본으로 바로 — 상세 페이지를 거치지 않아도 되게 */}
                  {p.repoUrl && <OutLink href={p.repoUrl} label={t("github")} title={title} isKo={isKo} />}
                  {p.extraRepos?.map((r) => (
                    <OutLink key={r.url} href={r.url} label={tr(r.label)} title={title} isKo={isKo} />
                  ))}
                  {p.liveUrl && <OutLink href={p.liveUrl} label={t("live")} title={title} isKo={isKo} />}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function OutLink({ href, label, title, isKo }: { href: string; label: string; title: string; isKo: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hit inline-flex items-center gap-1 text-[15px] font-semibold text-muted-foreground transition-colors hover:text-accent"
    >
      {label}
      <span className="sr-only">
        : {title} ({isKo ? "새 탭" : "opens in a new tab"})
      </span>
      <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
    </a>
  );
}
