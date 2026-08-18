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
    id: 3,
    name: "Sudhuendu Mondal",
    email: "pharmacy@hospital.com",
    password: "123456",
    role: UserRole.PHARMACY,
    avatar: "https://i.pravatar.cc/150?img=57",
  },

  {
    id: 4,
    name: "Bhim Bhakta",
    email: "lab@hospital.com",
    password: "123456",
    role: UserRole.LAB,
    avatar: "https://i.pravatar.cc/150?img=63",
  }
];
