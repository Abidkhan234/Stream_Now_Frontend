"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

import { Navigation } from "swiper/modules";

import { Card, CardLoader } from "../card/Card";
import NoDataFoundCard from "../card/no-data-found-card";

const Slider = ({
  slideData = [],
  isClass = "",
  isLoading,
  emptyTitle = "",
}) => {
  let result = isClass.replace(/\s+/g, "");

  return (
    <div className="flex flex-col gap-5 w-full relative px-5">
      {isLoading ? (
        <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-4 ">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardLoader key={`${result}_${i}`} />
          ))}
        </div>
      ) : (
        <>
          <button
            className={`${result}-prev text-lg text-white cursor-pointer size-10 flex justify-center items-center absolute top-[50%] translate-y-[-50%] sm:left-10 left-2 z-10 rounded-full disabled:opacity-70 disabled:pointer-events-none`}
          >
            <IoIosArrowBack className="text-4xl" />
          </button>

          <button
            className={`${result}-next text-lg text-white cursor-pointer size-10 flex justify-center items-center absolute top-[50%] translate-y-[-50%] sm:right-10 right-2 z-10 rounded-full disabled:opacity-70 disabled:pointer-events-none`}
          >
            <IoIosArrowForward className="text-4xl" />
          </button>
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            modules={[Navigation]}
            breakpoints={{
              1440: { slidesPerView: 6 },
              1024: {
                slidesPerView: 5,
              },
              767: {
                slidesPerView: 4,
              },
              375: {
                slidesPerView: 2,
              },
            }}
            navigation={{
              nextEl: `.${result}-next`,
              prevEl: `.${result}-prev`,
            }}
            className="h-full w-full"
          >
            {slideData.length >= 1 ? (
              slideData.map((item) => (
                <SwiperSlide key={item.slug} className={`z-1`}>
                  <Card
                    image={item.thumbnail}
                    filmTitle={item.title}
                    releaseYear={item.movie_year}
                    rating={item.average_rating}
                    maturity_rating={item.maturity_rating}
                    id={item.slug}
                  />
                </SwiperSlide>
              ))
            ) : (
              <NoDataFoundCard title={emptyTitle} cardClass={"w-fit py-6!"} />
            )}
          </Swiper>
        </>
      )}
    </div>
  );
};

export default Slider;
