import React from "react";
import SectionLayout from "../../layout/SectionLayout";
import { cardData } from "@/constant/data";

const ContinueWatchingSection = () => {
  return (
    <section className="py-10">
      <SectionLayout secTitle={"Continue watching"} data={cardData} />
    </section>
  );
};

export default ContinueWatchingSection;
