
"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  "Doctor Ward Round", "Review Vitals", "Review Lab Results", "Clinical Examination", "Diagnosis Update",
  "Treatment Plan", "Medicine Orders", "Investigation Orders", "Procedure Orders", "Discharge Decision",
];

interface RoundProgressTrackerProps {
  activeStep: number;
  onStepClick?: (step: number) => void;
}

export function RoundProgressTracker({ activeStep, onStepClick }: RoundProgressTrackerProps) {
  return (
    <div className="w-full">
      {/* Track row */}
      <div className="relative flex items-center">
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-slate-200" />
        <div
          className="absolute left-0 top-4 h-0.5 bg-blue-500 transition-all"
          style={{ width: `${((activeStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />
        {STEPS.map((label, i) => {
          const step = i + 1;
          const isActive = step === activeStep;
          const isCompleted = step < activeStep;
          return (
            <div key={label} className="relative z-10 flex flex-1 flex-col items-center gap-1.5">
              <button
                type="button"
                onClick={() => onStepClick?.(step)}
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-white text-xs font-semibold transition-colors",
                  isActive && "border-blue-600 bg-blue-600 text-white ring-4 ring-blue-100",
                  isCompleted && "border-blue-500 bg-blue-50 text-blue-600",
                  !isActive && !isCompleted && "border-slate-200 text-slate-400"
                )}
              >
                {isCompleted ? <Check className="h-3.5 w-3.5" /> : step}
              </button>
              <p
                className={cn(
                  "hidden text-center text-[10px] font-medium leading-tight sm:block",
                  isActive ? "text-blue-700" : "text-slate-400"
                )}
              >
                {label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Mobile: current step label only */}
      <p className="mt-3 text-center text-xs font-medium text-blue-700 sm:hidden">
        Step {activeStep} of {STEPS.length}: {STEPS[activeStep - 1]}
      </p>
    </div>
  );
}