
export interface ClinicalExaminationData {
  consciousness: string;
  built: string;
  posture: string;
  distress: string;
  pallor: "Absent" | "Present";
  icterus: "Absent" | "Present";
  cyanosis: "Absent" | "Present";
  clubbing: "Absent" | "Present";
  jvp: string;
  oralCavity: string;
  respInspection: string;
  respPalpation: string;
  respPercussion: string;
  respAuscultation: string;
  heartRate: string;
  rhythm: string;
  heartSounds: string;
  peripheralPulses: string;
  edema: "Absent" | "Present";
  abdomenInspection: string;
  abdomenPalpation: string;
  abdomenPercussion: string;
  abdomenAuscultation: string;
  organomegaly: "Absent" | "Present";
  higherMentalFunctions: string;
  motorPower: string;
  tone: string;
  reflexes: string;
  sensory: string;
  jointTenderness: "Absent" | "Present";
  swelling: "Absent" | "Present";
  rangeOfMotion: string;
  skin: string;
  rashLesion: string;
  pressureArea: string;
  otherFindings: string;
}

export interface LabAlertMini {
  testName: string;
  value: string;
  unit: string;
  status: "Low" | "High" | "Borderline";
}

export interface ClinicalNote {
  dateTime: string;
  author: string;
  note: string;
}