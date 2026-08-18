// components/ipd-admission/steps/step1-patient-info.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { patientInfoSchema, type PatientInfoFormValues } from "@/lib/admission-schema";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const DEPARTMENTS = ["General Medicine", "Cardiology", "Orthopedics", "Neurology", "Pediatrics", "Gynecology"];
const DOCTORS = ["Dr. Amit Verma", "Dr. Neha Kapoor", "Dr. Sanjay Rao", "Dr. Priya Nair"];

interface Step1PatientInfoProps {
  defaultValues?: Partial<PatientInfoFormValues>;
  onSubmit: (values: PatientInfoFormValues) => void;
  onSaveDraft?: (values: Partial<PatientInfoFormValues>) => void;
  onCancel?: () => void;
}

export function Step1PatientInfo({
  defaultValues,
  onSubmit,
  onSaveDraft,
  onCancel,
}: Step1PatientInfoProps) {
  const form = useForm<PatientInfoFormValues>({
    resolver: zodResolver(patientInfoSchema),
    defaultValues: {
      uhid: "",
      patientName: "",
      age: "",
      gender: "Male",
      mobile: "",
      opdMrNo: "",
      email: "",
      address: "",
      bloodGroup: "",
      referredBy: "",
      department: "General Medicine",
      admissionType: "Elective",
      priority: "Normal",
      attendingDoctor: "",
      provisionalDiagnosis: "",
      chiefComplaints: "",
      medicalHistory: "",
      ...defaultValues,
    },
    mode: "onBlur",
  });

  function handleSubmit(values: PatientInfoFormValues) {
    onSubmit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* --- Patient Information Card --- */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-800">
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FormField
              control={form.control}
              name="uhid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>UHID *</FormLabel>
                  <FormControl>
                    <Input placeholder="UHID12345680" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="patientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Amit Kumar" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age *</FormLabel>
                  <FormControl>
                    <Input placeholder="45" inputMode="numeric" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile No. *</FormLabel>
                  <FormControl>
                    <Input placeholder="9876543210" inputMode="numeric" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="opdMrNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OPD / MR No.</FormLabel>
                  <FormControl>
                    <Input placeholder="OPD240520-0003" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="amitkumar@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bloodGroup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Group *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {BLOOD_GROUPS.map((bg) => (
                        <SelectItem key={bg} value={bg}>
                          {bg}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="sm:col-span-2 lg:col-span-4">
                  <FormLabel>Address *</FormLabel>
                  <FormControl>
                    <Input placeholder="123, Green Park, Civil Lines, Delhi - 110054" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* --- Clinical Information Card --- */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold text-slate-800">Clinical Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FormField
              control={form.control}
              name="provisionalDiagnosis"
              render={({ field }) => (
                <FormItem className="sm:col-span-2 lg:col-span-4">
                  <FormLabel>Provisional Diagnosis *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select diagnosis" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Acute sinusitis, unspecified">Acute sinusitis, unspecified</SelectItem>
                      <SelectItem value="Hypertension">Hypertension</SelectItem>
                      <SelectItem value="Type 2 Diabetes Mellitus">Type 2 Diabetes Mellitus</SelectItem>
                      <SelectItem value="Acute Gastroenteritis">Acute Gastroenteritis</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="chiefComplaints"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Chief Complaints</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nasal congestion, headache, mild fever and sore throat since 2 days."
                      className="resize-none"
                      rows={3}
                      maxLength={500}
                      {...field}
                    />
                  </FormControl>
                  <p className="text-right text-xs text-slate-400">
                    {field.value?.length ?? 0}/500
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="medicalHistory"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Medical History / Allergies</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="No known drug allergies."
                      className="resize-none"
                      rows={3}
                      maxLength={500}
                      {...field}
                    />
                  </FormControl>
                  <p className="text-right text-xs text-slate-400">
                    {field.value?.length ?? 0}/500
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* --- Admission Details (part of same step, as seen top-right of card 1 in image) --- */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold text-slate-800">Admission Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FormField
              control={form.control}
              name="referredBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Referred By</FormLabel>
                  <FormControl>
                    <Input placeholder="Dr. Amit Verma (OPD)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DEPARTMENTS.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="admissionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admission Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Elective">Elective</SelectItem>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                      <SelectItem value="Referral">Referral</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="attendingDoctor"
              render={({ field }) => (
                <FormItem className="sm:col-span-2 lg:col-span-4">
                  <FormLabel>Attending Doctor *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select attending doctor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DOCTORS.map((doc) => (
                        <SelectItem key={doc} value={doc}>
                          {doc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* --- Action Buttons --- */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={onCancel}
          >
            Cancel Admission
          </Button>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() => onSaveDraft?.(form.getValues())}
            >
              Save as Draft
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Proceed to Package & Payment →
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}