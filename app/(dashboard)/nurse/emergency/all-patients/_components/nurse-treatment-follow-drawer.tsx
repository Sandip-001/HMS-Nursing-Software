// app/(dashboard)/nurse/emergency/_components/nurse-treatment-follow-drawer.tsx
"use client";
import { CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NurseTreatmentFollowDrawer({
  planId,
  title,
  currentStatus,
  onClose,
  onUpdate,
}: {
  planId: string;
  title: string;
  currentStatus: "Following" | "Not Following";
  onClose: () => void;
  onUpdate: (planId: string, newStatus: "Following" | "Not Following") => void;
}) {
  function handleUpdate(newStatus: "Following" | "Not Following") {
    onUpdate(planId, newStatus);
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-slate-800">Update Treatment Plan Status</p>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-4 space-y-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs uppercase text-slate-500">Treatment Plan</p>
            <p className="font-bold text-slate-800">{title}</p>
          </div>

          <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
            <p className="text-xs uppercase text-blue-600">Current Status</p>
            <p className="font-bold text-blue-900">{currentStatus}</p>
          </div>

          <p className="text-sm text-slate-600">Are you currently following this treatment plan as ordered by the doctor/RMO?</p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 border-t border-slate-200 pt-4">
          <Button
            variant={currentStatus === "Following" ? "outline" : "default"}
            className={currentStatus === "Following" ? "border-emerald-300 text-emerald-700" : "bg-emerald-600 hover:bg-emerald-700"}
            onClick={() => handleUpdate("Following")}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            I am Following
          </Button>
          <Button
            variant={currentStatus === "Not Following" ? "outline" : "default"}
            className={currentStatus === "Not Following" ? "border-amber-300 text-amber-700" : "bg-amber-600 hover:bg-amber-700"}
            onClick={() => handleUpdate("Not Following")}
          >
            <X className="mr-2 h-4 w-4" />
            Not Following
          </Button>
        </div>
      </div>
    </div>
  );
}