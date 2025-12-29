import AccountPanel from "@/components/panels/AccountPanel";
import SidePanel from "@/components/panels/SidePanel";

const page = () => {
  return (
    <div className="grid grid-cols-12 gap-3 gap-y-8 pt-25 min-h-screen lg:px-20 min-[425px]:px-10 px-5 mb-5">
      <div className="xl:col-span-2 lg:col-span-3 md:col-span-4 col-span-12">
        <SidePanel />
      </div>
      <div className="xl:col-span-10 lg:col-span-9 md:col-span-8 col-span-12">
        <AccountPanel />
      </div>
    </div>
  );
};

export default page;
