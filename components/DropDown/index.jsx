"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoutIcon from "@/public/Navbar/logout.svg";
import Image from "next/image";
import Logout from "../mini-components/logout-comp/Logout";
import Link from "next/link";

const DropDown = ({ items = [], children }) => {
  const pathname = usePathname();
  const [alertOpen, setAlertOpen] = useState(false);

  const handleSamePageScrollClick = (hash) => {
    // Use setTimeout to ensure scroll happens after dropdown closes and focus settles
    setTimeout(() => {
      if (hash) {
        const targetElement = document.getElementById(hash);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    }, 100); // Small delay to let dropdown close and focus settle
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button className="cursor-pointer">{children}</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className={`w-[300px] bg-[#181818] text-white border-none rounded-[30px] py-0 px-0`}
        >
          {items.map((v, i) => {
            const isOnAccountPage = pathname === "/account";
            const hash = v.path.split("#")[1];

            return (
              <div key={i} className="">
                {isOnAccountPage ? (
                  // When on account page: prevent default close, scroll manually
                  <DropdownMenuItem
                    className="flex gap-3 items-center w-full hover:bg-[#38383870]! hover:text-white! py-3 px-5 rounded-none cursor-pointer"
                    onSelect={(e) => {
                      // Let dropdown close naturally, then scroll
                      handleSamePageScrollClick(hash);
                    }}
                  >
                    <Image src={v.icon} width={22} height={22} alt={v.text} />
                    <span className="font-medium text-lg">{v.text}</span>
                  </DropdownMenuItem>
                ) : (
                  // When on other pages: use Link wrapped in DropdownMenuItem
                  <Link href={v.path}>
                    <DropdownMenuItem
                      className="flex gap-3 items-center w-full hover:bg-[#38383870]! hover:text-white! py-3 px-5 rounded-none cursor-pointer"
                    >
                      <Image src={v.icon} width={22} height={22} alt={v.text} />
                      <span className="font-medium text-lg">{v.text}</span>
                    </DropdownMenuItem>
                  </Link>
                )}
                <DropdownMenuSeparator className={`opacity-25 my-0`} />
              </div>
            );
          })}
          <DropdownMenuItem
            className={`hover:bg-[#38383870]! hover:text-white!`}
          >
            <button
              className="flex gap-4 items-center w-full cursor-pointer disabled:opacity-80 disabled:pointer-events-none px-2.5 py-2"
              onClick={() => setAlertOpen(!alertOpen)}
            >
              <Image
                src={logoutIcon}
                width={22}
                height={22}
                alt={"logout-icon"}
              />
              <span className="font-medium text-lg">Logout</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <>
        <Logout alertOpen={alertOpen} setAlertOpen={setAlertOpen} />
      </>
    </>
  );
};

export default DropDown;
