"use client";

import Image from "next/image";
import closeIcon from "@/public/icons/close.svg";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const UploadLayout = ({
  children,
  title,
  subTitle,
  cardClass,
  showModal,
  setShowModal,
}) => {
  return (
    <div
      className={cn(
        "bg-[#161616] border border-[#282828] w-full max-w-[1500px] py-5 px-4 rounded-[18px] flex flex-col justify-between mx-4",
        cardClass
      )}
    >
      <div className="flex justify-between items-center mb-1">
        <div className="">
          <h2 className="font-medium md:text-3xl text-2xl mb-1">{title}</h2>
          <h4 className="text-sm opacity-60">{subTitle}</h4>
        </div>
        <div className="">
          <button
            className="cursor-pointer"
            onClick={() => setShowModal(!showModal)}
          >
            <Image src={closeIcon} alt="close-icon" width={24} height={24} />
          </button>
        </div>
      </div>
      <Separator className={``} />
      <div className="">{children}</div>
    </div>
  );
};

export default UploadLayout;
