"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  /** 캐러셀이 놓인 띠의 색. ink면 조작 막대를 밝게 */
  tone?: "light" | "ink";
}

// 발표 슬라이드·화면 캐러셀 (2026-09-24 다시 디자인: "캐러셀 디자인이 안 예쁘다").
// - 이미지 위에 검은 네모 버튼·숫자를 덮지 않는다. 조작은 모두 이미지 아래 막대로 뺐다.
// - 무대는 16:9 고정이라 비율이 다른 이미지로 넘겨도 페이지가 들썩이지 않는다(object-contain).
// - 넘길 때 CSS 교차 페이드. 현재 장과 앞뒤 장만 겹쳐 두고 opacity만 바꾼다(앞뒤 장은 미리 불러온다).
//   AnimatePresence로 붙였다 떼는 방식은 페이드가 끝나는 순간 한 프레임 동안 이전 장이 다시 보였다 (2026-09-24 상현 지적).
//   동작 줄이기 설정이면 전환 없이 바로 바뀐다(motion-reduce).
// - 썸네일로 바로 이동, 좌우 방향키, 모바일 스와이프.
export function ImageCarousel({ images, alt, tone = "light" }: ImageCarouselProps) {
  const isKo = useLocale() === "ko";
  const [current, setCurrent] = useState(0);
  // 방금까지 보이던 장. 썸네일로 멀리 건너뛸 때도 이 장이 사라지며 교차 페이드가 되도록 남겨 둔다
  const [last, setLast] = useState(0);
  const touchX = useRef<number | null>(null);
  const n = images.length;

  const go = useCallback(
    (i: number) => {
      setLast(current);
      setCurrent(((i % n) + n) % n);
    },
    [n, current]
  );
  const prev = useCallback(() => go(current - 1), [go, current]);
  const next = useCallback(() => go(current + 1), [go, current]);

  if (n === 0) return null;
  const ink = tone === "ink";
  const pad = (i: number) => String(i).padStart(2, "0");

  return (
    <figure
      role="group"
      aria-roledescription="carousel"
      aria-label={alt}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      }}
      className={ink ? "text-ink-foreground" : "text-foreground"}
    >
      {/* 무대 */}
      <div
        className="relative aspect-video w-full overflow-hidden"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
          touchX.current = null;
        }}
      >
        {images.map((src, i) => {
          // 현재 장·직전 장·바로 앞뒤 장만 그린다(나머지는 넘어올 때 그린다)
          const near = i === current || i === last || i === (current + 1) % n || i === (current - 1 + n) % n;
          if (!near) return null;
          const on = i === current;
          return (
            <div
              key={src}
              aria-hidden={!on}
              className={cn(
                "absolute inset-0 transition-opacity duration-300 ease-out motion-reduce:transition-none",
                on ? "opacity-100" : "opacity-0"
              )}
            >
              <Image
                src={src}
                alt={on ? `${alt} ${i + 1}` : ""}
                fill
                // 발표 슬라이드는 작은 글씨가 많아 기본 품질(75)에서 글자 가장자리가 뭉개졌다
                quality={90}
                sizes="(max-width: 1200px) 100vw, 1152px"
                loading="eager"
                className="object-contain"
              />
            </div>
          );
        })}
      </div>

      {/* 조작 막대 */}
      {n > 1 ? (
        <div className="mt-5 flex items-center gap-4 md:mt-6 md:gap-6">
          <p aria-live="polite" className="meta shrink-0 tabular-nums">
            <span className="font-bold">{pad(current + 1)}</span>
            <span className={ink ? "text-ink-muted" : "text-muted-foreground"}> / {pad(n)}</span>
          </p>

          <ol className="scrollbar-hide hidden min-w-0 flex-1 gap-2 overflow-x-auto sm:flex">
            {images.map((src, i) => (
              <li key={src} className="shrink-0">
                <button
                  onClick={() => go(i)}
                  aria-label={isKo ? `${i + 1}번째 이미지` : `Image ${i + 1}`}
                  aria-current={i === current ? "true" : undefined}
                  className={cn(
                    // 선택 테두리는 썸네일 안쪽 덧칠 층(::after)으로 그린다. 바깥 outline은 가로 스크롤 줄이 잘랐고,
                    // 안쪽 outline은 절대 위치 이미지가 덮었다
                    "relative block aspect-video w-16 overflow-hidden transition-opacity after:pointer-events-none after:absolute after:inset-0 after:border-2 after:border-transparent md:w-20",
                    i === current
                      ? cn("opacity-100", ink ? "after:border-accent-bright" : "after:border-accent")
                      : "opacity-45 hover:opacity-80"
                  )}
                >
                  <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              </li>
            ))}
          </ol>
          <span className="flex-1 sm:hidden" />

          <a
            href={images[current]}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "meta hidden min-h-11 shrink-0 items-center gap-1 underline decoration-current/30 underline-offset-4 transition-colors md:inline-flex",
              ink ? "hover:text-accent-bright" : "hover:text-accent"
            )}
          >
            {isKo ? "원본 크기" : "Full size"}
            <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            <span className="sr-only">{isKo ? " (새 창)" : " (opens in a new tab)"}</span>
          </a>

          <div className="flex shrink-0 gap-2">
            {[
              { fn: prev, Icon: ArrowLeft, label: isKo ? "이전 이미지" : "Previous image" },
              { fn: next, Icon: ArrowRight, label: isKo ? "다음 이미지" : "Next image" },
            ].map(({ fn, Icon, label }) => (
              <button
                key={label}
                onClick={fn}
                aria-label={label}
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors",
                  ink
                    ? "border-ink-foreground/35 hover:bg-ink-foreground hover:text-ink"
                    : "border-foreground/25 hover:bg-foreground hover:text-background"
                )}
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </figure>
  );
}
