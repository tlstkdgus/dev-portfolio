"use client";

import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      // 인트엘 컨텍스트가 깨졌을 수 있어 <html lang>으로 언어를 판단한다
      const isKo = typeof document === "undefined" || document.documentElement.lang !== "en";
      return (
        <div role="alert" className="gutter flex min-h-svh flex-col justify-end bg-ink pb-12 text-ink-foreground">
          <h2 className="display">{isKo ? "화면을 그리지 못했습니다." : "This page failed to render."}</h2>
          <p className="mt-6 max-w-md text-[16px] leading-[1.7] text-ink-muted">
            {isKo
              ? "일시적인 문제일 수 있습니다. 새로고침하면 대부분 해결됩니다. 계속되면 a91945840@gmail.com 으로 알려주세요."
              : "It may be temporary; reloading usually fixes it. If it keeps happening, please let me know at a91945840@gmail.com."}
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[16px] font-semibold">
            <button
              onClick={() => window.location.reload()}
              className="hit cursor-pointer border-b-2 border-ink-foreground pb-1"
            >
              {isKo ? "새로고침" : "Reload"}
            </button>
            <a href={isKo ? "/ko" : "/en"} className="hit pb-1 text-ink-muted hover:text-ink-foreground">
              {isKo ? "메인으로" : "Main page"}
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
