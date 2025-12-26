"use client";

import { Button } from "@/components/ui/button";
import useAdminContext from "@/contexts/adminContext";
import { useState } from "react";

const filterBtnsArr = [
  {
    label: "New Releases",
    value: "newReleases",
  },
  {
    label: "Upcoming Content",
    value: "upComming",
  },
  {
    label: "Top 10 Shows/Movies",
    value: "trendingMovies",
  },
];

const FilterBtns = () => {
  const { selectedCategory, setSelectedCategory } = useAdminContext();

  return (
    <div className="flex items-center gap-5">
      {filterBtnsArr.map((v) => (
        <Button
          className={`${
            v.value == selectedCategory ? "" : "bg-[#161616]"
          } py-5.5`}
          onClick={() => setSelectedCategory(v.value)}
          key={v.value}
        >
          {v.label}
        </Button>
      ))}
    </div>
  );
};

export default FilterBtns;
