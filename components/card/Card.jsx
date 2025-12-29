import Image from "next/image";
import starIcon from "@/public/Home-page/Star 1.svg";
import PlayButton from "../buttons/PlayButton";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

const CardLoader = () => {
  return (
    <div className="py-2 px-3 flex flex-col gap-3 overflow-hidden w-full">
      <div className="h-87.5">
        <Skeleton className={`w-full h-full`} />
      </div>

      <div className="flex flex-col gap-4">
        <Skeleton className={`w-25 h-4`} />

        <Skeleton className={`w-full h-5`} />
      </div>
    </div>
  );
};

const Card = ({
  image,
  filmTitle,
  releaseYear,
  rating,
  id,
  maturity_rating = "",
}) => {
  const finalString = maturity_rating?.replace("plus", "+");
  return (
    <>
      <div className="py-2 px-3 flex flex-col gap-3 overflow-hidden w-full">
        <Link
          href={`/movie-detail/${id}`}
          className="h-87.5 relative px-3 cursor-pointer"
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

        <div
          className={`flex flex-col gap-2 ${
            finalString ? "min-h-28" : ""
          } justify-between`}
        >
          <h3 className="font-semibold text-2xl">{filmTitle}</h3>
          <div className="flex justify-between items-center">
            <span className="font-medium text-[15px]">{releaseYear}</span>
            {finalString && (
              <div className="flex gap-3">
                <div className="flex gap-1 items-center text-[15px] font-medium">
                  <Image src={starIcon} className="size-4" alt="star-icon" />
                  <span>{rating}</span>
                </div>

                <div className="border text-white border-white rounded-lg py-1.5 px-3">
                  <span className="text-sm">
                    {maturity_rating?.replace("plus", "+")}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export { Card, CardLoader };
