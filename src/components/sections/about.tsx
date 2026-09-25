"use client";

import { useTranslations, useLocale } from "next-intl";
import { certifications } from "@/data/credentials";
import { profile } from "@/data/profile";

// 소개 섹션 = 기본 정보(학력·교육·자격증·병역) + What I do.
// 기본 정보는 이력서처럼 어쨌든 보여 주는 편이 낫다는 상현 판단으로 소개 화면 바로 아래에 둔다 (2026-09-24).
// 처음에는 소개 화면 숫자 밑 작은 한 줄이었는데 잘 안 보여서, 수상과 같은 무게의 블록으로 만들었다.
export function About() {
  const t = useTranslations("about");
  const isKo = useLocale() === "ko";
  const skills: { g: string; items: string[] }[] = t.raw("skills");
  const edu = profile.education[0];
  // "2020.03. ~ 2026.02." → "2020.03 – 2026.02"
  const dash = (v: string) => v.replace(/\.(?=\s|$)/g, "").replace(/ ~ /g, " – ");

  return (
    <section id="about" className="gutter scroll-mt-16 py-24 md:py-36">
      <div className="grid gap-8 border-t border-foreground pt-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <h2 className="text-[36px] font-extrabold leading-[1.05] tracking-[-0.04em] md:text-[48px]">{t("profile_heading")}</h2>
        {/* 라벨 열은 목록 전체가 나눠 쓴다(subgrid). 폭은 가장 긴 라벨에 맞추되 최소 88px.
            88px 고정일 때 영문 'CERTIFICATIONS'·'EDUCATION'이 단어 중간에서 끊겼다 (2026-09-25) */}
        <ul className="border-t border-foreground sm:grid sm:grid-cols-[minmax(88px,max-content)_minmax(0,1fr)_auto] sm:gap-x-6 lg:border-t-0">
          <Row label={t("edu_label")} date={dash(edu.date)}>
            <Name>{isKo ? edu.school : edu.schoolEn}</Name>
            <Detail>
              {isKo ? edu.major : edu.majorEn} · {t("gpa")} · {isKo ? edu.degree : edu.degreeEn}
            </Detail>
          </Row>
          <Row label={t("training_label")} date={t("training_date")}>
            <Name>{t("training_title")}</Name>
            <Detail>{t("training_detail")}</Detail>
          </Row>
          {certifications.map((c, i) => (
            <Row key={c.name} label={i === 0 ? t("cert_label") : ""} date={c.date.replace(/\.$/, "")}>
              <Name>{isKo ? c.name : c.nameEn}</Name>
              <Detail>{isKo ? c.issuer : c.issuerEn}</Detail>
            </Row>
          ))}
          <Row label={t("military_label")} date={t("military_date")}>
            <Name>{t("military_title")}</Name>
          </Row>
        </ul>
      </div>

      {/* What I do — 개발자 포트폴리오에서 흔한 방식대로 스택을 영역별로 나눈다. 한 줄 = 영역 라벨 + 기술들.
          평평한 칩 12개는 어디가 주력인지 안 보였다 */}
      <h2 className="display mt-28 md:mt-40">{t("what_heading")}</h2>
      <dl className="mt-14 border-t border-foreground md:mt-20">
        {skills.map(({ g, items }) => (
          <div
            key={g}
            className="grid gap-x-6 gap-y-3 border-b border-border py-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:py-8 lg:gap-x-16"
          >
            <dt className="eyebrow pt-1 text-muted-foreground">{g}</dt>
            <dd className="flex flex-wrap gap-x-6 gap-y-2 text-[20px] font-semibold tracking-[-0.02em] md:text-[26px]">
              {items.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Row({ label, date, children }: { label: string; date: string; children: React.ReactNode }) {
  return (
    <li className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 border-b border-border py-5 sm:col-span-3 sm:grid-cols-subgrid">
      <span className="eyebrow col-span-2 text-muted-foreground sm:col-span-1 sm:pt-1.5">{label}</span>
      <span className="min-w-0">{children}</span>
      <span className="meta whitespace-nowrap pt-1.5 text-right text-muted-foreground">{date}</span>
    </li>
  );
}

function Name({ children }: { children: React.ReactNode }) {
  return <span className="block text-[18px] font-bold leading-snug tracking-[-0.02em] md:text-[20px]">{children}</span>;
}

function Detail({ children }: { children: React.ReactNode }) {
  return <span className="mt-1 block text-[15px] leading-[1.6] text-muted-foreground">{children}</span>;
}
