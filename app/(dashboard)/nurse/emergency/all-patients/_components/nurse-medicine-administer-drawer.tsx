// app/(dashboard)/nurse/emergency/_components/nurse-medicine-administer-drawer.tsx
"use client";
import { useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NurseMedicineAdministerDrawer({
  medicineId,
  medicineName,
  instructions,
  onClose,
  onAdminister,
}: {
  medicineId: string;
  medicineName: string;
  instructions: string;
  onClose: () => void;
  onAdminister: (medicineId: string, givenAt: string) => void;
}) {
  const [givenAt, setGivenAt] = useState(new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }));

  function handleConfirm() {
    onAdminister(medicineId, givenAt);
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-emerald-200 bg-white p-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-emerald-900">Administer Medicine</p>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-4 space-y-3">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
            <p className="text-xs uppercase text-emerald-600">Medicine</p>
            <p className="font-bold text-emerald-900">{medicineName}</p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs uppercase text-slate-500">Instructions</p>
            <p className="text-sm text-slate-700">{instructions}</p>
          </div>

          <div>
            <label className="text-xs text-slate-500">Date & Time Given</label>
            <input
              type="text"
              value={givenAt}
              onChange={(e) => setGivenAt(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2 border-t border-slate-200 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700" onClick={handleConfirm}>
            <CheckCircle2 className="h-4 w-4" />
            Confirm Administration
          </Button>
        </div>
      </div>
    </div>
  );
}