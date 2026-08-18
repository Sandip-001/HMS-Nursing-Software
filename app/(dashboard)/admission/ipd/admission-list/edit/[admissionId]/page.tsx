// app/ipd/admission-list/edit/[admissionId]/page.tsx
"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { User, Wallet, BedDouble, Info, Save, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
    type EditAdmissionFormInput,
  editAdmissionSchema,
  type EditAdmissionFormValues,
} from "@/lib/edit-admission-schema";
import { GENERAL_BED_RATE } from "@/lib/bed-data";
import { Bed } from "@/types/admission-types";
import { EditHeaderBar } from "../_components/edit-header-bar";
import { EditBedGrid } from "../_components/edit-bed-grid";
import { SectionCard } from "../_components/section-card";

// Replace with real fetch(`/api/admissions/${admissionId}`) later
function getMockAdmission(admissionId: string): EditAdmissionFormValues {
  return {
    uhid: "UHID12345680",
    opdMrNo: "OPD240520-0003",
    patientName: "Amit Kumar",
    age: 45,
    gender: "Male",
    mobile: "9876543210",
    email: "amit.kumar@email.com",
    address: "123, Green Park, Civil Lines, Delhi - 110054",
    department: "General Medicine",
    attendingDoctor: "Dr. Amit Verma",
    admissionType: "Elective",
    priority: "Normal",
    referredBy: "Dr. Amit Verma",
    remarks: "",
    packageCategory: "General Package",
    packageName: "General Package (5 Days)",
    packageRate: 15000,
    expectedStayDays: 5,
    totalEstimatedAmount: 75000,
    advanceAmount: 37500,
    paymentMode: "Cash",
    transactionNo: "RCPT240520-0001",
    paymentDate: "2024-05-20",
    floor: "3rd Floor",
    wardRoomType: "General Ward",
    roomNo: "302",
    bedNo: "B-02",
    bedType: "General Bed",
    bedCharges: 15000,
    isolatedBed: false,
    specialInstructions: "",
    expectedDischargeDate: "2024-05-25",
    admissionSource: "OPD",
    admissionBy: "Dr. Amit Verma",
    admissionDeskStaff: "Amit Sharma",
  };
}

