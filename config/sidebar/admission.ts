import { SidebarItem } from "@/types/sidebar";
import { LayoutDashboard, UserPlus, ClipboardList, Activity, Stethoscope } from "lucide-react";

const admissionSidebar: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/admission/dashboard",
    icon: LayoutDashboard,
  },

  {
    label: "OPD",
    icon: Stethoscope,
    children: [
      {
        label: "Appointments",
        href: "/admission/opd/appointments",
      },
      {
        label: "Today's Appointments",
        href: "/admission/opd/todays-appointments",
      }
    ],
  },

  {
      label: "IPD",
      icon: Activity,
      children: [
        {
          label: "New Admission",
          href: "/admission/ipd/new-admission",
        },
        {
          label: "Admission List",
          href: "/admission/ipd/admission-list",
        },
        {
          label: "Pending Admissions",
          href: "/admission/ipd/pending-admissions",
        },
        {
          label: "Bed Availability",
          href: "/admission/ipd/bed-availability",
        },
        {
          label: "Admission Requests",
          href: "/admission/ipd/admission-requests",
        },
        {
          label: "Cancelled Admissions",
          href: "/admission/ipd/cancelled-admissions",
        }
      ],
    },
];

export default admissionSidebar;