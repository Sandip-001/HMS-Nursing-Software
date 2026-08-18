
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { NormalRange } from "@/types/doctor/ipd/vitals-types";

export function NormalRangesWidget({ ranges }: { ranges: NormalRange[] }) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-3">
        <CardTitle className="text-sm font-semibold text-slate-800">Normal Ranges</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2.5 pt-4">
        {ranges.map((r) => (
          <div key={r.label} className="flex items-center justify-between text-sm">
            <span className="text-slate-500">{r.label}</span>
            <span className="font-medium text-slate-700">{r.range}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}