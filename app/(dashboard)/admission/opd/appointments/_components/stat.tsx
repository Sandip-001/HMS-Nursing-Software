// app/(dashboard)/admission-desk/opd/appointments/_components/stat.tsx

import { TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatTone = "blue" | "violet" | "emerald" | "amber";

interface StatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: StatTone;
  subtitle?: string;
}

const toneStyles: Record<
  StatTone,
  {
    icon: string;
    glow: string;
    accent: string;
    trend: string;
  }
> = {
  blue: {
    icon: "bg-blue-100 text-blue-600",
    glow: "from-blue-50/80 to-white",
    accent: "bg-blue-500",
    trend: "text-blue-600",
  },
  violet: {
    icon: "bg-violet-100 text-violet-600",
    glow: "from-violet-50/80 to-white",
    accent: "bg-violet-500",
    trend: "text-violet-600",
  },
  emerald: {
    icon: "bg-emerald-100 text-emerald-600",
    glow: "from-emerald-50/80 to-white",
    accent: "bg-emerald-500",
    trend: "text-emerald-600",
  },
  amber: {
    icon: "bg-amber-100 text-amber-600",
    glow: "from-amber-50/80 to-white",
    accent: "bg-amber-500",
    trend: "text-amber-600",
  },
};

export function Stat({
  icon,
  label,
  value,
  tone,
  subtitle,
}: StatProps) {
  const style = toneStyles[tone];

  return (
    <Card className="group relative overflow-hidden border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-70",
          style.glow,
        )}
      />

      <div
        className={cn(
          "absolute bottom-0 left-0 top-0 w-1",
          style.accent,
        )}
      />

      <CardContent className="relative flex items-center gap-3 p-4">
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-sm",
            style.icon,
          )}
        >
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-slate-500">
            {label}
          </p>

          <div className="mt-0.5 flex items-end justify-between gap-2">
            <p className="truncate text-2xl font-bold tracking-tight text-slate-800">
              {value}
            </p>

            {subtitle && (
              <span
                className={cn(
                  "mb-1 flex shrink-0 items-center gap-0.5 text-[10px] font-semibold",
                  style.trend,
                )}
              >
                <TrendingUp className="h-3 w-3" />
                {subtitle}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}