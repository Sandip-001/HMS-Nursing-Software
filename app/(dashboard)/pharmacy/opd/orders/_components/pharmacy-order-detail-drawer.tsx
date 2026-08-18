"use client";
import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Banknote,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  IndianRupee,
  Landmark,
  PackageCheck,
  Pill,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  DispenseMedicineState,
  PharmacyOPDOrder,
  PharmacyPaymentMethod,
} from "@/types/pharmacy/opd/pharmacy-opd-types";
import {
  getDefaultBatch,
  getMedicineStockStatus,
} from "@/lib/pharmacy/opd/pharmacy-opd-orders-data";
import { OrderBadge, StockBadge } from "./pharmacy-order-table";

interface Props {
  order: PharmacyOPDOrder | null;
  onClose: () => void;
  onDelivered: (orderId: string, paymentMethod: PharmacyPaymentMethod) => void;
}
export function PharmacyOrderDetailDrawer({
  order,
  onClose,
  onDelivered,
}: Props) {
  const [states, setStates] = useState<DispenseMedicineState[]>([]);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [payment, setPayment] = useState<PharmacyPaymentMethod>("Cash");
  useEffect(() => {
    if (order)
      setStates(
        order.medicines.map((medicine) => {
          const batch = getDefaultBatch(medicine);
          const available = batch?.availableQuantity ?? 0;
          return {
            medicineId: medicine.id,
            selectedBatchId: batch?.id ?? null,
            dispenseQuantity: Math.min(medicine.prescribedQuantity, available),
            status:
              available === 0
                ? "Out of Stock"
                : available < medicine.prescribedQuantity
                  ? "Partial"
                  : "Available",
            included: available > 0,
          };
        }),
      );
  }, [order]);
  const total = useMemo(() => {
    if (!order) return 0;
    return order.medicines.reduce((sum, medicine) => {
      const state = states.find((row) => row.medicineId === medicine.id);
      const batch = medicine.batches.find(
        (row) => row.id === state?.selectedBatchId,
      );
      return !state?.included || !batch
        ? sum
        : sum + state.dispenseQuantity * batch.unitPrice;
    }, 0);
  }, [order, states]);
  if (!order) return null;
  const selectedOrder = order;
  function update(id: string, patch: Partial<DispenseMedicineState>) {
    setStates((previous) =>
      previous.map((row) =>
        row.medicineId === id ? { ...row, ...patch } : row,
      ),
    );
  }

  function selectBatch(medicineId: string, batchId: string) {
    const medicine = selectedOrder.medicines.find(
      (row) => row.id === medicineId,
    );

    const batch = medicine?.batches.find((row) => row.id === batchId);

    if (!medicine || !batch) return;

    update(medicineId, {
      selectedBatchId: batchId,
      dispenseQuantity: Math.min(
        medicine.prescribedQuantity,
        batch.availableQuantity,
      ),
      status:
        batch.availableQuantity === 0
          ? "Out of Stock"
          : batch.availableQuantity < medicine.prescribedQuantity
            ? "Partial"
            : "Available",
      included: batch.availableQuantity > 0,
    });
  }
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-slate-950/40" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-3xl overflow-y-auto bg-white shadow-2xl">
        <header className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white px-5 py-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold text-slate-800">
                OPD Prescription Order
              </h2>
              <OrderBadge status={order.status} />
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Order {order.id} · Appointment {order.appointmentId}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </header>
        <main className="space-y-5 p-5">
          <section className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Info
              title="Patient Details"
              icon={<UserRound className="h-4 w-4 text-blue-600" />}
              lines={[
                order.patient.name,
                `${order.patient.age} years · ${order.patient.gender} · ${order.patient.uhid}`,
                order.patient.mobile,
              ]}
            />
            <Info
              title="Prescriber Details"
              icon={<Stethoscope className="h-4 w-4 text-violet-600" />}
              lines={[
                order.doctor.name,
                order.doctor.specialty,
                `Reg. No. ${order.doctor.registrationNumber}`,
              ]}
            />
          </section>
          {order.patient.diagnosis && (
            <section className="rounded-xl border border-violet-100 bg-violet-50/60 p-4">
              <p className="text-xs font-semibold text-violet-700">
                Diagnosis / Clinical Note
              </p>
              <p className="mt-1 text-sm font-medium text-slate-800">
                {order.patient.diagnosis}
              </p>
            </section>
          )}
          {order.patient.allergies.length > 0 && (
            <section className="rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="flex items-center gap-2 text-sm font-bold text-red-800">
                <AlertTriangle className="h-4 w-4" />
                Known Allergies
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {order.patient.allergies.map((allergy) => (
                  <Badge
                    key={allergy}
                    className="border-red-200 bg-white text-red-700"
                  >
                    {allergy}
                  </Badge>
                ))}
              </div>
            </section>
          )}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="flex items-center gap-2 font-bold text-slate-800">
                  <Pill className="h-5 w-5 text-blue-600" />
                  Medicines to Dispense
                </h3>
                <p className="text-xs text-slate-500">
                  Nearest-expiry available batch is selected by default (FEFO).
                </p>
              </div>
              <span className="text-sm font-semibold text-slate-600">
                {order.medicines.length} items
              </span>
            </div>
            <div className="space-y-3">
              {order.medicines.map((medicine, index) => {
                const state = states.find(
                  (row) => row.medicineId === medicine.id,
                );
                const selectedBatch = medicine.batches.find(
                  (batch) => batch.id === state?.selectedBatchId,
                );
                const removed = !state?.included;
                const partial = state?.status === "Partial";
                return (
                  <div
                    key={medicine.id}
                    className={`rounded-xl border p-4 transition ${removed ? "border-slate-200 bg-slate-50 opacity-60" : "border-slate-200 bg-white"}`}
                  >
                    <div className="flex flex-col justify-between gap-3 sm:flex-row">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">
                            {index + 1}.
                          </span>
                          <p
                            className={`font-bold ${removed ? "line-through text-slate-500" : "text-slate-800"}`}
                          >
                            {medicine.medicineName}
                          </p>
                          <StockBadge
                            status={getMedicineStockStatus(medicine)}
                          />
                        </div>
                        <p className="mt-1 text-xs text-slate-500">
                          {medicine.dosage} · {medicine.frequency} ·{" "}
                          {medicine.duration} · Prescribed:{" "}
                          {medicine.prescribedQuantity} units
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="self-start text-red-600 hover:bg-red-50"
                        onClick={() =>
                          update(medicine.id, { included: !state?.included })
                        }
                      >
                        <Trash2 className="mr-1 h-4 w-4" />
                        {removed ? "Restore" : "Remove"}
                      </Button>
                    </div>
                    {!removed && (
                      <div className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 md:grid-cols-4">
                        <div className="md:col-span-2">
                          <p className="mb-1 text-xs font-medium text-slate-500">
                            Select Batch (FEFO)
                          </p>
                          <Select
                            value={state?.selectedBatchId ?? ""}
                            onValueChange={(value) =>
                              selectBatch(medicine.id, value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="No stock batch" />
                            </SelectTrigger>
                            <SelectContent>
                              {medicine.batches.map((batch) => (
                                <SelectItem
                                  key={batch.id}
                                  value={batch.id}
                                  disabled={batch.availableQuantity === 0}
                                >
                                  Batch {batch.batchNumber} · Stock{" "}
                                  {batch.availableQuantity} · Exp{" "}
                                  {batch.expiryDate}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Mini
                          label="Rack / Shelf"
                          value={
                            selectedBatch
                              ? `${selectedBatch.rackNumber} / ${selectedBatch.shelfNumber}`
                              : "—"
                          }
                        />
                        <Mini
                          label="Expiry"
                          value={selectedBatch?.expiryDate ?? "—"}
                        />
                        <div>
                          <p className="mb-1 text-xs font-medium text-slate-500">
                            Dispense Quantity
                          </p>
                          <input
                            type="number"
                            min={0}
                            max={selectedBatch?.availableQuantity ?? 0}
                            value={state?.dispenseQuantity ?? 0}
                            onChange={(e) =>
                              update(medicine.id, {
                                dispenseQuantity: Math.min(
                                  Math.max(0, Number(e.target.value)),
                                  selectedBatch?.availableQuantity ?? 0,
                                ),
                              })
                            }
                            className="h-9 w-full rounded-md border border-slate-200 px-3 text-sm"
                          />
                        </div>
                        <Mini
                          label="Unit Price"
                          value={
                            selectedBatch ? `₹${selectedBatch.unitPrice}` : "—"
                          }
                        />
                        <Mini
                          label="Line Total"
                          value={
                            selectedBatch
                              ? `₹${((state?.dispenseQuantity ?? 0) * selectedBatch.unitPrice).toFixed(2)}`
                              : "₹0"
                          }
                        />
                        <div className="flex items-end">
                          <Badge
                            className={
                              partial
                                ? "bg-amber-50 text-amber-700"
                                : "bg-emerald-50 text-emerald-700"
                            }
                          >
                            {partial
                              ? `Partial: ${state?.dispenseQuantity}/${medicine.prescribedQuantity}`
                              : "Full quantity available"}
                          </Badge>
                        </div>
                      </div>
                    )}
                    {removed && (
                      <p className="mt-3 text-xs font-medium text-red-600">
                        Removed from billing. This medicine remains visible for
                        audit.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </main>
        <footer className="sticky bottom-0 border-t border-slate-200 bg-white p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-slate-500">
                Payable for selected medicines
              </p>
              <p className="text-2xl font-bold text-slate-800">
                ₹{total.toFixed(2)}
              </p>
            </div>
            {order.status === "Delivered" ? (
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                <CheckCircle2 className="h-5 w-5" />
                Delivered {order.deliveredAt}
              </div>
            ) : (
              <Button
                disabled={total <= 0}
                className="gap-2 bg-blue-600 hover:bg-blue-700"
                onClick={() => setPaymentOpen(true)}
              >
                <CreditCard className="h-4 w-4" />
                Continue to Payment
              </Button>
            )}
          </div>
        </footer>
        {paymentOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[2px]">
            <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
              {/* Header */}
              <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 via-cyan-50 to-white px-5 py-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <PackageCheck className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      Collect Pharmacy Payment
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Select the patient&apos;s payment method to dispatch
                      medicines.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5">
                {/* Payment total */}
                <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                        Total Medicine Value
                      </p>

                      <p className="mt-1 text-3xl font-bold tracking-tight text-slate-800">
                        ₹{total.toFixed(2)}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Includes selected medicines and approved partial
                        quantities.
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                      <Pill className="h-6 w-6" />
                    </div>
                  </div>
                </div>

                {/* Payment method heading */}
                <div className="mt-5 flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-800">
                    Payment Method
                  </p>

                  <span className="text-xs text-slate-400">
                    Select one option
                  </span>
                </div>

                {/* Payment options */}
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {(
                    [
                      {
                        value: "Cash" as const,
                        label: "Cash",
                        description: "Collect cash at pharmacy counter",
                        icon: Banknote,
                        iconClassName: "bg-emerald-100 text-emerald-600",
                        selectedClassName: "border-emerald-500 bg-emerald-50",
                      },
                      {
                        value: "UPI" as const,
                        label: "UPI",
                        description: "QR code or UPI application",
                        icon: Smartphone,
                        iconClassName: "bg-violet-100 text-violet-600",
                        selectedClassName: "border-violet-500 bg-violet-50",
                      },
                      {
                        value: "Card" as const,
                        label: "Card",
                        description: "Debit or credit card payment",
                        icon: CreditCard,
                        iconClassName: "bg-blue-100 text-blue-600",
                        selectedClassName: "border-blue-500 bg-blue-50",
                      },
                      {
                        value: "Net Banking" as const,
                        label: "Net Banking",
                        description: "Direct bank account transfer",
                        icon: Landmark,
                        iconClassName: "bg-amber-100 text-amber-600",
                        selectedClassName: "border-amber-500 bg-amber-50",
                      },
                    ] satisfies Array<{
                      value: PharmacyPaymentMethod;
                      label: string;
                      description: string;
                      icon: React.ElementType;
                      iconClassName: string;
                      selectedClassName: string;
                    }>
                  ).map((option) => {
                    const Icon = option.icon;
                    const isSelected = payment === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setPayment(option.value)}
                        className={`relative flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                          isSelected
                            ? `${option.selectedClassName} shadow-sm`
                            : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
                        }`}
                      >
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${option.iconClassName}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-800">
                            {option.label}
                          </p>

                          <p className="mt-0.5 truncate text-[11px] text-slate-500">
                            {option.description}
                          </p>
                        </div>

                        {isSelected && (
                          <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Selected method */}
                <div className="mt-5 flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5">
                  <CreditCard className="h-4 w-4 text-blue-600" />

                  <p className="text-xs text-slate-600">
                    Selected payment method:{" "}
                    <span className="font-bold text-slate-800">{payment}</span>
                  </p>
                </div>

                {/* Delivery / audit note */}
                <div className="mt-3 flex items-start gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />

                  <p className="text-xs leading-5 text-emerald-800">
                    Confirming payment will mark the order as paid, record the
                    payment method, and mark all selected medicines as
                    dispatched and delivered to the patient.
                  </p>
                </div>
              </div>

              {/* Footer actions */}
              <div className="flex gap-3 border-t border-slate-100 bg-slate-50/60 p-5">
                <Button
                  variant="outline"
                  className="flex-1 border-slate-200 bg-white"
                  onClick={() => setPaymentOpen(false)}
                >
                  Cancel
                </Button>

                <Button
                  className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => {
                    onDelivered(order.id, payment);
                    setPaymentOpen(false);
                  }}
                >
                  <PackageCheck className="h-4 w-4" />
                  Collect & Deliver
                </Button>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

function Info({
  title,
  icon,
  lines,
}: {
  title: string;
  icon: React.ReactNode;
  lines: string[];
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <p className="flex items-center gap-2 text-sm font-bold text-slate-800">
        {icon}
        {title}
      </p>
      {lines.map((line, index) => (
        <p
          key={index}
          className={`mt-${index === 0 ? "3" : "1"} text-sm ${index === 0 ? "font-semibold text-slate-700" : "text-slate-500"}`}
        >
          {line}
        </p>
      ))}
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">{value}</p>
    </div>
  );
}
