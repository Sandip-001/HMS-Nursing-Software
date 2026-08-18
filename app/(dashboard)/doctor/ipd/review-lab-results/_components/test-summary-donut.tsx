
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface TestSummaryDonutProps {
  normal: number;
  abnormal: number;
  borderline: number;
  pending: number;
}

const COLORS = { normal: "#10b981", abnormal: "#ef4444", borderline: "#f59e0b", pending: "#94a3b8" };

export function TestSummaryDonut({ normal, abnormal, borderline, pending }: TestSummaryDonutProps) {
  const total = normal + abnormal + borderline + pending;
  const data = [
    { name: "Normal", value: normal, color: COLORS.normal },
    { name: "Abnormal", value: abnormal, color: COLORS.abnormal },
    { name: "Borderline", value: borderline, color: COLORS.borderline },
    { name: "Pending", value: pending, color: COLORS.pending },
  ];

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-3">
        <CardTitle className="text-sm font-semibold text-slate-800">Latest Test Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-4 pt-4">
        <div className="relative h-28 w-28 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" innerRadius={35} outerRadius={54} paddingAngle={2} strokeWidth={0}>
                {data.map((d) => <Cell key={d.name} fill={d.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-lg font-bold text-slate-800">{total}</p>
            <p className="text-[10px] text-slate-400">Total Tests</p>
          </div>
        </div>
        <div className="flex-1 space-y-1.5">
          {data.map((d) => (
            <div key={d.name} className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} /> {d.name}
              </span>
              <span className="font-semibold text-slate-800">{d.value} ({total ? ((d.value / total) * 100).toFixed(1) : 0}%)</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}