// components/ipd-admission/steps/step2-package-payment.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { PACKAGES } from "@/lib/package-data";
import { packageInfoSchema, type PackageInfoFormValues } from "@/lib/admission-schema";
import { Package } from "@/types/admission-types";
import { PackageCard } from "./package-card";


const RECEIVED_BY_OPTIONS = ["Dr. Amit Verma", "Front Desk - Kavita", "Billing - Rohit Sen"];

interface Step2PackagePaymentProps {
  defaultValues?: Partial<PackageInfoFormValues>;
  onSubmit: (values: PackageInfoFormValues) => void;
  onSaveDraft?: (values: Partial<PackageInfoFormValues>) => void;
  onBack?: () => void;
}

export function Step2PackagePayment({
  defaultValues,
  onSubmit,
  onSaveDraft,
  onBack,
}: Step2PackagePaymentProps) {
  const initialPkg = PACKAGES.find((p) => p.id === defaultValues?.packageId) ?? PACKAGES[0];
  const [selectedPackage, setSelectedPackage] = useState<Package>(initialPkg);
  const [compareOpen, setCompareOpen] = useState(false);

  const form = useForm<PackageInfoFormValues>({
    resolver: zodResolver(packageInfoSchema),
    defaultValues: {
      packageId: initialPkg.id,
      packageName: initialPkg.name,
      packageRate: initialPkg.rate,
      expectedStayDays: 5,
      totalEstimatedAmount: initialPkg.rate * 5,
      advanceMode: "percentage",
      advancePercentage: 50,
      advanceAmount: (initialPkg.rate * 5 * 50) / 100,
      paymentMode: "Cash",
      transactionNo: "",
      paymentDate: new Date().toISOString().slice(0, 10),
      receivedBy: "",
      ...defaultValues,
    },
    mode: "onBlur",
  });

  const stayDays = form.watch("expectedStayDays");
  const advanceMode = form.watch("advanceMode");
  const advancePercentage = form.watch("advancePercentage");

  const totalEstimated = useMemo(
    () => (selectedPackage.rate || 0) * (Number(stayDays) || 0),
    [selectedPackage.rate, stayDays]
  );

  useEffect(() => {
    form.setValue("packageId", selectedPackage.id);
    form.setValue("packageName", selectedPackage.name);
    form.setValue("packageRate", selectedPackage.rate);
  }, [selectedPackage, form]);

  useEffect(() => {
    form.setValue("totalEstimatedAmount", totalEstimated);
    if (advanceMode === "percentage") {
      const amt = Math.round((totalEstimated * (Number(advancePercentage) || 0)) / 100);
      form.setValue("advanceAmount", amt);
    }
  }, [totalEstimated, advanceMode, advancePercentage, form]);

  function handlePackageSelect(pkg: Package) {
    setSelectedPackage(pkg);
    toast.info(`${pkg.name} selected, ₹${pkg.rate.toLocaleString("en-IN")} per day`);
  }

  function handleValidSubmit(values: PackageInfoFormValues) {
    console.log("Package & Payment saved:", values);
    toast.success("Advance payment collected successfully");
    onSubmit(values);
  }

  function handleInvalidSubmit(errors: unknown) {
    console.log("Validation errors:", errors);
    toast.error("Please fix the highlighted fields");
  }

  function handleSaveDraft() {
    const values = form.getValues();
    console.log("Draft saved:", values);
    toast("Saved as draft", {
      description: "You can resume this admission later.",
    });
    onSaveDraft?.(values);
  }

  const balanceAmount = totalEstimated - (form.watch("advanceAmount") || 0);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleValidSubmit, handleInvalidSubmit)} className="space-y-6">
        {/* --- Package Selection --- */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-base font-semibold text-slate-800">Select IPD Package</CardTitle>
              <p className="text-xs text-slate-400">Choose a suitable package for the patient</p>
            </div>
            <Dialog open={compareOpen} onOpenChange={setCompareOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">Compare Packages</Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Compare Packages</DialogTitle>
                </DialogHeader>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-slate-500">
                        <th className="py-2 pr-4">Feature</th>
                        {PACKAGES.map((p) => (
                          <th key={p.id} className="py-2 pr-4 font-semibold text-slate-800">{p.name}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 pr-4 text-slate-500">Rate/Day</td>
                        {PACKAGES.map((p) => (
                          <td key={p.id} className="py-2 pr-4">₹{p.rate.toLocaleString("en-IN")}</td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 pr-4 text-slate-500">Room Type</td>
                        {PACKAGES.map((p) => (
                          <td key={p.id} className="py-2 pr-4">{p.roomType}</td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 pr-4 text-slate-500">Investigations</td>
                        {PACKAGES.map((p) => (
                          <td key={p.id} className="py-2 pr-4">{p.investigations}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PACKAGES.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  selected={selectedPackage.id === pkg.id}
                  onSelect={handlePackageSelect}
                />
              ))}
            </div>
            <div className="mt-4 rounded-lg bg-blue-50 px-4 py-2.5 text-xs text-blue-600">
              Package can be changed later as per availability and patient condition.
            </div>
          </CardContent>
        </Card>

        {/* --- Deposit & Payment Details --- */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold text-slate-800">Deposit &amp; Payment Details</CardTitle>
            <p className="text-xs text-slate-400">Collect advance payment to confirm admission</p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <Label className="text-slate-600">Package Selected</Label>
                <div className="mt-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                  {selectedPackage.name}
                  <p className="text-xs font-normal text-slate-400">{selectedPackage.roomType}</p>
                </div>
              </div>
              <div>
                <Label className="text-slate-600">Package Rate</Label>
                <div className="mt-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                  ₹ {selectedPackage.rate.toLocaleString("en-IN")} <span className="text-xs font-normal text-slate-400">Per Day</span>
                </div>
              </div>
              <FormField
                control={form.control}
                name="expectedStayDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Stay (Days) *</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} max={365} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Label className="text-slate-600">Total Estimated Amount</Label>
                <div className="mt-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                  ₹ {totalEstimated.toLocaleString("en-IN")}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label className="mb-2 block text-slate-600">Advance/Deposit Policy</Label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      checked={advanceMode === "percentage"}
                      onChange={() => form.setValue("advanceMode", "percentage")}
                    />
                    Percentage of Estimated Amount
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      checked={advanceMode === "fixed"}
                      onChange={() => form.setValue("advanceMode", "fixed")}
                    />
                    Fixed Amount
                  </label>
                </div>
                {advanceMode === "percentage" && (
                  <div className="mt-2 flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name="advancePercentage"
                      render={({ field }) => (
                        <FormItem className="w-24">
                          <FormControl>
                            <Input type="number" min={0} max={100} {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <span className="text-sm text-slate-400">% =</span>
                    <span className="text-sm font-semibold text-emerald-600">
                      ₹ {(form.watch("advanceAmount") || 0).toLocaleString("en-IN")}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <Label className="mb-2 block text-slate-600">Payment Mode *</Label>
                <div className="flex flex-wrap gap-2">
                  {(["Cash", "Card", "UPI", "Net Banking", "Cheque", "Other"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => form.setValue("paymentMode", mode)}
                      className={cn(
                        "rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
                        form.watch("paymentMode") === mode
                          ? "border-blue-500 bg-blue-50 text-blue-600"
                          : "border-slate-200 text-slate-500 hover:bg-slate-50"
                      )}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
                <FormMessage>{form.formState.errors.paymentMode?.message}</FormMessage>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <FormField
                control={form.control}
                name="advanceAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount Received *</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} disabled={advanceMode === "percentage"} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="transactionNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction / Receipt No. *</FormLabel>
                    <FormControl>
                      <Input placeholder="RCPT240520-0001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Date *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="receivedBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Received By *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {RECEIVED_BY_OPTIONS.map((r) => (
                          <SelectItem key={r} value={r}>{r}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {form.formState.isSubmitted && form.formState.isValid && (
              <div className="rounded-lg bg-emerald-50 px-4 py-2.5 text-sm text-emerald-600">
                Advance payment collected successfully. You can proceed to bed allocation.
              </div>
            )}
          </CardContent>
        </Card>

        {/* --- Action Buttons --- */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            ← Back to Patient Info
          </Button>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="button" variant="outline" onClick={handleSaveDraft}>
              Save as Draft
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Proceed to Bed Allocation →
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}