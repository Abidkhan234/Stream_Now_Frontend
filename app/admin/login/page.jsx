"use client";

import Image from "next/image";

import { useRouter } from "next/navigation";

import bgImage from "@/public/Auth-Page-Image/Group 1321314770.png";

import CustomAuthForm from "@/components/Form/CustomAuthForm";
import Input from "@/components/inputs/Input";
import InputPassword from "@/components/inputs/InputPassword";

import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

import { loginSchema } from "@/schema/Schema";

import { Form, Formik } from "formik";

import useAdminContext from "@/contexts/adminContext";
import localHelper from "@/helpers/localStorage";
import useCustomMutation from "@/hooks/useCustomMutation";

import toast from "react-hot-toast";

const initialValues = {
  email: "",
  password: "",
};

const AdminLoginPage = () => {
  const router = useRouter();

  const { setAdminData } = useAdminContext();

  const { mutate, isPending } = useCustomMutation({
    query_name: ["admin_login_mutation"],
    query_url: "/user/login",
  });

  const submitHandler = async (values, { resetForm }) => {
    const payload = {
      ...values,
      device_type: "web",
      device_token: "w324324324",
    };

    mutate(
      {
        payload,
      },
      {
        onSuccess: async ({ data, message }) => {
          await localHelper.setItem("adminData", data);
          document.cookie =
            "adminData=" +
            encodeURIComponent(
              JSON.stringify({
                data,
              })
            ) +
            "; path=/; samesite=strict";

          toast.success(message);
          router.replace("/admin/dashboard");
          setAdminData(data);

          resetForm();
        },
        onError: async (error) => {
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
    <div className="min-h-screen w-full flex items-center justify-center relative">
      <Image
        src={bgImage}
        alt="background-image"
        className="object-cover"
        fill
        sizes="100%"
        priority
      />
      <CustomAuthForm
        title={"Sign In"}
        className={`py-8 sm:!px-5 px-3 sm:max-w-[600px] gap-5 w-full`}
        titleClasses={`min-[425px]:text-5xl text-4xl`}
        showBackButton={false}
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
          </Form>
        </Formik>
      </CustomAuthForm>
    </div>
  );
};

export default AdminLoginPage;
