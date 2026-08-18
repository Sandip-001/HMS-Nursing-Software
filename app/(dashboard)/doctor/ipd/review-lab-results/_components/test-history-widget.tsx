// app/ipd/doctor/review-lab-results/_components/test-history-widget.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TestHistoryEntry } from "@/types/doctor/ipd/lab-results-types";

export function TestHistoryWidget({ history }: { history: TestHistoryEntry[] }) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-3">
        <CardTitle className="text-sm font-semibold text-slate-800">Recent Test History</CardTitle>
        <button className="text-xs font-medium text-blue-600 hover:underline">View All</button>
      </CardHeader>
      <CardContent className="space-y-2.5 pt-4">
        {history.map((h) => (
          <div key={h.dateTime} className="flex items-center justify-between text-sm">
            <span className="text-slate-500">{h.dateTime}</span>
            <span className="font-semibold text-slate-800">{h.testCount} Tests</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}