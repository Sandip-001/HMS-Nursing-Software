"use client";

import { useEffect, useState } from "react";

import {
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";

import doctorSidebar from "@/config/sidebar/doctor";
import admissionSidebar from "@/config/sidebar/admission";

import { UserRole } from "@/config/roles";

import SidebarNavItem from "./SidebarNavItem";
import SidebarSubMenu from "./SidebarSubMenu";
import nurseSidebar from "@/config/sidebar/nurse";
import pharmacySidebar from "@/config/sidebar/pharmacy";
import labSidebar from "@/config/sidebar/lab";

interface SidebarNavProps {
  role: UserRole;
}

export default function SidebarNav({ role }: SidebarNavProps) {
  const pathname = usePathname();

  const sidebarMenus = {
    [UserRole.DOCTOR]: doctorSidebar,
    [UserRole.NURSE]: nurseSidebar,
    [UserRole.ADMISSION]: admissionSidebar,
    [UserRole.PHARMACY]:pharmacySidebar,
    [UserRole.LAB]: labSidebar,
  };

  const menu = sidebarMenus[role] ?? admissionSidebar;

  const getActiveParent = () => {
    return (
      menu.find((item) =>
        item.children?.some((child) => child.href === pathname),
      )?.label ?? null
    );
  };

  const [openMenu, setOpenMenu] = useState<string | null>(getActiveParent);

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          {menu.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarNavItem
                item={item}
                open={openMenu === item.label}
                onToggle={() =>
                  setOpenMenu(openMenu === item.label ? null : item.label)
                }
              />

              {item.children && (
                <SidebarSubMenu
                  open={openMenu === item.label}
                  items={item.children}
                />
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}
