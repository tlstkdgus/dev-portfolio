"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

interface Change {
  before: string;
  after: string;
  label: string;
  d: string;
  basis: string;
}
interface ScaleItem {
  v: string;
  label: string;
  note: string;
}

// 운영이 실제로 바뀐 것만 적는다. '전'은 상현이 직접 겪은 방식이고, 전·후는 같은 단위로 맞춘다(하루 3시간 → 하루 15분).
// 추정치(약 2일)는 숫자 전체의 신뢰도를 깎아 뺐다. Scale은 규모 3개만 — 45명·5/5 같은 작은 표본은 케이스에서만 (§G-4).
// 사용자 수·방문수는 확보되지 않아 넣지 않는다.
export function Figures() {
  const t = useTranslations("figures");
  const changes: Change[] = t.raw("changes");
  const scale: ScaleItem[] = t.raw("scale");

  return (
    <section id="figures" className="gutter pb-24 md:pb-36">
      <SectionHeading sub={t("sub")}>{t("heading")}</SectionHeading>

      <p className="meta text-muted-foreground">
        <span className="font-bold text-accent">01</span>
        <span className="ml-3 font-semibold tracking-[0.12em]">{t("group_ops")}</span>
      </p>
      {/* 전 · 화살표 · 후 · 설명 네 열을 서브그리드로 묶어 행마다 같은 x 위치에 놓는다.
          '전' 길이가 제각각이라 flex로 두면 화살표와 '후'가 행마다 어긋난다 (2026-09-22 상현 지적). */}
      <ol className="mt-4 grid grid-cols-[max-content_auto_minmax(0,1fr)] border-t border-foreground lg:grid-cols-[max-content_auto_max-content_minmax(0,1fr)]">
        {changes.map((c) => (
          <li
            key={c.label}
            className="col-span-3 grid grid-cols-subgrid items-center gap-x-3 border-b border-border py-7 md:gap-x-4 md:py-9 lg:col-span-4"
          >
            <span className="text-[18px] font-bold leading-tight tracking-[-0.03em] text-muted-foreground line-through decoration-1 md:text-[24px]">
              {c.before}
            </span>
            <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" />
            <span className="text-[26px] font-extrabold leading-none tracking-[-0.04em] md:whitespace-nowrap md:text-[40px]">{c.after}</span>
            <div className="col-span-3 mt-4 lg:col-span-1 lg:mt-0 lg:pl-10">
              <p className="text-[17px] font-bold tracking-[-0.01em] md:text-[19px]">{c.label}</p>
              <p className="mt-2 text-[15px] leading-[1.7] text-foreground/80">{c.d}</p>
              <p className="meta mt-2 text-muted-foreground">{c.basis}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="meta mt-16 text-muted-foreground md:mt-20">
        <span className="font-bold text-accent">02</span>
        <span className="ml-3 font-semibold tracking-[0.12em]">{t("group_scale")}</span>
      </p>
      <dl className="mt-4 grid border-t border-foreground md:grid-cols-3">
        {scale.map((x) => (
          <div
            key={x.label}
            className="flex flex-col border-b border-border py-6 md:border-b-0 md:py-8 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:pl-8 md:[&:not(:last-child)]:pr-8"
          >
            {/* 읽는 순서는 dt(무엇) → dd(숫자·근거), 보이는 순서는 숫자 → 무엇 → 근거 */}
            <dt className="order-2 mt-3 text-[16px] font-semibold">{x.label}</dt>
            <dd className="order-1 whitespace-nowrap text-[34px] font-extrabold leading-none tracking-[-0.04em] md:text-[40px] lg:text-[clamp(27px,2.7vw,40px)]">{x.v}</dd>
            <dd className="meta order-3 mt-1 text-muted-foreground">{x.note}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
