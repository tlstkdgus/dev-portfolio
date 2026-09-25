"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

interface Step {
  t: string;
  d: string;
}

// 일하는 방식 = 찾는다 → 만든다 → 고친다. 앞 칸의 결과를 다음 칸이 받는 한 흐름.
// 프로젝트명은 넣지 않는다 — 증거는 아래 케이스가 한다 (v9).
export function Principles() {
  const t = useTranslations("principles");
  const items: Step[] = t.raw("items");

  return (
    <section id="principles" className="gutter pb-24 md:pb-36">
      <SectionHeading>{t("heading")}</SectionHeading>
      <ol className="grid border-t border-foreground md:grid-cols-3">
        {items.map((item, i) => (
          <li
            key={item.t}
            className="flex flex-col border-b border-border py-8 md:border-b-0 md:border-l md:px-8 md:py-10 md:first:border-l-0 md:first:pl-0"
          >
            <p className="meta flex items-center justify-between text-muted-foreground">
              <span className="font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
              {i < items.length - 1 && <ArrowRight aria-hidden="true" className="hidden h-4 w-4 md:block" />}
            </p>
            <h3 className="mt-7 whitespace-pre-line text-[24px] font-bold leading-[1.25] tracking-[-0.03em] md:text-[28px]">
              {item.t}
            </h3>
            <p className="mt-4 text-[16px] leading-[1.75] text-foreground/80">{item.d}</p>
          </li>
        ))}
      </ol>
      <a
        href="#projects"
        className="hit mt-10 inline-flex items-center gap-2 text-[16px] font-semibold md:mt-14"
      >
        {t("to_projects")}
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </a>
    </section>
  );
}
