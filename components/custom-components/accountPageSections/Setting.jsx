"use client";

import DeleteAccountDialog from "@/components/mini-components/new-password-comps/DeleteAccountDialog";
import NewPasswordDailog from "@/components/mini-components/new-password-comps/NewPasswordDialog";

const Setting = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="p-2 px-3 border border-[#3d3d3db7] bg-transparent rounded-3xl">
        <NewPasswordDailog />
      </div>
      <div className="p-2 px-3 border border-[#3d3d3db7] bg-transparent rounded-3xl">
        <DeleteAccountDialog />
      </div>
    </div>
  );
};

export default Setting;
