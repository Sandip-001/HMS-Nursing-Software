
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface PendingStatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  sublabel: string;
  color: "blue" | "amber" | "purple" | "emerald";
}

const colorMap = {
  blue: "bg-blue-50 text-blue-600",
  amber: "bg-amber-50 text-amber-600",
  purple: "bg-purple-50 text-purple-600",
  emerald: "bg-emerald-50 text-emerald-600",
};

export function PendingStatCard({ icon: Icon, label, value, sublabel, color }: PendingStatCardProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="flex items-center gap-3 py-4">
        <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", colorMap[color])}>
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-xs text-slate-400">{label}</p>
          <p className="text-lg font-bold text-slate-800">{value}</p>
          <p className="truncate text-xs text-slate-400">{sublabel}</p>
        </div>
      </CardContent>
    </Card>
  );
}