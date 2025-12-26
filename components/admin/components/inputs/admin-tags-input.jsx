"use client";

import { AnimatePresence, motion } from "motion/react";
import ParentDiv from "../shared/element-div";

import { useField } from "formik";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";

const AdminTagsPickerInput = ({
  labelText = "",
  className,
  name = "",
  placeholder = "",
}) => {
  const [field, meta, helper] = useField(name);

  const handleAddTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const input = e.currentTarget;
      const value = input.value.trim();

      if (value) {
        helper.setValue([...field.value, value]);
        input.value = "";
      }
    }
  };

  const handleRemove = (index) => {
    const filterArr = field.value.filter((_, i) => i != index);

    helper.setValue(filterArr);
  };

  const handleChange = (e) => {
    const length = e.target.value.length;

    if (length > 0) {
      helper.setTouched(false);
      return;
    }
    helper.setTouched(true);
  };

  return (
    <>
      <ParentDiv
        id={name}
        labelText={labelText}
        className={`${meta.touched && meta.error && "border-destructive"}`}
      >
        <div className="relative">
          <Input
            placeholder={placeholder}
            onKeyDown={handleAddTag}
            className={`border-none pe-0 ps-0.5 grow`}
            onBlur={() => helper.setTouched(true)}
            onChange={(e) => handleChange(e)}
          />
          {field.value.length > 0 && (
            <Button
              className={`absolute top-[50%] translate-y-[-50%] right-0 rounded-[10px]`}
              onClick={() => helper.setValue([])}
            >
              Clear All
            </Button>
          )}
        </div>

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
      <div className="max-h-[120px] overflow-y-auto flex flex-wrap gap-2 pr-1 scroll-hide">
        {field.value.length > 0 &&
          field.value.map((item, index) => (
            <Badge
              key={index}
              variant="outline"
              className="h-8 gap-4 px-2 text-sm font-light capitalize bg-[#C40000] rounded-lg"
            >
              {item}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => handleRemove(index)}
              >
                <X className="size-4" />
              </Button>
            </Badge>
          ))}
      </div>
    </>
  );
};

export default AdminTagsPickerInput;
