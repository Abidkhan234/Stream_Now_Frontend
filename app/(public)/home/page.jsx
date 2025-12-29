import HeroSection from "@/components/custom-components/homepageSections/HeroSection";
import MovieShowList from "@/components/lists/movie-show-list";

const page = () => {
  return (
    <main className="flex flex-col gap-8 pb-10">
      <>
        <HeroSection
          query_name={["home_page_hero_fetch"]}
          query_url="/home?category=1&type=all"
        />
      </>
      <div className="relative  overflow-hidden">
        <div className="absolute h-full lg:w-60 sm:w-37.5 -left-40 bg-[linear-gradient(0deg,rgba(0,0,0,0)_0%,#000_0%)] z-2 blur-3xl"></div>
        <div className="absolute h-full lg:w-60 sm:w-37.5 -right-25 bg-[linear-gradient(0deg,rgba(0,0,0,0)_0%,#000_0%)] z-2 blur-3xl"></div>

        <MovieShowList
          query_name={[`home_page_fetch`]}
          query_url="/home?type=all"
        />
      </div>
    </main>
  );
};

export default page;
