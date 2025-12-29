import HeroSection from "@/components/custom-components/tvShowsSections/HeroSection";
import MovieShowList from "@/components/lists/movie-show-list";

const page = () => {
  return (
    <main className="flex flex-col gap-7 pb-10">
      <>
        <HeroSection />
      </>
      <div className="relative flex flex-col gap-8 overflow-hidden">
        <div className="absolute h-full w-55 -left-30 bg-[linear-gradient(0deg,rgba(0,0,0,0)_0%,#000_0%)] z-2 blur-3xl"></div>
        <div className="absolute h-full w-55 -right-20 bg-[linear-gradient(0deg,rgba(0,0,0,0)_0%,#000_0%)] z-2 blur-3xl"></div>
        <MovieShowList
          query_name={[`tvshow_page_fetch`]}
          query_url="/home?type=show"
          isShow={true}
        />
      </div>
    </main>
  );
};

export default page;
