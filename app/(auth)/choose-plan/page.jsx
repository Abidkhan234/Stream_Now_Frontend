"use client";

import CustomAuthForm from "@/components/Form/CustomAuthForm"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton";
import useUIContext from "@/contexts/UIContext";
import localHelper from "@/helpers/localStorage";
import useFetch from "@/hooks/useFetch";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const { selectedSubscription, setSelectedSubscription } = useUIContext();

  const { data, isLoading } = useFetch({
    query_key: ["subscription_card"],
    query_url: "/stripe-product"
  })


  const handleClick = async () => {
    if (!selectedSubscription?.id) {
      return toast.error("Select a plan first");
    }
    await localHelper.setItem("subscribeCard", { id: selectedSubscription.id, price: selectedSubscription.price, planName: selectedSubscription.planName, duration: selectedSubscription.duration });
    setSelectedSubscription({ id: selectedSubscription.id, price: selectedSubscription.price, planName: selectedSubscription.planName, duration: selectedSubscription.duration });
    router.replace("/credit");
  }

  return (
    <CustomAuthForm
      title={`Choose the plan that’s right for you`}
      className={`sm:py-10 py-5 gap-5 sm:px-10 px-8`}
      titleClasses={`min-[376px]:text-3xl text-2xl`}
      step={2}
    >
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <div className="grid sm:grid-cols-3 grid-cols-2 gap-4">
            <Skeleton className={`h-[250px]`} />
            <Skeleton className={`h-[250px]`} />
            <Skeleton className={`h-[250px]`} />
          </div>
        ) : (
          <div className="grid sm:grid-cols-3 grid-cols-2 gap-4">
            {data.map((v, i) => {
              return (
                <div
                  className={`flex flex-col justify-between items-start sm:h-[250px] h-[200px] bg-transparent border backdrop-blur-[20px] text-white rounded-xl py-4 px-2  cursor-pointer ${
                    selectedSubscription.id == v.prices[0].id
                      ? "border-[#C40000]"
                      : "border-[#313131]"
                  }`}
                  key={i}
                  onClick={() =>
                    setSelectedSubscription({
                      id: v.prices[0].id,
                      planName: v.product.name,
                      price: v.prices[0].unit_amount_decimal,
                      duration: v.prices[0].recurring.interval,
                    })
                  }
                >
                  <div className="flex flex-col gap-1">
                    <h1 className={`font-bold min-[375px]:text-3xl text-2xl`}>
                      {v.product.name}
                    </h1>
                    <h3 className="font-medium min-[375px]:text-xl text-lg">
                      {v.prices[0].recurring.interval}ly
                    </h3>
                    {v.prices[0].recurring.interval == "year" && (
                      <div className="bg-[#C40000] rounded-xl py-1 px-2 text-white min-[375px]:text-sm text-xs w-fit">
                        Most Popular
                      </div>
                    )}
                  </div>
                  <div className="">
                    <span className={`font-medium text-2xl`}>
                      ${Number(v.prices[0].unit_amount_decimal)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <Button
          type={"submit"}
          className={`py-6 w-full mt-3 rounded-[18px]!`}
          onClick={() => handleClick()}
        >
          Next
        </Button>
      </div>
    </CustomAuthForm>
  );
}

export default page