"use client";

import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";

import Logo from "@/public/Auth-Page-Image/b72acfc6a71a2b59c6b6f3f8fb3d762aee377cb2.png";

import { DashSidebarLogoutBtn } from "../admin/components/mini-comps/dash-sidebar-logout";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "../ui/separator";

import { dashSidebarItems } from "@/constant/data";

import { PanelRightClose, X } from "lucide-react";

const DashSidebar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const pathName = usePathname();
  const isCollapsed = state == "collapsed" ? true : false;

  return (
    <>
      <Sidebar
        collapsible="icon"
        className={`text-sidebar-accent overflow-hidden`}
      >
        <SidebarHeader
          className={`flex flex-row! items-center  ps-1 ${
            isCollapsed ? "py-6 pe-0! justify-center" : "justify-between pe-3"
          }`}
        >
          <Image
            src={Logo}
            alt="Logo"
            className={`w-[120px] h-[55px] object-cover ${
              isCollapsed && !isMobile && "hidden"
            }`}
            width={143}
            height={54}
            priority
          />

          <button
            className={`${
              isCollapsed ? "rotate-0 me-2" : "rotate-180"
            } cursor-pointer`}
            onClick={() => toggleSidebar()}
          >
            <PanelRightClose className="size-6 mx-0 md:block hidden" />
            <X className="size-6 mx-0 md:hidden block text-white" />
          </button>
        </SidebarHeader>
        <Separator />
        <SidebarContent className={`text-sidebar-accent`}>
          {dashSidebarItems.map((v, i) => (
            <SidebarGroup
              key={i}
              className={`px-0 ${isCollapsed && !isMobile && "justify-center"}`}
            >
              {v.labelText && (
                <SidebarGroupLabel
                  className={`font-medium text-sm tracking-wider text-white opacity-80 uppercase px-4`}
                >
                  {v.labelText}
                </SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                <SidebarMenu>
                  {v.items.map((v, i) => (
                    <SidebarMenuItem
                      key={i}
                      className={`py-2 ${
                        v.url == pathName ? "bg-[#C40000]" : "opacity-80"
                      } transition-colors duration-200`}
                    >
                      <SidebarMenuButton
                        className={`rounded-none px-4`}
                        tooltip={v.title}
                        size="lg"
                        asChild
                      >
                        <Link
                          href={v.url}
                          className={`flex items-center gap-4 text-sidebar-accent py-4! w-full ${
                            isCollapsed && !isMobile && "justify-end"
                          } text-nowrap overflow-hidden`}
                          onClick={() => (isMobile ? toggleSidebar() : null)}
                        >
                          <Image
                            src={v.icon}
                            width={22}
                            height={22}
                            alt={`${v.title}-icon`}
                          />
                          {!isCollapsed && v.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter className={`items-start justify-center px-0`}>
          <SidebarMenuItem className={`py-2 w-full`}>
            <DashSidebarLogoutBtn isCollapsed={isCollapsed} />
          </SidebarMenuItem>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default DashSidebar;
