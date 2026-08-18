
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface VitalSummaryCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  unit: string;
  recordedOn: string;
  color: "blue" | "red" | "emerald" | "purple" | "amber" | "sky";
  isAbnormal?: boolean;
}

const colorMap = {
  blue: "bg-blue-50 text-blue-600",
  red: "bg-red-50 text-red-600",
  emerald: "bg-emerald-50 text-emerald-600",
  purple: "bg-purple-50 text-purple-600",
  amber: "bg-amber-50 text-amber-600",
  sky: "bg-sky-50 text-sky-600",
};

export function VitalSummaryCard({ icon: Icon, label, value, unit, recordedOn, color, isAbnormal }: VitalSummaryCardProps) {
  return (
    <div className={cn(
      "rounded-xl border bg-white p-3.5 transition-shadow hover:shadow-sm",
      isAbnormal ? "border-red-200" : "border-slate-100"
    )}>
      <div className="mb-2 flex items-center gap-2">
        <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-lg", colorMap[color])}>
          <Icon className="h-3.5 w-3.5" />
        </span>
        <span className="text-xs font-medium text-slate-500">{label}</span>
      </div>
      <p className="text-xl font-bold text-slate-800">{value}</p>
      <p className="text-[11px] text-slate-400">{unit}</p>
      <p className="mt-1.5 text-[11px] text-slate-400">{recordedOn}</p>
    </div>
  );
}