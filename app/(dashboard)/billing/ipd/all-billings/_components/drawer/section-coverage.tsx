// app/(dashboard)/billing/ipd/_components/drawer/section-coverage.tsx
import { CheckCircle2, Clock3, HeartHandshake, ShieldCheck, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { CoverageDetails, CoverageStatus } from "@/types/billing/ipd/billing-types";
import { formatCurrency } from "@/lib/billing/ipd/billing-calculations";

const statusStyle: Record<CoverageStatus, { cls: string; icon: React.ElementType }> = {
  Approved: { cls: "border-blue-200 bg-blue-50 text-blue-700", icon: ShieldCheck },
  "Partially Received": { cls: "border-amber-200 bg-amber-50 text-amber-700", icon: Clock3 },
  "Fully Received": { cls: "border-emerald-200 bg-emerald-50 text-emerald-700", icon: CheckCircle2 },
  Pending: { cls: "border-slate-200 bg-slate-50 text-slate-500", icon: Clock3 },
  Rejected: { cls: "border-red-200 bg-red-50 text-red-700", icon: XCircle },
};

export function SectionCoverage({ netPayable, coverage }: { netPayable: number; coverage?: CoverageDetails }) {
  if (!coverage || coverage.type === "None") {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-10 text-center">
        <HeartHandshake className="mx-auto h-10 w-10 text-slate-300" />
        <p className="mt-3 text-sm font-semibold text-slate-500">No Ayushman Bharat card or insurance policy linked to this patient.</p>
        <p className="mt-1 text-xs text-slate-400">Full net payable amount is the patient's responsibility.</p>
      </div>
    );
  }

  const remaining = Math.max(0, coverage.approvedAmount - coverage.receivedAmount);
  const { cls, icon: Icon } = statusStyle[coverage.status];
  const patientPortion = Math.max(0, netPayable - coverage.receivedAmount);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><HeartHandshake className="h-4 w-4 text-blue-600" />{coverage.type} Coverage</p>
          <Badge variant="outline" className={`gap-1 ${cls}`}><Icon className="h-3 w-3" />{coverage.status}</Badge>
        </div>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Detail label="Scheme / Insurer Name" value={coverage.schemeName} />
          <Detail label="Policy / Card Number" value={coverage.policyOrCardNumber} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Summary label="Approved by Scheme" value={formatCurrency(coverage.approvedAmount)} tone="border-blue-200 bg-blue-50 text-blue-700" />
        <Summary label="Received So Far" value={formatCurrency(coverage.receivedAmount)} tone="border-emerald-200 bg-emerald-50 text-emerald-700" />
      </div>

      {coverage.receivedDate && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">Last amount received on <span className="font-semibold text-slate-800">{coverage.receivedDate}</span></div>
      )}

      {remaining > 0 && coverage.status !== "Fully Received" && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4">
          <p className="text-sm font-semibold text-amber-800">{formatCurrency(remaining)} still pending from {coverage.type}.</p>
          <p className="mt-1 text-xs text-slate-500">This amount will be adjusted once received from the government / insurer.</p>
        </div>
      )}

      <div className="rounded-2xl border border-violet-200 bg-violet-50/40 p-5">
        <p className="text-sm font-bold text-violet-800">Net Payable vs Coverage</p>
        <div className="mt-3 space-y-2 text-sm">
          <Row label="Net Payable (Bill Total)" value={formatCurrency(netPayable)} />
          <Row label={`Covered by ${coverage.type}`} value={`- ${formatCurrency(coverage.receivedAmount)}`} tone="text-blue-600" />
          <div className="border-t border-dashed border-violet-200" />
          <Row label="Patient Must Pay" value={formatCurrency(patientPortion)} bold tone="text-violet-800" />
        </div>
        {coverage.receivedAmount >= netPayable ? (
          <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-emerald-700"><CheckCircle2 className="h-3.5 w-3.5" />Full bill amount covered by {coverage.type}. No out-of-pocket payment needed.</p>
        ) : (
          <p className="mt-3 text-xs text-slate-500">Patient is responsible for the remaining {formatCurrency(patientPortion)} not covered by {coverage.type}.</p>
        )}
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div className="rounded-lg bg-slate-50 p-2.5"><p className="text-[10px] uppercase text-slate-400">{label}</p><p className="mt-0.5 text-sm font-semibold text-slate-700">{value}</p></div>;
}
function Summary({ label, value, tone }: { label: string; value: string; tone: string }) {
  return <div className={`rounded-xl border p-4 text-center ${tone}`}><p className="text-[10px] uppercase opacity-80">{label}</p><p className="mt-1 text-xl font-bold">{value}</p></div>;
}
function Row({ label, value, bold, tone }: { label: string; value: string; bold?: boolean; tone?: string }) {
  return <div className="flex items-center justify-between"><span className="text-slate-500">{label}</span><span className={`${bold ? "font-bold" : "font-medium"} ${tone ?? "text-slate-800"}`}>{value}</span></div>;
}