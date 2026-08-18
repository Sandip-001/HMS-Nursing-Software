
import { Card, CardContent } from "@/components/ui/card";

export function AssessmentSectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="py-4">
        <p className="mb-4 text-sm font-semibold text-slate-800">{title}</p>
        {children}
      </CardContent>
    </Card>
  );
}