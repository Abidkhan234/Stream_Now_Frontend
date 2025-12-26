"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Spinner } from "../ui/spinner";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";

const CustomAlertDialog = ({
  title = "",
  subTitle = "",
  icon,
  btnText,
  isModifiedBtn = true,
  children = null,
  handleFn,
  isOpen,
  setIsOpen,
  isPending,
  isNoting = false,
  className,
  titleClass,
  customOpacity = 0.7,
}) => {
  return (
    <>
      {!isNoting && (
        <>
          {children ? (
            children
          ) : isModifiedBtn ? (
            <div
              className="flex justify-between items-center cursor-pointer text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sm:text-lg text-sm">{btnText}</span>
              <span className="text-xl">
                <IoIosArrowForward />
              </span>
            </div>
          ) : (
            <Button
              onClick={() => setIsOpen(!isOpen)}
              className="!py-6 w-full border font-medium text-sm rounded-xl cursor-pointer border-white bg-transparent disabled:pointer-events-none disabled:opacity-80"
            >
              {btnText}
            </Button>
          )}
        </>
      )}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed top-0 left-0 right-0 w-full h-full z-30 bg-black"
              onClick={() => (isPending ? null : setIsOpen(false))}
              initial={{ opacity: 0 }}
              animate={{ opacity: customOpacity }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2, ease: "linear" }}
              className={twMerge(
                "w-full max-w-[420px] fixed top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] flex flex-col items-center text-center gap-6 justify-center z-50 bg-[#161616]/80 rounded-2xl px-6 py-5",
                className
              )}
            >
              {icon && (
                <Image
                  src={icon}
                  className="size-[60px]"
                  alt="alert-icon"
                  width={60}
                  height={60}
                />
              )}

              <h1
                className={cn(
                  "font-bold min-[376px]:text-4xl text-3xl",
                  titleClass
                )}
              >
                {title}
              </h1>
              <p className="text-white opacity-80 text-base">{subTitle}</p>
              <div className="flex items-center w-full sm:flex-row flex-col gap-3">
                <Button
                  className="py-6 bg-[#0C0C0C] rounded-[16px] text-[#FCFCFC]/40 disabled:pointer-events-none disabled:opacity-80 sm:w-[50%] w-full"
                  onClick={() => setIsOpen(false)}
                  disabled={isPending}
                >
                  Maybe Later
                </Button>
                <Button
                  className="py-6 bg-[#C40000] rounded-[16px] disabled:pointer-events-none disabled:opacity-80 sm:w-[50%] w-full"
                  onClick={() => handleFn()}
                  disabled={isPending}
                >
                  {isPending && <Spinner />}
                  Yes
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomAlertDialog;
