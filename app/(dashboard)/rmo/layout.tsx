import { ReactNode } from "react";
import { UserRole } from "@/config/roles";
import RoleGuard from "@/hooks/useRoleGuard";

export default function RmoLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RoleGuard allowedRole={UserRole.RMO}>
      {children}
    </RoleGuard>
  );
}