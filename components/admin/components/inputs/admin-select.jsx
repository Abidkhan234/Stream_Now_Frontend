"use client";

import { useField } from "formik";
import ParentDiv from "../shared/element-div";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Spinner } from "@/components/ui/spinner";

const AdminSelect = ({
  labelText = "",
  className,
  name = "",
  placeholder = "",
  options = [],
  isLoading,
  isSubmitted,
}) => {
  const [field, meta, helper] = useField(name);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (isSubmitted) {
      helper.setValue(0);
      return;
    }

    helper.setValue(value);
  }, [value, isSubmitted]);

  return (
    <ParentDiv
      labelText={labelText}
      className={`${meta.touched && meta.error && "border-destructive"}`}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            aria-expanded={open}
            className="justify-between bg-transparent px-0! font-light"
          >
            <div className="">
              {value ? (
                options.find((item) => item.id == value)?.title
              ) : (
                <span className="opacity-60">{placeholder}</span>
              )}
            </div>
            <ChevronDown className="size-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 min-w-[var(--radix-popover-trigger-width)]">
          <Command className={`bg-transparent!`}>
            <CommandInput placeholder="Search trailer..." className="h-9" />
            <CommandList>
              <CommandEmpty>No trailer found.</CommandEmpty>
              <CommandGroup>
                {isLoading ? (
                  <div className="flex items-center justify-center h-full w-full">
                    <Spinner />
                  </div>
                ) : (
                  <>
                    {options.map((item) => (
                      <CommandItem
                        key={item.id}
                        value={item.id}
                        onSelect={() => {
                          setValue(item.id == value ? 0 : item.id);
                          setOpen(false);
                        }}
                        className={`my-3`}
                      >
                        {item.title}
                        <Check
                          className={cn(
                            "ml-auto",
                            value == item.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

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

export default AdminSelect;
