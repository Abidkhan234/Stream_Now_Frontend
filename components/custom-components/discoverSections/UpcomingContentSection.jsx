import React from "react";
import SectionLayout from "../../layout/SectionLayout";
import { cardData } from "@/constant/data";

const UpcomingContentSection = () => {
  return (
    <section className="pb-10">
      <SectionLayout secTitle={"Upcoming Content"} data={cardData} />
    </section>
  );
};

export default UpcomingContentSection;
