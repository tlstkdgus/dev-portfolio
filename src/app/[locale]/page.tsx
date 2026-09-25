import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";
import { SelectedProjects } from "@/components/sections/selected-projects";
import { Principles } from "@/components/sections/principles";
import { Figures } from "@/components/sections/figures";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Footer } from "@/components/layout/footer";
import { Credentials } from "@/components/sections/credentials";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { JsonLd } from "@/components/seo/json-ld";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { SectionRail } from "@/components/ui/section-rail";
import { siteConfig } from "@/config/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === "ko";

  const name = isKo ? siteConfig.author.name.ko : siteConfig.author.name.en;
  const title = isKo ? siteConfig.author.title.ko : siteConfig.author.title.en;

  return {
    title: {
      absolute: `${name} | ${title}`,
    },
    description: siteConfig.seo.description,
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: {
        ko: `${siteConfig.url}/ko`,
        en: `${siteConfig.url}/en`,
        "x-default": `${siteConfig.url}/ko`,
      },
    },
    openGraph: {
      title: `${name} | ${title}`,
      description: siteConfig.seo.description,
      type: "profile",
      locale: isKo ? "ko_KR" : "en_US",
      alternateLocale: isKo ? "en_US" : "ko_KR",
      url: `${siteConfig.url}/${locale}`,
      siteName: `${siteConfig.author.name.en} Portfolio`,
    },
    twitter: {
      title: `${name} | ${title}`,
      description: siteConfig.seo.description,
    },
  };
}

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        {/* 흐름: 표지 → 소개(문장·증거·숫자) → What I do → How I work → Where I've worked(인턴이 메인) → 목차·대표 프로젝트 */}
        <Hero />
        <About />
        <Principles />
        <Figures />
        <Experience />
        <SelectedProjects />
        <Projects />
        <Credentials />
        <Contact />
      </main>
      <Footer />
      <SectionRail />
      <ScrollToTop />
      <JsonLd />
    </>
  );
}
