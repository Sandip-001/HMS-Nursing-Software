import { ReactNode } from "react";

import { UserRole } from "@/config/roles";
import RoleGuard from "@/hooks/useRoleGuard";

export default function LabLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RoleGuard allowedRole={UserRole.LAB}>
      {children}
    </RoleGuard>
  );
}