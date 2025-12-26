import Image from "next/image";
import starIcon from "@/public/icons/Star 1.svg";
import ActionButtons from "../shared/action-buttons";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const MovieItem = ({
  title = "dummy",
  image = null,
  description = "dummy",
  year,
  categories = [],
  duration = 0,
  cardClass = "",
  rating = 0,
  handleDelete,
  handleEdit,
  isPending,
  showDiscardModal,
  setShowDiscardModal,
}) => {
  return (
    <div
      className={cn(
        `flex items-center justify-between gap-5 bg-[#161616] p-3 py-3 pe-5 rounded-[22px]`,
        cardClass
      )}
    >
      <div className="flex gap-5">
        <div className="shrink-0 h-[130px] w-[130px] relative">
          <Image
            src={image}
            alt={title + "-image"}
            className="rounded-[18px] object-cover"
            sizes="100%"
            fill
            priority
          />
        </div>

        <div className="flex flex-col items-start justify-between">
          <div className="flex items-baseline gap-2 mb-2 text-white">
            <h3 className="text-3xl font-semibold">{title}</h3>
            <span className="">{year}</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {duration && (
              <span className="bg-white rounded-[8px] text-black font-medium py-1 px-4">
                {/* {formatDuration(duration)} */}
                {Math.floor(duration)}m
              </span>
            )}
            <span className="bg-[#F8B136] rounded-[8px] text-black font-medium py-1 px-4 flex items-center gap-1">
              <Image src={starIcon} className="object-cover" alt="star-icon" />
              {rating}
            </span>
            {categories?.map((category) => (
              <span
                key={category.id}
                className="py-1 px-3 font-medium text-sm rounded-[8px] border border-white content-center"
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="basis-[200px]">
        <ActionButtons
          className={`justify-end`}
          isLoading={isPending}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          showDeleteModal={showDiscardModal}
          setShowDeleteModal={setShowDiscardModal}
        />
      </div>
    </div>
  );
};

const MovieItemLoader = () => {
  return (
    <div className={`flex gap-5 bg-[#161616] p-3 py-3 rounded-[22px] h-full`}>
      <div className="shrink-0">
        <Skeleton className={`size-[120px]`} />
      </div>

      <div className="flex flex-col w-full gap-6 h-full">
        <Skeleton className={`h-6 w-full`} />

        <Skeleton className={`h-16 w-full`} />
      </div>
    </div>
  );
};

export { MovieItem, MovieItemLoader };
