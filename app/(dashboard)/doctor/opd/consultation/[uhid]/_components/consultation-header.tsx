"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { History, ShieldAlert, FileHeart } from "lucide-react";
import type { PatientFullProfile } from "@/lib/doctor/opd/opd-mock-data";

interface ConsultationHeaderProps {
  patient: PatientFullProfile;
  onOpenHistory: () => void;
  onOpenAllergyAlert: () => void;
}

export function ConsultationHeader({ patient, onOpenHistory, onOpenAllergyAlert }: ConsultationHeaderProps) {
  const hasAllergies = patient.allergies && patient.allergies.length > 0;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          {/* Patient Info */}
          <div className="flex min-w-0 items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 text-lg font-bold text-blue-600 flex-shrink-0">
              {patient.patientName.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg font-bold text-slate-800 truncate">{patient.patientName}</h1>
                {hasAllergies && (
                  <Badge className="bg-red-50 text-red-700 border-red-200">
                    <ShieldAlert className="w-3 h-3 mr-1" />
                    Allergy Alert
                  </Badge>
                )}
                <Badge variant="secondary" className="bg-slate-100 text-slate-700 capitalize">
                  {patient.patientType}
                </Badge>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                UHID <span className="font-semibold text-slate-700">{patient.uhid}</span> • {patient.age} {patient.gender} • Blood Group: <span className="font-semibold text-slate-700">{patient.bloodGroup}</span>
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Chief complaint: <span className="font-medium text-slate-700">{patient.reason}</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={onOpenHistory} className="border-slate-200">
              <History className="w-4 h-4 mr-2" />
              Patient History
            </Button>
            <Button
              variant="outline"
              onClick={onOpenAllergyAlert}
              className={hasAllergies ? "border-red-200 text-red-700 hover:bg-red-50" : "border-slate-200"}
            >
              <ShieldAlert className="w-4 h-4 mr-2" />
              {hasAllergies ? `${patient.allergies!.length} Allergy Alert${patient.allergies!.length > 1 ? "s" : ""}` : "No Allergies"}
            </Button>
          </div>
        </div>

        {/* Quick Vitals */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-200 border-t border-slate-200 pt-3 text-center">
          <div>
            <p className="text-[10px] text-slate-500">BP</p>
            <p className="text-sm font-bold text-slate-800">{patient.vitals?.bp || "—"}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500">SpO₂</p>
            <p className="text-sm font-bold text-slate-800">{patient.vitals?.spo2 || "—"}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500">Temp</p>
            <p className="text-sm font-bold text-slate-800">{patient.vitals?.temp || "—"}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500">Pulse</p>
            <p className="text-sm font-bold text-slate-800">{patient.vitals?.pulse || "—"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}