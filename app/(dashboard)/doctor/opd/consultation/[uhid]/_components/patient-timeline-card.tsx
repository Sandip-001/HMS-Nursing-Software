"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import type { PatientFullProfile } from "@/lib/doctor/opd/opd-mock-data";

interface PatientTimelineCardProps {
  patient: PatientFullProfile;
  onViewFullHistory: () => void;
}

export function PatientTimelineCard({ patient, onViewFullHistory }: PatientTimelineCardProps) {
  const timelineEvents = [
    ...(patient.consultationHistory || []).map((c) => ({
      date: c.date,
      event: c.diagnosis,
      type: "consultation" as const,
    })),
    ...(patient.labHistory || []).slice(0, 2).map((l) => ({
      date: l.date,
      event: `Lab report: ${l.test} — ${l.result}`,
      type: "lab" as const,
    })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  const dotColor: Record<string, string> = {
    consultation: "bg-blue-500",
    lab: "bg-emerald-500",
    vitals: "bg-amber-500",
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-500" />
            Patient Timeline
          </h2>
          <Button variant="ghost" size="sm" className="text-blue-600 h-auto p-0" onClick={onViewFullHistory}>
            Full History
          </Button>
        </div>

        {timelineEvents.length > 0 ? (
          <div className="space-y-3">
            {timelineEvents.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs">
                <div className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${dotColor[item.type]}`} />
                <div className="min-w-0">
                  <p className="font-semibold text-slate-700">{item.date}</p>
                  <p className="text-slate-500 truncate">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 text-center py-4">No previous clinical events</p>
        )}
      </CardContent>
    </Card>
  );
}