export interface OPDAppointment {
  id: string;
  uhid: string;
  appointmentNo: string;
  patientName: string;
  age: number;
  gender: string;
  patientType: "new" | "follow-up";
  visitType: "in-person" | "video" | "phone";
  time: string;
  reason: string;
  doctor: string;
  status: "waiting" | "checked-in" | "completed" | "scheduled";
  vitals?: {
    bp: string;
    pulse: string;
    temp: string;
    spo2: string;
  };
  medicines?: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }>;
  labOrders?: Array<{
    test: string;
    priority: "routine" | "priority";
  }>;
  allergies?: string[];
  previousConsultations?: Array<{
    date: string;
    diagnosis: string;
  }>;
}

export interface ConsultationData {
  vitals: {
    bp: string;
    pulse: string;
    temp: string;
    spo2: string;
    weight: string;
    height: string;
    pain: string;
    notes: string;
  };
  complaint: string;
  diagnoses: Array<{
    id: string;
    name: string;
    icd10: string;
    type: "provisional" | "active" | "chronic";
  }>;
  notes: string;
  medicines: Array<{
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }>;
  advice: string;
  labOrders: Array<{
    id: string;
    test: string;
    priority: "routine" | "priority";
  }>;
  orderNotes: string;
  followUpDate: string;
  disposition: string;
}