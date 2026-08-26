import { ReactNode } from "react";
import { UserRole } from "@/config/roles";
import RoleGuard from "@/hooks/useRoleGuard";

export default function NurseAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RoleGuard allowedRole={UserRole.NURSEADMIN}>
      {children}
    </RoleGuard>
  );
}