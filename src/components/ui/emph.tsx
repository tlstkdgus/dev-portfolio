"use client";

import { Fragment } from "react";
import { useLocale } from "next-intl";

// 문구 파일의 **강조**를 <strong>으로, [글자](https://…)를 새 창 링크로 바꾼다.
// 훑어 읽는 사람이 핵심 구절만 잡고, 실제 서비스는 바로 열어볼 수 있게.
const LINK = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;

function withLinks(text: string, keyBase: string, newTab: string) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    if (m.index > last) out.push(<Fragment key={`${keyBase}-t${last}`}>{text.slice(last, m.index)}</Fragment>);
    out.push(
      <a
        key={`${keyBase}-a${m.index}`}
        href={m[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-current/40 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
      >
        {m[1]}
        <span className="sr-only">{newTab}</span>
      </a>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(<Fragment key={`${keyBase}-t${last}`}>{text.slice(last)}</Fragment>);
  return out;
}

export function Emph({ text }: { text: string }) {
  const newTab = useLocale() === "ko" ? " (새 창)" : " (opens in a new tab)";
  const parts = text.split("**");
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-foreground">
            {withLinks(part, String(i), newTab)}
          </strong>
        ) : (
          <Fragment key={i}>{withLinks(part, String(i), newTab)}</Fragment>
        )
      )}
    </>
  );
}
