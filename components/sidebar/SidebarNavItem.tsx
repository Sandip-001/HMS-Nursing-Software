"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronDown, ChevronRight } from "lucide-react";

import { SidebarMenuButton } from "@/components/ui/sidebar";

import { SidebarItem } from "@/types/sidebar";

interface SidebarNavItemProps {
  item: SidebarItem;
  open: boolean;
  onToggle: () => void;
}

export default function SidebarNavItem({
  item,
  open,
  onToggle,
}: SidebarNavItemProps) {
  const pathname = usePathname();

  const Icon = item.icon;

  const active =
    pathname === item.href ||
    item.children?.some((child) => pathname === child.href);

  if (!item.children) {
    return (
      <SidebarMenuButton
        className="
    h-11
    rounded-xl
    transition-all
    duration-200
    hover:bg-slate-100
    data-[active=true]:bg-blue-600
    data-[active=true]:text-white
    data-[active=true]:shadow-md
  "
        asChild
        isActive={active}
      >
        <Link href={item.href ?? ""}>
          {Icon && <Icon />}

          <span>{item.label}</span>
        </Link>
      </SidebarMenuButton>
    );
  }

  return (
    <SidebarMenuButton
      className="
    h-11
    rounded-xl
    transition-all
    duration-200
    hover:bg-slate-100
    data-[active=true]:bg-blue-600
    data-[active=true]:text-white
    data-[active=true]:shadow-md
  "
      onClick={onToggle}
      isActive={active}
    >
      {Icon && <Icon />}

      <span>{item.label}</span>

      <div className="ml-auto">
        {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </div>
    </SidebarMenuButton>
  );
}
