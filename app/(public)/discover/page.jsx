import DiscoverLists from "@/components/lists/discover-list";

const page = () => {
  return (
    <main className="pb-10 pt-24 overflow-hidden relative">
      <div className="absolute h-full max-w-55 w-full -left-30 bg-[linear-gradient(0deg,rgba(0,0,0,0)_0%,#000_0%)] z-2 blur-3xl"></div>
      <div className="absolute h-full max-w-55 w-full -right-20 bg-[linear-gradient(0deg,rgba(0,0,0,0)_0%,#000_0%)] z-2 blur-3xl"></div>

      <DiscoverLists />
    </main>
  );
};

export default page;
