//app/admission-desk/opd/book-appointments/_components/choice.tsx
import { ArrowRight } from "lucide-react";

export function Choice({
  title,
  text,
  icon,
  tone,
  onClick,
}: {
  title: string;
  text: string;
  icon: React.ReactNode;
  tone: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl border border-slate-200 bg-white p-7 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
    >
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${tone === "blue" ? "bg-blue-50 text-blue-600" : "bg-violet-50 text-violet-600"}`}
      >
        {icon}
      </div>
      <h2 className="mt-5 text-xl font-bold text-slate-800">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
      <p className="mt-5 text-sm font-semibold text-blue-600">
        Continue <ArrowRight className="inline h-4 w-4" />
      </p>
    </button>
  );
}