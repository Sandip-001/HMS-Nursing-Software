import { SidebarItem } from "@/types/sidebar";
import { LayoutDashboard, Activity, Stethoscope, Siren, DiamondPlus } from "lucide-react";

const pharmacySidebar: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/pharmacy/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "IPD",
    href: "/pharmacy/ipd/orders",
    icon: Activity,
  },
  {
      label: "OPD",
      icon: Stethoscope,
      children: [
        {
          label: "Orders",
          href: "/pharmacy/opd/orders",
        },
        
      ],
    },
    {
      label: "Emergency",
      icon: Siren,
      children: [
        {
          label: "Orders",
          href: "/pharmacy/emergency/orders",
        },
      ],
  },

  {
    label: "ICU",
    icon: DiamondPlus,
    children: [
      {
        label: "All Patients",
        href: "/pharmacy/icu/orders",
      },
    ],
  },
];

export default pharmacySidebar;