"use client";

import CustomAuthForm from "@/components/Form/CustomAuthForm";
import InputPassword from "@/components/inputs/InputPassword";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import useUIContext from "@/contexts/UIContext";
import localHelper from "@/helpers/localStorage";
import useCustomMutation from "@/hooks/useCustomMutation";
import { createPassSchema } from "@/schema/Schema";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const { setUserData, setSelectedSubscription } = useUIContext();

  const { mutate, isPending } = useCustomMutation({
    query_name: ["register_mutation"],
    query_url: "/user",
  });

  const submitHandler = async (values, { resetForm }) => {
    const email = await localHelper.getItem("email");

    const payload = {
      email: email,
      password: values.password,
      confirm_password: values.confirm_password,
      device_type: "web",
      device_token: "w324324324",
    };

    mutate(
      {
        payload,
        isFormData: false,
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
          await localHelper.setItem("rememberMe", null);
          localStorage.removeItem("subscribeCard");
          localStorage.removeItem("email");
          toast.success(message);
          setUserData(data);
          router.replace("/plan-details");
          setSelectedSubscription({});
          resetForm();
        },
        onError: (error) => {
          if (error.statusCode === 400) {
            localStorage.removeItem("email");
            router.replace("/");
          }

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
    <div className="min-[425px]:px-10 px-5 w-full max-w-[700px]">
      <CustomAuthForm
        title={`Set Your Password`}
        isLoading={isPending}
        step={1}
      >
        <Formik
          initialValues={{ password: "", confirm_password: "" }}
          onSubmit={submitHandler}
          validationSchema={createPassSchema}
        >
          <Form className="py-2 flex flex-col min-[425px]:gap-7 gap-10 rounded-2xl">
            <div className="">
              <InputPassword
                name={`password`}
                placeholder={`Set New Password`}
              />
            </div>
            <div className="">
              <InputPassword
                name={`confirm_password`}
                placeholder={`Confirm Password`}
              />
            </div>
            <>
              <Button
                disabled={isPending}
                type={"submit"}
                className={`sm:py-6 py-5 text-lg disabled:opacity-70 disabled:pointer-events-none mt-2 rounded-[18px]!`}
                name={"name"}
              >
                {isPending && <Spinner className={``} />}
                Next
              </Button>
            </>
          </Form>
        </Formik>
      </CustomAuthForm>
    </div>
  );
};

export default page;
