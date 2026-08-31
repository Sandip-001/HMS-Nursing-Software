import { SidebarItem } from "@/types/sidebar";
import { LayoutDashboard, Activity, Siren, DiamondPlus } from "lucide-react";

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
    {
      label: "Emergency",
      icon: Siren,
      children: [
        {
          label: "All Patients",
          href: "/rmo/emergency/all-patients",
        },
      ],
    },
    {
    label: "ICU",
    icon: DiamondPlus,
    children: [
      {
        label: "All Patients",
        href: "/rmo/icu/all-patients",
      },
    ],
  },
];

export default rmoSidebar;