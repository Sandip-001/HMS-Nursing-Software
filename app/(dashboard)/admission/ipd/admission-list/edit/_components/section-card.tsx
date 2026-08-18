// app/ipd/admission-list/edit/_components/section-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface SectionCardProps {
  number?: number;
  icon?: LucideIcon;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionCard({ number, icon: Icon, title, children, className }: SectionCardProps) {
  return (
    <Card className={`border-slate-200 shadow-sm ${className ?? ""}`}>
      <CardHeader className="border-b border-slate-100 pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          {number !== undefined && (
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              {number}
            </span>
          )}
          {Icon && <Icon className="h-4 w-4 shrink-0 text-blue-600" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">{children}</CardContent>
    </Card>
  );
}