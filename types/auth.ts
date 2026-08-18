import { UserRole } from "@/config/roles";

export interface User {
  id?: number;
  name?: string;
  email: string;
  password?: string;
  role: UserRole;
  avatar?: string;
}