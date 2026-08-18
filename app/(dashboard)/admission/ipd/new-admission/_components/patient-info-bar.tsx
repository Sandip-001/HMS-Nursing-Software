// app/ipd/new-admission/_components/patient-info-bar.tsx
import { Card, CardContent } from "@/components/ui/card";
import type { PatientInfoFormValues } from "@/lib/admission-schema";

export function PatientInfoBar({ patientInfo }: { patientInfo: PatientInfoFormValues | null }) {
  const fields = [
    { label: "UHID", value: patientInfo?.uhid || "—" },
    { label: "Patient Name", value: patientInfo?.patientName || "—" },
    { label: "Age / Gender", value: patientInfo ? `${patientInfo.age} Y / ${patientInfo.gender}` : "—" },
    { label: "Mobile No.", value: patientInfo?.mobile || "—" },
    { label: "Admission Type", value: patientInfo?.admissionType || "—" },
    { label: "Attending Doctor", value: patientInfo?.attendingDoctor || "—" },
  ];
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="grid grid-cols-2 gap-4 py-4 sm:grid-cols-3 lg:grid-cols-6">
        {fields.map((f) => (
          <div key={f.label}>
            <p className="text-xs text-slate-400">{f.label}</p>
            <p className="text-sm font-semibold text-slate-800">{f.value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}