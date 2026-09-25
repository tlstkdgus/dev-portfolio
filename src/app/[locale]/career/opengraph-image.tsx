import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { OgCard } from "@/lib/og-card";

export const runtime = "edge";
export const alt = `Case Studies | ${siteConfig.author.name.en}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function CareerOgImage() {
  return new ImageResponse(
    <OgCard word="Case Studies." sub="Background, role, results, and lessons" wordSize={150} />,
    { ...size }
  );
}
