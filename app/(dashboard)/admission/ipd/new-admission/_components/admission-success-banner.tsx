// app/ipd/new-admission/_components/admission-success-banner.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Printer } from "lucide-react";

interface AdmissionSuccessBannerProps {
  admissionId: string;
  admissionDateTime: string;
  onPrint?: () => void;
}

export function AdmissionSuccessBanner({ admissionId, admissionDateTime, onPrint }: AdmissionSuccessBannerProps) {
  return (
    <Card className="border-emerald-200 bg-emerald-50/60 shadow-sm">
      <CardContent className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500">
            <CheckCircle2 className="h-6 w-6 text-white" />
          </span>
          <div>
            <p className="text-base font-semibold text-emerald-700">Admission Completed Successfully!</p>
            <p className="text-sm text-emerald-600/80">
              The patient has been admitted and bed allocated successfully. All admission details have been recorded in the system.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-lg border border-emerald-200 bg-white px-4 py-3">
          <div>
            <p className="text-xs text-slate-400">Admission ID</p>
            <p className="text-sm font-bold text-emerald-600">{admissionId}</p>
            <p className="mt-1 text-xs text-slate-400">Admission Date &amp; Time</p>
            <p className="text-sm font-medium text-slate-700">{admissionDateTime}</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2" onClick={onPrint}>
            <Printer className="h-4 w-4" /> Print
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}