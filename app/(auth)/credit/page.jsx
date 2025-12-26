"use client";

import CustomAuthForm from "@/components/Form/CustomAuthForm";
import Input from "@/components/inputs/Input";
import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { icons } from "@/constant/data";
import useUIContext from "@/contexts/UIContext";
import localHelper from "@/helpers/localStorage";
import useCustomMutation from "@/hooks/useCustomMutation";
import { addCardSchema } from "@/schema/Schema";
import ProtectedWrapper from "@/wrappers/ProtectedWrapper";
import { Form, Formik } from "formik";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const { selectedSubscription, setUserData, setSelectedSubscription } =
    useUIContext();

  const { mutate, isPending } = useCustomMutation({
    query_name: ["subscription_mutation"],
    query_url: "/payout/subscribe",
  });

  const submitHandler = async (values, { resetForm }) => {
    if (!selectedSubscription?.id) {
      toast.error("Select plan first");
      return router.replace("/choose-plan");
    }

    mutate(
      {
        payload: {
          values,
          plan_id: selectedSubscription.id,
          plan_name: selectedSubscription.planName,
        },
        isCreditCard: true,
      },
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
          localStorage.removeItem("subscribeCard");
          setUserData(data);
          toast.success(message);
          router.replace("/home");
          setSelectedSubscription({});
          resetForm();
        },
        onError: (error) => {
          if (typeof error?.message === "string") {
            toast.error(error.message);

            if (error?.statusCode === 401) {
              router.replace("/");
            }

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
    <ProtectedWrapper prevRoute={`choose-plan`} lookingFor={`subscribeCard`}>
      <CustomAuthForm
        title={`Set up your credit or Debit card`}
        step={3}
        className={`sm:max-w-[830px] sm:py-10 py-5`}
        showBackButton={false}
      >
        <Formik
          initialValues={{
            card_number: "",
            card_year: "",
            card_month: "",
            card_cvc: "",
            name: "",
          }}
          validationSchema={addCardSchema}
          onSubmit={submitHandler}
        >
          <Form className="flex flex-col gap-7">
            <div className="flex items-center gap-4">
              {icons.map((v, i) => (
                <Image
                  src={v}
                  width={"auto"}
                  height={"auto"}
                  className="size-[30px]"
                  alt="paymnentIcon"
                  key={i}
                />
              ))}
            </div>
            <div className="w-full">
              <Input
                name={"card_number"}
                placeholder={`Card Number`}
                maxLength={16}
              />
            </div>
            <div className="w-full flex items-center gap-2 gap-y-7 sm:flex-nowrap flex-wrap">
              <div className="md:w-[30%] w-full">
                <Input
                  name={"card_month"}
                  placeholder={`Expiry Month eg(01-12)`}
                  maxLength={2}
                  minLength={1}
                />
              </div>
              <div className="md:w-[30%] w-full">
                <Input
                  name={"card_year"}
                  placeholder={`Expiry Year`}
                  maxLength={4}
                />
              </div>
              <div className="md:w-[40%] w-full">
                <Input name={"card_cvc"} placeholder={`CVV`} maxLength={3} />
              </div>
            </div>
            <div className="w-full">
              <Input name={"name"} placeholder={`Name on Card`} />
            </div>

            <DropdownMenuSeparator className={`!opacity-10 text-white`} />

            <div className="w-full flex gap-4 sm:flex-row flex-col">
              <div className="flex justify-between items-center md:w-[50%] w-full bg-transparent border border-[#313131] px-3 py-2 rounded-3xl">
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-sm">
                    ${selectedSubscription?.price} /
                    {selectedSubscription?.duration}
                  </p>
                  <span className="text-sm">
                    {selectedSubscription?.planName}
                  </span>
                </div>
                <div className="">
                  <Link
                    className="text-sm cursor-pointer text-[#FFD400]"
                    href={`/choose-plan`}
                  >
                    Change
                  </Link>
                </div>
              </div>
              <div className="md:w-[50%] w-full">
                <Button
                  type={"submit"}
                  disabled={isPending}
                  className={`w-full h-full text-lg py-5 disabled:opacity-80 disabled:pointer-events-none rounded-[18px]!`}
                >
                  {isPending && <Spinner />}
                  Start Membership
                </Button>
              </div>
            </div>
          </Form>
        </Formik>
      </CustomAuthForm>
    </ProtectedWrapper>
  );
};

export default page;
