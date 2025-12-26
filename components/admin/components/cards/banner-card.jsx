import { Skeleton } from "@/components/ui/skeleton";

const BannerCard = ({ src, title, description }) => {
  return (
    <div className="h-full w-full flex items-start flex-col gap-2">
      <div className="h-[250px] w-full rounded-[22px] overflow-hidden">
        <video src={src} controls className="w-full h-full object-cover"></video>
      </div>
      <h2 className="font-medium text-2xl mt-2">{title}</h2>
      <p className="text-sm text-white opacity-60 leading-6">{description}</p>
    </div>
  );
};

const BannerCardLoader = () => {
  return (
    <div className="h-full w-full flex items-start flex-col gap-2">
      <div className="h-[240px] w-full relative rounded-[22px] overflow-hidden">
        <Skeleton className={`w-full h-full`} />
      </div>
      <Skeleton className={`h-4 w-full grow`} />
      <Skeleton className={`h-10 w-full grow`} />
    </div>
  );
};

export { BannerCard, BannerCardLoader };
