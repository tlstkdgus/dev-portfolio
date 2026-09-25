"use client";

import { useTranslations, useLocale } from "next-intl";
import { experiences } from "@/data/experience";
import { Emph } from "@/components/ui/emph";
import { fmtPeriod } from "@/lib/work";

// 레퍼런스 'Where I've worked.' — 왼쪽 큰 제목, 오른쪽 연도·역할 목록.
// 첫 항목(멋사 인턴)은 항상 펼쳐 보여 메인 경험으로 읽히게 한다.
export function Experience() {
  const t = useTranslations("experience");
  const isKo = useLocale() === "ko";
  const [main, ...rest] = experiences;

  return (
    <section id="experience" className="gutter scroll-mt-16 bg-ink py-24 text-ink-foreground md:py-36">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <h2 className="display lg:sticky lg:top-24 lg:self-start">{t("heading")}</h2>

        <div>
          {/* 메인 — 멋쟁이사자처럼 인턴 */}
          <article className="border-t border-ink-foreground pt-6">
            <div className="meta flex items-baseline justify-between gap-4 text-ink-muted">
              <span>{fmtPeriod(isKo ? main.period : main.periodEn)}</span>
              <span className="eyebrow text-accent-bright">{t("main_label")}</span>
            </div>
            <h3 className="mt-5 text-[30px] font-extrabold leading-tight tracking-[-0.03em] md:text-[40px]">
              {isKo ? main.company : main.companyEn}
            </h3>
            <p className="mt-1 text-[16px] text-ink-muted">
              {isKo ? main.role : main.roleEn} · {isKo ? main.team : main.teamEn}
            </p>
            <ul className="mt-7 space-y-3 text-[16px] leading-[1.75] text-ink-foreground/85">
              {(isKo ? main.description : main.descriptionEn).map((item) => (
                <li key={item} className="grid grid-cols-[20px_1fr]">
                  <span aria-hidden="true" className="text-ink-muted">
                    —
                  </span>
                  <span>
                    <Emph text={item} />
                  </span>
                </li>
              ))}
            </ul>
          </article>

          {/* 나머지 — 한 줄씩 */}
          <ol className="mt-14 border-t border-ink-foreground/25">
            {rest.map((exp) => (
              <li
                key={`${exp.company}-${exp.startDate}`}
                className="grid gap-x-6 gap-y-1 border-b border-ink-foreground/15 py-5 sm:grid-cols-[150px_1fr]"
              >
                <span className="meta pt-1 text-ink-muted">{fmtPeriod(isKo ? exp.period : exp.periodEn)}</span>
                <div>
                  <p className="text-[17px] font-bold tracking-[-0.01em]">
                    {isKo ? exp.role : exp.roleEn}
                  </p>
                  <p className="text-[15px] text-ink-muted">{isKo ? exp.company : exp.companyEn}</p>
                  <p className="mt-2 text-[15px] leading-[1.7] text-ink-foreground/70">
                    {(isKo ? exp.description : exp.descriptionEn)[0]}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
