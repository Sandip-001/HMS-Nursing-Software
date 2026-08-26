export enum UserRole {
  DOCTOR = "doctor",
  ADMISSION = "admission",
  NURSE = "nurse", 
  PHARMACY = "pharmacy",
  LAB = "lab",
  NURSEADMIN = "nurseAdmin",
  BILLING = "billing",
  RMO = "rmo"
}

export const RoleOptions = [
  {
    label: "Doctor",
    value: UserRole.DOCTOR,
  },
  {
    label: "Admission Desk",
    value: UserRole.ADMISSION,
  },
  {
    label: "Nurse",
    value: UserRole.NURSE,
  },
  {
    label: "Pharmacy",
    value: UserRole.PHARMACY,
  },
  {
    label: "Lab",
    value: UserRole.LAB,
  },
  {
    label: "Nurse Admin",
    value: UserRole.NURSEADMIN
  },
  {
    label: "Billing",
    value: UserRole.BILLING
  },
  {
    label: "Rmo",
    value: UserRole.RMO
  }
];