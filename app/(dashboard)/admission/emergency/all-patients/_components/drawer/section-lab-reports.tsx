// app/(dashboard)/admission-desk/emergency/all-patients/_components/drawer/section-lab-reports.tsx
"use client";
import { useMemo, useState } from "react";
import { FlaskConical, ImageIcon, Microscope, ScanLine } from "lucide-react";
import type { LabReport } from "@/types/emergency/emergency-types";
import { DateFilterBar } from "./date-filter-bar";
import { PathologyFlagBadge } from "../emergency-badges";

type CategoryFilter = "All" | "Pathology" | "Radiology";

export function SectionLabReports({ reports }: { reports: LabReport[] }) {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("All");
  const filtered = useMemo(() => reports.filter((r) => (!date || r.date === date) && (category === "All" || r.category === category)), [reports, date, category]);
  const pathology = filtered.filter((r) => r.category === "Pathology");
  const radiology = filtered.filter((r) => r.category === "Radiology");

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><FlaskConical className="h-4 w-4 text-cyan-600" />Lab Reports</p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <DateFilterBar value={date} onChange={setDate} />
          <div className="flex gap-1 rounded-lg border border-slate-200 bg-white p-1">
            {(["All", "Pathology", "Radiology"] as CategoryFilter[]).map((c) => <button key={c} onClick={() => setCategory(c)} className={`rounded-md px-3 py-1.5 text-xs font-semibold ${category === c ? "bg-cyan-50 text-cyan-700" : "text-slate-500"}`}>{c}</button>)}
          </div>
        </div>
      </div>

      {(category === "All" || category === "Pathology") && (
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase text-slate-400"><Microscope className="h-3.5 w-3.5" />Pathology Reports</p>
          <div className="space-y-3">
            {pathology.map((report) => (
              <div key={report.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-2"><p className="text-sm font-bold text-slate-800">{report.testName}</p><span className="text-xs text-slate-400">{report.date}</span></div>
                <p className="mt-1 text-xs text-slate-400">Ordered by {report.orderedBy} · Reported {report.reportedAt}</p>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full min-w-[520px] text-sm">
                    <thead><tr className="border-b border-slate-200 text-left text-[10px] uppercase text-slate-400"><th className="py-2 pr-4">Parameter</th><th className="pr-4">Value</th><th className="pr-4">Reference Range</th><th>Status</th></tr></thead>
                    <tbody>{report.pathologyResults?.map((result, index) => <tr key={index} className="border-b border-slate-100 last:border-0"><td className="py-2.5 pr-4 font-medium text-slate-700">{result.parameter}</td><td className="pr-4 text-slate-700">{result.value} <span className="text-xs text-slate-400">{result.unit}</span></td><td className="pr-4 text-slate-500">{result.refRange}</td><td><PathologyFlagBadge flag={result.flag} /></td></tr>)}</tbody>
                  </table>
                </div>
                {report.reportImageUrl && <div className="mt-3 flex items-center gap-2 rounded-lg border border-dashed border-slate-200 bg-slate-50 p-3 text-xs text-slate-500"><ImageIcon className="h-4 w-4" />Report image attached (optional)</div>}
              </div>
            ))}
            {pathology.length === 0 && <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-400">No pathology reports found.</div>}
          </div>
        </div>
      )}

      {(category === "All" || category === "Radiology") && (
        <div>
          <p className="mb-2 mt-4 flex items-center gap-1.5 text-xs font-bold uppercase text-slate-400"><ScanLine className="h-3.5 w-3.5" />Radiology Reports</p>
          <div className="space-y-3">
            {radiology.map((report) => (
              <div key={report.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-2"><p className="text-sm font-bold text-slate-800">{report.testName}</p><span className="text-xs text-slate-400">{report.date}</span></div>
                <p className="mt-1 text-xs text-slate-400">Ordered by {report.orderedBy} · Reported {report.reportedAt}</p>
                {report.reportImageUrl ? (
                  <div className="mt-3 flex h-40 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-400"><div className="text-center"><ImageIcon className="mx-auto h-8 w-8" /><p className="mt-1 text-xs">Radiology image (test result)</p></div></div>
                ) : (
                  <div className="mt-3 rounded-xl border border-dashed border-slate-200 p-4 text-center text-xs text-slate-400">No image uploaded for this report.</div>
                )}
                {report.notes && <div className="mt-3 rounded-lg bg-slate-50 p-3"><p className="text-[10px] uppercase text-slate-400">Notes (Optional)</p><p className="mt-1 text-sm text-slate-700">{report.notes}</p></div>}
              </div>
            ))}
            {radiology.length === 0 && <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-400">No radiology reports found.</div>}
          </div>
        </div>
      )}
    </div>
  );
}