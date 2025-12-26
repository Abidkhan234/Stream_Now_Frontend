"use client";

import AccountDialogLayout from "@/components/layout/AccountDialogLayout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import useUIContext from "@/contexts/UIContext";
import localHelper from "@/helpers/localStorage";
import useCustomMutation from "@/hooks/useCustomMutation";
import { useState } from "react";
import toast from "react-hot-toast";

const AgeRestriction = () => {
  const { userData, setUserData } = useUIContext();
  const [selectedAge, setSelectedAge] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { isPending, mutate } = useCustomMutation({
    query_name: ["age_update_mutation"],
    query_url: "/user",
  });

  const handleClick = () => {
    mutate(
      {
        payload: { age_restriction: Number(selectedAge), _method: "put" },
        slug: userData?.slug,
      },
      {
        onSuccess: async ({ data, message }) => {
          toast.success(message);
          await localHelper.setItem("userData", data);
          document.cookie =
            "userData=" +
            encodeURIComponent(
              JSON.stringify({
                subscription_id: data.subscription_id,
              })
            ) +
            "; path=/; samesite=strict";
          setUserData(data);
          setShowModal(false);
        },
        onError: (error) => {
          if (typeof error?.message === "string") {
            toast.error(error.message);
            return;
          }
          Object.entries(error?.message).forEach(([key, message]) => {
            toast.error(`${message}`);
          });
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-1">
      <AccountDialogLayout
        isModifiedBtn
        btnText={`All Content`}
        title={`Age Restriction`}
        isOpen={showModal}
        setIsOpen={setShowModal}
      >
        <div className="flex items-center justify-center flex-col gap-y-10 py-5">
          <Select value={selectedAge} onValueChange={(v) => setSelectedAge(v)}>
            <SelectTrigger className="w-[400px]">
              <SelectValue placeholder="Age Restriction" />
            </SelectTrigger>
            <SelectContent className={`bg-[#181818] text-white`}>
              <SelectItem value="0" className={`cursor-pointer`}>
                Below 16
              </SelectItem>
              <SelectItem value="1" className={`cursor-pointer`}>
                16 plus
              </SelectItem>
            </SelectContent>
          </Select>

          <Button
            className={`w-[400px] py-5`}
            size={"lg"}
            onClick={handleClick}
            disabled={isPending}
          >
            {isPending && <Spinner />}
            Save
          </Button>
        </div>
      </AccountDialogLayout>
      <span className="font-light text-sm max-[375px]:text-[13px] leading-5 opacity-70 text-white">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima nam
        corrupti,
      </span>
    </div>
  );
};

export default AgeRestriction;
