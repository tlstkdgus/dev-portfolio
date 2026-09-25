import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { workIds } from "@/lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["ko", "en"];
  const lastModified = new Date();

  const pages = [
    { path: "", priority: 1.0, changeFrequency: "monthly" as const },
    { path: "/career", priority: 0.8, changeFrequency: "monthly" as const },
    ...workIds.map((id) => ({ path: `/work/${id}`, priority: 0.7, changeFrequency: "monthly" as const })),
  ];

  return pages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${page.path}`,
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          ...Object.fromEntries(
            locales.map((l) => [l, `${siteConfig.url}/${l}${page.path}`])
          ),
          "x-default": `${siteConfig.url}/ko${page.path}`,
        },
      },
    }))
  );
}
