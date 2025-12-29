"use client";

import { HeroLayout, HeroLayoutLoader } from "../../layout/HeroLayout";
import useFetch from "@/hooks/useFetch";

const HeroSection = ({ query_url = "", query_name = [] }) => {
  const { data, isLoading } = useFetch({
    query_key: query_name,
    query_url,
  });

  return (
    <div>
      {isLoading ? (
        <HeroLayoutLoader />
      ) : (
        <HeroLayout
          bgImage={data?.new_trailer.thumbnail}
          filmName={data?.new_trailer.title}
        />
      )}
    </div>
  );
};

export default HeroSection;
