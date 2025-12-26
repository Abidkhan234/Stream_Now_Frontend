"use client";

import { useField } from "formik";
import { AnimatePresence, motion } from "motion/react";

const Input = ({
  name,
  placeholder,
  type,
  noBorder = true,
  maxLength,
  minLength,
  ...props
}) => {
  const [field, meta] = useField(name);
  return (
    <div className={`relative w-full`}>
      <input
        {...field}
        type={type || "text"}
        id={name}
        placeholder={placeholder}
        maxLength={maxLength || 50}
        minLength={minLength || 2}
        autoComplete="off"
        className={`${
          noBorder ? "border py-3 px-4" : "px-2"
        } bg-transparent w-full text-white placeholder:opacity-70 placeholder:text-white text-base outline-none rounded-[22px] ${
          meta.touched && meta.error ? "border-red-500" : "border-[#313131]"
        }`}
        {...props}
      />
      <AnimatePresence>
        {meta.touched && meta.error && (
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            className={`absolute ${
              noBorder ? "-bottom-6" : "-bottom-10"
            } ms-2 text-red-500 text-sm`}
          >
            {meta.error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Input;
