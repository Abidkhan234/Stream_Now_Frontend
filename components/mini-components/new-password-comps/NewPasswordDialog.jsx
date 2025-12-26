import InputPassword from "@/components/inputs/InputPassword";
import AccountDialogLayout from "@/components/layout/AccountDialogLayout";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import useCustomMutation from "@/hooks/useCustomMutation";
import { changePassSchema } from "@/schema/Schema";
import { Form, Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";

const initialValues = {
  new_password: "",
  confirm_password: "",
  current_password: "",
};

const NewPasswordDailog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending } = useCustomMutation({
    query_name: ["newPassword_mutation"],
    query_url: "/user/change-password",
  });

  const submitHandler = (values, { resetForm }) => {
    mutate(
      { payload: { ...values } },
      {
        onSuccess: ({ data, message }) => {
          toast.success(message);
          setIsOpen(false);
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
    <AccountDialogLayout
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={`Change Password`}
      isModifiedBtn
      btnText={`Change Password`}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={changePassSchema}
      >
        <Form className="flex flex-col gap-6 w-full pb-4">
          <div className="flex flex-col gap-2 w-full">
            <>
              <div className="flex flex-col gap-1 ms-1 mt-3">
                <h3 className="font-medium text-xl">Old Password</h3>
                <span className="text-sm text-white opacity-60">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </span>
              </div>
              <InputPassword
                name={`current_password`}
                placeholder={`Enter Old Passowrd`}
              />
            </>
            <>
              <div className="flex flex-col gap-1 ms-1 mt-4">
                <h3 className="font-medium text-xl">New Password</h3>
                <span className="text-sm text-white opacity-60">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </span>
              </div>
              <InputPassword
                name={`new_password`}
                placeholder={`Enter New Passowrd`}
              />
            </>
            <div className="mt-5">
              <InputPassword
                name={`confirm_password`}
                placeholder={`Confirm Passowrd`}
              />
            </div>
            <Button
              disabled={isPending}
              type={"submit"}
              className={`!py-6 disabled:opacity-80 disabled:pointer-events-none mt-5`}
            >
              {isPending && <Spinner />}
              Save Changes
            </Button>
          </div>
        </Form>
      </Formik>
    </AccountDialogLayout>
  );
};

export default NewPasswordDailog;
