import { SidebarItem } from "@/types/sidebar";
import { LayoutDashboard, Activity } from "lucide-react";

const rmoSidebar: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/rmo/dashboard",
    icon: LayoutDashboard,
  },
  {
      label: "IPD",
      icon: Activity,
      children: [
        {
          label: "All Patients",
          href: "/rmo/ipd/all-patients",
        },
      ],
    },
];

export default rmoSidebar;