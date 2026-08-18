
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LabHighlight } from "@/types/doctor/ipd/ward-round-types";

export function LabHighlightsWidget({ labs }: { labs: LabHighlight[] }) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-3">
        <CardTitle className="text-sm font-semibold text-slate-800">Recent Lab Highlights</CardTitle>
        <button className="text-xs font-medium text-blue-600 hover:underline">View All</button>
      </CardHeader>
      <CardContent className="space-y-2.5 pt-4">
        {labs.map((l) => (
          <div key={l.name} className="flex items-center justify-between text-sm">
            <span className="text-slate-600">{l.name}</span>
            <span className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-800">{l.value}</span>
              <span className="text-xs text-slate-400">({l.date})</span>
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}