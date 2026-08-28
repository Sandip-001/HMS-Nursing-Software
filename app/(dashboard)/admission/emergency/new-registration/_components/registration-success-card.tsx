// app/(dashboard)/admission-desk/emergency/new-registration/_components/registration-success-card.tsx
"use client";
import { useRouter } from "next/navigation";
import { CheckCircle2, Copy, Eye, Hash, ListChecks, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function RegistrationSuccessCard({ emergencyNumber, uhid, isExistingPatient, onRegisterAnother, onViewPatient }: {
  emergencyNumber: string; uhid: string; isExistingPatient: boolean; onRegisterAnother: () => void; onViewPatient: () => void;
}) {
  const router = useRouter();

  function copyToClipboard(value: string, label: string) {
    navigator.clipboard?.writeText(value);
    toast.success(`${label} copied to clipboard.`);
  }

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-emerald-200 bg-emerald-50/40 p-8 text-center">
      <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" />
      <h2 className="mt-4 text-xl font-bold text-slate-800">Patient Registered Successfully</h2>
      <p className="mt-1 text-sm text-slate-500">{isExistingPatient ? "Existing UHID linked to this emergency visit." : "A new UHID has been generated for this patient."}</p>

      <div className="mt-6 space-y-3">
        <button onClick={() => copyToClipboard(emergencyNumber, "Emergency Number")} className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-blue-300">
          <div className="flex items-center gap-2"><Hash className="h-4 w-4 text-red-600" /><div><p className="text-[10px] uppercase text-slate-400">Emergency Number</p><p className="text-base font-bold text-slate-800">{emergencyNumber}</p></div></div>
          <Copy className="h-4 w-4 text-slate-400" />
        </button>
        <button onClick={() => copyToClipboard(uhid, "UHID")} className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-blue-300">
          <div className="flex items-center gap-2"><ListChecks className="h-4 w-4 text-blue-600" /><div><p className="text-[10px] uppercase text-slate-400">{isExistingPatient ? "Existing UHID" : "New UHID Generated"}</p><p className="text-base font-bold text-slate-800">{uhid}</p></div></div>
          <Copy className="h-4 w-4 text-slate-400" />
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <Button variant="outline" className="flex-1 gap-2" onClick={onRegisterAnother}><UserPlus className="h-4 w-4" />Register Another Patient</Button>
        <Button className="flex-1 gap-2 bg-red-600 hover:bg-red-700" onClick={onViewPatient}><Eye className="h-4 w-4" />View Patient Details</Button>
      </div>
    </div>
  );
}