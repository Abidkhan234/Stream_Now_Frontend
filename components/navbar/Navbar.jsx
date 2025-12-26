"use client";

import Logo from "@/public/Auth-Page-Image/b72acfc6a71a2b59c6b6f3f8fb3d762aee377cb2.png";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import searchIcon from "@/public/Navbar/search-normal.svg";
import bellIcon from "@/public/Navbar/notification-bing.svg";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import DropDown from "@/components/DropDown/index";

import { FaBars } from "react-icons/fa6";
import { AnimatePresence, motion } from "motion/react";
import Sidebar from "@/components/sidebar/Sidebar";
import { dropDownItems } from "@/constant/data";
import NotificationDropDown from "../DropDown/NotificationDropDown";
import useUIContext from "@/contexts/UIContext";
import { Button } from "@/components/ui/button";

const navLinks = [
  {
    text: "Home",
    path: "/home",
  },
  {
    text: "TV Shows",
    path: "/tv-shows",
  },
  {
    text: "Movies",
    path: "/movies",
  },
  {
    text: "Discover",
    path: "/discover",
  },
  {
    text: "Watchlist",
    path: "/watch-list",
  },
];

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { userData } = useUIContext();

  return (
    <nav className="absolute w-full lg:px-20 min-[425px]:px-10 px-5 z-40 border-b border-[#ffffff42] bg-transparent">
      <div className="flex justify-between items-center">
        <div className="shrink-0">
          <Link href={userData ? "/home" : "/"}>
            <Image
              src={Logo}
              alt="Logo"
              className="object-cover min-[375px]:w-[140px] w-[115px] h-[70px]"
              priority
            />
          </Link>
        </div>
        {userData ? (
          <>
            <div className="md:flex hidden lg:gap-8 gap-6 items-center">
              {navLinks.map((v, i) => (
                <Link
                  href={v.path}
                  key={i}
                  className={`text-white lg:text-base text-sm font-medium relative ${
                    pathname == v.path
                      ? " text-white opacity-100"
                      : "opacity-60"
                  }`}
                >
                  {v.text}
                  {pathname == v.path && (
                    <div className="h-[4px] rounded-tl-full rounded-tr-full w-full absolute -bottom-6 left-0 right-0 bg-[#C40000]"></div>
                  )}
                </Link>
              ))}
            </div>
            <div className="flex lg:gap-7 gap-6 items-center shrink-0">
              <button
                className="text-lg cursor-pointer md:hidden inline"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <FaBars />
              </button>
              <NotificationDropDown>
                <Image src={bellIcon} width={20} height={20} alt="bellIcon" />
              </NotificationDropDown>
              <button className="cursor-pointer">
                <Image src={searchIcon} alt="Logo" width={20} height={20} />
              </button>
              <DropDown items={dropDownItems} path={pathname}>
                <Avatar className={`relative size-9`}>
                  <Image
                    src={userData.image_url}
                    alt="avatar"
                    className="object-cover object-center"
                    fill
                    sizes="100%"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropDown>
            </div>
          </>
        ) : (
          <div className="">
            <Link href={`/login`} replace={false}>
              <Button
                className={`min-[375px]:!py-6 py-5 min-[375px]:!px-8 px-7 rounded-[22px]`}
              >
                Sign In
              </Button>
            </Link>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            className="fixed top-0 left-0 bg-[#181818] h-full w-full sm:max-w-[280px] max-w-full !z-50"
          >
            <Sidebar
              setIsSidebarOpen={setIsSidebarOpen}
              navLinks={navLinks}
              pathname={pathname}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
