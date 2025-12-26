"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";

import avatarImage from "@/public/Navbar/b04ccd29437548412f3383daf3709999c585d781.png";
import Image from "next/image";
import { SidebarTrigger } from "../ui/sidebar";
import useAdminContext from "@/contexts/adminContext";

const AdminNav = () => {
  const { adminData } = useAdminContext();

  return (
    <nav className="h-18 px-8 bg-sidebar flex items-center md:justify-end justify-between shrink-0 absolute top-0 left-0 right-0">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">{adminData?.full_name || "Baker davis"}</span>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className={`cursor-pointer `}>
            <Avatar className={`relative size-10`}>
              <Image
                src={adminData?.image_url || avatarImage}
                alt="avatar"
                className="object-cover object-center"
                fill
                sizes="100%"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={`bg-sidebar text-sidebar-accent`}
            align="end"
          >
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Change Password</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default AdminNav;
