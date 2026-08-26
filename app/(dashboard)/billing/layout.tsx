import { ReactNode } from "react";
import { UserRole } from "@/config/roles";
import RoleGuard from "@/hooks/useRoleGuard";

export default function BillingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RoleGuard allowedRole={UserRole.BILLING}>
      {children}
    </RoleGuard>
  );
}