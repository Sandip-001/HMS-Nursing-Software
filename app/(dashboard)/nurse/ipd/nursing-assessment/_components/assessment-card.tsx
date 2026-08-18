
export function AssessmentCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="mb-4 text-sm font-semibold text-slate-800">{title}</p>
      {children}
    </div>
  );
}