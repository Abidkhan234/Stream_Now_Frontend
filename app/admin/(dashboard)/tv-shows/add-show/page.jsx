"use client";

import UploadLayout from "@/components/admin/layout/upload-layout";
import ParentDiv from "@/components/admin/components/shared/element-div";
import AdminInput from "@/components/admin/components/inputs/admin-input";
import AdminMultiSelect from "@/components/admin/components/inputs/admin-multi-select";
import AdminFileInput from "@/components/admin/components/inputs/admin-file-input";
import AdminTagsPickerInput from "@/components/admin/components/inputs/admin-tags-input";
import UploadFormComps from "@/components/admin/components/shared/upload-form-footer";
import AdminSelect from "@/components/admin/components/inputs/admin-select";

import { Separator } from "@/components/ui/separator";
import { uploadTvShowSchema } from "@/schema/Schema";
import { Form, Formik } from "formik";
import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import useCustomMutation from "@/hooks/useCustomMutation";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import SuccessDialog from "@/components/admin/layout/success-dialog";
import { useQueryClient } from "@tanstack/react-query";
import useAdminContext from "@/contexts/adminContext";
import localHelper from "@/helpers/localStorage";
import { useRouter } from "next/navigation";

const initialValues = {
  show_title: "",
  show_description: "",
  show_thumbnail: "",
  show_banner: "",
  show_categories: [],
  show_trailer_id: 0,
  show_casts: [],
  show_creators: [],
  show_tags: [],
};

const ShowDetailPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { setShowuploadedContentData } = useAdminContext();

  const [showModal, setShowModal] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  // For Trailer
  const { data: trailerData, isLoading: trailerLoading } = useFetch({
    query_key: ["trailer_list_fetch"],
    query_url: "/banners",
    isAdmin: true,
  });
  // For Trailer

  // For category

  const { data: categoryData, isLoading: categoryLoading } = useFetch({
    query_key: ["movie_category_fetch"],
    query_url: "/categories",
    isAdmin: true,
  });
  // For category

  // For Uplaod
  const { mutate: uploadMutate, isPending: uploadPending } = useCustomMutation({
    query_name: ["add_show_mutation"],
    query_url: "/movies",
    isAdmin: true,
  });

  // For Uplaod

  const handleSubmit = (values, { resetForm }) => {
    const payload = {
      title: values.show_title,
      description: values.show_description,
      banner_image: values.show_banner,
      thumbnail: values.show_thumbnail,
      type: "show",
      star_caste: values.show_casts.join(","),
      creater: values.show_creators.join(","),
      // media_url: trailerData[0]?.media_url,
      tags: values.show_tags.join(","),
      trailer_id: values.show_trailer_id,
      movie_year: dayjs().year(),
      maturity_rating: "18 plus",
      categories: values.show_categories,
    };

    uploadMutate(
      {
        payload,
        isAdmin: true,
        isFormData: true,
      },
      {
        onSuccess: async ({ data, message }) => {
          setShowuploadedContentData(data);
          toast.success(message);
          setShowModal(true);
          await localHelper.setItem("show-data", data);
          queryClient.refetchQueries({ queryKey: ["admin_tvShow_mutation"] });
          resetForm();
          router.replace("/admin/dashboard/tv-shows/add-episode");
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
      <div className="h-full w-full flex items-center justify-center">
        <UploadLayout
          cardClass={``}
          title={`TV Show Details`}
          subTitle={`Upload your TV show video file and other media`}
          showModal={showDiscardModal}
          setShowModal={setShowDiscardModal}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={uploadTvShowSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, isSubmitting }) => (
              <Form className="">
                <div className="w-full grid grid-cols-12  gap-4 py-3 h-[556px] overflow-y-auto scroll-hide">
                  <div className="col-span-8 flex flex-col gap-3.5">
                    <>
                      <AdminInput
                        name={`show_title`}
                        placeholder="TV Show title here"
                        labelText="TV Show title (required)"
                        totalLength={50}
                        maxLength={50}
                      />
                    </>

                    <>
                      <AdminInput
                        name={`show_description`}
                        placeholder="Enter the description for the viewers"
                        labelText="Description"
                        totalLength={500}
                        maxLength={500}
                      />
                    </>

                    <div className="">
                      <h4 className="font-medium md:text-base text-sm">
                        TV Show Thumbnail
                      </h4>
                      <h5 className="text-sm opacity-60">
                        Set a thumbnail that stands out and draws viewers'
                        attention.
                      </h5>
                    </div>

                    <div className="flex gap-3 items-center w-full h-[190px]">
                      <AdminFileInput
                        name="show_thumbnail"
                        title="Upload Thumbnail"
                        subTitle="Size: 400px X 800px"
                        className={"w-[200px]"}
                        isSubmitted={isSubmitting}
                      />

                      <AdminFileInput
                        name="show_banner"
                        title="Upload Banner"
                        subTitle="Size: 1920 X 400px"
                        isSubmitted={isSubmitting}
                      />
                    </div>

                    <>
                      <AdminMultiSelect
                        options={categoryData}
                        isLoading={categoryLoading}
                        name="show_categories"
                        labelText="TV Show Categories (required)"
                        placeholder="Select Categories"
                      />
                    </>

                    <>
                      <AdminSelect
                        options={trailerData}
                        isLoading={trailerLoading}
                        name="show_trailer_id"
                        labelText="Select Show Trailer (required)"
                        placeholder="Select Show trailer"
                        isSubmitted={!errors && isSubmitting}
                      />
                    </>

                    <>
                      <AdminTagsPickerInput
                        name="show_casts"
                        labelText="Cast (required)"
                        placeholder="Enter show cast"
                      />
                    </>
                    <>
                      <AdminTagsPickerInput
                        name="show_creators"
                        labelText="Creators (required)"
                        placeholder="Enter show creators"
                      />
                    </>
                    <>
                      <AdminTagsPickerInput
                        name="show_tags"
                        labelText="Movie tags"
                        placeholder="Enter tags"
                      />
                    </>
                  </div>
                  <div className="col-span-4 flex flex-col gap-3.5">
                    <h4 className="font-medium text-lg">Trailer</h4>
                    <ParentDiv
                      className={`h-[240px] relative overflow-hidden p-0`}
                    >
                      <video
                        src={
                          values.show_trailer_id
                            ? trailerData?.find(
                                (item) => item.id == values.show_trailer_id
                              )?.media_url
                            : " "
                        }
                        controls
                        className="h-full w-full object-cover"
                      ></video>
                    </ParentDiv>
                  </div>
                </div>

                <Separator className={`mb-2`} />

                <UploadFormComps
                  uploadBtnText="Continue"
                  isUploadShow={false}
                  showModal={showDiscardModal}
                  setShowModal={setShowDiscardModal}
                  isUploadLoading={uploadPending}
                  isGoBack={true}
                />
              </Form>
            )}
          </Formik>
        </UploadLayout>
      </div>
    </>
  );
};

export default ShowDetailPage;