export default function EditAdmissionPage() {
  const router = useRouter();
  const params = useParams<{ admissionId: string }>();
  const admissionId = params.admissionId;

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const form = useForm<EditAdmissionFormInput, unknown, EditAdmissionFormValues>({
    resolver: zodResolver(editAdmissionSchema),
    defaultValues: getMockAdmission(admissionId),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const selectedBedKey = `${watch("roomNo")}-${watch("bedNo")}`;

  function handleSelectBed(bed: Bed & { floor: string; ward: string }) {
    setValue("floor", bed.floor);
    setValue("wardRoomType", bed.ward);
    setValue("roomNo", bed.roomNo);
    setValue("bedNo", bed.bedNo);
    setValue("bedType", "General Bed");
    setValue("bedCharges", GENERAL_BED_RATE);
    toast.success(`Bed ${bed.bedNo} (Room ${bed.roomNo}) selected`);
  }

  async function onSubmit(values: EditAdmissionFormValues) {
    setSaving(true);
    console.log("Updated admission payload:", { admissionId, ...values });
    await new Promise((r) => setTimeout(r, 900));
    setSaving(false);
    toast.success("Admission updated successfully", {
      description: `${values.patientName}'s admission details have been saved.`,
    });
    router.push("/admission/ipd/admission-list");
  }

  function handleCancelAdmission() {
    console.log("Cancel admission:", admissionId);
    toast.error(`Admission ${admissionId} has been cancelled`);
    setCancelDialogOpen(false);
    router.push("/admission/ipd/admission-list");
  }

  const balance = watch("totalEstimatedAmount") - watch("advanceAmount");

  return (
    <div className="min-h-screen">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-7xl space-y-6"
      >
        <EditHeaderBar
          admissionId={admissionId}
          admissionDateTime="20 May 2024, 11:30 AM"
          status="Active"
          admissionType={watch("admissionType")}
          department={watch("department")}
          attendingDoctor={watch("attendingDoctor")}
          onCancelAdmission={() => setCancelDialogOpen(true)}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 1. Patient Information */}
          <SectionCard number={1} icon={User} title="Patient Information">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="UHID" required error={errors.uhid?.message}>
                <div className="relative">
                  <Input {...register("uhid")} />
                  <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </Field>
              <Field
                label="OPD / MR No."
                required
                error={errors.opdMrNo?.message}
              >
                <Input {...register("opdMrNo")} />
              </Field>
              <Field
                label="Patient Name"
                required
                error={errors.patientName?.message}
              >
                <Input {...register("patientName")} />
              </Field>
              <Field label="Age" required error={errors.age?.message}>
                <Input type="number" {...register("age")} />
              </Field>
              <Field label="Gender" required>
                <Select
                  value={watch("gender")}
                  onValueChange={(v) =>
                    setValue("gender", v as EditAdmissionFormValues["gender"])
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Mobile No." required error={errors.mobile?.message}>
                <Input {...register("mobile")} />
              </Field>
              <Field label="Email">
                <Input type="email" {...register("email")} />
              </Field>
              <Field
                label="Address"
                required
                error={errors.address?.message}
                full
              >
                <Textarea rows={2} {...register("address")} />
              </Field>
              <Field label="Department" required>
                <Select
                  value={watch("department")}
                  onValueChange={(v) => setValue("department", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "General Medicine",
                      "General Surgery",
                      "Cardiology",
                      "Orthopedics",
                      "Pediatrics",
                      "ENT",
                      "Dermatology",
                      "Neurology",
                    ].map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Attending Doctor" required>
                <Input {...register("attendingDoctor")} />
              </Field>
              <Field label="Admission Type" required>
                <Select
                  value={watch("admissionType")}
                  onValueChange={(v) => setValue("admissionType", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Elective">Elective</SelectItem>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Priority" required>
                <Select
                  value={watch("priority")}
                  onValueChange={(v) => setValue("priority", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Referred By" full>
                <Input {...register("referredBy")} />
              </Field>
              <Field label="Remarks" full>
                <Textarea
                  rows={2}
                  placeholder="Enter remarks (if any)"
                  {...register("remarks")}
                />
              </Field>
            </div>
          </SectionCard>

          {/* 2. Package & Payment Details */}
          <SectionCard
            number={2}
            icon={Wallet}
            title="Package & Payment Details"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Package Category" required>
                <Select
                  value={watch("packageCategory")}
                  onValueChange={(v) => setValue("packageCategory", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Package">
                      General Package
                    </SelectItem>
                    <SelectItem value="Semi Private Package">
                      Semi Private Package
                    </SelectItem>
                    <SelectItem value="Deluxe Package">
                      Deluxe Package
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Package" required>
                <Select
                  value={watch("packageName")}
                  onValueChange={(v) => setValue("packageName", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Package (5 Days)">
                      General Package (5 Days)
                    </SelectItem>
                    <SelectItem value="Semi Private (3 Days)">
                      Semi Private (3 Days)
                    </SelectItem>
                    <SelectItem value="Deluxe (4 Days)">
                      Deluxe (4 Days)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Package Rate">
                <Input
                  readOnly
                  value={`₹ ${watch("packageRate")?.toLocaleString("en-IN")} Per Day`}
                  className="bg-slate-50"
                />
              </Field>
              <Field
                label="Expected Stay (Days)"
                required
                error={errors.expectedStayDays?.message}
              >
                <Input type="number" {...register("expectedStayDays")} />
              </Field>
              <Field label="Total Estimated Amount">
                <Input
                  readOnly
                  value={`₹ ${watch("totalEstimatedAmount")?.toLocaleString("en-IN")}`}
                  className="bg-slate-50"
                />
              </Field>
              <Field
                label="Advance Paid"
                required
                error={errors.advanceAmount?.message}
              >
                <Input type="number" {...register("advanceAmount")} />
              </Field>
              <Field label="Payment Mode" required>
                <Select
                  value={watch("paymentMode")}
                  onValueChange={(v) => setValue("paymentMode", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Card">Card</SelectItem>
                    <SelectItem value="UPI">UPI</SelectItem>
                    <SelectItem value="Insurance">Insurance</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Transaction / Receipt No.">
                <Input {...register("transactionNo")} />
              </Field>
              <Field
                label="Payment Date"
                required
                error={errors.paymentDate?.message}
              >
                <Input type="date" {...register("paymentDate")} />
              </Field>
              <div className="sm:col-span-2">
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
                  <p className="text-xs text-slate-500">Balance Amount</p>
                  <p className="text-lg font-bold text-emerald-600">
                    ₹ {balance.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* 3. Bed Allocation Details */}
        <SectionCard number={3} icon={BedDouble} title="Bed Allocation Details">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
            <EditBedGrid
              selectedBedId={`${watch("roomNo")}-${watch("bedNo")}`}
              onSelectBed={handleSelectBed}
            />

            <div className="space-y-4 rounded-lg border border-slate-100 p-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Floor / Ward" full>
                  <Input
                    readOnly
                    value={`${watch("floor")} / ${watch("wardRoomType")}`}
                    className="bg-slate-50"
                  />
                </Field>
                <Field label="Room No.">
                  <Input
                    readOnly
                    value={watch("roomNo")}
                    className="bg-slate-50"
                  />
                </Field>
                <Field label="Bed No.">
                  <Input
                    readOnly
                    value={watch("bedNo")}
                    className="bg-slate-50"
                  />
                </Field>
                <Field label="Bed Type">
                  <Input
                    readOnly
                    value={watch("bedType")}
                    className="bg-slate-50"
                  />
                </Field>
                <Field label="Bed Charges">
                  <Input
                    readOnly
                    value={`₹ ${watch("bedCharges")?.toLocaleString("en-IN")} Per Day`}
                    className="bg-slate-50"
                  />
                </Field>
                <Field label="Patient Isolated Bed" full>
                  <div className="flex items-center gap-3 pt-1">
                    <Switch
                      checked={watch("isolatedBed")}
                      onCheckedChange={(v) => setValue("isolatedBed", v)}
                    />
                    <span className="text-sm text-slate-600">
                      {watch("isolatedBed") ? "Yes" : "No"}
                    </span>
                  </div>
                </Field>
                <Field label="Special Instructions / Remarks" full>
                  <Textarea
                    rows={2}
                    placeholder="Enter special instructions (if any)"
                    {...register("specialInstructions")}
                  />
                </Field>
                <Field
                  label="Expected Discharge Date"
                  required
                  error={errors.expectedDischargeDate?.message}
                  full
                >
                  <Input type="date" {...register("expectedDischargeDate")} />
                </Field>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* 4. Additional Information */}
        <SectionCard number={4} icon={Info} title="Additional Information">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="Admission Source" required>
              <Select
                value={watch("admissionSource")}
                onValueChange={(v) => setValue("admissionSource", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OPD">OPD</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                  <SelectItem value="Referral">Referral</SelectItem>
                  <SelectItem value="Direct">Direct</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Admission By" required>
              <Input {...register("admissionBy")} />
            </Field>
            <Field label="Admission Desk Staff" required>
              <Input {...register("admissionDeskStaff")} />
            </Field>
          </div>
        </SectionCard>

        <div className="flex items-start gap-2 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          Note: Fields marked with <span className="font-semibold">*</span> are
          mandatory.
        </div>

        {/* Sticky action bar */}
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] sm:px-6">
          <div className="mx-auto flex max-w-7xl flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="gap-2"
              onClick={() => router.push("/admission/ipd/admission-list")}
            >
              <X className="h-4 w-4" /> Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Save className="h-4 w-4" />{" "}
              {saving ? "Updating..." : "Update Admission"}
            </Button>
          </div>
        </div>
      </form>

      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel this admission?</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark admission {admissionId} as cancelled and release
              the allocated bed. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Go Back</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelAdmission}
              className="bg-red-600 hover:bg-red-700"
            >
              Yes, Cancel Admission
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function Field({
  label,
  required,
  error,
  full,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <Label className="mb-1.5 block text-xs font-medium text-slate-500">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
