"use client";

import { useTranslations, useLocale } from "next-intl";
import { ArrowUpRight, Github, Linkedin, BookOpen } from "lucide-react";
import { profile } from "@/data/profile";
import { MetaRow } from "@/components/ui/meta-row";

// velog는 lucide에 아이콘이 없어 BookOpen(블로그)으로 대신한다
const links = [
  { key: "github", href: profile.links.github, text: "github.com/tlstkdgus", Icon: Github },
  { key: "linkedin", href: profile.links.linkedin, text: "LinkedIn", Icon: Linkedin },
  { key: "blog", href: profile.links.blog, text: "velog.io/@tlstkdgus", Icon: BookOpen },
] as const;

export function Contact() {
  const t = useTranslations("contact");
  const tm = useTranslations("meta");
  const isKo = useLocale() === "ko";

  return (
    <section
      id="contact"
      className="gutter flex min-h-[80svh] scroll-mt-16 flex-col bg-ink pb-10 pt-8 text-ink-foreground"
    >
      <MetaRow items={[tm("deck"), tm("location")]} className="text-ink-muted" />

      <div className="flex flex-1 flex-col justify-end pt-24">
        <h2 className="wordmark -ml-[0.04em]" style={{ fontSize: "clamp(3.5rem, 16vw, 15rem)" }}>
          {t("heading")}
        </h2>
        <p className="mt-8 max-w-md text-[16px] leading-[1.7] text-ink-muted">{t("description")}</p>

        <a
          href={`mailto:${profile.links.email}`}
          className="hit mt-6 inline-flex w-fit items-center gap-2 border-b-2 border-ink-foreground pb-1 text-[24px] font-bold tracking-[-0.02em] transition-colors hover:border-accent-bright hover:text-accent-bright md:text-[40px]"
        >
          {profile.links.email}
          <ArrowUpRight aria-hidden="true" className="h-6 w-6 md:h-9 md:w-9" />
        </a>

        <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-4 border-t border-ink-foreground/25 pt-6">
          {links.map(({ key, href, text, Icon }) => (
            <li key={key}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hit inline-flex items-center gap-2.5 text-[15px] font-semibold text-ink-foreground/85 transition-colors hover:text-accent-bright"
              >
                <Icon aria-hidden="true" className="h-5 w-5" />
                <span className="sr-only">{t(key)}: </span>
                {text}
                <span className="sr-only">{isKo ? " (새 창)" : " (opens in a new tab)"}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
