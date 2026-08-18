import { ReactNode } from "react";

import { UserRole } from "@/config/roles";
import RoleGuard from "@/hooks/useRoleGuard";

export default function AdmissionLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RoleGuard allowedRole={UserRole.ADMISSION}>
      {children}
    </RoleGuard>
  );
}