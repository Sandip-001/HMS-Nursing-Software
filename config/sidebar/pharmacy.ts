import { SidebarItem } from "@/types/sidebar";
import { LayoutDashboard, Activity, Stethoscope } from "lucide-react";

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
    }
];

export default pharmacySidebar;