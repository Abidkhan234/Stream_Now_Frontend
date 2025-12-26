"use client";

import PaymentHistoryList from "@/components/mini-components/payment-plan-comps/PaymentHistoryList";
import useUIContext from "@/contexts/UIContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import visaIcon from "@/public/Account-Page/Payment Icons.svg";
import AccountDialogLayout from "@/components/layout/AccountDialogLayout";

import { Skeleton } from "@/components/ui/skeleton";
import formatDateRange from "@/helpers/generateTime";
import useFetch from "@/hooks/useFetch";

const ActiveSubscription = () => {
  const { activeCreditCard, userData, setIsCanceled, isCanceled } =
    useUIContext();

  const [updateData, setUpdateData] = useState(null);

  const { data, isLoading } = useFetch({
    query_key: ["active_subscription"],
    query_url: "/inn-app-purchase/user-subscription?type=subscription",
  });

  useEffect(() => {
    if (!isLoading) {
      const { subscription_id } = userData;

      const subscribeData = data?.find(
        (v) => v?.subscription_id == subscription_id
      );
      setIsCanceled(subscribeData?.is_cancelled);

      setUpdateData(subscribeData || null);
    }
  }, [data]);

  return (
    <div className="flex justify-between items-center">
      {isLoading ? (
        <div className="flex flex-col gap-3">
          <Skeleton className={`h-[14px] sm:w-[200px] w-[125px]`} />
          <Skeleton className={`h-[14px] sm:w-[150px] w-[105px]`} />
          <div className="flex items-center gap-1">
            <Skeleton className={`h-[13px] sm:w-[140px] w-[90px]`} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:gap-1 gap-1.5">
          <h3 className="sm:text-2xl text-xl font-semibold capitalize">
            {updateData?.app_package_id
              ? updateData.app_package_id
              : "Not subscribe"}
          </h3>
          {updateData && (
            <p className="sm:text-sm text-[13px] opacity-70">
              {isCanceled ? (
                <span className="text-base font-semibold">
                  Membership canceled on: {formatDateRange(isCanceled)}
                </span>
              ) : (
                ` Next payment ${formatDateRange(
                  updateData?.package_expiry_date
                )} `
              )}
            </p>
          )}
          <div className="flex items-center flex-row gap-1">
            <Image
              src={visaIcon}
              className="object-cover"
              width={25}
              height={25}
              alt="visa-icon"
            />
            <span className="font-medium min-[375px]:text-sm text-xs opacity-70">
              **** **** **** {activeCreditCard}
            </span>
          </div>
        </div>
      )}
      <div className="">
        <AccountDialogLayout
          title={`Payment History`}
          btnText={`View Payment History`}
          btnClass={`opacity-60 font-normal`}
          isModifiedBtn={false}
        >
          <PaymentHistoryList data={data} isLoading={isLoading} />
        </AccountDialogLayout>
      </div>
    </div>
  );
};

export default ActiveSubscription;
