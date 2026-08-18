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
          label: "Patient Arrive In Ward",
          href: "/nurse/ipd/patient-arrive-in-ward",
        },
        {
          label: "Bed Occupied",
          href: "/nurse/ipd/bed-occupied",
        },
        {
          label: "Initial Assessment",
          href: "/nurse/ipd/initial-assessment",
        },
        {
          label: "Vitals Recording",
          href: "/nurse/ipd/vital-recording",
        },
        {
          label: "Nursing Assessment",
          href: "/nurse/ipd/nursing-assessment",
        }
      ],
    },
];

export default nurseSidebar;