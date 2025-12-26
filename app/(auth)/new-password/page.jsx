"use client";

import CustomAuthForm from "@/components/Form/CustomAuthForm";
import InputPassword from "@/components/inputs/InputPassword";
import StrengthBar from "@/components/inputs/StrengthBar";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import localHelper from "@/helpers/localStorage";
import useCustomMutation from "@/hooks/useCustomMutation";
import { newPassSchema } from "@/schema/Schema";
import ProtectedWrapper from "@/wrappers/ProtectedWrapper";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const page = () => {
  const router = useRouter();

  const { mutate, isPending } = useCustomMutation({
    query_name: ["new_password_mutation"],
    query_url: "/user/update-password",
  });

  const submitHandler = async (values, { resetForm }) => {
    const email = await localHelper.getItem("email");

    const payload = {
      email: email,
      ...values,
    };

    mutate(
      { payload },
      {
        onSuccess: async ({ data, message }) => {
          toast.success(message);
          localStorage.removeItem("email");
          router.replace("/login");
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
    <ProtectedWrapper lookingFor={"email"} prevRoute={"forget-password"}>
      <CustomAuthForm
        title={`Set New Password`}
        subTitle="Please enter your registered email to reset your password."
        className={`sm:py-10 py-5 sm:px-10 px-8`}
        titleClasses={`text-2xl`}
        subTitleClasses={`mt-0`}
      >
        <Formik
          onSubmit={submitHandler}
          initialValues={{ new_password: "", confirm_password: "" }}
          validationSchema={newPassSchema}
        >
          <Form className="flex flex-col gap-6 mt-2">
            <div className="grow">
              <InputPassword
                noError={true}
                placeholder={`Password`}
                name={`new_password`}
              />
            </div>

            <div className="">
              <InputPassword
                placeholder={`Confirm Password`}
                name={`confirm_password`}
              />
            </div>

            <StrengthBar fieldName="new_password" />

            <div className="">
              <Button
                disabled={isPending}
                type="submit"
                size="block"
                className="min-[425px]:py-4 py-3 disabled:opacity-80 disabled:pointer-events-none rounded-[18px]!"
              >
                {isPending && <Spinner />}
                Change Password
              </Button>
            </div>
          </Form>
        </Formik>
      </CustomAuthForm>
    </ProtectedWrapper>
  );
};

export default page;
