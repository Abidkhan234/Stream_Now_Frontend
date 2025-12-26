"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";

const HeroDropDown = ({ initialValue, options, customBtn = false }) => {
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
          className={`py-1.5 sm:!px-10 px-8`}
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
          className={`py-1.5 px-3`}
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
              customBtn ? "max-w-full" : "max-w-[130px]"
            } text-white z-10 overflow-hidden rounded-3xl  bg-[rgba(255,255,255,0.15)] 
    backdrop-blur-[14px] 
    border border-[rgba(255,255,255,0.3)] 
    shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(255,255,255,0.1),inset_0_0_10px_5px_rgba(255,255,255,0.5)]
    before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[1px] 
    before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.8),transparent)]
    after:content-[''] after:absolute after:top-0 after:left-0 after:w-[1px] after:h-full
    after:bg-[linear-gradient(180deg,rgba(255,255,255,0.8),transparent,rgba(255,255,255,0.3))] flex flex-col gap-2 py-2 items-center px-2`}
          >
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="w-full sm:py-2 py-1 text-sm cursor-pointer rounded-full text-center relative text-black
    bg-[rgba(255,255,255,0.05)]
    backdrop-blur-[14px]
    border border-[rgba(255,255,255,0.3)]
    overflow-hidden
    shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(255,255,255,0.1),inset_0_0_20px_10px_rgba(255,255,255,1)]
    before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[1px]
    before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.8),transparent)]
    after:content-[''] after:absolute after:top-0 after:left-0 after:w-[1px] after:h-full
    after:bg-[linear-gradient(180deg,rgba(255,255,255,0.8),transparent,rgba(255,255,255,0.3))]"
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
