import Image from "next/image";
import React from "react";
import Logo from "@/public/Auth-Page-Image/b72acfc6a71a2b59c6b6f3f8fb3d762aee377cb2.png";
import { IoClose } from "react-icons/io5";
import Link from "next/link";

const Sidebar = ({ setIsSidebarOpen, navLinks, pathname }) => {
  return (
    <div className="flex flex-col gap-6 sm:px-1 px-4 py-3 h-full !z-50">
      <div className="flex justify-between items-center">
        <Image
          src={Logo}
          alt="Logo"
          className="object-cover w-[140px] h-[70px]"
        />
        <button
          className="cursor-pointer text-xl bg-red-500 size-[30px] text-white flex justify-center items-center rounded-full"
          onClick={() => setIsSidebarOpen(false)}
        >
          <IoClose />
        </button>
      </div>
      <div className="flex flex-col gap-25 justify-center items-center grow">
        {navLinks.map((v, i) => (
          <Link
            href={v.path}
            key={i}
            className={`text-white font-medium relative text-lg ${
              pathname == v.path ? " text-white opacity-100" : "opacity-60"
            }`}
          >
            {v.text}
            {pathname == v.path && (
              <div className="h-[2px] w-full absolute -bottom-1 left-0 right-0 bg-[#C40000] rounded-sm"></div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
