import { Card } from "@/components/ui/card";
import menuIcon from "@/public/icons/menu.svg";
import Image from "next/image";

const DashCard = ({ cardTitle, children }) => {
  return (
    <Card className="bg-[#101010] py-0 rounded-[22px] overflow-hidden border-none shadow-none h-full w-full">
      <div className="flex items-center justify-between p-4 bg-[#181818]">
        <h3 className="text-lg font-semibold text-white">{cardTitle}</h3>
        <Image src={menuIcon} width={24} height={24} alt="menu-icon" />
      </div>
      <>{children}</>
    </Card>
  );
};

export default DashCard;
