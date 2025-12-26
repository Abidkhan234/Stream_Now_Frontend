import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { IoIosArrowForward } from "react-icons/io";
import { cn } from "@/lib/utils";

const AccountDialogLayout = ({
  btnText,
  btnClass,
  title,
  isModifiedBtn = true,
  isOpen,
  setIsOpen,
  arrowShow = true,
  children,
}) => {
  const handleOpenChange = () => {
    if (setIsOpen) setIsOpen(!isOpen);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen ? handleOpenChange : undefined}
    >
      <DialogTrigger asChild>
        {isModifiedBtn ? (
          <div
            className={`flex ${
              arrowShow ? "justify-between" : "justify-center"
            } items-center cursor-pointer text-white`}
          >
            <span className="sm:text-lg text-sm">{btnText}</span>
            {arrowShow && (
              <span className="text-xl">
                <IoIosArrowForward />
              </span>
            )}
          </div>
        ) : (
          <Button
            size="lg"
            className={cn(
              `bg-transparent text-white p-0 max-[375px]:text-[13px] text-base`,
              btnClass
            )}
          >
            {btnText}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-[376px]:px-2 outline-none bg-[#181818] border-0 sm:!max-w-[600px] rounded-2xl !p-0 !overflow-y-auto">
        <DialogHeader className={`bg-[#1F1F1F] py-3 px-4 `}>
          <DialogTitle className="sm:text-4xl min-[376px]:text-3xl text-2xl text-white">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="py-1 min-[376px]:px-4 px-3 flex justify-center items-center overflow-y-auto">
          {children}
        </div>
        <DialogDescription className={`hidden`}></DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default AccountDialogLayout;
