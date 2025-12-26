import { Button } from "@/components/ui/button";
import Image from "next/image";
import film from "@/public/Home-page/filled.svg";
import alarm from "@/public/Home-page/Alarm.svg";
import HeroDropDown from "../DropDown/HeroDropDown";
import { options } from "@/constant/data";

const HeroLayout = ({
  pageName = "",
  bgImage,
  filmName,
  coming,
  description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
}) => {
  return (
    <div className="min-h-[90vh] w-full flex justify-start relative items-end lg:px-25 md:px-15 min-[425px]:px-10 px-5 sm:py-16 py-8">
      <div className="bg-[linear-gradient(0deg,rgba(0,0,0,0)_0%,#000000_81.73%)]  absolute top-0 left-0 right-0 w-full h-[400px] z-[-1]"></div>
      <div className="w-full h-[400px] absolute bottom-0 left-0 right-0 bg-[linear-gradient(185deg,transparent_50%,black_80%)] z-[-1]"></div>
      <Image
        src={bgImage}
        className="-z-10 object-cover h-full w-full"
        alt="hero-image"
        priority
        fill
      />
      {pageName && (
        <div className="absolute top-[20%] translate-y-[-20%] lg:left-25 md:left-15 min-[425px]:left-10 left-5 flex sm:gap-5 gap-3 items-center">
          <h2 className="sm:text-3xl text-2xl font-bold shrink-0">
            {pageName}
          </h2>
          <HeroDropDown initialValue={"Genres"} options={options} />
        </div>
      )}
      <div className="flex flex-col gap-4 h-full w-full max-w-[500px]">
        <h2 className="font-semibold min-[375px]:text-3xl text-2xl uppercase">
          {coming}
        </h2>
        <h1 className={`sm:text-6xl text-5xl font-bold capitalize`}>
          {filmName.toLowerCase()}
        </h1>
        <p className="font-medium text-sm text-justify min-[375px]:leading-6 leading-5">
          {description}
        </p>
        <div className="flex gap-5 gap-y-3 items-center flex-wrap">
          <Button
            className={`flex items-center gap-3 !rounded-full sm:!px-4`}
            size={"lg"}
          >
            <span>Watch Trailer</span>
            <Image
              src={film}
              width={"auto"}
              className="size-[20px] object-cover"
              height={"auto"}
              alt="fill"
            />
          </Button>
          <Button
            className={`flex items-center gap-3 bg-[#FFD400] text-black !rounded-full sm:!px-4`}
            size={"lg"}
          >
            <span>More info</span>
            <Image
              src={alarm}
              width={"auto"}
              className="size-[20px] object-cover"
              height={"auto"}
              alt="fill"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroLayout;
