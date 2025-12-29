import Slider from "@/components/slider/Slider";

const SectionLayout = ({ secTitle, data, isLoading, emptyTitle }) => {
  return (
    <div className="flex flex-col gap-6 ">
      <div className="secParent z-2 lg:px-25 md:px-15 min-[425px]:px-10 px-5">
        <h1 className="font-bold sm:text-5xl text-3xl  text-start">
          {secTitle}
        </h1>
      </div>
      <div className="w-full">
        <Slider
          slideData={data}
          isClass={secTitle}
          isLoading={isLoading}
          emptyTitle={emptyTitle}
        />
      </div>
    </div>
  );
};

export default SectionLayout;
