"use client";

import CustomAuthForm from "@/components/Form/CustomAuthForm";
import Input from "@/components/inputs/Input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import localHelper from "@/helpers/localStorage";
import useCustomMutation from "@/hooks/useCustomMutation";
import { forgetPasswordSchema } from "@/schema/Schema";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const page = () => {
  const router = useRouter();

  const { mutate, isPending } = useCustomMutation({
    query_name: ["forget_password_mutation"],
    query_url: "/user/forgot-password",
  });

  const submitHandler = async (values, { resetForm }) => {
    const { email } = values;

    mutate(
      { payload: { email } },
      {
        onSuccess: async ({ data, message }) => {
          toast.success(message);
          await localHelper.setItem("email", email);
          router.replace("/otp-verify");
          resetForm();
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
    <CustomAuthForm
      title={`Forgot Password`}
      subTitle="Please enter your registered email to reset your password."
      className={`sm:max-w-[584px] sm:py-7 py-5 max-[426px]:px-5 sm:px-8 px-6`}
      subTitleClasses={`text-base max-[375px]:mt-0 max-[375px]:text-sm`}
    >
      <Formik
        initialValues={{ email: "" }}
        validationSchema={forgetPasswordSchema}
        onSubmit={submitHandler}
      >
        <Form className="flex flex-col min-[425px]:gap-7 gap-5 mt-2">
          <div className="grow">
            <Input
              name={`email`}
              placeholder={`Email Address`}
              type={"email"}
            />
          </div>
          <div className="">
            <Button
              disabled={isPending}
              type="submit"
              size="block"
              className="min-[425px]:py-4 py-3 disabled:opacity-80 disabled:pointer-events-none rounded-[18px]!"
            >
              {isPending && <Spinner />}
              Request Code
            </Button>
          </div>
        </Form>
      </Formik>
    </CustomAuthForm>
  );
};

export default page;
