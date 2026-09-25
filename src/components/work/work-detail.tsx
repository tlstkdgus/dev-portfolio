"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { fmtPeriod, getWork, workHref, type WorkEntry } from "@/lib/work";
import type { CareerDetailItem, FlowDiagram, Trouble } from "@/data/career-detail";
import type { Localized } from "@/data/selected";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { MetaRow } from "@/components/ui/meta-row";
import { cn } from "@/lib/utils";
import { fitStat } from "@/lib/fit-stat";

// 프로젝트 상세 페이지. 순서: 제목·메타 → 자료 → (대표 4개) 요약·성과 → 배경 → 실행 → 결과 → 배운 점.
// 이전 /career 한 페이지에서는 '배경·역할·결과·배운 점' 라벨이 13px 회색 eyebrow라 섹션 경계가 안 보였다
// (2026-09-23 피드백). 섹션 제목을 본문보다 확실히 크게 두고, 본문은 17~18px 본문색으로 올렸다.
export function WorkDetail({ id }: { id: string }) {
  const t = useTranslations("work");
  const locale = useLocale();
  const isKo = locale === "ko";
  const tr = (v: Localized) => (isKo ? v.ko : v.en);
  const work = getWork(id)!;
  const { entry, prev, next } = work;
  const { detail, project, selected } = entry;

  const name = tr(entry.name);
  const images = dedupe([
    // 메인 카드 썸네일(언어별 표지 이미지)도 캐러셀 첫 장에 둔다
    ...(selected ? [...(selected.thumb ? [tr(selected.thumb.src)] : []), selected.hero.src, ...selected.gallery.map((g) => g.src)] : []),
    ...(detail.images ?? []),
  ]);
  const roles = selected ? tr(selected.role) : (isKo ? project?.roles : project?.rolesEn)?.join(" · ");
  const period = selected ? tr(selected.period) : fmtPeriod(isKo ? project?.period : project?.periodEn);
  const liveUrl = selected?.liveUrl ?? project?.url;
  const repoUrl = selected?.repoUrl ?? project?.repo;
  const stack = selected?.stack ?? project?.tags ?? [];
  // 섹션 번호: 기술적 도전이 있는 프로젝트만 03을 쓰고 결과·배운 점이 한 칸씩 밀린다
  const hasTroubles = Boolean(detail.troubles?.length);
  const nResults = hasTroubles ? "04" : "03";
  const nLessons = hasTroubles ? "05" : "04";
  const backHref = `/${locale}#${selected ? "projects" : "more-projects"}`;

  return (
    <article>
      {/* 1. 제목 · 메타 */}
      <header className="gutter pb-12 pt-24 md:pb-16 md:pt-32">
        <Link
          href={backHref}
          className="hit meta inline-flex min-h-11 items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
          {selected ? t("back_selected") : t("back_other")}
        </Link>

        <MetaRow
          items={[name, selected ? tr(selected.kicker) : tr(entry.desc)]}
          className="mt-10 text-muted-foreground md:mt-14"
        />
        <h1 className="headline mt-6 max-w-5xl whitespace-pre-line md:mt-8">
          {selected ? tr(selected.headline) : tr(entry.desc)}
        </h1>
        {selected ? (
          <p className="mt-6 max-w-4xl text-[18px] leading-[1.6] text-muted-foreground md:text-[21px]">{tr(selected.summary)}</p>
        ) : (
          <p className="mt-5 text-[20px] font-semibold tracking-[-0.02em] md:text-[24px]">{name}</p>
        )}

        <dl className="mt-12 grid border-t border-foreground sm:grid-cols-2 lg:grid-cols-4 md:mt-16">
          {period && <Meta label={t("period")}>{period}</Meta>}
          {roles && <Meta label={t("role")}>{roles}</Meta>}
          {selected && <Meta label={t("status")}>{tr(selected.status)}</Meta>}
          {(liveUrl || repoUrl || selected?.behanceUrl) && (
            <Meta label={t("links")}>
              <span className="-my-2 flex flex-col">
                {liveUrl && <OutLink href={liveUrl} label={t("live")} isKo={isKo} />}
                {selected?.behanceUrl && <OutLink href={selected.behanceUrl} label={t("behance")} isKo={isKo} />}
                {repoUrl && <OutLink href={repoUrl} label="GitHub" isKo={isKo} />}
                {selected?.extraRepos?.map((r) => (
                  <OutLink key={r.url} href={r.url} label={`GitHub · ${tr(r.label)}`} isKo={isKo} />
                ))}
              </span>
            </Meta>
          )}
        </dl>
        {stack.length > 0 && (
          <div className="flex flex-col gap-3 border-b border-border py-4 sm:flex-row sm:items-baseline sm:gap-6 lg:py-5">
            <p className="eyebrow shrink-0 text-muted-foreground">{t("stack")}</p>
            <ul className="flex flex-wrap gap-1.5">
              {stack.map((s) => (
                <li key={s} className="meta rounded-full border border-border px-2.5 py-0.5 font-semibold">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* 2. 자료 — 발표 자료·화면. 원본 PDF에서 2400px로 다시 뽑았다 */}
      {images.length > 0 && (
        <div className={cn("gutter py-10 md:py-16", selected?.heroTone === "ink" ? "bg-ink" : "bg-muted")}>
          <div className="mx-auto max-w-6xl">
            <ImageCarousel images={images} alt={name} tone={selected?.heroTone === "ink" ? "ink" : "light"} />
          </div>
        </div>
      )}

      {/* 3. 대표 프로젝트: 요약 세 문장 + 전→후 성과 */}
      {selected && (
        <>
          <section className="gutter py-20 md:py-28">
            <div className="grid gap-6 border-t border-foreground pt-8 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-12">
              <SectionTitle n="00" label={t("summary")} />
              <p className="max-w-3xl text-[19px] leading-[1.8] md:text-[21px]">{tr(selected.body)}</p>
            </div>
          </section>

          <section className="gutter bg-accent-surface py-20 text-accent-foreground md:py-28">
            <p className="eyebrow opacity-90">{t("impact")}</p>
            <dl
              className={cn(
                "mt-10 grid gap-x-8 gap-y-12 md:mt-14",
                selected.stats.length === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
              )}
            >
              {selected.stats.map((s) => (
                <div key={s.k.en} className="stat-cell flex flex-col border-t border-accent-foreground/40 pt-5">
                  <dt className="order-last mt-3 text-[15px] font-medium leading-snug opacity-90 md:text-[16px]">{tr(s.k)}</dt>
                  <dd>
                    {s.before && (
                      <span className="mb-2 block text-[17px] font-semibold opacity-80 md:text-[20px]">
                        <span className="line-through decoration-1">{typeof s.before === "string" ? s.before : tr(s.before)}</span>
                        <ArrowRight aria-hidden="true" className="ml-1.5 inline-block h-[0.9em] w-[0.9em] align-[-0.08em]" />
                        <span className="sr-only">{isKo ? "에서" : "to"}</span>
                      </span>
                    )}
                    {/* 옆 칸에만 '전' 값이 있으면 큰 숫자 높이가 칸마다 달랐다(Y:Wave). 같은 높이의 빈 줄로 맞춘다 */}
                    {!s.before && selected.stats.some((x) => x.before) && (
                      <span aria-hidden="true" className="mb-2 hidden text-[17px] font-semibold sm:block md:text-[20px]">
                        &nbsp;
                      </span>
                    )}
                    <span className="stat block" style={fitStat(selected.stats.map((x) => (typeof x.v === "string" ? x.v : tr(x.v))))}>
                      {typeof s.v === "string" ? s.v : tr(s.v)}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </>
      )}

      {/* 3'. 그 외 프로젝트: 숫자 한 줄 */}
      {!selected && project?.stats && project.stats.length > 0 && (
        <section className="gutter pt-20 md:pt-28">
          <dl className="grid border-t border-foreground sm:grid-cols-3">
            {project.stats.map((s) => (
              <div key={s.labelEn} className="flex flex-col border-b border-border py-6 sm:border-b-0 sm:pr-8 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:pl-8">
                <dt className="order-last mt-3 text-[15px] text-muted-foreground">{isKo ? s.label : s.labelEn}</dt>
                <dd className="text-[30px] font-extrabold leading-none tracking-[-0.04em] md:text-[36px]">{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* 4. 배경 · 실행 · 결과 · 배운 점 */}
      <div className="gutter space-y-20 py-20 md:space-y-28 md:py-28">
        <Section n="01" label={t("background")}>
          <Items items={detail.background} isKo={isKo} />
        </Section>

        <Section n="02" label={t("did")}>
          <div className="space-y-12">
            {detail.role.map((sub) => (
              <div key={sub.title}>
                <h3 className="text-[21px] font-bold leading-snug tracking-[-0.02em] md:text-[24px]">
                  {isKo ? sub.title : sub.titleEn}
                </h3>
                <Items items={sub.items} isKo={isKo} className="mt-5" />
              </div>
            ))}
          </div>
        </Section>

        {detail.diagrams && detail.diagrams.length > 0 && (
          <div className="space-y-16 md:space-y-20">
            {detail.diagrams.map((d) => (
              <Diagram key={d.titleEn} d={d} isKo={isKo} />
            ))}
          </div>
        )}

        {hasTroubles && (
          <Section n="03" label={t("trouble")}>
            <ol className="space-y-14">
              {detail.troubles!.map((tr_, k) => (
                <TroubleItem key={tr_.titleEn} n={k + 1} tr_={tr_} isKo={isKo} repoUrl={tr_.repo ?? repoUrl} labels={{ p: t("t_problem"), s: t("t_solution"), r: t("t_result") }} />
              ))}
            </ol>
          </Section>
        )}

        <Section n={nResults} label={t("results")} accent>
          {/* 굵은 파란 세로선(border-l 3px)은 뺐다. 결과 제목이 이미 파란색이고, 나머지 목록처럼 가로 괘선으로 나눈다 */}
          <ul className="border-t border-foreground">
            {detail.results.map((item, j) => (
              <li key={j} className="border-b border-border py-5 text-[18px] font-semibold leading-[1.75] tracking-[-0.01em] md:text-[19px]">
                {isKo ? item.text : item.textEn}
                <Sub item={item} isKo={isKo} />
              </li>
            ))}
          </ul>
        </Section>

        {/* 확인된 문장이 없는 프로젝트(웰컴키트)는 배운 점을 비워 둔다 — 빈 제목만 남기지 않는다 */}
        {detail.lessons.length > 0 && (
          <Section n={nLessons} label={t("lessons")}>
            <Items items={detail.lessons} isKo={isKo} />
          </Section>
        )}
      </div>

      {/* 5. 현장 사진 — 제3자(브랜드 디자인 랩) 기록, 출처 표기 필수 */}
      {selected?.field && (
        <section className="gutter bg-muted py-16 md:py-24">
          <p className="eyebrow mb-8 text-muted-foreground">{t("field")}</p>
          <div className="grid gap-3 md:grid-cols-6 md:gap-4">
            {selected.field.images.map((img, j) => (
              <div
                key={img.src}
                className={cn("relative overflow-hidden bg-background", j < 2 ? "aspect-[3/2] md:col-span-3" : "aspect-[4/3] md:col-span-2")}
              >
                <Image src={img.src} alt={tr(img.alt)} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
          <p className="meta mt-6 text-muted-foreground">
            <a
              href={selected.field.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hit underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
            >
              {tr(selected.field.source.label)}
              <span className="sr-only">{isKo ? " (새 창)" : " (opens in a new tab)"}</span>
            </a>
          </p>
        </section>
      )}

      {/* 6. 이전 · 다음 */}
      <nav aria-label={t("pager")} className="gutter border-t border-foreground py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {prev ? <Pager entry={prev} dir="prev" label={t("prev")} locale={locale} isKo={isKo} /> : <span />}
          {next ? <Pager entry={next} dir="next" label={t("next")} locale={locale} isKo={isKo} /> : <span />}
        </div>
        <Link
          href={`/${locale}/career`}
          className="hit meta mt-10 inline-flex min-h-11 items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
        >
          {t("all")}
          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
        </Link>
      </nav>
    </article>
  );
}

function dedupe(list: string[]) {
  return [...new Set(list)];
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-border py-4 sm:pr-6 lg:border-b-0 lg:py-5">
      <dt className="eyebrow text-muted-foreground">{label}</dt>
      <dd className="mt-2 text-[16px] font-semibold leading-snug">{children}</dd>
    </div>
  );
}

function OutLink({ href, label, isKo }: { href: string; label: string; isKo: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 w-fit items-center gap-1 underline decoration-foreground/30 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
    >
      {label}
      <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
      <span className="sr-only">{isKo ? " (새 창)" : " (opens in a new tab)"}</span>
    </a>
  );
}

function SectionTitle({ n, label, accent }: { n: string; label: string; accent?: boolean }) {
  return (
    <div>
      <p className="meta font-bold text-accent">{n}</p>
      <h2
        className={cn(
          "mt-2 text-[30px] font-extrabold leading-[1.1] tracking-[-0.04em] md:text-[40px]",
          accent && "text-accent"
        )}
      >
        {label}
      </h2>
    </div>
  );
}

function Section({ n, label, accent, children }: { n: string; label: string; accent?: boolean; children: React.ReactNode }) {
  return (
    <section className="grid gap-8 border-t border-foreground pt-8 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-12">
      <div className="md:sticky md:top-24 md:self-start">
        <SectionTitle n={n} label={label} accent={accent} />
      </div>
      <div className="max-w-3xl">{children}</div>
    </section>
  );
}

function Items({ items, isKo, className }: { items: CareerDetailItem[]; isKo: boolean; className?: string }) {
  return (
    <ul className={cn("space-y-5", className)}>
      {items.map((item, j) => (
        <li key={j} className="flex gap-3 text-[17px] leading-[1.8] md:text-[18px]">
          <span aria-hidden="true" className="mt-[0.8em] h-1.5 w-1.5 shrink-0 bg-foreground" />
          <span className="min-w-0">
            {isKo ? item.text : item.textEn}
            <Sub item={item} isKo={isKo} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function Sub({ item, isKo }: { item: CareerDetailItem; isKo: boolean }) {
  if (!item.subItems?.length) return null;
  return (
    <ul className="mt-3 space-y-2 border-l border-border pl-4">
      {item.subItems.map((sub, k) => (
        <li key={k} className="text-[16px] font-normal leading-[1.75] text-foreground/75">
          {isKo ? sub.text : sub.textEn}
        </li>
      ))}
    </ul>
  );
}

function Diagram({ d, isKo }: { d: FlowDiagram; isKo: boolean }) {
  const cols = d.steps.length >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-4";
  // 태그가 있는 칸과 없는 칸의 단계 이름 높이를 맞춘다 (가로 배치일 때만)
  const hasTags = d.steps.some((st) => st.tag);
  return (
    <figure className="border-t border-foreground pt-8">
      <figcaption className="text-[22px] font-bold leading-snug tracking-[-0.02em] md:text-[28px]">
        {isKo ? d.title : d.titleEn}
      </figcaption>
      <ol className={cn("mt-8 grid border-t border-border", cols)}>
        {d.steps.map((st, k) => (
          <li
            key={st.labelEn}
            className="border-b border-border py-5 lg:border-b-0 lg:border-l lg:px-5 lg:py-7 lg:first:border-l-0 lg:first:pl-0"
          >
            {st.tag ? (
              <span className="meta mb-3 inline-block rounded-full border border-accent/50 px-2.5 py-0.5 font-semibold text-accent lg:h-7">
                {isKo ? st.tag : st.tagEn}
              </span>
            ) : (
              hasTags && <span aria-hidden="true" className="mb-3 hidden h-7 lg:block" />
            )}
            <div className="flex items-start justify-between gap-3">
              <p className="text-[24px] font-extrabold leading-[1.1] tracking-[-0.03em] md:text-[28px]">
                {isKo ? st.label : st.labelEn}
              </p>
              {k < d.steps.length - 1 && (
                <>
                  <ArrowRight aria-hidden="true" className="mt-1.5 hidden h-5 w-5 shrink-0 text-muted-foreground lg:block" />
                  <ArrowDown aria-hidden="true" className="mt-1.5 h-5 w-5 shrink-0 text-muted-foreground lg:hidden" />
                </>
              )}
            </div>
            <p className="mt-3 text-[15px] leading-[1.65] text-foreground/75 md:text-[16px]">{isKo ? st.note : st.noteEn}</p>
          </li>
        ))}
      </ol>
      {(d.caption || d.captionEn) && (
        <p className="mt-8 max-w-3xl text-[17px] font-semibold leading-[1.75] md:text-[18px]">
          {isKo ? d.caption : d.captionEn}
        </p>
      )}
    </figure>
  );
}

// 기술적 도전 한 건 = 제목 + 문제 · 해결 · 결과 세 줄. 개발자 포트폴리오의 트러블슈팅 형식.
// 근거 파일이 있으면 공개 저장소의 해당 경로로 바로 연다(main 브랜치 기준).
function TroubleItem({
  n,
  tr_,
  isKo,
  repoUrl,
  labels,
}: {
  n: number;
  tr_: Trouble;
  isKo: boolean;
  repoUrl?: string;
  labels: { p: string; s: string; r: string };
}) {
  const rows: [string, string][] = [
    [labels.p, isKo ? tr_.problem : tr_.problemEn],
    [labels.s, isKo ? tr_.solution : tr_.solutionEn],
    [labels.r, isKo ? tr_.result : tr_.resultEn],
  ];
  return (
    <li>
      <h3 className="flex gap-3 text-[21px] font-bold leading-snug tracking-[-0.02em] md:text-[24px]">
        <span className="meta pt-1.5 font-bold text-accent">{String(n).padStart(2, "0")}</span>
        <span>{isKo ? tr_.title : tr_.titleEn}</span>
      </h3>
      <dl className="mt-5 border-t border-foreground">
        {rows.map(([label, text]) => (
          <div key={label} className="grid gap-x-6 gap-y-1 border-b border-border py-4 sm:grid-cols-[64px_1fr]">
            <dt className={cn("eyebrow pt-1", label === labels.r ? "text-accent" : "text-muted-foreground")}>{label}</dt>
            <dd className="text-[16px] leading-[1.8] md:text-[17px]">{text}</dd>
          </div>
        ))}
      </dl>
      {tr_.files && tr_.files.length > 0 && (
        <p className="meta mt-3 flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground">
          {/* 대표 저장소가 아닌 곳의 파일이면 저장소 이름을 앞에 적는다 */}
          {tr_.repo && <span className="font-semibold">{tr_.repo.split("/").pop()}</span>}
          {tr_.files.map((f) =>
            repoUrl ? (
              <a
                key={f}
                href={`${repoUrl}/blob/main/${f}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono underline decoration-foreground/30 underline-offset-4 hover:text-accent hover:decoration-accent"
              >
                {f}
                <span className="sr-only">{isKo ? " (새 창)" : " (opens in a new tab)"}</span>
              </a>
            ) : (
              <code key={f}>{f}</code>
            )
          )}
        </p>
      )}
    </li>
  );
}

function Pager({ entry, dir, label, locale, isKo }: { entry: WorkEntry; dir: "prev" | "next"; label: string; locale: string; isKo: boolean }) {
  return (
    <Link
      href={workHref(locale, entry.id)}
      className={cn("group block border-t border-border pt-5", dir === "next" && "md:text-right")}
    >
      <span className={cn("meta inline-flex items-center gap-1.5 text-muted-foreground", dir === "next" && "md:flex-row-reverse")}>
        {dir === "prev" ? <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" /> : <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />}
        {label}
      </span>
      <span className="mt-2 block text-[22px] font-bold tracking-[-0.02em] transition-colors group-hover:text-accent md:text-[28px]">
        {isKo ? entry.name.ko : entry.name.en}
      </span>
      <span className="mt-1 block text-[15px] text-muted-foreground">{isKo ? entry.desc.ko : entry.desc.en}</span>
    </Link>
  );
}
