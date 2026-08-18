// app/(dashboard)/admission/opd/book-appointments/_components/patientDetailsStep.tsx
"use client";

import type { Dispatch, SetStateAction } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import type {
  AppointmentType,
  PatientProfile,
} from "@/types/admission-desk/opd/appointment-types";
import { Search, UserPlus } from "lucide-react";
import { STATES_AND_CITIES } from "@/lib/admission-desk/opd/appointment-data";
import { Field } from "./field";

type PatientPatch = <K extends keyof PatientProfile>(
  key: K,
  value: PatientProfile[K],
) => void;

interface PatientDetailsStepProps {
  type: AppointmentType;
  patient: PatientProfile;
  patch: PatientPatch;

  query: string;
  setQuery: Dispatch<SetStateAction<string>>;

  matches: PatientProfile[];

  selectFollow: (patient: PatientProfile) => void;
  openAyushman: () => void;
}

export function PatientDetailsStep({
  type,
  patient,
  patch,
  query,
  setQuery,
  matches,
  selectFollow,
  openAyushman,
}: PatientDetailsStepProps) {
  function calculateAge(dateOfBirth: string) {
    if (!dateOfBirth) return 0;

    const born = new Date(dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - born.getFullYear();

    const hasNotHadBirthdayThisYear =
      today.getMonth() < born.getMonth() ||
      (today.getMonth() === born.getMonth() &&
        today.getDate() < born.getDate());

    if (hasNotHadBirthdayThisYear) {
      age -= 1;
    }

    return Math.max(0, age);
  }

  if (type === "Follow-up") {
    return (
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-5 sm:p-7">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Find Follow-up Patient
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Search by UHID, patient name, or registered mobile number.
            </p>
          </div>

          <div className="relative mt-5">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <Input
              className="pl-9"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search UHID, patient name, or mobile number..."
            />
          </div>

          <div className="mt-4 space-y-3">
            {matches.map((match) => {
              const selected = patient.uhid === match.uhid;

              return (
                <button
                  key={match.uhid}
                  type="button"
                  onClick={() => selectFollow(match)}
                  className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                    selected
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:border-blue-200 hover:bg-slate-50"
                  }`}
                >
                  <div>
                    <p className="font-semibold text-slate-800">
                      {match.firstName} {match.middleName ?? ""}{" "}
                      {match.lastName}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {match.uhid} · {match.mobile} · {match.age} years ·{" "}
                      {match.gender}
                    </p>
                  </div>

                  <UserPlus className="h-5 w-5 text-blue-600" />
                </button>
              );
            })}
          </div>

          {patient.uhid && (
            <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
              Selected patient:{" "}
              <strong>
                {patient.firstName} {patient.lastName}
              </strong>{" "}
              · UHID: {patient.uhid}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  const cities = patient.state
    ? STATES_AND_CITIES[patient.state] ?? []
    : [];

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="p-5 sm:p-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              New Patient Registration
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter patient details manually or use an Ayushman Bharat card.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={openAyushman}
            className="border-blue-200 text-blue-700 hover:bg-blue-50"
          >
            Use Ayushman Bharat Card
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="First Name *">
            <Input
              value={patient.firstName}
              onChange={(event) => patch("firstName", event.target.value)}
              placeholder="First name"
            />
          </Field>

          <Field label="Middle Name">
            <Input
              value={patient.middleName ?? ""}
              onChange={(event) => patch("middleName", event.target.value)}
              placeholder="Optional"
            />
          </Field>

          <Field label="Last Name *">
            <Input
              value={patient.lastName}
              onChange={(event) => patch("lastName", event.target.value)}
              placeholder="Last name"
            />
          </Field>

          <Field label="Date of Birth *">
            <Input
              type="date"
              value={patient.dateOfBirth}
              onChange={(event) => {
                const dateOfBirth = event.target.value;

                patch("dateOfBirth", dateOfBirth);
                patch("age", calculateAge(dateOfBirth));
              }}
            />
          </Field>

          <Field label="Age">
            <Input
              disabled
              value={patient.age ? `${patient.age} years` : "Auto-calculated"}
            />
          </Field>

          <Field label="Gender *">
            <Select
              value={patient.gender}
              onValueChange={(value) =>
                patch(
                  "gender",
                  value as PatientProfile["gender"],
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label="Mobile Number *">
            <Input
              maxLength={10}
              inputMode="numeric"
              value={patient.mobile}
              onChange={(event) =>
                patch(
                  "mobile",
                  event.target.value.replace(/\D/g, ""),
                )
              }
              placeholder="10-digit mobile"
            />
          </Field>

          <Field label="Alternative Mobile">
            <Input
              maxLength={10}
              inputMode="numeric"
              value={patient.alternativeMobile ?? ""}
              onChange={(event) =>
                patch(
                  "alternativeMobile",
                  event.target.value.replace(/\D/g, ""),
                )
              }
              placeholder="Optional"
            />
          </Field>

          <Field label="Email">
            <Input
              type="email"
              value={patient.email ?? ""}
              onChange={(event) => patch("email", event.target.value)}
              placeholder="Optional email"
            />
          </Field>

          <div className="sm:col-span-3">
            <Field label="Address">
              <Textarea
                rows={2}
                value={patient.address}
                onChange={(event) => patch("address", event.target.value)}
                placeholder="Full residential address"
              />
            </Field>
          </div>

          <Field label="State">
            <Select
              value={patient.state}
              onValueChange={(value) => {
                patch("state", value);
                patch("city", "");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>

              <SelectContent>
                {Object.keys(STATES_AND_CITIES).map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="City">
            <Select
              value={patient.city}
              disabled={!patient.state}
              onValueChange={(value) => patch("city", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>

              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="PIN Code">
            <Input
              maxLength={6}
              inputMode="numeric"
              value={patient.pinCode}
              onChange={(event) =>
                patch(
                  "pinCode",
                  event.target.value.replace(/\D/g, ""),
                )
              }
              placeholder="6-digit PIN"
            />
          </Field>

          <div className="sm:col-span-3 mt-2 border-t border-slate-100 pt-5">
            <p className="mb-4 text-sm font-semibold text-slate-700">
              Emergency Contact{" "}
              <span className="font-normal text-slate-400">(Optional)</span>
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field label="Contact Person Name">
                <Input
                  value={patient.emergencyContactName ?? ""}
                  onChange={(event) =>
                    patch("emergencyContactName", event.target.value)
                  }
                />
              </Field>

              <Field label="Phone Number">
                <Input
                  maxLength={10}
                  inputMode="numeric"
                  value={patient.emergencyContactPhone ?? ""}
                  onChange={(event) =>
                    patch(
                      "emergencyContactPhone",
                      event.target.value.replace(/\D/g, ""),
                    )
                  }
                />
              </Field>

              <Field label="Relationship">
                <Input
                  value={patient.emergencyContactRelationship ?? ""}
                  onChange={(event) =>
                    patch(
                      "emergencyContactRelationship",
                      event.target.value,
                    )
                  }
                  placeholder="Example: Spouse"
                />
              </Field>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}