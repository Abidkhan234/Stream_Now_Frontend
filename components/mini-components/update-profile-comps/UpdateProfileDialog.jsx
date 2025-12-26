"use memo";

import Input from "@/components/inputs/Input";
import AccountDialogLayout from "@/components/layout/AccountDialogLayout";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import localHelper from "@/helpers/localStorage";
import useCustomMutation from "@/hooks/useCustomMutation";
import { editProfileSchema } from "@/schema/Schema";
import { Form, Formik } from "formik";
import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const UpdateProfileDialog = ({ userData, setUserData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const inputRef = useRef(null);

  const { mutate, isPending } = useCustomMutation({
    query_url: `/user`,
    query_name: ["update_profile_mutation"],
  });

  const submitHandler = async (values, { resetForm }) => {
    const payload = {
      ...values,
      _method: "put",
      age_restriction: 0,
    };

    if (selectedImage) {
      payload.image_url = selectedImage;
    }

    mutate(
      {
        payload,
        isFormData: true,
        slug: userData?.slug,
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
          setUserData(data);
          toast.success(message);
          setIsOpen(false);
        },
        onError: (error) => {
          if (typeof error?.message == "string") {
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

  const handleFileChange = (e) => {
    const file = e.currentTarget.files[0];
    if (!file) return;

    // Update Formik value
    setSelectedImage(file);

    // Create a temporary preview URL
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
  };

  return (
    <AccountDialogLayout
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isModifiedBtn={false}
      btnText={"Edit Profile"}
      title={"Edit Profile"}
      btnClass={`opacity-60 font-normal`}
    >
      <Formik
        initialValues={{
          full_name: userData?.full_name || "User",
          mobile_no: userData?.mobile_no || "",
        }}
        validationSchema={editProfileSchema}
        onSubmit={submitHandler}
      >
        <Form
          encType="multipart/form-data"
          className="py-4 flex flex-col items-center w-full max-w-[420px] gap-5"
        >
          <div className="flex flex-col gap-3 items-center">
            <div className="relative size-[100px]">
              <Image
                fill
                sizes="100%"
                src={preview ? preview : userData?.image_url}
                alt="avatar"
                className="rounded-full object-cover"
              />
            </div>

            <input
              type="file"
              className="hidden"
              name="image_url"
              ref={inputRef}
              onChange={(e) => handleFileChange(e)}
            />
            <Button
              className={`!py-5`}
              type={"button"}
              disabled={isPending}
              onClick={() => inputRef.current.click()}
            >
              Change Photo
            </Button>
          </div>
          <div className="flex flex-col gap-7 w-full">
            <>
              <Input
                name={`full_name`}
                placeholder={`Full Name`}
                maxLength={50}
              />
            </>
            <>
              <Input
                name={`mobile_no`}
                placeholder={"Phone Number"}
                maxLength={10}
              />
            </>
          </div>
          <Button
            type={"submit"}
            disabled={isPending}
            className={`!py-6 w-[280px] disabled:opacity-80 disabled:pointer-events-none z-30 mt-4 rounded-[22px]`}
          >
            {isPending && <Spinner />}
            Save Changes
          </Button>
        </Form>
      </Formik>
    </AccountDialogLayout>
  );
};

export default UpdateProfileDialog;
