"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

import AppSidebar from "@/components/sidebar/AppSidebar";

import Header from "@/components/navbar/Header";

import { useAuth } from "@/providers/AuthProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <Header user={user} />

        <main
          className="
flex-1
bg-slate-100
p-6
"
        >
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
