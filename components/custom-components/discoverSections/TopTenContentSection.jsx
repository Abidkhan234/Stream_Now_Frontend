import React from "react";
import SectionLayout from "../../layout/SectionLayout";
import { cardData } from "@/constant/data";

const TopTenContentSection = () => {
  return (
    <div>
      <SectionLayout data={cardData} secTitle={"Top 10 Content"} />
    </div>
  );
};

export default TopTenContentSection;
