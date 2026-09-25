"use client";

import { useTranslations } from "next-intl";
import { MetaRow } from "@/components/ui/meta-row";

// Contact의 검은 화면이 그대로 이어지는 마지막 메타 줄.
export function Footer() {
  const t = useTranslations("footer");
  const tm = useTranslations("meta");

  return (
    <footer className="gutter bg-ink pb-8 text-ink-muted">
      <MetaRow
        items={[t("copyright"), tm("role"), "Next.js · Vercel"]}
        className="border-t border-ink-foreground/15 pt-5"
      />
    </footer>
  );
}
