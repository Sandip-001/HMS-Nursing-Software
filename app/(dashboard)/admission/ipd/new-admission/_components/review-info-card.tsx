// app/ipd/new-admission/_components/review-info-card.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, LucideIcon } from "lucide-react";

interface ReviewField {
  label: string;
  value: string;
  fullWidth?: boolean;
}

interface ReviewInfoCardProps {
  icon: LucideIcon;
  title: string;
  fields: ReviewField[];
  onEdit?: () => void;
}

export function ReviewInfoCard({ icon: Icon, title, fields, onEdit }: ReviewInfoCardProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          <Icon className="h-4 w-4 text-blue-600" />
          {title}
        </CardTitle>
        <Button variant="ghost" size="sm" className="h-7 gap-1 px-2 text-xs text-blue-600" onClick={onEdit}>
          <Pencil className="h-3.5 w-3.5" /> Edit
        </Button>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
        {fields.map((f) => (
          <div key={f.label} className={f.fullWidth ? "col-span-2 sm:col-span-3" : ""}>
            <p className="text-xs text-slate-400">{f.label}</p>
            <p className="text-sm font-medium text-slate-800">{f.value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}