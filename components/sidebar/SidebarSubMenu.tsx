"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion, AnimatePresence } from "framer-motion";

interface SidebarSubMenuProps {
  open: boolean;
  items: {
    label: string;
    href: string;
  }[];
}

export default function SidebarSubMenu({ open, items }: SidebarSubMenuProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden"
        >
          <div
            className=" relative
  ml-5
  border-l
  border-slate-200
  pl-5
  py-2"
          >
            {items.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
      group
      relative
      flex
      items-center
      rounded-lg
      py-2
      px-3
      text-sm
      transition-all
      duration-200

      ${
        active
          ? "bg-blue-50 text-blue-600 font-semibold"
          : "hover:bg-slate-100 text-slate-600"
      }
  `}
                >
                  <span
                    className={`
      absolute
      -left-[25px]
      h-2.5
      w-2.5
      rounded-full
      transition-all

      ${active ? "bg-blue-600" : "bg-slate-300 group-hover:bg-blue-400"}
  `}
                  />

                  {item.label}
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
