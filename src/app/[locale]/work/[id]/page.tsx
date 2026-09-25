import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WorkDetail } from "@/components/work/work-detail";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { getWork, workIds } from "@/lib/work";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => workIds.map((id) => ({ locale, id })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const work = getWork(id);
  if (!work) return {};
  const isKo = locale === "ko";
  const { entry } = work;
  const name = isKo ? entry.name.ko : entry.name.en;
  const desc = entry.selected
    ? (isKo ? entry.selected.headline.ko : entry.selected.headline.en).replace(/\n/g, " ")
    : isKo
      ? entry.desc.ko
      : entry.desc.en;
  const path = `/work/${id}`;
  const author = isKo ? siteConfig.author.name.ko : siteConfig.author.name.en;

  return {
    title: name,
    description: desc,
    alternates: {
      canonical: `${siteConfig.url}/${locale}${path}`,
      languages: {
        ko: `${siteConfig.url}/ko${path}`,
        en: `${siteConfig.url}/en${path}`,
        "x-default": `${siteConfig.url}/ko${path}`,
      },
    },
    openGraph: {
      title: `${name} | ${author}`,
      description: desc,
      type: "article",
      locale: isKo ? "ko_KR" : "en_US",
      url: `${siteConfig.url}/${locale}${path}`,
      siteName: `${siteConfig.author.name.en} Portfolio`,
    },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { id } = await params;
  if (!getWork(id)) notFound();

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <WorkDetail id={id} />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
