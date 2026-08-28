// app/(dashboard)/admission-desk/emergency/all-patients/_components/drawer/section-assigned-nurses.tsx
import { Moon, Sunrise, Sunset, UserCog } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ShiftAssignment, ShiftName } from "@/types/emergency/emergency-types";

const shiftIcon: Record<ShiftName, React.ElementType> = { Morning: Sunrise, Evening: Sunset, Night: Moon };
const shiftTone: Record<ShiftName, string> = {
  Morning: "border-amber-200 bg-amber-50 text-amber-700",
  Evening: "border-orange-200 bg-orange-50 text-orange-700",
  Night: "border-indigo-200 bg-indigo-50 text-indigo-700",
};

export function SectionAssignedNurses({ assignments }: { assignments: ShiftAssignment[] }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="flex items-center gap-2 text-sm font-bold text-slate-800"><UserCog className="h-4 w-4 text-blue-600" />Assigned Nurses (Shift-wise)</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {assignments.map((assignment, index) => {
          const Icon = shiftIcon[assignment.shift];
          return (
            <div key={index} className="rounded-2xl border border-slate-200 bg-white p-4">
              <Badge variant="outline" className={`gap-1 ${shiftTone[assignment.shift]}`}><Icon className="h-3 w-3" />{assignment.shift}</Badge>
              <p className="mt-2 text-xs text-slate-400">{assignment.date}</p>
              <p className="mt-1 text-sm font-semibold text-slate-700">{assignment.nurseNames.join(", ") || "Unassigned"}</p>
            </div>
          );
        })}
        {assignments.length === 0 && <div className="col-span-full rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">No nurse assignments recorded.</div>}
      </div>
    </div>
  );
}