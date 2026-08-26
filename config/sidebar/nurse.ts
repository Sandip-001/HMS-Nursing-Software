import { SidebarItem } from "@/types/sidebar";
import { LayoutDashboard, Activity } from "lucide-react";

const nurseSidebar: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/nurse/dashboard",
    icon: LayoutDashboard,
  },
  {
      label: "IPD",
      icon: Activity,
      children: [
        {
          label: "All Patients",
          href: "/nurse/ipd/patients",
        },
      ],
    },
];

export default nurseSidebar;