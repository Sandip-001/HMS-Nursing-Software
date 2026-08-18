// app/ipd/new-admission/_components/step3-bed-allocation.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { RotateCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { BedAvailabilityGrid } from "./bed-availability-grid";
import { bedAllocationSchema, type BedAllocationFormValues } from "@/lib/admission-schema";
import type { PatientInfoFormValues } from "@/lib/admission-schema";

import { GENERAL_BED_RATE } from "@/lib/bed-data";
import { useState } from "react";
import { Bed } from "@/types/admission-types";

interface Step3BedAllocationProps {
  patientInfo: PatientInfoFormValues | null;
  defaultValues?: Partial<BedAllocationFormValues>;
  onSubmit: (values: BedAllocationFormValues) => void;
  onBack?: () => void;
  onHoldBed?: (values: Partial<BedAllocationFormValues>) => void;
}

export function Step3BedAllocation({
  patientInfo,
  defaultValues,
  onSubmit,
  onBack,
  onHoldBed,
}: Step3BedAllocationProps) {
  const [selectedBedId, setSelectedBedId] = useState<string | null>(
    defaultValues?.bedNo ? `${defaultValues.roomNo}-${defaultValues.bedNo}` : null
  );

  const form = useForm<BedAllocationFormValues>({
    resolver: zodResolver(bedAllocationSchema),
    defaultValues: {
      floor: "",
      wardRoomType: "",
      roomNo: "",
      bedNo: "",
      bedType: "General Bed",
      bedCharges: GENERAL_BED_RATE,
      isolatedBed: false,
      specialInstructions: "",
      expectedDischargeDate: "",
      ...defaultValues,
    },
  });

  function handleBedSelect(bed: Bed & { floor: string; ward: string }) {
    setSelectedBedId(bed.id);
    form.setValue("floor", bed.floor);
    form.setValue("wardRoomType", bed.ward);
    form.setValue("roomNo", bed.roomNo);
    form.setValue("bedNo", bed.bedNo);
    form.setValue("bedType", bed.ward.includes("Semi") ? "Semi Private Bed" : "General Bed");
    form.setValue("bedCharges", GENERAL_BED_RATE);
    toast.success(`Bed ${bed.bedNo} selected`, {
      description: `Room ${bed.roomNo}, ${bed.ward}`,
    });
    form.clearErrors(["roomNo", "bedNo"]);
  }

  function handleValidSubmit(values: BedAllocationFormValues) {
    console.log("Bed allocation saved:", values);
    toast.success("Bed will be allocated after admission confirmation.");
    onSubmit(values);
  }

  function handleInvalidSubmit(errors: unknown) {
    console.log("Validation errors:", errors);
    toast.error("Please select a bed and fill required fields", {
      description: "Check the highlighted fields before proceeding.",
    });
  }

  function handleHoldBed() {
    const values = form.getValues();
    if (!values.bedNo) {
      toast.error("Select a bed first to hold it");
      return;
    }
    console.log("Bed held:", values);
    toast.info(`Bed ${values.bedNo} held temporarily`, {
      description: "This bed will be reserved for 15 minutes.",
    });
    onHoldBed?.(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleValidSubmit, handleInvalidSubmit)} className="space-y-6">
        {/* Step 1: Check Bed Availability */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold text-slate-800">Step 1: Check Bed Availability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
              <Select defaultValue="all">
                <SelectTrigger><SelectValue placeholder="Floor" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Floors</SelectItem>
                  <SelectItem value="3rd">3rd Floor</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger><SelectValue placeholder="Ward / Room Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="general">General Ward</SelectItem>
                  <SelectItem value="semi">Semi Private</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger><SelectValue placeholder="Room Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger><SelectValue placeholder="Bed Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
              <Button type="button" variant="outline" className="gap-2">
                <RotateCw className="h-4 w-4" /> Refresh
              </Button>
            </div>

            <BedAvailabilityGrid selectedBedId={selectedBedId} onSelectBed={handleBedSelect} />
          </CardContent>
        </Card>

        {/* Step 2: Select Bed & Allocation Details */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold text-slate-800">
              Step 2: Select Bed &amp; Allocation Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div>
                <FormLabel className="text-slate-600">Selected Floor / Ward</FormLabel>
                <div className="mt-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                  {form.watch("floor") && form.watch("wardRoomType")
                    ? `${form.watch("floor")} / ${form.watch("wardRoomType")}`
                    : "—"}
                </div>
              </div>
              <FormField control={form.control} name="roomNo" render={({ field }) => (
                <FormItem>
                  <FormLabel>Room No.</FormLabel>
                  <FormControl>
                    <Input readOnly placeholder="—" {...field} className="bg-slate-50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="bedNo" render={({ field }) => (
                <FormItem>
                  <FormLabel>Bed No.</FormLabel>
                  <FormControl>
                    <Input readOnly placeholder="—" {...field} className="bg-slate-50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="bedType" render={({ field }) => (
                <FormItem>
                  <FormLabel>Bed Type</FormLabel>
                  <FormControl>
                    <Input readOnly {...field} className="bg-slate-50" />
                  </FormControl>
                </FormItem>
              )} />
              <FormField control={form.control} name="bedCharges" render={({ field }) => (
                <FormItem>
                  <FormLabel>Bed Charges</FormLabel>
                  <FormControl>
                    <Input readOnly value={`₹ ${Number(field.value || 0).toLocaleString("en-IN")}`} className="bg-slate-50" />
                  </FormControl>
                  <p className="text-[10px] text-slate-400">Per Day</p>
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <FormField control={form.control} name="isolatedBed" render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-md border border-slate-200 px-3 py-2.5">
                  <FormLabel className="text-slate-600">Patient Isolated Bed</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )} />
              <FormField control={form.control} name="specialInstructions" render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Instructions / Remarks</FormLabel>
                  <FormControl>
                    <Input placeholder="—" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="expectedDischargeDate" render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Discharge Date *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="rounded-lg bg-emerald-50 px-4 py-2.5 text-sm text-emerald-600">
              Bed will be allocated after admission confirmation.
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button type="button" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50" onClick={onBack}>
            ← Back to Package & Payment
          </Button>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="button" variant="outline" onClick={handleHoldBed}>
              Hold Bed
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Proceed to Review & Confirm →
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}