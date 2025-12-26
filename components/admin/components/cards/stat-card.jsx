import { Card } from "@/components/ui/card";
import Image from "next/image";

const StatCard = ({ label, value, icon }) => {
  return (
    <Card className="rounded-[22px] overflow-hidden border-none shadow-none text-white bg-transparent h-full py-0">
      <div className="flex items-center gap-4 bg-[#181818] py-2 px-4 rounded-[22px] h-full">
        <div className="rounded-full bg-[#232323] size-[50px] flex items-center justify-center">
          <Image
            src={icon}
            width={24}
            height={24}
            className="object-cover"
            alt="card-icon"
          />
        </div>
        <div className="flex-1">
          <p className="text-sm">{label}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
