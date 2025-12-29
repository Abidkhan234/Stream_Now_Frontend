import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";
import { SearchX } from "lucide-react";

const NoDataFoundCard = ({
  subTitle = "",
  title = "",
  titleClass = "",
  subTitleClass = "",
  cardClass = "",
}) => {
  return (
    <Empty className={cardClass}>
      <EmptyHeader>
        <EmptyMedia className={`bg-[#181818] size-14 rounded-2xl`}>
          <SearchX className="size-7" />
        </EmptyMedia>
        <EmptyTitle
          className={cn("text-3xl font-semibold tracking-wide", titleClass)}
        >
          {title}
        </EmptyTitle>
        {subTitle && (
          <EmptyDescription className={cn("", subTitleClass)}>
            {subTitle}
          </EmptyDescription>
        )}
      </EmptyHeader>
    </Empty>
  );
};

export default NoDataFoundCard;
