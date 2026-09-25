import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { siteConfig } from "@/config/site";

export function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: profile.name.en,
    alternateName: profile.name.ko,
    jobTitle: profile.title.en,
    url: siteConfig.url,
    sameAs: [
      profile.links.github,
      profile.links.linkedin,
      profile.links.blog,
    ].filter(Boolean),
    knowsAbout: siteConfig.seo.keywords,
    alumniOf: profile.education.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu.schoolEn,
    })),
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${siteConfig.author.name.en} — ${siteConfig.author.title.en} Portfolio`,
    description: siteConfig.seo.description,
    url: siteConfig.url,
    mainEntity: { "@id": `${siteConfig.url}/#person` },
    inLanguage: ["ko", "en"],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${siteConfig.author.name.en} Portfolio`,
    alternateName: `${siteConfig.author.name.ko} 포트폴리오`,
    url: siteConfig.url,
    inLanguage: ["ko", "en"],
    author: { "@id": `${siteConfig.url}/#person` },
  };

  const creativeWorkSchemas = projects.map((project) => ({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.titleEn,
    description: project.goalsEn.join(". "),
    author: { "@id": `${siteConfig.url}/#person` },
    keywords: project.tags,
    ...(project.url && { url: project.url }),
  }));

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(profilePageSchema)}
      </script>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(webSiteSchema)}
      </script>
      {creativeWorkSchemas.map((schema, i) => (
        <script key={`work-${i}`} type="application/ld+json" suppressHydrationWarning>
          {JSON.stringify(schema)}
        </script>
      ))}
    </>
  );
}

export function CareerJsonLd({ locale }: { locale: string }) {
  const isKo = locale === "ko";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isKo ? "포트폴리오" : "Portfolio",
        item: `${siteConfig.url}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isKo ? "커리어 스토리" : "Career Story",
        item: `${siteConfig.url}/${locale}/career`,
      },
    ],
  };

  const name = isKo ? siteConfig.author.name.ko : siteConfig.author.name.en;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: isKo
      ? `${name} 커리어 스토리`
      : `${siteConfig.author.name.en} Career Story`,
    description: isKo
      ? "각 성과의 배경, 역할, 결과와 교훈을 상세히 소개합니다."
      : "Detailed background, role, results and lessons behind each achievement.",
    url: `${siteConfig.url}/${locale}/career`,
    inLanguage: isKo ? "ko" : "en",
    author: { "@id": `${siteConfig.url}/#person` },
    publisher: { "@id": `${siteConfig.url}/#person` },
    mainEntityOfPage: `${siteConfig.url}/${locale}/career`,
  };

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(articleSchema)}
      </script>
    </>
  );
}
