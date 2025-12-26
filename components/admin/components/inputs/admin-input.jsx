"use client";

import { Input } from "@/components/ui/input";
import ParentDiv from "../shared/element-div";
import { useField } from "formik";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

const AdminInput = ({
  labelText = "",
  className,
  name = "",
  placeholder = "",
  maxLength,
  totalLength = 0,
  totalLengthShow = true,
}) => {
  const [field, meta] = useField(name);

  return (
    <ParentDiv
      id={name}
      labelText={labelText}
      className={cn(
        `${meta.touched && meta.error && "border-destructive"}`,
        className
      )}
    >
      <Input
        type="text"
        className="w-full border-none ps-0.5 text-ellipsis"
        name={name}
        id={name}
        placeholder={placeholder}
        maxLength={maxLength}
        {...field}
      />

      <div
        className={`flex items-center relative w-full ${
          !totalLengthShow && "h-2"
        }`}
      >
        <AnimatePresence>
          {meta.touched && meta.error && (
            <motion.p
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              className={`text-destructive text-xs absolute ${
                !totalLengthShow ? "-bottom-1" : "bottom-0"
              }`}
            >
              {meta.error}
            </motion.p>
          )}
        </AnimatePresence>
        {totalLengthShow && (
          <span className="text-sm opacity-60 grow text-right">
            {field.value.length}/{totalLength}
          </span>
        )}
      </div>
    </ParentDiv>
  );
};

export default AdminInput;
