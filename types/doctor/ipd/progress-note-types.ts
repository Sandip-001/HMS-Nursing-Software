export type ProgressNoteAuthorRole = "Doctor" | "Nurse";
export type ProgressNoteCategory =
  | "Doctor Round"
  | "Nursing Update"
  | "Clinical Review"
  | "Care Plan"
  | "Transfer / Handover"
  | "Discharge Planning";
export type ProgressNotePriority = "Routine" | "Important" | "Urgent";
export type ProgressNoteStatus = "Signed & Locked" | "Draft";

export interface ProgressNote {
  id: string;
  uhid: string;
  title: string;
  author: string;
  role: ProgressNoteAuthorRole;
  category: ProgressNoteCategory;
  priority: ProgressNotePriority;
  createdAt: string;
  status: ProgressNoteStatus;
  subjective?: string;
  objective?: string;
  assessment?: string;
  plan?: string;
  noteText: string;
  vitals?: {
    bp?: string;
    pulse?: string;
    temp?: string;
    spo2?: string;
    pain?: string;
  };
  attachments?: string[];
}

export interface DocumentationRule {
  id: string;
  label: string;
  completed: boolean;
  detail?: string;
}