"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { UserRole } from "@/config/roles";
import { useAuth } from "@/providers/AuthProvider";

interface RoleGuardProps {
  allowedRole: UserRole;
  children: ReactNode;
}

export default function RoleGuard({ allowedRole, children }: RoleGuardProps) {
  const router = useRouter();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");

      return;
    }

    if (user.role !== allowedRole) {
      toast.error("Unauthorized");

      router.replace(`/${user.role}/dashboard`);
    }
  }, [loading, user, allowedRole]);

  if (loading) return null;

  if (!user) return null;

  if (user.role !== allowedRole) return null;

  return children;
}
