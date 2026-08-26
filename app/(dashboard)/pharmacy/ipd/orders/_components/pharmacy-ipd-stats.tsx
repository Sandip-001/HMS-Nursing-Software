// app/(dashboard)/pharmacy/ipd/orders/_components/pharmacy-ipd-stats.tsx
import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Tone = "blue" | "violet" | "emerald" | "amber" | "rose";
const tones: Record<Tone, { icon: string; accent: string; surface: string }> = {
  blue: { icon: "bg-blue-100 text-blue-600", accent: "bg-blue-500", surface: "from-blue-50/70" },
  violet: { icon: "bg-violet-100 text-violet-600", accent: "bg-violet-500", surface: "from-violet-50/70" },
  emerald: { icon: "bg-emerald-100 text-emerald-600", accent: "bg-emerald-500", surface: "from-emerald-50/70" },
  amber: { icon: "bg-amber-100 text-amber-600", accent: "bg-amber-500", surface: "from-amber-50/70" },
  rose: { icon: "bg-rose-100 text-rose-600", accent: "bg-rose-500", surface: "from-rose-50/70" },
};

export function PharmacyIpdStat({ label, value, subtitle, icon, tone }: { label: string; value: string; subtitle: string; icon: ReactNode; tone: Tone }) {
  const style = tones[tone];
  return (
    <Card className="relative overflow-hidden border-slate-200 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className={cn("absolute inset-0 bg-gradient-to-br to-white", style.surface)} />
      <div className={cn("absolute bottom-0 left-0 top-0 w-1", style.accent)} />
      <CardContent className="relative flex items-center gap-3 p-4">
        <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", style.icon)}>{icon}</div>
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-slate-500">{label}</p>
          <p className="mt-0.5 text-2xl font-bold tracking-tight text-slate-800">{value}</p>
          <p className="mt-0.5 truncate text-[10px] text-slate-400">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  );
}