// app/admission-desk/opd/appointments/book/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { lookupAyushmanCard } from "@/lib/admission-desk/opd/ayushman-mock-data";
import {
  DOCTORS,
  PATIENTS,
  getSlotsForDoctor,
} from "@/lib/admission-desk/opd/appointment-data";
import type {
  AppointmentSlot,
  AppointmentType,
  DoctorProfile,
  PatientProfile,
  PaymentMethod,
  Specialty,
} from "@/types/admission-desk/opd/appointment-types";
import { Progress } from "./_components/progress";
import { PatientTypeStep } from "./_components/patientTypeStep";
import { PatientDetailsStep } from "./_components/patientDetailsStep";
import { DoctorSlotStep } from "./_components/doctorSlotStep";
import { ReviewStep } from "./_components/reviewStep";
import { PaymentStep } from "./_components/paymentStep";

import { SuccessDialog } from "./_components/successDialog";
import { AyushmanDialog } from "./_components/ayushmanDialog";


const blankPatient: PatientProfile = {
  uhid: "",
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: "",
  age: 0,
  gender: "Male",
  mobile: "",
  alternativeMobile: "",
  email: "",
  address: "",
  state: "",
  city: "",
  pinCode: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  emergencyContactRelationship: "",
};

export default function BookConsultationPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [type, setType] = useState<AppointmentType | null>(null);
  const [patient, setPatient] = useState<PatientProfile>(blankPatient);
  const [followQuery, setFollowQuery] = useState("");
  const [specialty, setSpecialty] = useState<Specialty | null>(null);
  const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState<AppointmentSlot | null>(null);
  const [payment, setPayment] = useState<PaymentMethod | null>(null);
  const [ayushmanOpen, setAyushmanOpen] = useState(false);
  const [cardNo, setCardNo] = useState("");
  const [lookupState, setLookupState] = useState<"idle" | "loading">("idle");
  const [success, setSuccess] = useState(false);
  const followMatches = PATIENTS.filter((p) =>
    [p.uhid, p.firstName, p.lastName, p.mobile]
      .join(" ")
      .toLowerCase()
      .includes(followQuery.toLowerCase()),
  );
  const selectedDoctors = specialty
    ? DOCTORS.filter((d) => d.specialtyId === specialty.id)
    : [];
  const slots = doctor && date ? getSlotsForDoctor(doctor, date) : [];
  const gst = doctor
    ? Math.round((doctor.consultationFee * doctor.gstPercent) / 100)
    : 0;
  const total = doctor ? doctor.consultationFee + gst : 0;
  function patch<K extends keyof PatientProfile>(
    key: K,
    value: PatientProfile[K],
  ) {
    setPatient((p) => ({ ...p, [key]: value }));
  }

  function selectType(next: AppointmentType) {
    setType(next);
    setPatient(blankPatient);
    setStep(1);
  }
  async function ayushmanLookup() {
    if (cardNo.length < 16) {
      toast.error("Enter a valid 16-digit Ayushman Bharat card number");
      return;
    }
    setLookupState("loading");
    const result = await lookupAyushmanCard(cardNo);
    setLookupState("idle");
    if (!result) {
      toast.error("No record found for this Ayushman Bharat card number");
      return;
    }
    setPatient({ ...result, uhid: "" });
    setAyushmanOpen(false);
    toast.success(
      "Patient details fetched successfully. You can edit them before continuing.",
    );
  }
  function next() {
    if (
      step === 1 &&
      (!patient.firstName ||
        !patient.lastName ||
        !patient.dateOfBirth ||
        patient.mobile.length !== 10)
    )
      return toast.error(
        "Complete required patient details: name, DOB and 10-digit mobile number",
      );
    if (step === 2 && (!doctor || !date || !slot))
      return toast.error(
        "Select a doctor, date, and available appointment slot",
      );
    if (step === 3) return setStep(4);
    setStep((s) => Math.min(4, s + 1));
  }
  function submit() {
    if (!payment || !doctor || !slot || !type)
      return toast.error("Please choose a payment method");
    setSuccess(true);
  }
  return (
    <div className="min-h-screen ">
      <div className="mx-auto max-w-[1300px] space-y-6">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => (step === 0 ? router.back() : setStep((s) => s - 1))}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Book OPD Consultation
            </h1>
            <p className="text-sm text-slate-500">
              Register patient, select consultation and complete payment.
            </p>
          </div>
        </div>
        <Progress step={step} />
        {step === 0 && <PatientTypeStep onSelect={selectType} />}
        {step === 1 && (
          <PatientDetailsStep
            type={type!}
            patient={patient}
            patch={patch}
            query={followQuery}
            setQuery={setFollowQuery}
            matches={followMatches}
            selectFollow={(p: PatientProfile) => {
              setPatient(p);
              toast.success("Follow-up patient selected");
            }}
            openAyushman={() => setAyushmanOpen(true)}
          />
        )}
        {step === 2 && (
          <DoctorSlotStep
            specialty={specialty}
            setSpecialty={setSpecialty}
            doctors={selectedDoctors}
            doctor={doctor}
            setDoctor={(d: DoctorProfile | null) => {
              setDoctor(d);
              setSlot(null);
            }}
            date={date}
            setDate={(selectedDate: string) => {
              setDate(selectedDate);
              setSlot(null);
            }}
            slots={slots}
            slot={slot}
            setSlot={setSlot}
          />
        )}
        {step === 3 && (
          <ReviewStep
            patient={patient}
            type={type!}
            doctor={doctor!}
            date={date}
            slot={slot!}
            gst={gst}
            total={total}
          />
        )}
        {step === 4 && (
          <PaymentStep
            total={total}
            payment={payment}
            setPayment={setPayment}
          />
        )}
        {step > 0 && (
          <div className="flex justify-between gap-3">
            <Button variant="outline" onClick={() => setStep((s) => s - 1)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            {step < 4 ? (
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={next}>
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={submit}
              >
                Confirm Payment & Book
              </Button>
            )}
          </div>
        )}
      </div>
      <AyushmanDialog
        open={ayushmanOpen}
        close={() => setAyushmanOpen(false)}
        cardNo={cardNo}
        setCardNo={setCardNo}
        state={lookupState}
        lookup={ayushmanLookup}
      />
      <SuccessDialog
        open={success}
        patient={patient}
        type={type}
        close={() => router.push("/admission/opd/appointments")}
      />
    </div>
  );
}
