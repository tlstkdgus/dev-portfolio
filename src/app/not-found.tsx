import Link from "next/link";
import "@/app/globals.css";

// 루트 레이아웃이 <html>을 렌더하지 않으므로(로케일 레이아웃이 담당) 여기서 직접 감싼다.
// 없는 주소는 로케일을 알 수 없어 한/영을 함께 보여준다.
export default function NotFound() {
  return (
    <html lang="ko">
      <head>
        <title>404 — 신상현 Portfolio</title>
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="bg-ink font-sans text-ink-foreground antialiased">
        <main className="gutter flex min-h-svh flex-col justify-end pb-12 pt-8">
          <p className="meta text-ink-muted">Portfolio 2026 · 신상현 Sanghyeon Shin</p>
          <h1 className="wordmark mt-auto -ml-[0.04em]" style={{ fontSize: "clamp(5rem, 30vw, 22rem)" }}>
            404.
          </h1>
          <div className="mt-8 grid gap-6 border-t border-ink-foreground/25 pt-6 md:grid-cols-2">
            <p className="text-[16px] leading-[1.7]">
              찾는 페이지가 없습니다. 주소가 바뀌었거나 잘못 입력됐을 수 있습니다.
              <br />
              <Link href="/ko" className="hit mt-3 inline-block border-b-2 border-ink-foreground pb-1 font-semibold">
                메인으로 가기
              </Link>
            </p>
            <p lang="en" className="text-[16px] leading-[1.7]">
              This page doesn&apos;t exist. The address may have changed or been mistyped.
              <br />
              <Link href="/en" className="hit mt-3 inline-block border-b-2 border-ink-foreground pb-1 font-semibold">
                Go to the main page
              </Link>
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
