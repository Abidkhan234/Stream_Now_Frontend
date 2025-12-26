"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";
import verifyIcon from "@/public/icons/verify.svg";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import useAdminContext from "@/contexts/adminContext";

const SuccessDialog = ({
  title = "",
  subTitle = "",
  isOpen,
  setIsOpen,
  titleClass = "",
  subTitleClass = "",
  movieImage,
  movieTitle = "",
  movieCategories = [],
  backTo,
  showImage = true,
}) => {
  const router = useRouter();
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);

        if (!open) {
          if (!backTo) {
            return router.back();
          }
          router.replace(backTo);
        }
      }}
    >
      <DialogContent
        className={`bg-[#161616] rounded-[22px]`}
        showCloseButton={false}
      >
        <DialogClose className="text-xl text-white absolute top-3 right-3 cursor-pointer outline-none">
          <X />
          <span className="sr-only">Close</span>
        </DialogClose>
        <DialogHeader>
          <DialogTitle
            className={`flex flex-col gap-3 items-center text-center`}
          >
            <div className="size-[68px] bg-[#0C0C0C] rounded-full flex items-center justify-center">
              <Image
                src={verifyIcon}
                width={32}
                height={32}
                className=""
                alt="dialog-icon"
              />
            </div>
            <div className="flex flex-col gap-3">
              <h1 className={cn("font-medium text-2xl", titleClass)}>
                {title}
              </h1>
              <h4 className={cn("opacity-60 md:text-lg", subTitleClass)}>
                {subTitle}
              </h4>
            </div>
            <div className="mt-2 flex flex-col gap-2 items-center">
              {showImage && (
                <Image
                  src={movieImage}
                  width={175}
                  height={230}
                  className="object-cover rounded-[16px]"
                  alt="movie-image"
                />
              )}
              <h2 className="font-medium text-lg">{movieTitle}</h2>
              <div className="flex items-center gap-4">
                {movieCategories.map((item) => (
                  <span
                    key={item.id}
                    className="py-2 px-4 text-sm font-light bg-[#0C0C0C] rounded-[12px]"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          </DialogTitle>
          <DialogDescription className={`hidden`}></DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
