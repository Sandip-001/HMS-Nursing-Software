// app/(dashboard)/pharmacy/opd/orders/_components/pharmacy-order-stats.tsx
import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const toneClasses = {
  blue: "bg-blue-100 text-blue-600 border-blue-200",
  emerald: "bg-emerald-100 text-emerald-600 border-emerald-200",
  amber: "bg-amber-100 text-amber-600 border-amber-200",
  violet: "bg-violet-100 text-violet-600 border-violet-200",
  rose: "bg-rose-100 text-rose-600 border-rose-200",
} as const;

export function PharmacyOrderStat({
  label,
  value,
  icon,
  tone,
  subtitle,
}: {
  label: string;
  value: string;
  icon: ReactNode;
  tone: keyof typeof toneClasses;
  subtitle?: string;
}) {
  return (
    <Card className="border-slate-200 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="flex items-center gap-3 p-4">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border",
            toneClasses[tone],
          )}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-slate-500">{label}</p>
          <p className="mt-0.5 text-xl font-bold text-slate-800">{value}</p>
          {subtitle && (
            <p className="mt-0.5 truncate text-[10px] text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
