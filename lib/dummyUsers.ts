import { UserRole } from "@/config/roles";

export interface DummyUser {
  id: number;

  name: string;

  email: string;

  password: string;

  role: UserRole;

  avatar: string;
}

export const dummyUsers: DummyUser[] = [
  {
    id: 1,

    name: "Dr. Rajesh Sharma",

    email: "doctor@hospital.com",

    password: "123456",

    role: UserRole.DOCTOR,

    avatar: "https://i.pravatar.cc/150?img=12",
  },

  {
    id: 2,

    name: "Priya Das",

    email: "admission@hospital.com",

    password: "123456",

    role: UserRole.ADMISSION,

    avatar: "https://i.pravatar.cc/150?img=32",
  },

  {
    id: 3,
    name: "Nurse Anjali",
    email: "nurse@hospital.com",
    password: "123456",
    role: UserRole.NURSE,
    avatar: "https://i.pravatar.cc/150?img=45",
  },

  {
    id: 4,
    name: "Sudhuendu Mondal",
    email: "pharmacy@hospital.com",
    password: "123456",
    role: UserRole.PHARMACY,
    avatar: "https://i.pravatar.cc/150?img=57",
  },

  {
    id: 5,
    name: "Bhim Bhakta",
    email: "lab@hospital.com",
    password: "123456",
    role: UserRole.LAB,
    avatar: "https://i.pravatar.cc/150?img=63",
  },

  {
    id: 6,
    name: "Mrinmay Senapati",
    email: "nurseadmin@hospital.com",
    password: "123456",
    role: UserRole.NURSEADMIN,
    avatar: "https://i.pravatar.cc/150?img=70",
  },

  {
    id: 7,
    name: "Rick Das",
    email: "billing@hospital.com",
    password: "123456",
    role: UserRole.BILLING,
    avatar: "https://i.pravatar.cc/150?img=65",
  },

   {
    id: 8,
    name: "Souvik Sarkar",
    email: "rmo@hospital.com",
    password: "123456",
    role: UserRole.RMO,
    avatar: "https://i.pravatar.cc/150?img=63",
  },
];
