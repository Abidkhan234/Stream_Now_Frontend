"use client";

import Input from "@/components/inputs/Input";
import { Button } from "@/components/ui/button";
import localHelper from "@/helpers/localStorage";
import { entryPageSchema } from "@/schema/Schema";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";

const EntryPageEmail = () => {
  const router = useRouter();

  const submitHandler = async (values, { resetForm }) => {
    const { email } = values;
    await localHelper.setItem("email", email);
    router.push(`/password`);
    resetForm();
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={submitHandler}
      validationSchema={entryPageSchema}
    >
      <Form className="w-full md:max-w-[700px] min-[425px]:max-w-[600px] mt-4">
        <div className="flex justify-between items-center p-2 backdrop-blur-[8px] bg-transparent border border-[#313131] rounded-2xl w-full">
          <div className="grow">
            <Input
              name={`email`}
              placeholder={`Email Address`}
              type={`email`}
              noBorder={false}
            />
          </div>

          <div className="h-full">
            <Button type="submit" className="md:py-5.5 py-5 rounded-[18px]! sm:px-8 px-4">
              Get Started
            </Button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default EntryPageEmail;
