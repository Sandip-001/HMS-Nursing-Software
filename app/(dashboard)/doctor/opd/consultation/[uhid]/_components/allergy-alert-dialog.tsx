"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

interface AllergyAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  allergies: string[];
  patientName: string;
}

export function AllergyAlertDialog({ open, onOpenChange, allergies, patientName }: AllergyAlertDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-[96vw] !max-w-[520px] rounded-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-red-600" />
            </div>
            <DialogTitle className="text-lg font-bold text-red-900">Allergy Safety Review</DialogTitle>
          </div>
        </DialogHeader>

        <div className="py-2">
          <p className="text-sm text-slate-500 mb-4">
            Clinical decision support requires acknowledgement for <span className="font-semibold text-slate-700">{patientName}</span>.
          </p>

          {allergies.length > 0 ? (
            <div className="space-y-3">
              {allergies.map((allergy, idx) => (
                <div key={idx} className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <p className="text-sm font-semibold text-red-800">{allergy}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center">
              <p className="text-sm font-medium text-green-800">No known allergies recorded</p>
            </div>
          )}

          <div className="flex justify-end pt-5">
            <Button onClick={() => onOpenChange(false)} className="bg-gradient-to-r from-blue-600 to-cyan-600">
              Acknowledge & Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}