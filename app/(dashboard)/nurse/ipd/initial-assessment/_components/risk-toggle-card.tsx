
"use client";

import { Button } from "@/components/ui/button";

export function RiskToggleCard({
  title,
  value,
  onChange,
  danger = false,
}: {
  title: string;
  value: boolean;
  onChange: (value: boolean) => void;
  danger?: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3">
      <p className="mb-3 text-sm font-medium text-slate-700">{title}</p>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          className={value ? `${danger ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}` : ""}
          onClick={() => onChange(true)}
        >
          Yes
        </Button>
        <Button
          type="button"
          variant="outline"
          className={!value ? "border-slate-300 bg-slate-50 text-slate-700" : ""}
          onClick={() => onChange(false)}
        >
          No
        </Button>
      </div>
    </div>
  );
}