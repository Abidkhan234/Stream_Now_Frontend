"use client";

import ContinueWatchingSection from "@/components/custom-components/homepageSections/ContinueWatchingSection";
import RecommandedSection from "@/components/custom-components/homepageSections/RecommendedSection";
import TrendingSection from "@/components/custom-components/homepageSections/TrendingSection";
import useFetch from "@/hooks/useFetch";
import { cn } from "@/lib/utils";

const MovieShowList = ({
  query_url = "",
  query_name = [],
  className,
  isShow = false,
}) => {
  const { data, isLoading } = useFetch({
    query_key: query_name,
    query_url: query_url,
  });

  const TrendingSectionEmptyTitle = `No Trending ${
    isShow ? "Show" : "Movie"
  } Found`;

  const ContinueWatchingSectionEmptyTitle = `No ${
    isShow ? "Show" : "Movie"
  } Found`;

  const RecommandedSectionEmptyTitle = `No Recommanded ${
    isShow ? "Show" : "Movie"
  } Found`;

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <ContinueWatchingSection
        data={data?.watchingMovies}
        isLoading={isLoading}
        emptyTitle={ContinueWatchingSectionEmptyTitle}
      />

      <TrendingSection
        data={data?.trendingMovies}
        isLoading={isLoading}
        emptyTitle={TrendingSectionEmptyTitle}
      />

      <RecommandedSection
        data={data?.recommendedMovies}
        isLoading={isLoading}
        emptyTitle={RecommandedSectionEmptyTitle}
      />
    </div>
  );
};

export default MovieShowList;
