import { ReactNode } from "react";
import { UserRole } from "@/config/roles";
import RoleGuard from "@/hooks/useRoleGuard";

export default function DoctorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RoleGuard allowedRole={UserRole.PHARMACY}>
      {children}
    </RoleGuard>
  );
}