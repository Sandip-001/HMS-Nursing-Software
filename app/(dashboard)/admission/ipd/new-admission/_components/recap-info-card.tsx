// app/ipd/new-admission/_components/recap-info-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface RecapField {
  label: string;
  value: string;
  highlight?: boolean;
}

interface RecapInfoCardProps {
  icon: LucideIcon;
  title: string;
  fields: RecapField[];
}

export function RecapInfoCard({ icon: Icon, title, fields }: RecapInfoCardProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          <Icon className="h-4 w-4 text-blue-600" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 lg:grid-cols-5">
        {fields.map((f) => (
          <div key={f.label} className={f.highlight ? "rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2" : ""}>
            <p className="text-xs text-slate-400">{f.label}</p>
            <p className={f.highlight ? "text-sm font-bold text-emerald-600" : "text-sm font-medium text-slate-800"}>
              {f.value}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}