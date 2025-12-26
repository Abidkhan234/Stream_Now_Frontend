"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import calenderIcon from "@/public/icons/calendar.svg";
import Image from "next/image";

const CustomCalender = ({ modifiers = "" }) => {
  const [date, setDate] = useState(new Date());
  const formatted = date ? format(date, "PPP") : "Select date";

  return (
    <div className="bg-[#000000] size-[40px] rounded-[12px] flex items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={`w-10 h-10 rounded-[12px] flex items-center justify-center ${modifiers} cursor-pointer`}
          >
            <span className="sr-only">Open calendar</span>
            <Image
              src={calenderIcon}
              width={24}
              height={24}
              alt="calender-icon"
            />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-2" align={"end"}>
          <div className="flex flex-col gap-2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => d && setDate(d)}
              className={`text-white`}
            />
            <div className="flex justify-between items-center pt-2">
              <div className="text-sm text-white">{formatted}</div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className={`bg-[#101010]`}
                  onClick={() => setDate(new Date())}
                >
                  Today
                </Button>
                <Button size="sm" onClick={() => setDate(null)}>
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CustomCalender;
