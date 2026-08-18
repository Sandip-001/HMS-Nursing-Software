// app/doctor/ipd/medicine-orders/_components/today-dose-indicator.tsx
import { CheckCircle2, Clock3, PackageX, Syringe } from "lucide-react";
import type { MedicineOrderItem } from "@/types/doctor/ipd/medicine-order-types";

export function TodayDoseIndicator({ item }: { item: MedicineOrderItem }) {
  if (item.status !== "Active") return null;

  const todayLog = item.dailyLogs[item.dailyLogs.length - 1];

  if (!todayLog) {
    return (
      <span className="mt-1 flex items-center gap-1 text-[11px] text-slate-400">
        <Clock3 className="h-3 w-3" /> No log yet today
      </span>
    );
  }

  const givenCount = todayLog.doses.filter((d) => d.status === "Given").length;
  const totalCount = todayLog.doses.length || item.timesPerDay;

  const notDelivered = todayLog.deliveryStatus === "Not Delivered";
  const partial = todayLog.deliveryStatus === "Partially Delivered";

  return (
    <div className="mt-1.5 flex flex-wrap items-center gap-2">
      {notDelivered ? (
        <span className="flex items-center gap-1 text-[11px] font-medium text-red-600">
          <PackageX className="h-3 w-3" /> Not delivered by pharmacy
        </span>
      ) : (
        <span className={`flex items-center gap-1 text-[11px] font-medium ${partial ? "text-amber-600" : "text-emerald-600"}`}>
          <CheckCircle2 className="h-3 w-3" /> {partial ? "Partially delivered" : "Delivered"}
        </span>
      )}
      <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
        <Syringe className="h-3 w-3" /> {givenCount}/{totalCount} doses given today
      </span>
    </div>
  );
}