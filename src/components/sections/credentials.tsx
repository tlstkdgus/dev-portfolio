"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { awards } from "@/data/credentials";

export function Credentials() {
  const t = useTranslations("certified");
  const isKo = useLocale() === "ko";
  const top = awards.filter((a) => a.highlight);
  const rest = awards.filter((a) => !a.highlight);

  return (
    <section id="certified" className="gutter scroll-mt-16 border-t border-foreground py-24 md:py-36">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="display">{t("heading")}</h2>
          {/* 수상 횟수를 숫자 하나로 — 레퍼런스의 대형 수치 슬라이드 */}
          <p className="stat mt-10 text-accent">{awards.length}</p>
          <p className="meta mt-2 text-muted-foreground">{t("count_label")}</p>
        </div>

        <div>
          <p className="eyebrow mb-3 text-muted-foreground">{t("awards")}</p>
          <ol className="border-t border-foreground">
            {top.map((a) => (
              <li
                key={a.title}
                className="grid gap-x-6 gap-y-1 border-b border-border py-6 sm:grid-cols-[100px_1fr_auto]"
              >
                <span className="meta pt-1.5 text-muted-foreground">{a.date.replace(/\.$/, "")}</span>
                <span>
                  <span className="block text-[20px] font-bold leading-snug tracking-[-0.02em] md:text-[22px]">
                    {isKo ? a.title : a.titleEn}
                  </span>
                  <span className="mt-1 block text-[15px] text-muted-foreground">
                    {isKo ? a.issuer : a.issuerEn}
                  </span>
                </span>
                {/* 상장 스캔 — 있을 때만. 누르면 원본이 새 창에 열린다 */}
                {a.image && (
                  <a
                    href={a.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block h-24 w-[72px] overflow-hidden border border-border bg-muted sm:justify-self-end"
                    aria-label={`${isKo ? a.title : a.titleEn} — ${isKo ? "상장 보기 (새 창)" : "view certificate (new tab)"}`}
                  >
                    <Image src={a.image} alt="" fill sizes="72px" className="object-cover transition-transform group-hover:scale-105" />
                  </a>
                )}
              </li>
            ))}
          </ol>

          <p className="eyebrow mb-1 mt-12 text-muted-foreground">{t("awards_rest")}</p>
          <ul className="border-t border-border">
            {rest.map((a) => (
              <li
                key={a.title}
                className="grid gap-x-6 border-b border-border py-3 text-[15px] sm:grid-cols-[100px_1fr]"
              >
                <span className="meta pt-0.5 text-muted-foreground">{a.date.replace(/\.$/, "")}</span>
                <span className="text-foreground/80">{isKo ? a.title : a.titleEn}</span>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </section>
  );
}
