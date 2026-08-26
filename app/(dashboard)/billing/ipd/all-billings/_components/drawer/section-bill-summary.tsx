// app/(dashboard)/billing/ipd/_components/drawer/section-bill-summary.tsx
"use client";
import { BedDouble, CheckCircle2, Info, PhoneCall, Stethoscope, ToggleLeft, ToggleRight, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { BillingPatient } from "@/types/billing/ipd/billing-types";
import { computeBilling, formatCurrency } from "@/lib/billing/ipd/billing-calculations";
import { BillingStatusBadge } from "../billing-badges";

export function SectionBillSummary({ patient }: { patient: BillingPatient }) {
  const computed = computeBilling(patient);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-lg font-bold text-white">{patient.patientName.charAt(0)}</div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold text-slate-800">{patient.patientName}</h3>
                <BillingStatusBadge status={computed.status} />
              </div>
              <p className="mt-1 text-sm text-slate-500">{patient.age} yrs · {patient.gender} · {patient.uhid}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <InfoTile icon={<BedDouble className="h-4 w-4" />} label="Bed / Ward" value={`${patient.bed} · ${patient.ward}`} />
          <InfoTile icon={<Stethoscope className="h-4 w-4" />} label="Attending Doctor" value={patient.admittingDoctor} />
          <InfoTile icon={<PhoneCall className="h-4 w-4" />} label="Contact" value={patient.contactNumber} />
          <InfoTile icon={<User className="h-4 w-4" />} label="Guardian" value={patient.guardianName ?? "—"} />
          <InfoTile icon={<User className="h-4 w-4" />} label="IPD ID" value={patient.ipdId} />
          <InfoTile icon={<User className="h-4 w-4" />} label="Admitted On" value={patient.admissionDateTime} />
        </div>
      </div>

      <div className={`rounded-2xl border p-4 ${patient.universalPaymentEnabled ? "border-emerald-200 bg-emerald-50/40" : "border-amber-200 bg-amber-50/40"}`}>
        <div className="flex items-center gap-2">
          {patient.universalPaymentEnabled ? <ToggleRight className="h-5 w-5 text-emerald-600" /> : <ToggleLeft className="h-5 w-5 text-amber-600" />}
          <p className={`text-sm font-bold ${patient.universalPaymentEnabled ? "text-emerald-800" : "text-amber-800"}`}>Universal Payment: {patient.universalPaymentEnabled ? "Enabled" : "Disabled"}</p>
        </div>
        <p className="mt-1 flex items-start gap-1.5 text-xs text-slate-500"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {patient.universalPaymentEnabled
            ? "Pharmacy and diagnostic/lab charges are included in this IPD bill's total."
            : "Pharmacy and diagnostic/lab charges are excluded here — collected separately by those departments."}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="mb-3 text-sm font-bold text-slate-800">Billing Summary</p>
        <div className="space-y-2.5 text-sm">
          <Row label="Gross Charges Total" value={formatCurrency(computed.grossTotal)} />
          {computed.excludedPharmacyLab > 0 && <Row label="Excluded Pharmacy/Lab (billed separately)" value={formatCurrency(computed.excludedPharmacyLab)} muted />}
          <Row label="Total Discount" value={`- ${formatCurrency(computed.totalDiscount)}`} tone="text-rose-600" />
          <Row label="Net Payable" value={formatCurrency(computed.netPayable)} bold />
          {patient.coverage && patient.coverage.type !== "None" && <Row label={`${patient.coverage.type} Coverage Received`} value={`- ${formatCurrency(computed.coverageReceived)}`} tone="text-blue-600" />}
          <Row label="Patient Responsibility" value={formatCurrency(computed.patientResponsibility)} bold />
          <Row label="Total Collected" value={formatCurrency(computed.totalCollected)} tone="text-emerald-600" />
          <div className="my-1 border-t border-dashed border-slate-200" />
          <Row label="Balance Due" value={formatCurrency(computed.dueAmount)} bold big tone={computed.dueAmount > 0 ? "text-red-600" : "text-emerald-600"} />
        </div>
        {computed.status === "Fully Paid" && (
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-700"><CheckCircle2 className="h-4 w-4" />Bill fully settled. No further payment required.</div>
        )}
      </div>
    </div>
  );
}

function InfoTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
      <p className="flex items-center gap-1.5 text-[10px] uppercase text-slate-400">{icon}{label}</p>
      <p className="mt-1 truncate text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function Row({ label, value, bold, big, tone, muted }: { label: string; value: string; bold?: boolean; big?: boolean; tone?: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-slate-500 ${muted ? "text-xs italic" : ""}`}>{label}</span>
      <span className={`${bold ? "font-bold" : "font-medium"} ${big ? "text-lg" : ""} ${tone ?? "text-slate-800"}`}>{value}</span>
    </div>
  );
}