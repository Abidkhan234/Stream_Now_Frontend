"use client";

import { movieSeasonSliderData } from "@/constant/data";
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

const MovieSlider = ({ isClass = "" }) => {
  let result = isClass.replace(/\s+/g, "");

  return (
    <div className="flex flex-col gap-5 w-full relative py-5">
      {/* Prev Button */}
      <button
        className={`${result}-prev text-lg text-white cursor-pointer size-[40px] flex justify-center items-center absolute top-[50%] translate-y-[-50%] left-2 z-10 bg-black/50 rounded-full disabled:opacity-70 disabled:pointer-events-none`}
      >
        <IoIosArrowBack className="text-2xl" />
      </button>

      {/* Next Button */}
      <button
        className={`${result}-next text-lg text-white cursor-pointer size-[40px] flex justify-center items-center absolute top-[50%] translate-y-[-50%] right-2 z-10 bg-black/50 rounded-full disabled:opacity-70 disabled:pointer-events-none`}
      >
        <IoIosArrowForward className="text-2xl" />
      </button>

      <Swiper
        spaceBetween={15}
        slidesPerView={1}
        breakpoints={{
          1024: {
            slidesPerView: 3,
          },
          767: {
            slidesPerView: 2,
          },
        }}
        modules={[Navigation]}
        navigation={{
          nextEl: `.${result}-next`,
          prevEl: `.${result}-prev`,
        }}
        className="w-full"
      >
        {movieSeasonSliderData.map((v, i) => (
          <SwiperSlide key={i}>
            <div className="w-full h-[300px] bg-gray-800 rounded-xl flex items-center justify-center text-white">
              Slide {i + 1}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* </Swiper> */}
    </div>
  );
};

export default MovieSlider;
