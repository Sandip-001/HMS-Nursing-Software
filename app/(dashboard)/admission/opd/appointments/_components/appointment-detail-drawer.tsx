// app/(dashboard)/admission-desk/opd/appointments/_components/appointment-detail-drawer.tsx
"use client";

import { useMemo, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  CalendarDays,
  Download,
  IndianRupee,
  Phone,
  Stethoscope,
  X,
  FileText,
  Pill,
  TestTube2,
  Activity,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Appointment } from "@/types/admission-desk/opd/appointment-types";
import { getEffectiveStatus } from "@/lib/admission-desk/opd/appointment-data";
import { getPatientByUhid } from "@/lib/doctor/opd/opd-mock-data";
import { PrescriptionTemplate } from "@/components/prescription/prescription-template";

export function AppointmentDetailDrawer({
  appointment,
  onClose,
}: {
  appointment: Appointment | null;
  onClose: () => void;
}) {
  const prescriptionRef = useRef<HTMLDivElement>(null);

  const status = appointment
    ? getEffectiveStatus(appointment)
    : null;

  /*
   * Loads the complete OPD doctor-side profile only for completed
   * consultations. Change this import path if your actual mock file
   * is different:
   *
   * "@/lib/doctor/opd/opd-mock-data"
   */
  const completedPatientProfile = useMemo(() => {
    if (!appointment || status !== "Completed") {
      return null;
    }

    return getPatientByUhid(appointment.patient.uhid);
  }, [appointment, status]);

  const handlePrintPrescription = useReactToPrint({
    contentRef: prescriptionRef,
    documentTitle: appointment
      ? `E-Prescription-${appointment.id}`
      : "E-Prescription",
  });

  if (!appointment) return null;

  const latestConsultation =
    completedPatientProfile?.consultationHistory?.[0];

  const prescriptionData = completedPatientProfile
    ? {
        patientName: completedPatientProfile.patientName,
        age: completedPatientProfile.age,
        gender: completedPatientProfile.gender,
        uhid: completedPatientProfile.uhid,
        visitId:
          completedPatientProfile.appointmentNo || appointment.id,
        consultant:
          completedPatientProfile.doctor || appointment.doctor.name,
        date: new Date().toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),

        vitals: completedPatientProfile.vitals
          ? {
              bp: completedPatientProfile.vitals.bp,
              pulse: completedPatientProfile.vitals.pulse,
              temp: completedPatientProfile.vitals.temp,
              spo2: completedPatientProfile.vitals.spo2,
              weight:
                completedPatientProfile.vitalsHistory?.[0]?.weight,
            }
          : undefined,

        complaint: completedPatientProfile.reason,

        diagnoses: latestConsultation
          ? [
              {
                name: latestConsultation.diagnosis,
                icd10: "TBD",
                type: "Active",
              },
            ]
          : [],

        medicines: (completedPatientProfile.medicineHistory ?? []).map(
          (medicine) => ({
            name: medicine.name,
            dosage: medicine.dosage,
            frequency: medicine.frequency,
            duration: medicine.duration,
            instructions: `Started on ${medicine.startDate}`,
          }),
        ),

        labOrders: (completedPatientProfile.labHistory ?? []).map(
          (lab) => ({
            test: `${lab.test} — ${lab.result}`,
            priority: lab.priority,
          }),
        ),

        advice:
          latestConsultation?.notes ??
          "Continue medicines as prescribed and follow-up as advised.",

        followUp: latestConsultation?.followUp,

        disposition: "OPD Follow-up",
      }
    : null;

  return (
    <>
      <div className="fixed inset-0 z-50">
        <div
          className="absolute inset-0 bg-slate-950/40"
          onClick={onClose}
        />

        <aside className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto bg-white shadow-2xl">
          {/* Drawer header */}
          <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white px-5 py-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Appointment Details
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Appointment ID: {appointment.id}
              </p>
            </div>

            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-5 p-5">
            {/* Patient summary */}
            <section className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-lg font-bold text-white shadow-md">
                  {appointment.patient.firstName.charAt(0)}
                  {appointment.patient.lastName.charAt(0)}
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-800">
                      {appointment.patient.firstName}{" "}
                      {appointment.patient.middleName ?? ""}{" "}
                      {appointment.patient.lastName}
                    </h3>

                    <StatusBadge status={status ?? appointment.status} />
                  </div>

                  <p className="mt-1 text-sm text-slate-600">
                    {appointment.patient.age} years ·{" "}
                    {appointment.patient.gender} · UHID:{" "}
                    {appointment.patient.uhid}
                  </p>

                  <p className="mt-1 text-xs font-medium text-blue-700">
                    {appointment.appointmentType}
                  </p>
                </div>
              </div>
            </section>

            {/* Contact details */}
            <Section
              title="Contact Details"
              icon={<Phone className="h-4 w-4 text-blue-600" />}
            >
              <Info label="Mobile" value={appointment.patient.mobile} />

              <Info
                label="Email"
                value={appointment.patient.email || "Not provided"}
              />

              <Info
                label="Address"
                value={`${appointment.patient.address}, ${appointment.patient.city}, ${appointment.patient.state} - ${appointment.patient.pinCode}`}
              />
            </Section>

            {/* Consultation details */}
            <Section
              title="Consultation Details"
              icon={<Stethoscope className="h-4 w-4 text-violet-600" />}
            >
              <Info label="Specialty" value={appointment.specialty} />

              <Info
                label="Doctor"
                value={`${appointment.doctor.name} · ${appointment.doctor.experience} years experience`}
              />

              <Info
                label="Appointment"
                value={`${formatDate(
                  appointment.appointmentDate,
                )} · ${appointment.slot.period} (${
                  appointment.slot.startTime
                } - ${appointment.slot.endTime})`}
              />
            </Section>

            {/* Payment */}
            <Section
              title="Payment Summary"
              icon={<IndianRupee className="h-4 w-4 text-emerald-600" />}
            >
              <Info
                label="Consultation Fee"
                value={`₹${appointment.consultationFee.toLocaleString(
                  "en-IN",
                )}`}
              />

              <Info
                label="GST"
                value={`₹${appointment.gstAmount.toLocaleString("en-IN")}`}
              />

              <Info
                label="Total Paid"
                value={`₹${appointment.totalAmount.toLocaleString(
                  "en-IN",
                )} via ${appointment.paymentMethod}`}
              />
            </Section>

            {/* Completed consultation details */}
            {status === "Completed" && (
              <>
                <div className="border-t border-slate-200 pt-5">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-emerald-600" />

                    <div>
                      <h3 className="font-bold text-slate-800">
                        Completed Consultation Summary
                      </h3>

                      <p className="text-xs text-slate-500">
                        Clinical data recorded by the consulting doctor.
                      </p>
                    </div>
                  </div>
                </div>

                {!completedPatientProfile ? (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                    <p className="flex items-center gap-2 text-sm font-semibold text-amber-800">
                      <AlertTriangle className="h-4 w-4" />
                      Doctor consultation record not found
                    </p>

                    <p className="mt-1 text-xs text-amber-700">
                      The appointment is completed, but no matching doctor-side
                      OPD patient profile was found for UHID{" "}
                      {appointment.patient.uhid}.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Latest vitals */}
                    {completedPatientProfile.vitals && (
                      <Section
                        title="Latest Vitals"
                        icon={<Activity className="h-4 w-4 text-red-500" />}
                      >
                        <div className="grid grid-cols-2 gap-3">
                          <VitalInfo
                            label="Blood Pressure"
                            value={`${completedPatientProfile.vitals.bp} mmHg`}
                          />

                          <VitalInfo
                            label="Pulse"
                            value={`${completedPatientProfile.vitals.pulse} /min`}
                          />

                          <VitalInfo
                            label="Temperature"
                            value={`${completedPatientProfile.vitals.temp} °F`}
                          />

                          <VitalInfo
                            label="SpO₂"
                            value={`${completedPatientProfile.vitals.spo2}%`}
                          />
                        </div>
                      </Section>
                    )}

                    {/* Latest diagnosis */}
                    <Section
                      title="Diagnosis"
                      icon={<FileText className="h-4 w-4 text-violet-600" />}
                    >
                      {latestConsultation ? (
                        <div className="rounded-xl border border-violet-100 bg-violet-50/60 p-4">
                          <p className="font-semibold text-slate-800">
                            {latestConsultation.diagnosis}
                          </p>

                          <p className="mt-1 text-xs text-slate-600">
                            {latestConsultation.notes}
                          </p>

                          <p className="mt-2 text-xs font-medium text-violet-700">
                            Consultation date: {latestConsultation.date}
                          </p>
                        </div>
                      ) : (
                        <EmptyClinicalData text="No diagnosis recorded for this consultation." />
                      )}
                    </Section>

                    {/* Latest medicine details */}
                    <Section
                      title="Prescribed Medicines"
                      icon={<Pill className="h-4 w-4 text-blue-600" />}
                    >
                      {completedPatientProfile.medicineHistory?.length ? (
                        <div className="space-y-2">
                          {completedPatientProfile.medicineHistory.map(
                            (medicine, index) => (
                              <div
                                key={`${medicine.name}-${index}`}
                                className="rounded-xl border border-slate-200 bg-slate-50 p-3"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <p className="text-sm font-semibold text-slate-800">
                                      {index + 1}. {medicine.name}
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500">
                                      {medicine.dosage} ·{" "}
                                      {medicine.frequency} ·{" "}
                                      {medicine.duration}
                                    </p>
                                  </div>

                                  <Badge
                                    variant="outline"
                                    className="border-blue-200 bg-blue-50 text-blue-700"
                                  >
                                    Active
                                  </Badge>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      ) : (
                        <EmptyClinicalData text="No medicine record is available." />
                      )}
                    </Section>

                    {/* Latest lab details */}
                    <Section
                      title="Latest Lab Results"
                      icon={<TestTube2 className="h-4 w-4 text-amber-600" />}
                    >
                      {completedPatientProfile.labHistory?.length ? (
                        <div className="space-y-2">
                          {completedPatientProfile.labHistory.map(
                            (lab, index) => (
                              <div
                                key={`${lab.test}-${index}`}
                                className="rounded-xl border border-slate-200 bg-slate-50 p-3"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <p className="text-sm font-semibold text-slate-800">
                                      {lab.test}
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500">
                                      {lab.result} · {lab.date}
                                    </p>
                                  </div>

                                  <Badge
                                    variant="outline"
                                    className={getLabStatusClass(lab.status)}
                                  >
                                    {lab.status}
                                  </Badge>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      ) : (
                        <EmptyClinicalData text="No lab results are available." />
                      )}
                    </Section>

                    {/* Prescription CTA */}
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-semibold text-emerald-800">
                            E-Prescription Available
                          </p>

                          <p className="mt-1 text-xs text-emerald-700">
                            Includes latest diagnosis, prescribed medicines,
                            lab orders, vitals, and doctor signature.
                          </p>
                        </div>

                        <Button
                          className="gap-2 bg-emerald-600 hover:bg-emerald-700"
                          onClick={handlePrintPrescription}
                        >
                          <Download className="h-4 w-4" />
                          Download E-Prescription
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </aside>
      </div>

      {/* Only this hidden template is printed */}
      {prescriptionData && (
        <div className="hidden">
          <PrescriptionTemplate
            ref={prescriptionRef}
            {...prescriptionData}
          />
        </div>
      )}
    </>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-800">
        {icon}
        {title}
      </h3>

      <div className="space-y-2">{children}</div>
    </section>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <p className="text-[10px] uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-700">
        {value}
      </p>
    </div>
  );
}

function VitalInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-red-100 bg-red-50/50 p-3">
      <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-slate-800">{value}</p>
    </div>
  );
}

function EmptyClinicalData({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-center text-sm text-slate-400">
      {text}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Booked: "border-blue-200 bg-blue-50 text-blue-700",
    Waiting: "border-amber-200 bg-amber-50 text-amber-700",
    "Checked In": "border-violet-200 bg-violet-50 text-violet-700",
    Completed: "border-emerald-200 bg-emerald-50 text-emerald-700",
    Rescheduled: "border-orange-200 bg-orange-50 text-orange-700",
    Cancelled: "border-red-200 bg-red-50 text-red-700",
  };

  return (
    <Badge className={styles[status] ?? styles.Booked}>
      {status}
    </Badge>
  );
}

function getLabStatusClass(status: string) {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === "normal") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (
    normalizedStatus === "high" ||
    normalizedStatus === "critical"
  ) {
    return "border-red-200 bg-red-50 text-red-700";
  }

  if (
    normalizedStatus === "low" ||
    normalizedStatus === "borderline"
  ) {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-slate-200 bg-slate-50 text-slate-600";
}

function formatDate(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}