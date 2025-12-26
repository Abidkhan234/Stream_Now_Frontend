"use client";

import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";

import ParentDiv from "../shared/element-div";
import { useField } from "formik";
import { AnimatePresence, motion } from "motion/react";
import { Spinner } from "@/components/ui/spinner";

const AdminMultiSelect = ({
  labelText = "",
  className,
  name = "",
  placeholder = "",
  options = [],
  isLoading,
}) => {
  const [field, meta, helper] = useField(name);

  const handleChange = (values) => {
    helper.setValue(values);
  };

  return (
    <ParentDiv
      id={name}
      labelText={labelText}
      className={`${meta.touched && meta.error && "border-destructive"}`}
    >
      <MultiSelect onValuesChange={handleChange} values={field.value || []}>
        <MultiSelectTrigger className="w-full hover:bg-transparent border-none ps-0.5 pe-0">
          {field.value.length > 0 ? (
            <MultiSelectValue placeholder={placeholder} />
          ) : (
            <span className="font-light opacity-60">{placeholder}</span>
          )}
        </MultiSelectTrigger>
        <MultiSelectContent className={`text-white!`}>
          <MultiSelectGroup className={`text-white!`}>
            {isLoading ? (
              <div className="flex items-center justify-center h-full w-full">
                <Spinner />
              </div>
            ) : (
              <>
                {options.map((item, i) => (
                  <MultiSelectItem
                    value={item.id}
                    key={i}
                    className={`justify-between`}
                  >
                    {item.name}
                  </MultiSelectItem>
                ))}
              </>
            )}
          </MultiSelectGroup>
        </MultiSelectContent>
      </MultiSelect>

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

export default AdminMultiSelect;
