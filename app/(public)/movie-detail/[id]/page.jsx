"use client";

import { useParams, useRouter } from "next/navigation";
import staticImage from "@/public/Movie-Dialog/ef0bfa9c4e95fbd463733e391e30020bba75bc80.png";
import Image from "next/image";
import { movieSeasonData } from "@/constant/data";
import PlayButton from "@/components/buttons/PlayButton";
import HeroDropDown from "@/components/DropDown/HeroDropDown";
import closeIcon from "@/public/icons/close.svg";

import MovieSlider from "@/components/slider/MovieSlider";
import Link from "next/link";

const page = () => {
  const { id: movieId } = useParams();
  const router = useRouter();

  return (
    <div className="w-full h-full flex items-center justify-center pt-23">
      <div className="h-[70vh] w-full lg:px-25 min-[425px]:px-10 px-5">
        <div className="relative h-full w-full">
          <Image
            src={staticImage}
            alt="static-image"
            className="object-cover"
            sizes="100%"
            fill
            priority
          />

          <button
            className="absolute sm:top-5 top-2.5 sm:right-7 right-5 size-12 rounded-full bg-[#333333] flex items-center justify-center cursor-pointer"
            onClick={() => router.back()}
          >
            <Image src={closeIcon} width={20} height={20} alt="cross" />
          </button>

          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <Link href={`/video/${movieId}`}>
              <PlayButton />
            </Link>
          </div>
        </div>
        <div
          // lg:px-20 min-[425px]:px-10 px-5
          className={`flex flex-col gap-4 py-5`}
        >
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
        </div>
        {/* lg:px-20 min-[425px]:px-10 px-5 */}
        <div className="w-full">
          <MovieSlider isClass="movieSlider" />
        </div>
      </div>
    </div>
  );
};

export default page;
