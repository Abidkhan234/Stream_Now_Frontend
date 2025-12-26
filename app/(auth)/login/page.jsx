"use client";

import CustomAuthForm from "@/components/Form/CustomAuthForm";
import CheckBox from "@/components/inputs/CheckBox";
import Input from "@/components/inputs/Input";
import InputPassword from "@/components/inputs/InputPassword";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import useUIContext from "@/contexts/UIContext";
import localHelper from "@/helpers/localStorage";
import useCustomMutation from "@/hooks/useCustomMutation";
import { loginSchema } from "@/schema/Schema";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const { setUserData } = useUIContext();

  const { mutate, isPending } = useCustomMutation({
    query_name: ["login_mutation"],
    query_url: "/user/login",
  });

  const submitHandler = async (values, { resetForm }) => {
    const { rememberMe } = values;

    const payload = {
      email: values.email,
      password: values.password,
      device_type: "web",
      device_token: "w324324324",
    };

    mutate(
      { payload },
      {
        onSuccess: async ({ data, message }) => {
          if (rememberMe) {
            await localHelper.setItem("rememberMe", {
              email: values.email,
              password: values.password,
              rememberMe: rememberMe,
            });
          }

          await localHelper.setItem("userData", data);
          document.cookie =
            "userData=" +
            encodeURIComponent(
              JSON.stringify({
                subscription_id: data.subscription_id,
              })
            ) +
            "; path=/; samesite=strict";
          await localHelper.setItem("rememberMe", {
            email: values.email,
            password: values.password,
            rememberMe: rememberMe,
          });
          setInitialValues({
            email: values.email,
            password: values.password,
            rememberMe: rememberMe,
          });

          setUserData(data);
          toast.success(message);
          router.replace("/home");
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

  useEffect(() => {
    const getValues = async () => {
      const values = await localHelper.getItem("rememberMe");

      if (!values?.rememberMe) {
        setInitialValues({
          email: "",
          password: "",
          rememberMe: false,
        });
        return;
      }

      setInitialValues(values);
    };
    getValues();
  }, []);

  return (
    <CustomAuthForm
      title={"Sign In"}
      className={`sm:py-10 py-5 sm:!px-5 px-3 sm:max-w-[584px] gap-5`}
      titleClasses={`min-[425px]:text-5xl text-4xl`}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={submitHandler}
        enableReinitialize={true}
      >
        <Form className="py-2 flex flex-col gap-7">
          <>
            <Input
              name={`email`}
              placeholder={`Email Address`}
              type={"email"}
            />
          </>
          <>
            <InputPassword name={`password`} placeholder={`Password`} />
          </>

          <Button
            disabled={isPending}
            type="submit"
            className="min-[425px]:py-6 py-5 rounded-[18px]! text-lg font-semibold disabled:opacity-70 disabled:pointer-events-none mt-1 "
          >
            {isPending && <Spinner />}
            Sign In
          </Button>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <CheckBox name={"rememberMe"} />
            </div>
            <Link
              className="font-medium min-[425px]:text-base text-sm cursor-pointer text-white"
              href={`/forget-password`}
            >
              Forget Password
            </Link>
          </div>

          <div className="border-t border-t-[#919090] pt-3 flex flex-col gap-2 text-white">
            <h2 className="font-semibold text-lg">
              New to inevia? Sign up now
            </h2>
            <p className="font-medium text-sm">
              This page is protected by Google reCAPTCHA to ensure you’re not a
              bot.
              <span className="underline font-semibold cursor-pointer text-[#5B8FFF] ms-1">
                Learn more
              </span>
            </p>
          </div>
        </Form>
      </Formik>
    </CustomAuthForm>
  );
};

export default page;
