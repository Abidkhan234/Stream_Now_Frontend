"use client";

import Image from "next/image";
import Link from "next/link";
import arrowLeft from "@/public/Account-Page/arrow-left.svg";
import { sidePanelLinks } from "@/constant/data";
import { usePathname } from "next/navigation";

const SidePanel = () => {
  const pathName = usePathname();

  return (
    <div className="flex flex-col items-start md:gap-13 gap-8 px-4 text-nowrap">
      <div className="">
        <Link href={"/home"} className="flex items-center gap-1.5">
          <Image
            src={arrowLeft}
            alt="arrow-left"
            className="size-[24px]"
            width={"auto"}
            height={"auto"}
          />
          <span className="text-sm">Back to inevia</span>
        </Link>
      </div>
      <div className="flex md:flex-col md:gap-9 gap-6 w-full md:items-start items-center flex-wrap">
        {sidePanelLinks.map((v, i) => (
          <a
            href={`#${v.path}`}
            className={`flex items-center md:gap-3 gap-2 text-white ${
              pathName == v.path ? "opacity-100" : "opacity-70"
            }`}
            key={i}
          >
            <Image
              src={v.icon}
              className=""
              width={"auto"}
              height={"auto"}
              alt={`${v.text}-icon`}
            />
            <span className="md:text-base text-sm">{v.text}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SidePanel;
