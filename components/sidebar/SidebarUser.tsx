"use client";

import Image from "next/image";
import { User } from "@/types/auth";

interface SidebarUserProps {
  user: User;
}

export default function SidebarUser({
  user,
}: SidebarUserProps) {
  return (
    <div className="mx-3 my-4 group-data-[collapsible=icon]:hidden">

      <div
        className="
        rounded-2xl
        border
        border-slate-200
        bg-gradient-to-r
        from-blue-50
        to-cyan-50
        p-4
        shadow-sm
        transition-all
        hover:shadow-md
      "
      >
        <div className="flex items-center gap-3">

          <Image
            src={user.avatar || "/images/default-avatar.png"}
            alt={user.name || "User Avatar"}
            width={52}
            height={52}
            className="rounded-full border-2 border-white shadow"
          />

          <div>

            <h3 className="font-semibold text-slate-800">
              {user.name}
            </h3>

            <p className="text-xs uppercase tracking-wide text-blue-600">
              {user.role}
            </p>

          </div>

        </div>
      </div>

    </div>
  );
}