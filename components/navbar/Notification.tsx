"use client";

import { Bell } from "lucide-react";

export default function Notification() {
  return (
    <button className="relative p-2 hover:bg-gray-100 rounded-full">

      <Bell size={18} />

      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />

    </button>
  );
}