//app/admission-desk/opd/book-appointments/_components/patientTypeStep.tsx
import { AppointmentType } from "@/types/admission-desk/opd/appointment-types";
import { UserPlus, Users } from "lucide-react";
import { Choice } from "./choice";

export function PatientTypeStep({
  onSelect,
}: {
  onSelect: (type: AppointmentType) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <Choice
        title="New Registration"
        text="Register a new patient manually or by using an Ayushman Bharat card."
        icon={<UserPlus className="h-7 w-7" />}
        tone="blue"
        onClick={() => onSelect("New Registration")}
      />
      <Choice
        title="Follow-up Patient"
        text="Search a previously registered patient using UHID, name, or mobile number."
        icon={<Users className="h-7 w-7" />}
        tone="violet"
        onClick={() => onSelect("Follow-up")}
      />
    </div>
  );
}