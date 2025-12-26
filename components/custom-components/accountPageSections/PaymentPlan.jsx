"use client";

import Image from "next/image";
import visaIcon from "@/public/Account-Page/Payment Icons.svg";
import AccountDialogLayout from "@/components/layout/AccountDialogLayout";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import useUIContext from "@/contexts/UIContext";
import UpdatePaymentCard from "@/components/mini-components/payment-plan-comps/UpdatePaymentCard";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";

const PaymentPlan = () => {
  const router = useRouter();
  const { setActiveCreditCard, activeCreditCard, setUserData } = useUIContext();
  const [selectedCardSlug, setSelectedCardSlug] = useState("");

  const { data, isLoading } = useFetch({
    query_key: ["card_list"],
    query_url: "/gateway/card",
  });

  useEffect(() => {
    if (!isLoading) {
      setActiveCreditCard(data[0].last_4_digit);
      setSelectedCardSlug(data[0].slug);
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-3 scroll-mt-[850px]">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          {isLoading ? (
            <>
              <Skeleton className={`h-[15px] w-[150px]`} />
            </>
          ) : (
            <>
              <Image
                src={visaIcon}
                className="size-[25px]"
                width={"auto"}
                height={"auto"}
                alt="visa-icon"
              />
              <span className="font-medium text-[15px] opacity-70">
                **** **** **** {activeCreditCard}
              </span>
            </>
          )}
        </div>
        <UpdatePaymentCard
          selectedCardSlug={selectedCardSlug}
          activeCreditCard={activeCreditCard}
          expMonth={isLoading ? "00" : data ? `0${data[0]?.exp_month}` : "00"}
          expYear={isLoading ? "00" : data ? data[0]?.exp_year : "00"}
          holderName={isLoading ? "Name" : data ? data[0]?.name : "User"}
        />
      </div>
      <DropdownMenuSeparator className={`!opacity-30 text-white`} />
      <div className="">
        <AccountDialogLayout
          title={`Manage Payment Method`}
          isModifiedBtn
          arrowShow={false}
          btnText={`Change Payment Method`}
        >
          <div className="flex flex-col gap-6 w-full pb-5 pt-2">
            {isLoading ? (
              <>
                {[1, 2, 3].map((_, i) => (
                  <Skeleton
                    className={`py-4 px-5 w-full rounded-3xl`}
                    key={i}
                  />
                ))}
              </>
            ) : (
              <>
                {data?.length < 1 ? (
                  <h2 className="text-3xl font-bold opacity-70 text-center">
                    No payment method provided
                  </h2>
                ) : (
                  <div className="flex flex-col gap-6">
                    {data?.map((card, i) => (
                      <div
                        className="bg-[#1F1F1F] py-4 px-5 rounded-[22px] w-full"
                        key={i}
                      >
                        <label
                          htmlFor={`selected-card-${i}`}
                          className="flex items-center gap-4 cursor-pointer w-full"
                        >
                          <input
                            type="radio"
                            className="size-4 outline-none"
                            name="payment-cards"
                            onChange={() => setSelectedCardSlug(card.slug)}
                            defaultChecked={Number(card.is_default) === 1}
                            id={`selected-card-${i}`}
                          />
                          <Image src={visaIcon} alt="visa-icon" sizes="34px" />
                          <span className="font-medium text-base opacity-60">
                            **** **** **** {card.last_4_digit}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </AccountDialogLayout>
      </div>
    </div>
  );
};

export default PaymentPlan;
