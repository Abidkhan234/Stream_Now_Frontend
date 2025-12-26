import { Skeleton } from "@/components/ui/skeleton";
import ActionButtons from "../shared/action-buttons";

const GenreCardLoader = () => {
  return (
    <div className="flex items-center justify-between w-full bg-[#161616] py-3 px-4 rounded-[22px] grow">
      <div className="flex items-center gap-5 w-full">
        <Skeleton className={`size-10 rounded-full`} />
        <Skeleton className={`h-7 w-50`} />
      </div>
    </div>
  );
};

const GenreCard = ({
  number,
  title,
  handleDelete,
  handleEdit,
  isPending,
  showDiscardModal,
  setShowDiscardModal,
}) => {
  return (
    <div className="flex items-center justify-between w-full bg-[#161616] py-3 px-4 rounded-[22px]">
      <div className="flex items-center gap-5">
        <div className="bg-[#0C0C0C] size-[38px] rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-semibold">{number}</span>
        </div>
        <h3 className="font-semibold md:text-lg">{title}</h3>
      </div>
      <div className="">
        <ActionButtons
          className={`gap-7`}
          showText={false}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          isLoading={isPending}
          showDeleteModal={showDiscardModal}
          setShowDeleteModal={setShowDiscardModal}
        />
      </div>
    </div>
  );
};

export { GenreCard, GenreCardLoader };
