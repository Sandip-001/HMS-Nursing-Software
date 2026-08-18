import { SidebarItem } from "@/types/sidebar";
import { LayoutDashboard, Stethoscope, Activity, TestTube, BoneFracture } from "lucide-react";

const labSidebar: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/lab/dashboard",
    icon: LayoutDashboard,
  },

  {
    label: "Pathology",
    icon: TestTube,
    children: [
      {
        label: "OPD-Orders",
        href: "/lab/pathology/opd-orders",
      },
    ],
  },

  {
    label: "Radiology",
    icon: BoneFracture,
    children: [
      {
        label: "OPD-Orders",
        href: "/lab/radiology/opd-orders",
      },
    ],
  },
];

export default labSidebar;