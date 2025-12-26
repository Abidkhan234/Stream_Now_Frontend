"use client";

import Image from "next/image"
import videoImage from "@/public/Video-Dialog/d286bf6a492eb618c4d0cfe164c9bd663c11628f.png";
import MovieDetailCard from "@/components/card/MovieDetailCard";
import leftArrowIcon from '@/public/icons/arrow-left.svg';
import closeIcon from '@/public/icons/close.svg'
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const page = () => {

    const { id: videoId } = useParams();
    const router = useRouter();

    return (
        <div className="min-h-screen w-full lg:px-20 min-[425px]:px-10 pt-23">
            <div className="relative h-[88vh] group">
                <Image
                    src={videoImage}
                    className="object-cover"
                    fill
                    sizes="100%"
                    alt="video"
                    priority={true}
                />
                <button onClick={() => router.back()} className="absolute sm:top-5 top-2.5 sm:left-7 left-5 size-11 rounded-full bg-[#333333] flex items-center justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 cursor-pointer">
                    <Image src={leftArrowIcon} width={24} height={24} alt="arrow-left" />
                </button>
                <button
                    onClick={() => router.back()}
                    className="absolute sm:top-5 top-2.5 sm:right-7 right-5 size-11 rounded-full bg-[#333333] flex items-center justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 cursor-pointer">
                    <Image src={closeIcon} width={24} height={24} alt="cross" />
                </button>
            </div>
            <div className={`py-7 px-6`}>
                <MovieDetailCard isVideoComponent movieTitle={`Jurassic Park`} releaseYear={`2025`} watchingHour={`1hr 35m`} rating={`7.9`} movieDetailOverview={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry.`} />
            </div>
        </div >
    )
}

export default page