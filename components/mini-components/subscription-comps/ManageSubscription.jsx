"use client";

import CancelMembership from "./CancelMembership";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handlePlanChange } from "@/apis/subscription/subscription_api";
import { useEffect, useState } from "react";
import useUIContext from "@/contexts/UIContext";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";
import localHelper from "@/helpers/localStorage";
import { Spinner } from "@/components/ui/spinner";
import AccountDialogLayout from "@/components/layout/AccountDialogLayout";
import formatDateRange from "@/helpers/generateTime";
import useFetch from "@/hooks/useFetch";
import useCustomMutation from "@/hooks/useCustomMutation";

const ManageSubscription = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const { userData, isCanceled } = useUIContext();
  const [subscribeData, setSubscribeData] = useState(null);
  const [selectedSubscription, setSelectedSubscription] = useState({
    plan_id: "",
    product_id: "",
    name: "",
  });

  const { data: subscriptionData, isLoading } = useFetch({
    query_key: ["subscription_card"],
    query_url: "/stripe-product",
  });

  const { mutate, isPending } = useCustomMutation({
    query_name: ["change_plan_mutation"],
    query_url: "/payout/subscribe/upgrade",
  });

  const handleChangePlan = () => {
    mutate(
      { payload: { ...selectedSubscription } },
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
          queryClient.invalidateQueries({ queryKey: ["subscription_card"] });
          toast.success(message);
          setIsOpen(false);
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

  useEffect(() => {
    if (subscriptionData) {
      const activeData = subscriptionData?.find(
        (v) => v?.product?.id == userData?.app_package_id
      );
      setSubscribeData(activeData || null);
    }
  }, [subscriptionData]);

  return (
    <AccountDialogLayout
      title={`Subscriptions`}
      btnText={`Manage Subscription`}
      setIsOpen={setIsOpen}
      isOpen={isOpen}
    >
      <div className="flex flex-col gap-5 w-full pb-4 pt-2">
        {isLoading ? (
          <div className="w-full">
            <Skeleton className={`py-5 rounded-xl`} />
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            <div className="bg-[#1F1F1F] py-2 min-[376px]:px-3 px-2 flex items-center gap-2 justify-between rounded-2xl border border-[#ffffff42]">
              <div className="flex items-end min-[376px]:gap-2 gap-1">
                <h5 className="font-medium min-[376px]:text-2xl text-xl">
                  {subscribeData?.product?.name}
                </h5>
                <span className="min-[376px]:text-sm text-xs text-[#C40000] font-medium capitalize">
                  {subscribeData?.prices[0]?.recurring?.interval + "ly"}
                </span>
              </div>
              <div className="border flex items-center min-[376px]:gap-2 gap-1 rounded-2xl min-[376px]:p-3 p-1 py-2 shrink-0">
                <span className="min-[376px]:text-sm text-xs">
                  Current Subscriptions
                </span>
              </div>
            </div>
            {isCanceled && (
              <span className="text-[#C40000] text-sm font-semibold ms-2">
                Membership canceled on: {formatDateRange(isCanceled)}
              </span>
            )}
          </div>
        )}
        <div className="">
          <h4 className="font-medium text-lg">Update Subscription Plan</h4>
        </div>
        {isLoading ? (
          <div className="flex flex-col gap-4">
            {[1, 2].map((_, i) => (
              <Skeleton className="py-5 rounded-xl" key={i} />
            ))}
          </div>
        ) : (
          <>
            {subscriptionData
              ?.filter((v) => v?.product?.id != userData?.app_package_id)
              ?.map((v, i) => (
                <div
                  className="bg-[#1F1F1F] py-4 min-[376px]:px-3 px-2 rounded-2xl border border-[#ffffff42] flex items-center justify-between"
                  key={i}
                >
                  <div className="flex items-center gap-2">
                    <div className="">
                      <input
                        type="radio"
                        name="subscription_plan"
                        id={`selected-plan-${i}`}
                        onChange={() =>
                          setSelectedSubscription({
                            plan_id: v?.prices[0]?.id,
                            product_id: v?.product?.id,
                            name: v?.product?.name,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-end min-[376px]:gap-2 gap-1">
                      <label
                        htmlFor={`selected-plan-${i}`}
                        className="cursor-pointer"
                      >
                        <h5 className="font-medium min-[376px]:text-2xl text-xl">
                          {v?.product?.name || "No Plan"}
                        </h5>
                      </label>
                      <span className="min-[376px]:text-sm text-xs text-[#C40000] font-medium capitalize">
                        {v?.prices[0]?.recurring?.interval + "ly"}
                      </span>
                    </div>
                  </div>
                  <div className="">
                    <h3 className="font-medium text-xl">
                      $ {Number(v?.prices[0]?.unit_amount_decimal).toFixed(2)}
                    </h3>
                  </div>
                </div>
              ))}
          </>
        )}

        <div className="flex flex-col gap-4 mt-2">
          <Button
            className={`!py-4 disabled:pointer-events-none disabled:opacity-80`}
            size={"block"}
            disabled={isPending}
            onClick={() => handleChangePlan()}
          >
            {isPending && <Spinner />}
            Change Plan
          </Button>

          {!isCanceled && (
            <>
              <CancelMembership setParentOpen={setIsOpen} />
            </>
          )}
        </div>
      </div>
    </AccountDialogLayout>
  );
};

export default ManageSubscription;
