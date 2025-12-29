"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";

const HeroDropDown = ({
  initialValue,
  options,
  customBtn = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(initialValue);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Button */}
      {customBtn ? (
        <Button
          className={`py-1.5 w-38 rounded-[22px] flex items-center justify-between`}
          size={"lg"}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selected}</span>
          <ChevronDown
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
            size={20}
          />
        </Button>
      ) : (
        <Button
          className={`py-1.5 px-3 rounded-[22px]`}
          size={"lg"}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selected}</span>
          <ChevronDown
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
            size={20}
          />
        </Button>
      )}

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute mt-2 w-full ${
              customBtn ? "max-w-full" : "max-w-32.5"
            } text-white z-10 overflow-hidden rounded-3xl flex flex-col gap-4 py-2 items-center px-2 bg-white/40`}
          >
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="w-full sm:py-2 py-1 text-sm cursor-pointer rounded-full text-center relative text-black bg-white/60 font-medium"
              >
                {option}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroDropDown;
