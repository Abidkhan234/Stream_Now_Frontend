"use client";

import { Card, CardLoader } from "@/components/card/Card";
import NoDataFoundCard from "@/components/card/no-data-found-card";
import useFetch from "@/hooks/useFetch";

const WatchListSection = () => {
  const { data, isLoading } = useFetch({
    query_key: ["wish_list_fetch"],
    query_url: "/wishlist",
  });

  return (
    <section className="py-10 flex flex-col gap-5 lg:px-20 min-[425px]:px-10 px-5">
      <div className="">
        <h1 className="font-bold text-5xl">Watch list</h1>
      </div>
      {isLoading ? (
        <div className="grid 2xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardLoader key={`wish_list_card_loader_${i}`} />
          ))}
        </div>
      ) : (
        <>
          {data.wishlistMovies.length > 1 ? (
            <div className="grid 2xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-4">
              {data.wishlistMovies?.map((v, i) => (
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
          ) : (
            <>
              <NoDataFoundCard title="No Movie/Show Found" />
            </>
          )}
        </>
      )}
    </section>
  );
};

export default WatchListSection;
