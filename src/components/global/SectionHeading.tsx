import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  headline: string;
  body?: ReactNode;
  align?: "left" | "center";
  className?: string;
  size?: "md" | "lg" | "xl";
}

export function SectionHeading({ eyebrow, headline, body, align = "left", className, size = "lg" }: SectionHeadingProps) {
  const alignCls = align === "center" ? "text-center mx-auto" : "";
  const headlineCls = {
    md: "text-3xl md:text-4xl",
    lg: "text-4xl md:text-5xl lg:text-[3.5rem]",
    xl: "text-5xl md:text-6xl lg:text-7xl",
  }[size];
  return (
    <div className={cn("max-w-3xl", alignCls, className)}>
      {eyebrow ? <div className="mb-5 eyebrow">{eyebrow}</div> : null}
      <h2 className={cn("font-display font-medium leading-[1.05] tracking-tight", headlineCls)}>{headline}</h2>
      {body ? <div className="mt-5 text-lg text-muted-foreground max-w-2xl">{body}</div> : null}
    </div>
  );
}
