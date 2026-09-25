import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { OgCard } from "@/lib/og-card";

export const runtime = "edge";
export const alt = `${siteConfig.author.name.en} — ${siteConfig.author.title.en}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(<OgCard word="Portfolio" sub={siteConfig.author.title.en} />, { ...size });
}
