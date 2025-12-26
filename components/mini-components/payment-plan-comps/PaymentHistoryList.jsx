"use client";

import formatDateRange from "@/helpers/generateTime";
import { Skeleton } from "../../ui/skeleton";
import Image from "next/image";
import visaIcon from "@/public/Account-Page/Payment Icons.svg";

const PaymentHistoryList = ({ data, isLoading }) => {
  return (
    <div className="flex flex-col gap-4 w-full h-[390px] overflow-y-auto">
      {isLoading ? (
        <>
          {[1, 2, 3, 4, 5].map((_, i) => (
            <Skeleton className="rounded-2xl py-6" key={i} />
          ))}
        </>
      ) : (
        <>
          {!data ? (
            <h2 className="text-3xl font-bold opacity-70 text-center">
              No payment history found
            </h2>
          ) : (
            <>
              {data?.map((v, i) => (
                <div
                  className="flex flex-col gap-1.5 bg-[#1F1F1F] rounded-[30px] py-4 px-6"
                  key={i}
                >
                  <h4 className="font-bold text-xl">$ {v.price}</h4>
                  <span className="font-medium text-base opacity-70">
                    Membership for {formatDateRange(v?.package_date)} -{" "}
                    {formatDateRange(v?.package_expiry_date)}
                  </span>
                  <div className="flex items-center gap-2">
                    <Image src={visaIcon} alt="visaIcon" sizes="34px" />
                    <span className="font-medium text-base">
                      **** **** **** 5214
                    </span>
                  </div>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PaymentHistoryList;
