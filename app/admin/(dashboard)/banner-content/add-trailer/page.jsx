"use client";

import successDialogImage from "@/public/Admin-Images/07bd46187648c0c04c9a39e2baf6b2dd63c64bfd (1).png";

import AdminInput from "@/components/admin/components/inputs/admin-input";
import AdminRadioBtns from "@/components/admin/components/inputs/admin-radio-btn";
import UploadFormComps from "@/components/admin/components/shared/upload-form-footer";
import SuccessDialog from "@/components/admin/layout/success-dialog";
import UploadLayout from "@/components/admin/layout/upload-layout";

import { Separator } from "@/components/ui/separator";

import { uploadTrailerData } from "@/constant/data";
import { uploadTrailerSchema } from "@/schema/Schema";

import { Form, Formik } from "formik";
import { useState } from "react";
import AdminVideoUpload from "@/components/admin/components/inputs/admin-video-upload";
import useCustomMutation from "@/hooks/useCustomMutation";
import { useRouter } from "next/navigation";
import CustomAlertDialog from "@/components/layout/customAlertDialog";
import useAdminContext from "@/contexts/adminContext";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const AddTrailerPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { preview, setUploadPercentage, setPreview } = useAdminContext();

  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [uploadedContentData, setUploadedContentData] = useState(null);

  // For file delete

  const { mutate: deleteMutate, isPending: deletePending } = useCustomMutation({
    query_name: ["delete_file_mutation"],
    query_url: "/delete-file",
    isAdmin: true,
  });

  const { mutate: uploadMutate, isPending: uploadPending } = useCustomMutation({
    query_name: ["trailer_add_mutation"],
    query_url: "/banners",
    isAdmin: true,
  });

  const handleFileDelete = () => {
    if (preview) {
      deleteMutate(
        {
          payload: {
            file: preview?.file_path,
            module: "Banner",
          },
          isAdmin: true,
        },
        {
          onSuccess: async ({ data, message }) => {
            toast.success(message);
            setShowDiscardModal(false);
            localStorage.removeItem("movie-data");
            setPreview(null);
            setUploadPercentage(0);
            router.back();
          },
          onError: (error) => {
            if (typeof error?.message === "string") {
              toast.error(error.message);
              return;
            }
            Object.entries(error?.message).forEach(([key, message]) => {
              toast.error(`${message}`);
            });
            setDeleteModal(false);
          },
        }
      );
      return;
    }

    router.back();
  };

  // For file delete

  const handleSubmit = (values, { resetForm }) => {
    const payload = {
      title: values.trailer_title,
      description: values.trailer_description,
      media_url: values.trailer_video_url,
      type: values.trailer_category,
    };
    uploadMutate(
      {
        payload,
        isAdmin: true,
      },
      {
        onSuccess: ({ data, message }) => {
          setUploadedContentData(data);
          toast.success(message);
          setPreview(null);
          localStorage.removeItem("movie-data");
          queryClient.refetchQueries({
            queryKey: ["admin_banner_fetch"],
          });
          resetForm();
          router.replace("/admin/banner-content");
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
    <>
      <div className="w-full h-full flex items-center justify-center">
        <UploadLayout
          title={"Upload Trailer"}
          subTitle={`Lorem Ipsum is simply dummy text of the printing and typesetting industry.`}
          showModal={showDiscardModal}
          setShowModal={setShowDiscardModal}
        >
          <Formik
            initialValues={{
              trailer_title: "",
              trailer_description: "",
              trailer_category: "",
              trailer_video_url: preview?.file_path || "",
            }}
            validationSchema={uploadTrailerSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            <Form className="">
              <div className="w-full grid grid-cols-12  gap-4 py-3 h-[556px] overflow-y-auto scroll-hide">
                <div className="col-span-4 flex flex-col gap-3.5">
                  <AdminVideoUpload
                    name="trailer_video_url"
                    title="Upload Trailer Video"
                    subTitle="Size: 1920 X 400px"
                    className={"w-full h-[222px]"}
                  />
                </div>
                <div className="col-span-8 flex flex-col gap-3.5">
                  <>
                    <AdminInput
                      name={`trailer_title`}
                      labelText="Trailer Title"
                      placeholder="Enter trailer name"
                      totalLength={50}
                      maxLength={50}
                    />
                  </>

                  <>
                    <AdminInput
                      name={`trailer_description`}
                      labelText="Description"
                      placeholder="Enter the description for the viewers"
                      totalLength={500}
                      maxLength={500}
                      className={`h-[135px]`}
                    />
                  </>

                  <>
                    <AdminRadioBtns
                      options={uploadTrailerData}
                      name="trailer_category"
                    />
                  </>
                </div>
              </div>

              <Separator className={`mb-2`} />

              <UploadFormComps
                uploadBtnText="Publish"
                isUploadLoading={uploadPending}
                isDiscardLoading={deletePending}
              />
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
        handleFn={handleFileDelete}
        isPending={deletePending}
      />
    </>
  );
};

export default AddTrailerPage;
