import { siteConfig } from "@/config/site";
import { LOGO_PATH, LOGO_VIEWBOX } from "@/components/ui/logo-mark";

// 공유 미리보기 카드 — 사이트 첫 화면(흰 바탕 워드마크 표지)과 같은 톤, 왼쪽 위에 SH 모노그램 (2026-09-24).
// edge 런타임에는 한글 폰트가 없어 한글이 두부(□)로 깨지므로 영문만 쓴다.
export function OgCard({ word, sub, wordSize = 212 }: { word: string; sub: string; wordSize?: number }) {
  return (
    <div
      style={{
        background: "#ffffff",
        color: "#0a0a0a",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "48px 56px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22, color: "#5c5c5c" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="64" height="56" viewBox={LOGO_VIEWBOX}>
            <path fill="#0a0a0a" d={LOGO_PATH} />
          </svg>
          <span style={{ color: "#0a0a0a", fontWeight: 700 }}>{siteConfig.author.name.en}</span>
        </div>
        <span style={{ color: "#1f36ff" }}>{siteConfig.url.replace("https://", "")}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            borderBottom: "2px solid #0a0a0a",
            paddingBottom: 14,
            marginBottom: 8,
          }}
        >
          {/* 한 줄 소개가 길어서 URL과 같은 줄에 두면 겹쳤다 — URL은 위 줄로 옮겼다 */}
          <span>{sub}</span>
        </div>
        <div style={{ fontSize: wordSize, fontWeight: 800, letterSpacing: `-${Math.round(wordSize * 0.055)}px`, lineHeight: 1 }}>
          {word}
        </div>
      </div>
    </div>
  );
}
