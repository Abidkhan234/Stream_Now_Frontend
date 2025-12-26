"use client";

import AdminInput from "@/components/admin/components/inputs/admin-input";
import SuccessDialog from "@/components/admin/layout/success-dialog";
import UploadLayout from "@/components/admin/layout/upload-layout";
import CustomAlertDialog from "@/components/layout/customAlertDialog";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import useCustomMutation from "@/hooks/useCustomMutation";

import { addGenreSchema } from "@/schema/Schema";
import { useQueryClient } from "@tanstack/react-query";

import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const initialValues = {
  name: "",
};

const AddGenrePage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const { mutate, isPending } = useCustomMutation({
    query_name: ["create_category_mutation"],
    query_url: "/categories",
    isAdmin: true,
  });

  const handleSubmit = (values, { resetForm }) => {
    const payload = { ...values, status: 1 };

    mutate(
      {
        payload,
        isAdmin: true,
      },
      {
        onSuccess: async ({ data, message }) => {
          toast.success(message);
          queryClient.refetchQueries({
            queryKey: ["admin_category_fetch"],
          });
          router.replace("/admin/genre-category");
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

  const handleClick = () => {
    setShowDiscardModal(false);
    router.back();
  };

  return (
    <>
      <div className="h-full w-full flex items-center justify-center">
        <UploadLayout
          cardClass={`max-w-[800px] gap-y-5`}
          title={`Add Genre`}
          subTitle={`Lorem Ipsum is simply dummy text of the printing and typesetting industry.`}
          showModal={showDiscardModal}
          setShowModal={setShowDiscardModal}
        >
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={addGenreSchema}
          >
            <Form className="flex flex-col gap-4">
              <>
                <AdminInput
                  name="name"
                  labelText="Add genre"
                  placeholder="Enter Genre"
                  totalLengthShow={false}
                  maxLength={30}
                />
              </>
              <Button
                className={`py-4 rounded-[18px]`}
                size={"block"}
                type={"submit"}
                disabled={isPending}
              >
                {isPending && <Spinner />}
                Add Genre
              </Button>
            </Form>
          </Formik>
        </UploadLayout>
      </div>
      <CustomAlertDialog
        isOpen={showDiscardModal}
        isNoting
        setIsOpen={setShowDiscardModal}
        title="Are you sure you want to discard changes?"
        subTitle="By doing this your movie data will be lost"
        titleClass={"min-[376px]:text-2xl text-lg"}
        handleFn={handleClick}
      />
      <SuccessDialog
        isOpen={showModal}
        setIsOpen={setShowModal}
        title="Successfully added genre"
        subTitle="Your genre is add now!"
        showImage={false}
        backTo={``}
      />
    </>
  );
};

export default AddGenrePage;
