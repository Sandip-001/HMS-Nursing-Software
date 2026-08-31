import { SidebarItem } from "@/types/sidebar";
import { LayoutDashboard, Activity, Siren, DiamondPlus } from "lucide-react";

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
     {
      label: "Emergency",
      icon: Siren,
      children: [
        {
          label: "All Patients",
          href: "/nurse/emergency/all-patients",
        },
      ],
  },

  {
    label: "ICU",
    icon: DiamondPlus,
    children: [
      {
        label: "All Patients",
        href: "/nurse/icu/patients",
      },
    ],
  },
];

export default nurseSidebar;