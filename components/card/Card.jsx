import Image from "next/image";
import starIcon from "@/public/Home-page/Star 1.svg";
import PlayButton from "../buttons/PlayButton";
import Link from "next/link";

const Card = ({ image, filmTitle, releaseYear, rating, category, id }) => {
  return (
    <>
      <div className="py-2 px-3 flex flex-col gap-3 overflow-hidden w-full">
        <Link
          href={`/movie-detail/${id}`}
          className="h-[350px] relative px-3 cursor-pointer"
        >
          <Image
            src={image}
            alt="card-image"
            className="object-cover rounded-2xl -z-10"
            sizes="100%"
            fill
          />
          <div className="flex flex-col justify-end gap-4 h-full w-full">
            <div className="self-end">
              <PlayButton />
            </div>
            <div className="border-2 border-[#FF0000] w-full max-w-[70%]"></div>
          </div>
        </Link>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-2xl">{filmTitle}</h3>
          <div className="flex justify-between items-center">
            <span className="font-medium text-[15px]">{releaseYear}</span>
            <div className="flex items-center gap-3">
              <div className="flex gap-1 items-center text-[15px] font-medium">
                <Image src={starIcon} className="size-[16px]" alt="star-icon" />
                <span>{rating}</span>
              </div>
              <div className="border text-white border-white rounded-lg py-1.5 px-3">
                <span className="text-sm">{category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
