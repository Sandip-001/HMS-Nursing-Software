
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BedOccupiedPatient } from "@/types/nurse/ipd/bed-occupied-types";

export function PatientSummarySidebar({ patient }: { patient: BedOccupiedPatient }) {
  const vitals = [
    { label: "Temperature", value: "98.4 °F" },
    { label: "Pulse", value: "82 /min" },
    { label: "Respiratory Rate", value: "18 /min" },
    { label: "Blood Pressure", value: "128/80 mmHg" },
    { label: "SpO₂", value: "98 %" },
    { label: "Pain Score", value: "2/10" },
  ];

  const alerts = ["Drug Allergy: Penicillin", "Fall Risk: Low", "Diabetic: Yes"];

  return (
    <div className="space-y-5">
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="py-4">
          <p className="mb-3 text-sm font-semibold text-slate-800">Patient Summary</p>
          <SummaryRow label="Mobile" value={patient.emergencyContactPhone} />
          <SummaryRow label="Emergency Contact" value={patient.emergencyContactName} />
          <SummaryRow label="Address" value="123, Green Park, New Delhi" />
          <SummaryRow label="Insurance" value="Star Health Insurance" />
          <SummaryRow label="Package" value={patient.packageName} />
          <SummaryRow label="Deposit Status" value="Received" />
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardContent className="py-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-800">Vital Signs (Latest)</p>
            <Button variant="ghost" size="sm" className="text-blue-600">Record Now</Button>
          </div>
          <div className="space-y-2">
            {vitals.map((item) => (
              <SummaryRow key={item.label} label={item.label} value={item.value} />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardContent className="py-4">
          <p className="mb-3 text-sm font-semibold text-slate-800">Ward Alerts</p>
          <div className="space-y-2">
            {alerts.map((alert) => (
              <div key={alert} className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                {alert}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 py-2 text-sm last:border-b-0">
      <span className="text-slate-500">{label}</span>
      <span className="text-right font-medium text-slate-800">{value}</span>
    </div>
  );
}