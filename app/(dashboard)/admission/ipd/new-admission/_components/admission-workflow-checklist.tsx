// components/ipd-admission/admission-workflow-checklist.tsx
"use client";

import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChecklistItem {
  label: string;
  sublabel: string;
  status: "completed" | "pending" | "in-progress";
}

interface AdmissionWorkflowChecklistProps {
  items: ChecklistItem[];
}

export function AdmissionWorkflowChecklist({ items }: AdmissionWorkflowChecklistProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <p className="mb-4 text-sm font-semibold text-slate-700">Admission Workflow Checklist</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/60 p-3 text-center"
          >
            <span className="text-sm font-medium text-slate-700">{item.label}</span>
            <span className="text-xs text-slate-400">{item.sublabel}</span>
            <span
              className={cn(
                "flex items-center gap-1 text-xs font-medium",
                item.status === "completed" && "text-emerald-600",
                item.status === "pending" && "text-amber-500",
                item.status === "in-progress" && "text-blue-600"
              )}
            >
              {item.status === "completed" && <CheckCircle2 className="h-3.5 w-3.5" />}
              {item.status === "pending" && <Circle className="h-3.5 w-3.5" />}
              {item.status === "in-progress" && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {item.status === "completed" ? "Completed" : item.status === "in-progress" ? "In Progress" : "Pending"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}