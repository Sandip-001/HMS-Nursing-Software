"use client";

import { forwardRef } from "react";
import { Badge } from "@/components/ui/badge";

interface PrescriptionData {
  patientName: string;
  age: number;
  gender: string;
  uhid: string;
  visitId: string;
  consultant: string;
  date: string;
  vitals?: {
    bp: string;
    pulse: string;
    temp: string;
    spo2: string;
    weight?: string;
    height?: string;
  };
  complaint?: string;
  diagnoses?: Array<{ name: string; icd10: string; type: string }>;
  medicines?: Array<{ name: string; dosage: string; frequency: string; duration: string; instructions: string }>;
  labOrders?: Array<{ test: string; priority: string }>;
  advice?: string;
  followUp?: string;
  disposition?: string;
}

export const PrescriptionTemplate = forwardRef<HTMLDivElement, PrescriptionData>(
  (data, ref) => {
    return (
      <div ref={ref} className="bg-white p-8 max-w-[210mm] mx-auto">
        {/* Header */}
        <div className="border-b-2 border-slate-800 pb-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Arogyam Multispeciality Hospital</h1>
              <p className="text-sm text-slate-600 mt-1">
                Srirampur Road, Tamluk, Purba Medinipur, West Bengal 721636
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Reg. No. WBHOSP20260184 • +91 3228 269 400 • care@arogyamhospital.in
              </p>
            </div>
            <div className="text-right">
              <h2 className="text-lg font-bold text-slate-800">OUTPATIENT E-PRESCRIPTION</h2>
              <p className="text-sm text-slate-600 mt-1">Rx No. {data.visitId}</p>
              <p className="text-xs text-slate-500">Issued {data.date}</p>
            </div>
          </div>
        </div>

        {/* Patient Info */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-sm font-bold text-slate-700 mb-2">Patient Details</h3>
            <div className="space-y-1 text-sm">
              <p><span className="text-slate-500">Name:</span> <span className="font-semibold">{data.patientName}</span></p>
              <p><span className="text-slate-500">Age/Sex:</span> <span className="font-semibold">{data.age} Years {data.gender}</span></p>
              <p><span className="text-slate-500">UHID:</span> <span className="font-semibold">{data.uhid}</span></p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-700 mb-2">Visit Details</h3>
            <div className="space-y-1 text-sm">
              <p><span className="text-slate-500">Visit ID:</span> <span className="font-semibold">{data.visitId}</span></p>
              <p><span className="text-slate-500">Consultant:</span> <span className="font-semibold">{data.consultant}</span></p>
              <p><span className="text-slate-500">Department:</span> <span className="font-semibold">General Medicine OPD</span></p>
            </div>
          </div>
        </div>

        {/* Vitals */}
        {data.vitals && (
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-700 mb-3">Vitals & Clinical Triage</h3>
            <div className="grid grid-cols-4 gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <VitalBox label="BP" value={data.vitals.bp} unit="mmHg" />
              <VitalBox label="Pulse" value={data.vitals.pulse} unit="/min" />
              <VitalBox label="Temp" value={data.vitals.temp} unit="F" />
              <VitalBox label="SpO₂" value={data.vitals.spo2} unit="%" />
              {data.vitals.weight && <VitalBox label="Weight" value={data.vitals.weight} unit="kg" />}
              {data.vitals.height && <VitalBox label="Height" value={data.vitals.height} unit="cm" />}
            </div>
          </div>
        )}

        {/* Complaint */}
        {data.complaint && (
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-700 mb-2">Presenting Complaint</h3>
            <p className="text-sm text-slate-700 p-3 bg-slate-50 rounded-lg border border-slate-200">{data.complaint}</p>
          </div>
        )}

        {/* Diagnosis */}
        {data.diagnoses && data.diagnoses.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-700 mb-3">Assessment & Diagnosis</h3>
            <div className="space-y-2">
              {data.diagnoses.map((d, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-sm font-semibold text-slate-800">{idx + 1}. {d.name}</p>
                  <p className="text-xs text-slate-500 mt-1">ICD-10: {d.icd10} • <Badge variant="secondary">{d.type}</Badge></p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Medicines */}
        {data.medicines && data.medicines.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-700 mb-3">E-Prescription</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 border-b border-slate-200">#</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 border-b border-slate-200">Medicine</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 border-b border-slate-200">Dosage</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 border-b border-slate-200">Frequency</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 border-b border-slate-200">Duration</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 border-b border-slate-200">Instructions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.medicines.map((med, idx) => (
                    <tr key={idx} className="border-t border-slate-200">
                      <td className="px-4 py-3 text-slate-600">{idx + 1}</td>
                      <td className="px-4 py-3 font-semibold text-slate-800">{med.name}</td>
                      <td className="px-4 py-3 text-slate-600">{med.dosage}</td>
                      <td className="px-4 py-3 text-slate-600">{med.frequency}</td>
                      <td className="px-4 py-3 text-slate-600">{med.duration}</td>
                      <td className="px-4 py-3 text-slate-600">{med.instructions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-2 italic">Generic substitution allowed where clinically appropriate.</p>
          </div>
        )}

        {/* Advice */}
        {data.advice && (
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-700 mb-2">Care Advice</h3>
            <p className="text-sm text-slate-700 p-3 bg-slate-50 rounded-lg border border-slate-200">{data.advice}</p>
          </div>
        )}

        {/* Lab Orders */}
        {data.labOrders && data.labOrders.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-700 mb-3">Lab Diagnostic Orders</h3>
            <div className="space-y-2">
              {data.labOrders.map((order, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{idx + 1}. {order.test}</p>
                    <p className="text-xs text-slate-500 capitalize">{order.priority}</p>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">Ordered</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Follow-up */}
        {(data.followUp || data.disposition) && (
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-700 mb-2">Follow-up & Disposition</h3>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              {data.followUp && <p className="text-sm text-slate-700"><span className="font-semibold">Follow-up:</span> {data.followUp}</p>}
              {data.disposition && <p className="text-sm text-slate-700 mt-1"><span className="font-semibold">Disposition:</span> {data.disposition}</p>}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t-2 border-slate-800 pt-6 mt-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-800">{data.consultant}</p>
              <p className="text-xs text-slate-500">MD General Medicine</p>
              <p className="text-xs text-slate-500">Reg. No. WBMC-2018-45872</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">Electronically signed</p>
              <p className="text-sm font-semibold text-slate-800">{data.date}</p>
              <div className="mt-2 w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center">
                <p className="text-xs text-slate-400">QR Code</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 pt-4 border-t border-slate-200">
          <p className="text-xs text-slate-500 text-center">
            This is a computer-generated prescription. QR validation is available at the hospital pharmacy.
          </p>
          <p className="text-xs text-slate-500 text-center mt-1">
            Keep this prescription for your records.
          </p>
        </div>
      </div>
    );
  }
);

PrescriptionTemplate.displayName = "PrescriptionTemplate";

function VitalBox({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="text-center p-2 bg-white rounded border border-slate-200">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-sm font-bold text-slate-800">
        {value} <span className="text-xs font-normal text-slate-500">{unit}</span>
      </p>
    </div>
  );
}