import React from "react";
import SectionLayout from "../../layout/SectionLayout";
import { cardData } from "@/constant/data";

const TrendingSection = () => {
  return (
    <div>
      <SectionLayout data={cardData} secTitle={"Trending"} />
    </div>
  );
};

export default TrendingSection;
