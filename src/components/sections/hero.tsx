"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { MetaRow } from "@/components/ui/meta-row";
import { Emph } from "@/components/ui/emph";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

// 첫 화면 (HANDOFF §G-1, 2026-09-24): 사진 · 포지셔닝 문장(h1) · 소개 한 문단 · 숫자 4개를 맨 위에 둔다.
// 이전 B안(2026-09-24)은 첫 화면이 'Portfolio' 워드마크 표지였는데, 1440×900에서 표지 글자와 역할 한 줄만 보이고
// 이름·헤드라인·숫자는 한 번 스크롤해야 나왔다(채용 담당자 첫 화면 5초 기준에 걸림). 표지는 뺐고,
// 메타 줄(이름·역할·이메일)만 소개 위에 작게 남겼다.
// 수용 기준: 1440×900·390×844에서 스크롤 없이 이름·헤드라인·숫자 첫 줄이 보인다.
// 폰에서는 숫자를 소개 문단보다 먼저 보이게 둔다(문단이 길어 숫자가 첫 화면 밖으로 밀렸다). 데스크톱은 문단 → 숫자.
// 자기소개는 이 한 번뿐이다. 학력·교육·자격증·병역은 바로 아래 #about의 Profile 블록에 있다.
// 데스크톱은 첫 화면 높이를 꽉 채운다(min-h-svh). 헤드라인 줄이 남는 높이를 가져가(1fr) 메타 줄은 위,
// 숫자는 화면 아래에 붙는다. 내용만큼만 높이를 쓰면 1440×900에서 숫자 아래가 200px 넘게 비었다 (2026-09-25 상현 지적).
// 1536px 이상 큰 화면에서는 제목·사진·소개·숫자를 한 단계 키운다. 1440 기준 크기 그대로면 2000×1134에서
// 메타 줄과 헤드라인 사이가 400px 가까이 비었다 (2026-09-25). 1440 이하는 크기가 같다(clamp의 vw 구간).
// 사진은 원본 컬러 그대로 — 흑백은 영정사진처럼 보여 쓰지 않는다(상현 지적).
export function Hero() {
  const t = useTranslations("hero");
  const tm = useTranslations("meta");
  const isKo = useLocale() === "ko";
  const metrics: { v: string; k: string }[] = t.raw("metrics");

  return (
    <section
      id="hero"
      className="gutter grid grid-cols-1 gap-x-14 pb-16 pt-20 [grid-template-areas:'meta'_'photo'_'lead'_'metrics'_'summary'] md:min-h-svh md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] md:grid-rows-[auto_1fr_auto_auto] md:pb-16 md:pt-16 md:[grid-template-areas:'meta_meta'_'photo_lead'_'photo_summary'_'metrics_metrics']"
    >
      <MetaRow
        items={[
          `${t("name")} · ${tm("role")}`,
          <a
            key="email"
            href={`mailto:${profile.links.email}`}
            className="whitespace-nowrap underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
          >
            {profile.links.email}
          </a>,
        ]}
        className="mb-8 border-b border-foreground pb-3 text-muted-foreground [grid-area:meta] md:mb-6"
      />

      {/* 원본(689×886) 비율 그대로, 컬러 */}
      <div className="w-24 [grid-area:photo] md:w-full md:max-w-72 md:self-end 2xl:max-w-96">
        <Image
          src="/profile.jpg"
          alt={isKo ? "신상현 프로필 사진" : "Portrait of Sanghyeon Shin"}
          width={689}
          height={886}
          priority
          className="h-auto w-full"
          sizes="(max-width: 768px) 96px, (max-width: 1536px) 288px, 384px"
        />
      </div>

      <h1
        className="mt-6 font-extrabold leading-[1.2] tracking-[-0.045em] [grid-area:lead] md:mt-0 md:self-end"
        style={{ fontSize: "clamp(1.875rem, 3.5vw, 4.5rem)" }}
      >
        {/* 줄마다 따로 균형을 맞춘다. 한 덩어리에 text-balance를 걸면 강제 줄바꿈 사이는 균형이 안 잡혀
            폰(390px)에서 "기획자," 한 단어만 따로 떨어졌다 */}
        {t("lead")
          .split("\n")
          .map((line) => (
            <span key={line} className="block text-balance">
              {line.trim()}
            </span>
          ))}
      </h1>

      {/* 소개는 두 문단(빈 줄로 나눔): 인턴에서 한 일 → 그 밖의 서비스에서 알게 된 것·지향 (2026-09-25 상현 요청) */}
      <div className="mt-8 max-w-[52em] space-y-2 text-[17px] leading-[1.75] text-foreground/80 [grid-area:summary] md:mt-6 md:text-[18px] 2xl:text-[21px]">
        {t("summary")
          .split("\n\n")
          .map((para) => (
            <p key={para.slice(0, 12)}>
              <Emph text={para} />
            </p>
          ))}
      </div>

      <dl className="mt-8 grid grid-cols-2 border-t border-foreground [grid-area:metrics] md:mt-8 md:grid-cols-4">
        {metrics.map(({ v, k }, i) => (
          <div
            key={k}
            className={cn(
              "flex flex-col border-border pb-2 pt-5",
              i % 2 === 1 ? "border-l pl-4" : "pr-4",
              i >= 2 && "border-t md:border-t-0",
              i > 0 ? "md:border-l md:px-8" : "md:pr-8"
            )}
          >
            <dt className="order-last mt-2 text-[14px] font-medium leading-snug text-muted-foreground md:text-[15px]">{k}</dt>
            <dd className="text-[30px] font-extrabold leading-none tracking-[-0.05em] md:text-[clamp(2rem,3.2vw,4rem)]">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
