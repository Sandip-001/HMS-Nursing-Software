
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PendingStep } from "@/types/pending-admission-types";

const STEPS: { key: PendingStep | "Complete"; label: string }[] = [
  { key: "Awaiting Package & Payment", label: "Patient & Admission Info" },
  { key: "Awaiting Bed Allocation", label: "Package & Payment" },
  { key: "Awaiting Review & Confirm", label: "Bed Allocation" },
  { key: "Complete", label: "Review & Confirm" },
];

// Maps the record's currentStep (the step it's STUCK on / awaiting) to an index of completed steps
const stepIndexMap: Record<PendingStep, number> = {
  "Awaiting Package & Payment": 0,
  "Awaiting Bed Allocation": 1,
  "Awaiting Review & Confirm": 2,
};

interface AdmissionProgressTrackerProps {
  currentStep: PendingStep;
}

export function AdmissionProgressTracker({ currentStep }: AdmissionProgressTrackerProps) {
  const activeIndex = stepIndexMap[currentStep];

  return (
    <div className="flex items-center overflow-x-auto pb-2">
      {STEPS.map((step, i) => {
        const isCompleted = i < activeIndex;
        const isActive = i === activeIndex;
        const isPending = i > activeIndex;

        return (
          <div key={step.key} className="flex min-w-[110px] flex-1 items-center last:min-w-0 last:flex-none">
            <div className="flex flex-col items-center gap-1.5 text-center">
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                  isCompleted && "border-emerald-500 bg-emerald-500 text-white",
                  isActive && "border-blue-600 bg-blue-600 text-white ring-4 ring-blue-100",
                  isPending && "border-slate-200 bg-white text-slate-400"
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <div className="max-w-[100px]">
                <p className={cn(
                  "text-xs font-medium leading-tight",
                  isCompleted && "text-emerald-600",
                  isActive && "text-blue-700",
                  isPending && "text-slate-400"
                )}>
                  {step.label}
                </p>
                <p className={cn(
                  "text-[10px]",
                  isCompleted && "text-emerald-500",
                  isActive && "text-blue-500",
                  isPending && "text-slate-300"
                )}>
                  {isCompleted ? "Completed" : isActive ? "In Progress" : "Pending"}
                </p>
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "mx-1 h-0.5 flex-1 rounded-full",
                  i < activeIndex ? "bg-emerald-400" : "bg-slate-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}