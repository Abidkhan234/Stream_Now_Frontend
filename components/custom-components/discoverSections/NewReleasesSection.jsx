import React from "react";
import SectionLayout from "../../layout/SectionLayout";
import { cardData } from "@/constant/data";

const NewReleasesSection = () => {
  return (
    <div>
      <SectionLayout data={cardData} secTitle={"New Releases"} />
    </div>
  );
};

export default NewReleasesSection;
