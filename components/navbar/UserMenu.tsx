"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { logoutUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { User } from "@/types/auth";
import { useAuth } from "@/providers/AuthProvider";

interface HeaderProps {
  user: User;
}

export default function UserMenu({ user }: HeaderProps) {
  const router = useRouter();
  const { setUser } = useAuth();

  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>

        <button className="flex items-center gap-2">

          <Avatar>

            <AvatarFallback>
              {user?.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>

          </Avatar>

          <div className="text-left hidden md:block">

            <div className="text-sm font-medium">
              {user?.name}
            </div>

            <div className="text-xs text-gray-500">
              {user?.role}
            </div>

          </div>

        </button>

      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">

        <DropdownMenuItem
          onClick={() => router.push("/profile")}
        >
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push("/settings")}
        >
          Settings
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            logoutUser();
            setUser(null);
            router.push("/login");
          }}
        >
          Logout
        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>
  );
}