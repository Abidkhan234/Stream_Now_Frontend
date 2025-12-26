import ContinueWatchingSection from '@/components/custom-components/moviesSections/ContinueWatchingSection'
import HeroSection from '@/components/custom-components/moviesSections/HeroSection'
import RecommandedSection from '@/components/custom-components/moviesSections/RecommendedSection'
import TrendingSection from '@/components/custom-components/moviesSections/TrendingSection'

const page = () => {
    return (
        <main className='flex flex-col gap-8 pb-10'>
            <>
                <HeroSection />
            </>
            <div className="relative flex flex-col gap-8 overflow-hidden">
                <div className="absolute h-full w-[220px] -left-30 bg-[linear-gradient(0deg,rgba(0,0,0,0)_0%,#000_0%)] z-[2] blur-3xl"></div>
                <div className="absolute h-full w-[220px] -right-20 bg-[linear-gradient(0deg,rgba(0,0,0,0)_0%,#000_0%)] z-[2] blur-3xl"></div>
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