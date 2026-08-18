
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface AvailabilityOverviewChartProps {
  available: number;
  occupied: number;
  blocked: number;
}

const COLORS = { available: "#10b981", occupied: "#3b82f6", blocked: "#f87171" };

export function AvailabilityOverviewChart({ available, occupied, blocked }: AvailabilityOverviewChartProps) {
  const total = available + occupied + blocked;
  const data = [
    { name: "Available", value: available, color: COLORS.available },
    { name: "Occupied", value: occupied, color: COLORS.occupied },
    { name: "Blocked / Maintenance", value: blocked, color: COLORS.blocked },
  ];

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-slate-800">Availability Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative mx-auto h-56 w-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" innerRadius={65} outerRadius={95} paddingAngle={2} strokeWidth={0}>
                {data.map((d) => <Cell key={d.name} fill={d.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-slate-800">{available}</p>
            <p className="text-xs text-slate-400">Available</p>
            <p className="text-xs text-slate-400">({((available / total) * 100).toFixed(2)}%)</p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {data.map((d) => (
            <div key={d.name} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-slate-600">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                {d.name}
              </span>
              <span className="font-medium text-slate-800">{d.value} ({((d.value / total) * 100).toFixed(2)}%)</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}