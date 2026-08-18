
"use client";

import { Button } from "@/components/ui/button";

export function YesNoToggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-500">{label}</label>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className={value ? "border-emerald-200 bg-emerald-50 text-emerald-700" : ""}
          onClick={() => onChange(true)}
        >
          Yes
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className={!value ? "border-slate-300 bg-slate-50 text-slate-700" : ""}
          onClick={() => onChange(false)}
        >
          No
        </Button>
      </div>
    </div>
  );
}