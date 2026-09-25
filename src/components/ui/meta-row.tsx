import { cn } from "@/lib/utils";

interface MetaRowProps {
  items: React.ReactNode[];
  className?: string;
}

// 레퍼런스의 모든 슬라이드 상단에 있는 작은 메타 줄('Creative Presentation ··· 09 Jan, 2026').
// 항목이 셋이면 좌·중·우로 벌린다.
export function MetaRow({ items, className }: MetaRowProps) {
  return (
    <div className={cn("meta flex items-start justify-between gap-6", className)}>
      {items.map((item, i) => (
        <span
          key={i}
          className={cn(
            i === items.length - 1 && items.length > 1 && "text-right",
            i > 0 && i < items.length - 1 && "hidden sm:block"
          )}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
