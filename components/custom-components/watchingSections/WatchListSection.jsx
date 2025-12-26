import Card from "@/components/card/Card";
import { watchListData } from "@/constant/data";
import React from "react";

const WatchListSection = () => {
  return (
    <section className="py-10 flex flex-col gap-5 lg:px-20 min-[425px]:px-10 px-5">
      <div className="">
        <h1 className="font-bold text-5xl">Watch list</h1>
      </div>
      <div className="grid 2xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-4">
        {watchListData.map((v, i) => (
          <Card
            image={v.image}
            filmTitle={v.filmTitle}
            rating={v.rating}
            category={v.category}
            releaseYear={v.releaseYear}
            id={i + 1}
            key={i}
          />
        ))}
      </div>
    </section>
  );
};

export default WatchListSection;
