// app/(dashboard)/nurse/ipd/patients/[uhid]/_components/tab-overview.tsx
"use client";
import { ArrowRight, CheckCircle2, Clock3, FileText, HeartPulse, PackageX, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { NurseIpdPatient } from "@/types/nurse/ipd/nurse-ipd-types";
import { getEmarForPatient, getVitalsForPatient } from "@/lib/nurse/ipd/nurse-ipd-data";
import { UrgencyBadge } from "../../_components/nurse-ipd-badges";

export function TabOverview({ patient, onNext }: { patient: NurseIpdPatient; onNext: () => void }) {
  const vitals = getVitalsForPatient(patient.uhid);
  const latestVitals = vitals[0];
  const doses = getEmarForPatient(patient.uhid);
  const given = doses.filter((d) => d.status === "Given");
  const notGiven = doses.filter((d) => d.status === "Not Given" || d.status === "Pending");
  const outOfStock = doses.filter((d) => d.status === "Out of Stock");
  const urgentPending = doses.filter((d) => d.urgency === "Urgent" && d.status !== "Given");

  return (
    <div className="space-y-5">
      {/* Diagnosis */}
      <Card className="border-slate-200">
        <CardContent className="p-5">
          <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><FileText className="h-4 w-4 text-violet-600" />Current Diagnosis</p>
          <div className="mt-3 rounded-xl border border-violet-100 bg-violet-50/60 p-4">
            <p className="text-base font-bold text-slate-800">{patient.currentDiagnosis}</p>
            <p className="mt-1 text-xs text-violet-700">ICD-10: {patient.diagnosisCode}</p>
          </div>
        </CardContent>
      </Card>

      {/* Latest vitals */}
      <Card className="border-slate-200">
        <CardContent className="p-5">
          <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><HeartPulse className="h-4 w-4 text-red-500" />Latest Vitals</p>
          {latestVitals ? (
            <>
              <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-6">
                <Vital label="BP" value={latestVitals.bp} unit="mmHg" />
                <Vital label="Pulse" value={String(latestVitals.pulse)} unit="/min" />
                <Vital label="Temp" value={String(latestVitals.temp)} unit="°F" />
                <Vital label="RR" value={String(latestVitals.respRate)} unit="/min" />
                <Vital label="SpO₂" value={String(latestVitals.spo2)} unit="%" />
                <Vital label="Pain" value={String(latestVitals.pain)} unit="/10" />
              </div>
              <p className="mt-2 text-xs text-slate-400">Recorded {latestVitals.dateTime} by {latestVitals.recordedBy}</p>
            </>
          ) : (
            <p className="mt-3 text-sm text-slate-400">No vitals recorded yet.</p>
          )}
        </CardContent>
      </Card>

      {/* Today's medicines */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="border-emerald-200 bg-emerald-50/30">
          <CardContent className="p-5">
            <p className="flex items-center gap-2 text-sm font-bold text-emerald-800"><CheckCircle2 className="h-4 w-4" />Given ({given.length})</p>
            <div className="mt-3 space-y-2">
              {given.slice(0, 4).map((dose) => (
                <div key={dose.id} className="rounded-lg border border-emerald-100 bg-white p-2.5">
                  <p className="text-sm font-medium text-slate-800">{dose.medicineName}</p>
                  <p className="text-xs text-slate-500">{dose.slot} · {dose.givenAt}</p>
                </div>
              ))}
              {given.length === 0 && <p className="text-xs text-slate-400">No doses given yet.</p>}
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50/30">
          <CardContent className="p-5">
            <p className="flex items-center gap-2 text-sm font-bold text-amber-800"><Clock3 className="h-4 w-4" />Not Given / Pending ({notGiven.length})</p>
            <div className="mt-3 space-y-2">
              {notGiven.slice(0, 4).map((dose) => (
                <div key={dose.id} className="flex items-center justify-between rounded-lg border border-amber-100 bg-white p-2.5">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{dose.medicineName}</p>
                    <p className="text-xs text-slate-500">{dose.slot} · {dose.scheduledTime}</p>
                  </div>
                  <UrgencyBadge urgency={dose.urgency} />
                </div>
              ))}
              {notGiven.length === 0 && <p className="text-xs text-slate-400">All scheduled doses are up to date.</p>}
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50/30">
          <CardContent className="p-5">
            <p className="flex items-center gap-2 text-sm font-bold text-red-800"><PackageX className="h-4 w-4" />Out of Stock ({outOfStock.length})</p>
            <div className="mt-3 space-y-2">
              {outOfStock.map((dose) => (
                <div key={dose.id} className="rounded-lg border border-red-100 bg-white p-2.5">
                  <p className="text-sm font-medium text-slate-800">{dose.medicineName}</p>
                  <p className="text-xs text-slate-500">{dose.remarks ?? "Awaiting pharmacy stock"}</p>
                </div>
              ))}
              {outOfStock.length === 0 && <p className="text-xs text-slate-400">No stock issues currently.</p>}
            </div>
          </CardContent>
        </Card>
      </div>

      {urgentPending.length > 0 && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="flex items-center gap-2 text-sm font-bold text-red-800"><Pill className="h-4 w-4" />{urgentPending.length} urgent medicine(s) require attention</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {urgentPending.map((dose) => <span key={dose.id} className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-red-700">{dose.medicineName} ({dose.slot})</span>)}
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <Button onClick={onNext} className="gap-2 bg-blue-600 hover:bg-blue-700">Next: Vitals Monitoring <ArrowRight className="h-4 w-4" /></Button>
      </div>
    </div>
  );
}

function Vital({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
      <p className="text-[10px] text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-800">{value} <span className="text-[10px] font-normal text-slate-400">{unit}</span></p>
    </div>
  );
}