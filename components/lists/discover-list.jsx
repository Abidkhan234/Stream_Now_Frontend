"use client";

import UpcomingContentSection from "../custom-components/discoverSections/UpcomingContentSection";
import NewReleasesSection from "../custom-components/discoverSections/NewReleasesSection";
import TopTenContentSection from "../custom-components/discoverSections/TopTenContentSection";
import useFetch from "@/hooks/useFetch";

const DiscoverLists = () => {
  const { data, isLoading } = useFetch({
    query_key: ["discover_data_fetch"],
    query_url: "/discover",
  });

  return (
    <div className="flex flex-col gap-7 relative w-full">
      <UpcomingContentSection data={data?.upComming} isLoading={isLoading} />

      <NewReleasesSection data={data?.newReleases} isLoading={isLoading} />

      <TopTenContentSection data={data?.trendingMovies} isLoading={isLoading} />
    </div>
  );
};

export default DiscoverLists;
