"use client";

import ParentDiv from "../shared/element-div";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "motion/react";
import { useField } from "formik";

const AdminRadioBtns = ({ name, options = [] }) => {
  const [field, meta, helper] = useField(name);
  return (
    <ParentDiv
      className={`${
        meta.touched && meta.error && "border-destructive"
      } h-[75px] justify-center`}
    >
      <div className="flex items-center gap-4 justify-between">
        {options.map((v, i) => (
          <label
            key={i}
            className="flex items-center gap-3 cursor-pointer w-full"
          >
            <Input
              type="radio"
              name={v.name}
              checked={field.value === v.value}
              onChange={() => helper.setValue(v.value)}
              className="size-[18px]"
            />
            <span className="text-sm">{v.label}</span>
          </label>
        ))}
      </div>

      <div className={`relative h-2 w-full mt-1`}>
        <AnimatePresence>
          {meta.touched && meta.error && (
            <motion.p
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              className="text-destructive text-xs absolute -bottom-1"
            >
              {meta.error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </ParentDiv>
  );
};

export default AdminRadioBtns;
