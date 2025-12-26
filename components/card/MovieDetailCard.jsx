import Image from "next/image";
import PlayButton from "../buttons/PlayButton";
import { actionBtns, cateogryNames } from "@/constant/data";
import starIcon from "@/public/Home-page/Star 1.svg";

const MovieDetailCard = ({
  isVideoComponent = false,
  movieTitle,
  rating,
  watchingHour,
  movieDetailOverview,
  releaseYear,
}) => {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 w-full">
      <div className="flex flex-col min-[426px]:items-start items-start gap-3">
        <h2 className="font-bold md:text-6xl sm:text-5xl text-4xl flex gap-3 min-[375px]:flex-row flex-col min-[375px]:items-end items-start">
          {movieTitle}
          <span className="text-xl font-medium h-fit inline-block">
            {releaseYear}
          </span>
        </h2>
        <div className="flex gap-2 items-center text-white flex-wrap gap-y-3">
          {cateogryNames.map((v, i) => (
            <div className="border rounded-lg py-1.5 px-2" key={i}>
              <span className="text-sm font-medium">{v.text}</span>
            </div>
          ))}
          <div className="flex gap-1 items-center text-[15px] font-medium text-white">
            <Image
              src={starIcon}
              className="size-[16px]"
              alt="star-icon"
              width={"auto"}
              height={"auto"}
            />
            <span>{rating}</span>
          </div>
          <div className="bg-white rounded-xl py-2 px-5 text-black">
            <span className="font-medium text-sm">{watchingHour}</span>
          </div>
        </div>
        <div className="flex gap-4 content-center w-full grow">
          {actionBtns.map((v, i) => (
            <button
              className="bg-[#000000] rounded-xl cursor-pointer h-max p-2 py-3 basis-[90px] flex flex-col gap-1 items-center"
              key={i}
            >
              <span className="size-[24px]">{v.icon}</span>
              <span className="font-medium text-xs">{v.text}</span>
            </button>
          ))}
        </div>
      </div>
      {isVideoComponent ? (
        <div className="flex flex-col gap-3 items-start">
          <h3 className="font-medium text-3xl">Overview</h3>
          <p className="text-sm leading-5.5 opacity-70">
            {movieDetailOverview}
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

export default MovieDetailCard;
