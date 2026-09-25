import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  sub?: string;
  className?: string;
}

// 'Where I've worked.' 같은 초대형 섹션 제목. 본문과의 크기 차이가 곧 위계다.
export function SectionHeading({ children, sub, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <h2 className="display text-foreground">{children}</h2>
      {sub ? (
        <p className="mt-5 max-w-xl text-[16px] leading-[1.7] text-muted-foreground">{sub}</p>
      ) : null}
    </div>
  );
}
