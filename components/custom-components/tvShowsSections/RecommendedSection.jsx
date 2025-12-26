import React from "react";
import SectionLayout from "../../layout/SectionLayout";
import { cardData } from "@/constant/data";

const RecommandedSection = () => {
  return (
    <div>
      <SectionLayout data={cardData} secTitle={"Recommended"} />
    </div>
  );
};

export default RecommandedSection;
