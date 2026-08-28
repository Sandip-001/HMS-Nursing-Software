// app/(dashboard)/rmo/emergency/all-patients/_components/rmo-action-menu.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import {
  ClipboardList,
  Eye,
  MoreHorizontal,
  UserRound,
  UserRoundCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EmergencyPatient } from "@/types/emergency/emergency-types";

export function RmoActionMenu({
  patient,
  onView,
  onAssignDoctor,
  onAssignNurse,
}: {
  patient: EmergencyPatient;
  onView: () => void;
  onAssignDoctor: () => void;
  onAssignNurse: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function close(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  return (
    <div ref={ref} className="relative text-right">
      <Button
        variant="outline"
        size="sm"
        className="gap-1"
        onClick={() => setOpen((v) => !v)}
      >
        <MoreHorizontal className="h-4 w-4" />
        Action
      </Button>
      {open && (
        <div className="absolute right-0 z-20 mt-1 w-52 rounded-xl border border-slate-200 bg-white p-1 text-left shadow-xl">
          <ActionItem
            icon={<Eye className="h-4 w-4" />}
            label="View Details"
            onClick={() => {
              setOpen(false);
              onView();
            }}
          />
          <ActionItem
            icon={<UserRoundCog className="h-4 w-4" />}
            label={
              patient.attendingDoctor === "Unassigned"
                ? "Assign Doctor"
                : "Doctor Assigned"
            }
            onClick={() => {
              setOpen(false);
              onAssignDoctor();
            }}
          />
          <ActionItem
            icon={<UserRound className="h-4 w-4" />}
            label={
              patient.assignedNurse === "Unassigned"
                ? "Assign Nurse"
                : "Nurse Assigned"
            }
            onClick={() => {
              setOpen(false);
              onAssignNurse();
            }}
          />
        </div>
      )}
    </div>
  );
}

function ActionItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-red-50 hover:text-red-700"
    >
      {icon}
      {label}
    </button>
  );
}
