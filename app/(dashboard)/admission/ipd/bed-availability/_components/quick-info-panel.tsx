
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Building2, RefreshCcw, LucideIcon } from "lucide-react";
import type { DepartmentBedAvailability } from "@/types/bed-availability-types";

interface QuickInfoPanelProps {
  records: DepartmentBedAvailability[];
  lastUpdated: string;
}

export function QuickInfoPanel({ records, lastUpdated }: QuickInfoPanelProps) {
  const withPct = records.map((r) => ({ ...r, pct: r.totalBeds ? (r.available / r.totalBeds) * 100 : 0 }));
  const most = withPct.reduce((a, b) => (b.available > a.available ? b : a), withPct[0]);
  const least = withPct.reduce((a, b) => (b.available < a.available ? b : a), withPct[0]);
  const totalDepartments = new Set(records.map((r) => r.department)).size;

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-slate-800">Quick Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <InfoItem
          icon={TrendingUp}
          iconColor="text-emerald-600 bg-emerald-50"
          label="Most Availability"
          value={`${most.department} (${most.available} Beds)`}
        />
        <InfoItem
          icon={TrendingDown}
          iconColor="text-amber-600 bg-amber-50"
          label="Least Availability"
          value={`${least.department} - ${least.wardUnit.includes("(") ? least.wardUnit.match(/\((.*?)\)/)?.[1] ?? least.wardUnit : least.wardUnit} (${least.available} Bed)`}
        />
        <InfoItem icon={Building2} iconColor="text-blue-600 bg-blue-50" label="Total Departments" value={`${totalDepartments}`} />
        <InfoItem icon={RefreshCcw} iconColor="text-purple-600 bg-purple-50" label="Last Updated" value={lastUpdated} />
      </CardContent>
    </Card>
  );
}

function InfoItem({ icon: Icon, iconColor, label, value }: { icon: LucideIcon; iconColor: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${iconColor}`}>
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-sm font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  );
}