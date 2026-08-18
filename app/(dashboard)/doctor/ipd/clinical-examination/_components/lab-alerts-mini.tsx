// app/doctor/ipd/clinical-examination/_components/lab-alerts-mini.tsx
"use client";

import {
  FlaskConical,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { LabAlertMini } from "@/types/doctor/ipd/clinical-examination-types";

interface LabAlertsMiniProps {
  alerts: LabAlertMini[];
  onViewAll?: () => void;
}

type AlertStatus = "High" | "Low" | "Borderline" | "Critical";

function getStatusStyle(status: LabAlertMini["status"]) {
  const normalizedStatus = status as AlertStatus;

  switch (normalizedStatus) {
    case "Critical":
      return {
        container: "border-red-200 bg-red-50",
        iconClass: "text-red-600",
        valueClass: "text-red-700",
        badgeClass: "bg-red-100 text-red-700",
        icon: <AlertTriangle className="h-4 w-4" />,
      };

    case "High":
      return {
        container: "border-red-200 bg-red-50",
        iconClass: "text-red-600",
        valueClass: "text-red-700",
        badgeClass: "bg-red-100 text-red-700",
        icon: <TrendingUp className="h-4 w-4" />,
      };

    case "Low":
      return {
        container: "border-amber-200 bg-amber-50",
        iconClass: "text-amber-600",
        valueClass: "text-amber-700",
        badgeClass: "bg-amber-100 text-amber-700",
        icon: <TrendingDown className="h-4 w-4" />,
      };

    case "Borderline":
    default:
      return {
        container: "border-amber-200 bg-amber-50",
        iconClass: "text-amber-600",
        valueClass: "text-amber-700",
        badgeClass: "bg-amber-100 text-amber-700",
        icon: <AlertTriangle className="h-4 w-4" />,
      };
  }
}

export function LabAlertsMini({
  alerts,
  onViewAll,
}: LabAlertsMiniProps) {
  return (
    <Card className="overflow-hidden border-slate-200 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <FlaskConical className="h-4 w-4 text-amber-600" />

          <p className="text-sm font-bold text-slate-800">
            Lab Alerts
          </p>

          {alerts.length > 0 && (
            <Badge className="bg-amber-100 text-amber-700">
              {alerts.length}
            </Badge>
          )}
        </div>

        {onViewAll && (
          <Button
            variant="link"
            size="sm"
            onClick={onViewAll}
            className="h-auto gap-0.5 p-0 text-xs font-semibold text-blue-600"
          >
            View All
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      <CardContent className="space-y-2.5 p-4">
        {alerts.length === 0 ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="mx-auto h-7 w-7 text-emerald-400" />
            <p className="mt-2 text-sm font-medium text-slate-500">
              No abnormal lab results
            </p>
            <p className="mt-0.5 text-xs text-slate-400">
              All recent test values are within the expected range.
            </p>
          </div>
        ) : (
          alerts.map((alert, index) => {
            const style = getStatusStyle(alert.status);

            return (
              <div
                key={`${alert.testName}-${index}`}
                className={`rounded-xl border px-3 py-2.5 ${style.container}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-start gap-2">
                    <span className={`mt-0.5 shrink-0 ${style.iconClass}`}>
                      {style.icon}
                    </span>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {alert.testName}
                      </p>

                      {/* Supports optional referenceRange if your shared type includes it */}
                      {"referenceRange" in alert &&
                        typeof alert.referenceRange === "string" && (
                          <p className="mt-0.5 text-xs text-slate-500">
                            Reference: {alert.referenceRange}
                          </p>
                        )}
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className={`text-sm font-bold ${style.valueClass}`}>
                      {alert.value}{" "}
                      <span className="text-[10px] font-medium opacity-70">
                        {alert.unit}
                      </span>
                    </p>

                    <Badge
                      className={`mt-1 border-0 px-2 py-0 text-[10px] ${style.badgeClass}`}
                    >
                      {alert.status}
                    </Badge>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}