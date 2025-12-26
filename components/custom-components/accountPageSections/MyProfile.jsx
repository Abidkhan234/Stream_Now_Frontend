"use client";

import Image from "next/image";
import useUIContext from "@/contexts/UIContext";
import defaultAvatar from "@/public/Navbar/67a38098f77f1dd420cf6584f845b88476675c24.png";
import UpdateProfileDialog from "@/components/mini-components/update-profile-comps/UpdateProfileDialog";

const MyProfile = () => {
  const { userData, setUserData } = useUIContext();

  return (
    <div className="flex justify-between items-center " id="update-profile">
      <div className="flex min-[400px]:gap-2.5 gap-1.5 items-center">
        <div className="sm:size-[80px] size-[50px] relative">
          <Image
            src={userData?.image_url ? userData.image_url : defaultAvatar}
            className="rounded-full object-cover"
            fill
            alt="avatar"
            sizes="100%"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold sm:text-xl min-[400px]:text-lg text-base">
            {userData?.full_name ? userData?.full_name : "User"}
          </h4>
          <span className="opacity-70 min-[400px]:text-sm text-xs">
            {userData?.email ? userData?.email : "user@dummy.com"}
          </span>
        </div>
      </div>
      <>
        <UpdateProfileDialog userData={userData} setUserData={setUserData} />
      </>
    </div>
  );
};

export default MyProfile;
