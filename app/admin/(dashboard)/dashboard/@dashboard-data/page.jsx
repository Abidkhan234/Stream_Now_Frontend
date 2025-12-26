"use client";

import StatCard from "@/components/admin/components/cards/stat-card";
import CustomCalender from "@/components/admin/components/shared/custom-calender";
import { Card } from "@/components/ui/card";
import { SidebarSeparator } from "@/components/ui/sidebar";
import { stats } from "@/constant/data";
import { useState } from "react";

const DashboardDataComp = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="bg-[#101010] px-4 py-4 rounded-[22px] overflow-hidden border-none shadow-none h-full overflow-y-auto scroll-hide">
      <div className="w-full flex justify-between items-center">
        <h3 className="text-2xl font-semibold text-white">Dashboard</h3>
        <div className="bg-[#000000] size-[40px] rounded-[12px]">
          <CustomCalender />
        </div>
      </div>
      <SidebarSeparator className={`mx-0`} />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 h-full">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>
    </Card>
  );
};

export default DashboardDataComp;
