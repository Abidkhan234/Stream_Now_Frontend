"use client";

import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

import ManageSubscription from "@/components/mini-components/subscription-comps/ManageSubscription";
import ActiveSubscription from "@/components/mini-components/subscription-comps/ActiveSubscription";

const Subscription = () => {
  return (
    <div className="flex flex-col gap-3 text-white scroll-mt-[500px]">
      <>
        <ActiveSubscription />
      </>
      <DropdownMenuSeparator className={`!opacity-30 text-white`} />
      <>
        <ManageSubscription />
      </>
    </div>
  );
};

export default Subscription;
