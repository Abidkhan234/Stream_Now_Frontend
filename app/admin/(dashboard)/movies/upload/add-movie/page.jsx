"use client";

import Image from "next/image";

import UploadLayout from "@/components/admin/layout/upload-layout";

import trailerPreview from "@/public/Admin-Images/7380c8249ff353ba8ea88d6dae54ca1194f19fa1.png";
import ParentDiv from "@/components/admin/components/shared/element-div";
import playIcon from "@/public/icons/play.svg";

import { Separator } from "@/components/ui/separator";
import AdminInput from "@/components/admin/components/inputs/admin-input";
import { uploadMovieSchema } from "@/schema/Schema";
import AdminMultiSelect from "@/components/admin/components/inputs/admin-multi-select";
import { uploadMovieCategoryData } from "@/constant/data";
import AdminFileInput from "@/components/admin/components/inputs/admin-file-input";
import AdminTagsPickerInput from "@/components/admin/components/inputs/admin-tags-input";
import { Form, Formik, move } from "formik";
import UploadFormComps from "@/components/admin/components/shared/upload-form-footer";
import AdminSelect from "@/components/admin/components/inputs/admin-select";
import SuccessDialog from "@/components/admin/layout/success-dialog";
import dialogStaticImage from "@/public/Admin-Images/b5849ff98fcfa8ecb18e95cab3fd3051597c0a54.png";
import { useState } from "react";
import useAdminContext from "@/contexts/adminContext";
import useFetch from "@/hooks/useFetch";
import useCustomMutation from "@/hooks/useCustomMutation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useQueryClient } from "@tanstack/react-query";

const initialValues = {
  movie_title: "",
  movie_description: "",
  movie_thumbnail: "",
  movie_banner: "",
  movie_categories: [],
  movie_trailer_id: 0,
  movie_casts: [],
  movie_creators: [],
  movie_tags: [],
};

const MovieDetailPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { preview, setPreview, setUploadPercentage } = useAdminContext();

  const [uploadedContentData, setUploadedContentData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  // For banner Content

  const { data, isLoading } = useFetch({
    query_key: ["trailer_list_fetch"],
    query_url: "/banners",
    isAdmin: true,
  });

  // For banner Content

  // For Category

  const { data: categoryData, isLoading: categoryLoading } = useFetch({
    query_key: ["movie_category_fetch"],
    query_url: "/categories",
    isAdmin: true,
  });

  // For Category

  // For file delete

  const { mutate: deleteMutate, isPending: deletePending } = useCustomMutation({
    query_name: ["delete_file_mutation"],
    query_url: "/delete-file",
    isAdmin: true,
  });
  // For file delete
  const { mutate: uploadMutate, isPending: uploadPending } = useCustomMutation({
    query_name: ["add_movie_mutation"],
    query_url: "/movies",
    isAdmin: true,
  });

  const handleDelete = () => {
    deleteMutate(
      {
        payload: {
          file: preview?.file_path,
          module: "Movie",
        },
        isAdmin: true,
      },
      {
        onSuccess: async ({ data, message }) => {
          toast.success(message);
          setDeleteModal(false);
          localStorage.removeItem("movie-data");
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
  };

  const handleSubmit = async (values, { resetForm }) => {
    const payload = {
      title: values.movie_title,
      description: values.movie_description,
      banner_image: values.movie_banner,
      thumbnail: values.movie_thumbnail,
      type: "movie",
      star_caste: values.movie_casts.join(","),
      creater: values.movie_creators.join(","),
      media_url: preview?.file_path,
      tags: values.movie_tags.join(","),
      trailer_id: values.movie_trailer_id,
      movie_year: dayjs().year(),
      maturity_rating: "18 plus",
      categories: values.movie_categories,
    };

    uploadMutate(
      {
        payload,
        isAdmin: true,
        isFormData: true,
      },
      {
        onSuccess: async ({ data, message }) => {
          setUploadedContentData(data);
          toast.success(message);
          localStorage.removeItem("movie-data");
          setPreview(null);
          setUploadPercentage(0);
          setShowModal(true);
          queryClient.refetchQueries({
            queryKey: ["admin_movies_fetch"],
          });
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
    <>
      <div className="h-full w-full flex items-center justify-center">
        <UploadLayout
          cardClass={``}
          title={`Movie Details`}
          subTitle={`Upload your movie file and other media`}
          showModal={deleteModal}
          setShowModal={setDeleteModal}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={uploadMovieSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, errors, isSubmitting }) => (
              <Form encType="multipart/form-data" className="">
                <div className="w-full grid grid-cols-12  gap-4 py-3 h-[556px] overflow-y-auto scroll-hide">
                  <div className="col-span-8 flex flex-col gap-3.5">
                    <>
                      <AdminInput
                        name={`movie_title`}
                        placeholder="Movie title here"
                        labelText="Movie title (required)"
                        totalLength={50}
                        maxLength={50}
                      />
                    </>

                    <>
                      <AdminInput
                        name={`movie_description`}
                        placeholder="Enter the description for the viewers"
                        labelText="Description"
                        totalLength={500}
                        maxLength={500}
                      />
                    </>

                    <div className="">
                      <h4 className="font-medium md:text-base text-sm">
                        Movie Thumbnail
                      </h4>
                      <h5 className="text-sm opacity-60">
                        Set a thumbnail that stands out and draws viewers'
                        attention.
                      </h5>
                    </div>

                    <div className="flex gap-3 items-center w-full h-[180px]">
                      <AdminFileInput
                        name="movie_thumbnail"
                        title="Upload Thumbnail"
                        subTitle="Size: 400px X 800px"
                        className={"w-[200px]"}
                        isSubmitted={isSubmitting}
                      />

                      <AdminFileInput
                        name="movie_banner"
                        title="Upload Banner"
                        subTitle="Size: 1920 X 400px"
                        isSubmitted={isSubmitting}
                      />
                    </div>

                    <>
                      <AdminMultiSelect
                        options={categoryData}
                        isLoading={categoryLoading}
                        name="movie_categories"
                        labelText="Movie Categories (required)"
                        placeholder="Select Categories"
                      />
                    </>

                    <>
                      <AdminSelect
                        options={data}
                        isLoading={isLoading}
                        labelText="Select Movie Trailer (required)"
                        placeholder="Select movie trailer"
                        name="movie_trailer_id"
                        isSubmitted={!errors && isSubmitting}
                      />
                    </>

                    <>
                      <AdminTagsPickerInput
                        name="movie_casts"
                        labelText="Cast (required)"
                        placeholder="Enter movie cast"
                      />
                    </>
                    <>
                      <AdminTagsPickerInput
                        name="movie_creators"
                        labelText="Creators (required)"
                        placeholder="Enter movie creators"
                      />
                    </>
                    <>
                      <AdminTagsPickerInput
                        name="movie_tags"
                        labelText="Movie tags"
                        placeholder="Enter tags"
                      />
                    </>
                  </div>
                  <div className="col-span-4 flex flex-col gap-3.5">
                    <ParentDiv
                      className={`h-[227px] relative overflow-hidden p-0`}
                    >
                      <video
                        src={preview?.play_url}
                        className="h-full w-full object-cover"
                        controls
                      ></video>
                    </ParentDiv>

                    <div className="flex flex-col gap-2">
                      <h3 className="font-medium text-lg">
                        {values.movie_title ? values.movie_title : "Title"}
                      </h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        {values.movie_categories?.length > 0 ? (
                          values.movie_categories.map((catId) => {
                            const category = categoryData.find(
                              (item) => item.id === catId
                            );

                            return (
                              <span
                                key={catId}
                                className="w-[90px] h-[35px] rounded-[10px] bg-[#0C0C0C] text-center content-center text-sm capitalize"
                              >
                                {category?.name}
                              </span>
                            );
                          })
                        ) : (
                          <span className="text-sm">Category</span>
                        )}
                      </div>
                    </div>

                    <Separator className={`my-1`} />

                    <div className="flex flex-col gap-3">
                      <h4 className="font-medium text-lg">Trailer</h4>
                      <ParentDiv
                        className={`h-[227px] relative overflow-hidden p-0`}
                      >
                        <video
                          src={
                            values.movie_trailer_id
                              ? data?.find(
                                  (item) => item.id == values.movie_trailer_id
                                )?.media_url
                              : " "
                          }
                          className="w-full h-full object-cover"
                          controls
                        ></video>
                      </ParentDiv>
                    </div>
                  </div>
                </div>

                <Separator className={`mb-2`} />

                <UploadFormComps
                  uploadBtnText="Upload Movie"
                  handleFileDeleteFn={handleDelete}
                  showModal={deleteModal}
                  setShowModal={setDeleteModal}
                  isDiscardLoading={deletePending}
                  isUploadLoading={uploadPending}
                />
              </Form>
            )}
          </Formik>
        </UploadLayout>
      </div>

      <SuccessDialog
        isOpen={showModal}
        setIsOpen={setShowModal}
        title="Upload Successful"
        subTitle="Your movie is publish now"
        movieImage={uploadedContentData?.thumbnail}
        movieTitle={uploadedContentData?.title}
        movieCategories={uploadedContentData?.categories}
        backTo={"/admin/movies"}
      />
    </>
  );
};

export default MovieDetailPage;
