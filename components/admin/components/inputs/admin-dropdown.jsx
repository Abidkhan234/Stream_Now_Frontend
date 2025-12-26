"use client";

import ParentDiv from "../shared/element-div";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useField } from "formik";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const AdminDropDown = ({
  labelText = "",
  className,
  name = "",
  options = [],
  children,
}) => {
  const [field, meta, helper] = useField(name);
  return (
    <ParentDiv
      labelText={labelText}
      className={`${meta.touched && meta.error && "border-destructive"}`}
    >
      <DropdownMenu>
        <DropdownMenuTrigger
          className={`flex items-center justify-between outline-none`}
        >
          {children}

          <span>
            <ChevronDown className="size-5" />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={`w-[var(--radix-dropdown-menu-trigger-width)]`}
        >
          {options.map((v, i) => (
            <DropdownMenuItem key={i} onClick={() => helper.setValue(v.value)}>
              {v.text}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className={`relative h-2 w-full`}>
        <AnimatePresence>
          {meta.touched && meta.error && (
            <motion.p
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              className={`text-destructive text-xs absolute -bottom-1`}
            >
              {meta.error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </ParentDiv>
  );
};

export default AdminDropDown;
