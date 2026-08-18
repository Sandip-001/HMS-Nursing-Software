"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

import SidebarLogo from "./SidebarLogo";
import SidebarUser from "./SidebarUser";

import { useAuth } from "@/providers/AuthProvider";

import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import SidebarNav from "./SidebarNav";
import { logoutUser } from "@/lib/auth";

export default function AppSidebar() {
  const router = useRouter();

  const { user, setUser } = useAuth();

  if (!user) return null;

  return (
    <Sidebar
      collapsible="offcanvas"
      className="border-r bg-white dark:bg-zinc-950"
    >
      <SidebarHeader className="p-0">
        <SidebarLogo />
      </SidebarHeader>

      <SidebarContent>
        <SidebarUser user={user} />

        <SidebarNav role={user.role} />
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <Button
          variant="destructive"
          className="
        w-full
        rounded-xl
        transition-all
        hover:scale-[1.02]
    "
          onClick={() => {
            logoutUser();
            setUser(null);
            router.push("/login");
          }}
        >
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
