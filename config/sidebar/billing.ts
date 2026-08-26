import { SidebarItem } from "@/types/sidebar";
import { LayoutDashboard, Activity } from "lucide-react";

const billingSidebar: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/billing/dashboard",
    icon: LayoutDashboard,
  },
  {
      label: "IPD",
      icon: Activity,
      children: [
        {
          label: "All Billings",
          href: "/billing/ipd/all-billings",
        },
      ],
    },
];

export default billingSidebar;