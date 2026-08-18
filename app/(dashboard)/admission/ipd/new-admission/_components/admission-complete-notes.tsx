// app/ipd/new-admission/_components/admission-complete-notes.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Info, ArrowRight, Bed, ClipboardCheck, Stethoscope } from "lucide-react";

const IMPORTANT_INFO = [
  "Patient has been admitted successfully.",
  "Bed has been allocated and reserved.",
  "Advance payment has been collected.",
  "Admission record has been created.",
  "All departments have been notified.",
  "Patient can now be transferred to the ward.",
];

export function ImportantInformationCard() {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          <Info className="h-4 w-4 text-blue-600" />
          Important Information
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
        {IMPORTANT_INFO.map((text) => (
          <div key={text} className="flex items-start gap-2 text-sm text-slate-600">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span>{text}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

interface NextStepsCardProps {
  onTransferToWard?: () => void;
  onNursingAssessment?: () => void;
  onDoctorAssessment?: () => void;
}

export function NextStepsCard({ onTransferToWard, onNursingAssessment, onDoctorAssessment }: NextStepsCardProps) {
  const steps = [
    { label: "Transfer patient to the ward", icon: Bed, onClick: onTransferToWard },
    { label: "Nursing assessment to be completed", icon: ClipboardCheck, onClick: onNursingAssessment },
    { label: "Doctor assessment and orders to follow", icon: Stethoscope, onClick: onDoctorAssessment },
  ];

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-slate-800">Next Steps</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {steps.map((step) => (
          <button
            key={step.label}
            type="button"
            onClick={step.onClick}
            className="flex w-full items-center justify-between rounded-md border border-slate-200 px-3 py-2.5 text-left text-sm text-slate-700 transition-colors hover:bg-slate-50"
          >
            <span className="flex items-center gap-2">
              <step.icon className="h-4 w-4 text-blue-600" />
              {step.label}
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
          </button>
        ))}
      </CardContent>
    </Card>
  );
}