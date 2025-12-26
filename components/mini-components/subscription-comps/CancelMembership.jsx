"use client";

import userIcon from "@/public/Account-Page/User Cross Rounded.svg";
import useUIContext from "@/contexts/UIContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleSubscriptionCancel } from "@/apis/subscription/subscription_api";
import toast from "react-hot-toast";
import localHelper from "@/helpers/localStorage";
import CustomAlertDialog from "@/components/layout/customAlertDialog";
import { useState } from "react";
import useCustomMutation from "@/hooks/useCustomMutation";

const CancelMembership = ({ setParentOpen }) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const { userData, setUserData } = useUIContext();

  const { mutate, isPending } = useCustomMutation({
    query_name: ["subscription_cancel_mutation"],
    query_url: "/payout/subscribe/cancell",
  });

  const handleClick = async () => {
    mutate(
      { payload: { subscription_id: userData.subscription_id } },
      {
        onSuccess: async ({ data, message }) => {
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
          toast.success(message);
          setIsOpen(false);
          setParentOpen(false);
          queryClient.invalidateQueries({ queryKey: ["active_subscription"] });
        },
        onError: (error) => {
          setIsOpen(false);
          setParentOpen(false);
          if (typeof error?.message === "string") {
            if (error.message.includes("No such subscription:")) {
              toast.error(error.message);
              return;
            }

            toast.error(error.message);
            return;
          }

          Object.entries(error?.message).forEach(([key, message]) => {
            if (message.includes("No such subscription:")) {
              toast.error("Subscription already canceled");
              return;
            }
            toast.error(`${message}`);
          });
        },
      }
    );
  };

  return (
    <>
      <CustomAlertDialog
        title={`Cancel Membership`}
        icon={userIcon}
        subTitle={`Are you sure you want to cancel your membership?`}
        isModifiedBtn={false}
        btnText={`Cancel Membership`}
        isPending={isPending}
        handleFn={handleClick}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className={`max-w-[480px] py-5`}
      />
    </>
  );
};

export default CancelMembership;
