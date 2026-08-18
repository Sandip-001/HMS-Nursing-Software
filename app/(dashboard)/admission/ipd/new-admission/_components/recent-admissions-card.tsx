// components/ipd-admission/recent-admissions-card.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RecentAdmission } from "@/types/admission-types";


const MOCK_RECENT: RecentAdmission[] = [
  { id: "IPD240520-0015", patientName: "Ramesh Gupta", date: "20 May 2024", status: "Admitted" },
  { id: "IPD240520-0014", patientName: "Sunita Devi", date: "20 May 2024", status: "Admitted" },
  { id: "IPD240520-0013", patientName: "Vikram Singh", date: "19 May 2024", status: "Pending" },
  { id: "IPD240520-0012", patientName: "Pooja Sharma", date: "19 May 2024", status: "Pending" },
  { id: "IPD240520-0011", patientName: "Mohd. Faizan", date: "18 May 2024", status: "Pending" },
];

export function RecentAdmissionsCard() {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold text-slate-800">Recent Admissions</CardTitle>
        <Button variant="link" size="sm" className="h-auto p-0 text-xs text-blue-600">
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {MOCK_RECENT.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-sm">
            <div>
              <p className="font-medium text-slate-700">{item.id}</p>
              <p className="text-xs text-slate-400">{item.patientName} · {item.date}</p>
            </div>
            <Badge
              variant="outline"
              className={
                item.status === "Admitted"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                  : "border-amber-200 bg-amber-50 text-amber-600"
              }
            >
              {item.status}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}