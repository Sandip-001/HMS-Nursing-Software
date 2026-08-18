// components/ipd-admission/admission-stepper.tsx
"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, title: "Patient & Admission Info", subtitle: "Collect patient & admission details" },
  { id: 2, title: "Package & Payment", subtitle: "Select package & collect deposit" },
  { id: 3, title: "Bed Allocation", subtitle: "Check availability & allocate bed" },
  { id: 4, title: "Review & Confirm", subtitle: "Review details & confirm admission" },
  { id: 5, title: "Admission Complete", subtitle: "Generate admission record" },
] as const;

interface AdmissionStepperProps {
  currentStep: number;
}

export function AdmissionStepper({ currentStep }: AdmissionStepperProps) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex min-w-[700px] items-start justify-between sm:min-w-0">
        {STEPS.map((step, idx) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <div key={step.id} className="flex flex-1 items-start last:flex-none">
              <div className="flex flex-col items-center gap-1.5 text-center">
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                    isCompleted && "bg-emerald-500 text-white",
                    isActive && "bg-blue-600 text-white ring-4 ring-blue-100",
                    !isCompleted && !isActive && "bg-slate-100 text-slate-400"
                  )}
                >
                  {isCompleted ? <Check className="h-5 w-5" /> : step.id}
                </div>
                <div className="max-w-[130px]">
                  <p
                    className={cn(
                      "text-xs font-medium leading-tight sm:text-sm",
                      isActive && "text-blue-600",
                      isCompleted && "text-emerald-600",
                      !isCompleted && !isActive && "text-slate-400"
                    )}
                  >
                    {step.title}
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-400 sm:text-xs">
                    {isCompleted ? "Completed" : isActive ? "In Progress" : "Pending"}
                  </p>
                </div>
              </div>
              {idx < STEPS.length - 1 && (
                <div
                  className={cn(
                    "mx-2 mt-4 h-[2px] flex-1 sm:mx-3",
                    isCompleted ? "bg-emerald-400" : "bg-slate-200"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}