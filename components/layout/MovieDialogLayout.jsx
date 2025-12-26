"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

import { FreeMode, Navigation } from "swiper/modules";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { DropdownMenuSeparator } from "../ui/dropdown-menu";

import Image from "next/image";

import starIcon from "@/public/Home-page/Star 1.svg";

import {
  actionBtns,
  cateogryNames,
  movieSeasonData,
  movieSeasonSliderData,
} from "@/constant/data";
import HeroDropDown from "../DropDown/HeroDropDown";
import VideoDialogLayout from "./VideoDialogLayout";
import PlayButton from "../buttons/PlayButton";
import SeasonMovieCard from "../card/MovieCard";

const MovieDialogLayout = ({ cardImage }) => {
  return (
    <Dialog className={`!py-0`}>
      <DialogTrigger asChild></DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className={`bg-[#181818] border-none h-full max-h-[700px] lg:!max-w-[calc(1100px-2rem)] sm:max-w-[800px] p-0 overflow-hidden overflow-y-auto outline-none `}
      >
        <DialogHeader className={`!p-0`}>
          <DialogTitle className={`py-0`}></DialogTitle>
        </DialogHeader>

        <>
          <MovieDetail />
        </>
        <DropdownMenuSeparator className={`text-white opacity-30`} />
        <DialogFooter className={`flex !flex-col gap-4 sm:px-4 px-2`}>
          <div className="flex flex-col gap-3 items-start">
            <h3 className="font-medium text-3xl">Overview</h3>
            <p className="text-sm leading-5.5 opacity-70">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex,
              reiciendis. Perspiciatis quam quia saepe explicabo sit. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Ipsum, enim
              placeat! Sit saepe provident pariatur, aliquid error cum facere!
              Similique quod error voluptates doloremque quisquam, fuga
              reiciendis totam temporibus autem? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quisquam illo inventore eligendi
              amet consequuntur magni accusantium labore eaque voluptatem dolor.
              Voluptatibus sit fugiat excepturi odit aliquid porro eius vel
              sunt!
            </p>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-3xl">Seasons</h3>
            <HeroDropDown
              initialValue={`Season 1`}
              options={movieSeasonData}
              customBtn={true}
            />
          </div>
        </DialogFooter>

        <DialogDescription></DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

const MovieDetail = ({ isVideoComponent = false }) => {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 sm:px-10 px-6 w-full">
      <div className="flex flex-col min-[426px]::items-start items-start gap-3">
        <h2 className="font-bold md:text-6xl sm:text-5xl text-4xl">
          Jurassic Park
        </h2>
        <div className="flex gap-2 items-center text-white flex-wrap gap-y-3">
          {cateogryNames.map((v, i) => (
            <div className="border rounded-lg py-1.5 px-2" key={i}>
              <span className="text-sm font-medium">{v.text}</span>
            </div>
          ))}
          <div className="flex gap-1 items-center text-[15px] font-medium text-white">
            <Image src={starIcon} className="size-[16px]" alt="star-icon" />
            <span>7.9</span>
          </div>
          <div className="bg-white rounded-2xl py-2 px-4 text-black">
            <span className="font-medium text-sm">1hr 35m</span>
          </div>
        </div>
        <div className="flex gap-4 content-center w-full grow">
          {actionBtns.map((v, i) => (
            <button
              className="bg-[#000000] rounded-xl cursor-pointer h-max p-2 py-3 basis-[90px] flex flex-col gap-1 items-center"
              key={i}
            >
              <Image
                src={v.icon}
                alt={`${v.text}-icon`}
                className="size-[24px]"
              />
              <span className="font-medium text-xs">{v.text}</span>
            </button>
          ))}
        </div>
      </div>
      {isVideoComponent ? (
        <div className="flex flex-col gap-3 items-start">
          <h3 className="font-medium text-3xl">Overview</h3>
          <p className="text-sm leading-5.5 opacity-70">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex,
            reiciendis. Perspiciatis quam quia saepe explicabo sit. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Ipsum, enim placeat!
            Sit saepe provident pariatur, aliquid error cum facere! Similique
            quod error voluptates doloremque quisquam, fuga reiciendis totam
            temporibus autem? Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Quisquam illo inventore eligendi amet consequuntur magni
            accusantium labore eaque voluptatem dolor. Voluptatibus sit fugiat
            excepturi odit aliquid porro eius vel sunt!
          </p>
        </div>
      ) : (
        <div className="sm:flex hidden justify-end items-center">
          <PlayButton />
        </div>
      )}
    </div>
  );
};

export default MovieDialogLayout;
