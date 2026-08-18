"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/providers/AuthProvider";

export default function LoginPage() {
  const router = useRouter();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.replace(`/${user.role}/dashboard`);
    }
  }, [loading, user]);
  
  return <LoginForm />;
}
