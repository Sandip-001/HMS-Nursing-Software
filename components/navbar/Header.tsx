"use client";

import { User } from "@/types/auth";
import Notification from "./Notification";
import UserMenu from "./UserMenu";
import { SidebarTrigger } from "../ui/sidebar";


interface HeaderProps {
  user: User;
}


export default function Header({ user }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4">

      {/* Left */}
      <div className="flex items-center gap-3">

        <SidebarTrigger />

        <h1 className="font-semibold text-gray-800">
          Hospital Management System
        </h1>

        {/* Role Badge */}
        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full capitalize">
          {user?.role}
        </span>

      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        <Notification />

        <UserMenu user={user} />

      </div>

    </header>
  );
}