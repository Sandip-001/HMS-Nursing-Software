import { LucideIcon } from "lucide-react";

export interface SidebarChild {
  label: string;
  href: string;
}

export interface SidebarItem {
  label: string;
  href?: string;
  icon?: LucideIcon;
  children?: SidebarChild[];
}