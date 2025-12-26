import ContinueWatchingSection from "@/components/custom-components/homepageSections/ContinueWatchingSection";
import HeroSection from "@/components/custom-components/homepageSections/HeroSection";
import RecommandedSection from "@/components/custom-components/homepageSections/RecommendedSection";
import TrendingSection from "@/components/custom-components/homepageSections/TrendingSection";
const page = () => {
 
  return (
    <main className="flex flex-col gap-8 pb-10">
      <>
        <HeroSection />
      </>
      <div className="relative flex flex-col gap-8 overflow-hidden">
        <div className="absolute h-full lg:w-[240px] sm:w-[150px] -left-40 bg-[linear-gradient(0deg,rgba(0,0,0,0)_0%,#000_0%)] z-[2] blur-3xl"></div>
        <div className="absolute h-full lg:w-[200px] sm:w-[150px] -right-25 bg-[linear-gradient(0deg,rgba(0,0,0,0)_0%,#000_0%)] z-[2] blur-3xl"></div>
        <>
          <ContinueWatchingSection />
        </>
        <>
          <TrendingSection />
        </>
        <>
          <RecommandedSection />
        </>
      </div>
    </main>
  )
}

export default page
