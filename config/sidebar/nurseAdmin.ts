import { SidebarItem } from "@/types/sidebar";
import { LayoutDashboard, Activity, DiamondPlus } from "lucide-react";

const nurseAdminSidebar: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/nurseAdmin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "IPD",
    icon: Activity,
    children: [
      {
        label: "New Admissions",
        href: "/nurseAdmin/ipd/new-admissions",
      },
      {
        label: "All Ward Patients",
        href: "/nurseAdmin/ipd/all-ward-patients",
      },
      {
        label: "Beds",
        href: "/nurseAdmin/ipd/beds",
      },
    ],
  },

  {
    label: "ICU",
    icon: DiamondPlus,
    children: [
      {
        label: "All Patients",
        href: "/nurseAdmin/icu/patients",
      },
    ],
  },
];

export default nurseAdminSidebar;
