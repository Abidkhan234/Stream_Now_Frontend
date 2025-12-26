"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

import { Navigation } from "swiper/modules";

import Card from "../card/Card";

const Slider = ({ slideData = [], isClass = "" }) => {
  // Make sure class names are safe (no spaces)
  let result = isClass.replace(/\s+/g, "");

  return (
    <div className="flex flex-col gap-5 w-full relative px-5">
      {/* Prev Button */}
      <button
        className={`${result}-prev text-lg text-white cursor-pointer size-[40px] flex justify-center items-center absolute top-[50%] translate-y-[-50%] sm:left-10 left-2 z-10 rounded-full disabled:opacity-70 disabled:pointer-events-none`}
      >
        <IoIosArrowBack className="text-4xl" />
      </button>

      {/* Next Button */}
      <button
        className={`${result}-next text-lg text-white cursor-pointer size-[40px] flex justify-center items-center absolute top-[50%] translate-y-[-50%] sm:right-10 right-2 z-10 rounded-full disabled:opacity-70 disabled:pointer-events-none`}
      >
        <IoIosArrowForward className="text-4xl" />
      </button>

      {/* Swiper */}
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        modules={[Navigation]}
        breakpoints={{
          1440: { slidesPerView: 7 },
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
        {slideData.map((v, i) => (
          <SwiperSlide
            key={i}
            className={`z-[1]`} // fixed card width so peeking works
          >
            <Card
              image={v.image}
              filmTitle={v.filmTitle}
              releaseYear={v.releaseYear}
              rating={v.rating}
              category={v.category}
              id={i + 1}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
