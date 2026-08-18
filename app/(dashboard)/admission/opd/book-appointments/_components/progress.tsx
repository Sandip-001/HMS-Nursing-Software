//app/admission-desk/opd/book-appointments/_components/progress.tsx

import { CheckCircle2 } from "lucide-react";


const steps = [
  "Patient Type",
  "Patient Details",
  "Doctor & Slot",
  "Review",
  "Payment",
];

export function Progress({ step }: { step: number }) {
  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-[650px] items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
        {steps.map((label, index) => (
          <div key={label} className="flex items-center gap-2">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${index <= step ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"}`}
            >
              {index < step ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
            </span>
            <span
              className={`text-xs font-medium ${index <= step ? "text-blue-700" : "text-slate-400"}`}
            >
              {label}
            </span>
            {index < steps.length - 1 && (
              <span className="ml-3 h-px w-10 bg-slate-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}