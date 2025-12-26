"use client";

import { notificationData } from "@/constant/data";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { X } from "lucide-react";

const NotificationDropDown = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button className="cursor-pointer">{children}</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className={` bg-[#181818] flex flex-col gap-4 text-white border-none p-2 w-[500px] h-[650px] rounded-[30px] px-4 py-5`}
        >
          <div className="flex justify-between items-center">
            <h3 className="font-bold md:text-3xl text-2xl">Notification</h3>
            <button
              className="cursor-pointer bg-[#333333] size-[44px] rounded-full flex justify-center items-center"
              onClick={() => setIsOpen(false)}
            >
              <X className="size-6" />
            </button>
          </div>
          <div className="h-[600px] overflow-y-auto flex flex-col gap-7 py-3 thin-scrollbar">
            {notificationData.map((v, i) => (
              <div className="flex items-center gap-4 py-1" key={i}>
                <div className="shrink-0">
                  <Image
                    src={v.avatar}
                    alt="avatar"
                    className="size-[59px] object-cover rounded-lg"
                    width={59}
                    height={59}
                  />
                </div>
                <div className="">
                  <h5 className="font-semibold text-[17px] flex items-center gap-2">
                    {v.title}
                    {v.recent && (
                      <div className="size-2 bg-[#FF2C2C] rounded-full"></div>
                    )}
                  </h5>
                  <p className="text-sm opacity-50">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default NotificationDropDown;
