"use client";

import Image from "next/image";

import { useRouter } from "next/navigation";

import dashLogoutIcon from "@/public/icons/Property 1=Logout.svg";

import CustomAlertDialog from "@/components/layout/customAlertDialog";

import { SidebarMenuButton } from "@/components/ui/sidebar";

import useCustomMutation from "@/hooks/useCustomMutation";

import useAdminContext from "@/contexts/adminContext";

import { useState } from "react";
import toast from "react-hot-toast";

const DashSidebarLogoutBtn = ({ isCollapsed }) => {
  const router = useRouter();
  const { setAdminData } = useAdminContext();
  const [showModal, setShowModal] = useState(false);

  const { mutate, isPending } = useCustomMutation({
    query_name: ["admin_logout_mutation"],
    query_url: "/user/logout",
    isAdmin: true,
  });

  const handleLogout = () => {
    mutate(
      {
        isAdmin: true,
      },
      {
        onSuccess: async ({ data, message }) => {
          toast.success(message);
          router.replace("/admin/login");
          localStorage.removeItem("adminData");
          document.cookie = "adminData=; path=/; max-age=0; samesite=strict";
          setAdminData(null);
          setShowModal(false);
        },
        onError: (error) => {
          toast.error(error);
          console.log("Logout mutation error", error);
        },
      }
    );
  };

  return (
    <>
      <SidebarMenuButton
        className={`rounded-none px-4 text-sidebar-accent`}
        tooltip={"Logout"}
        size="lg"
        asChild
      >
        <button
          className={`w-full flex items-center gap-4 ${
            isCollapsed && "justify-end"
          } cursor-pointer`}
          onClick={() => setShowModal(!showModal)}
        >
          <Image
            src={dashLogoutIcon}
            width={22}
            height={22}
            alt={`logout-icon`}
          />
          {!isCollapsed && <span className="">Logout</span>}
        </button>
      </SidebarMenuButton>

      <CustomAlertDialog
        isPending={isPending}
        icon={dashLogoutIcon}
        handleFn={handleLogout}
        isOpen={showModal}
        setIsOpen={setShowModal}
        title="Logout"
        isNoting
        subTitle="Are you sure you want to logout?"
        className={`bg-[#161616]/80`}
      />
    </>
  );
};

export { DashSidebarLogoutBtn };
