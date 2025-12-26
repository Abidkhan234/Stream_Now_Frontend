import NewReleasesSection from '@/components/custom-components/discoverSections/NewReleasesSection'
import TopTenContentSection from '@/components/custom-components/discoverSections/TopTenContentSection'
import UpcomingContentSection from '@/components/custom-components/discoverSections/UpcomingContentSection'


const page = () => {
    return (
        <main className='flex flex-col gap-7 relative overflow-hidden pb-10 pt-24'>
            <div className="absolute h-full w-[220px] -left-30 bg-[linear-gradient(0deg,rgba(0,0,0,0)_0%,#000_0%)] z-[2] blur-3xl"></div>
            <div className="absolute h-full w-[220px] -right-20 bg-[linear-gradient(0deg,rgba(0,0,0,0)_0%,#000_0%)] z-[2] blur-3xl"></div>
            <>
                <UpcomingContentSection />
            </>
            <>
                <NewReleasesSection />
            </>
            <>
                <TopTenContentSection />
            </>
        </main>
    )
}

export default page