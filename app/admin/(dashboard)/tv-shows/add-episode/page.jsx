"use client";

import Image from "next/image";

import trailerPreview from "@/public/Admin-Images/2a282d294405fab8f2dd7e0e9647311a0cde53fa.png";
import successImage from "@/public/Admin-Images/07bd46187648c0c04c9a39e2baf6b2dd63c64bfd (1).png";

import ParentDiv from "@/components/admin/components/shared/element-div";
import UploadFormComps from "@/components/admin/components/shared/upload-form-footer";
import UploadLayout from "@/components/admin/layout/upload-layout";
import AdminDropDown from "@/components/admin/components/inputs/admin-dropdown";

import { Separator } from "@/components/ui/separator";
import {
  EpisodeCard,
  EpisodeSeasonList,
} from "@/components/admin/components/mini-comps/episode-comps";
import { Button } from "@/components/ui/button";

import { uploadEpisodeSchema } from "@/schema/Schema";
import {
  episodeDropDownData,
  episodeSeasonDropDownData,
} from "@/constant/data";

import { Plus } from "lucide-react";

import { FieldArray, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import SuccessDialog from "@/components/admin/layout/success-dialog";
import localHelper from "@/helpers/localStorage";
import useAdminContext from "@/contexts/adminContext";
import useCustomMutation from "@/hooks/useCustomMutation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AddEpisodePage = () => {
  const router = useRouter();
  const { showUploadedContentData, activeSeason, setUploadPercentage } =
    useAdminContext();

  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [episodePreviewData, setEpisodePreviewData] = useState([]);
  const [initialValues, setInitialValues] = useState({
    is_show_multi_season: false,
    show_seasons: 1,
    episode_details: [
      {
        episode_title: "",
        episode_description: "",
        episode_media: "",
        episode: 1,
      },
    ],
  });

  const { mutate: uploadMutate, isPending: uploadPending } = useCustomMutation({
    isAdmin: true,
    query_name: ["episode_add_mutation"],
    query_url: "/episodes",
  });

  const { mutate: deleteMutate, isPending: deletePending } = useCustomMutation({
    isAdmin: true,
    query_name: ["file_delete_mutation"],
    query_url: "/delete-file",
  });

  const checckingPreview = async () => {
    const data = await localHelper.getItem("episode-data");

    console.log("episode-data", data);

    if (!data) {
      return;
    }

    const episodeDetailsArr = data.preview.map((item) => {
      return {
        episode_title: "",
        episode_description: "",
        episode_media: item.file_path,
      };
    });

    const newInititalValues = {
      is_show_multi_season: false,
      show_seasons: 1,
      episode_details: episodeDetailsArr,
    };

    setInitialValues(newInititalValues);

    setEpisodePreviewData(data.preview);
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log(values.episode_details);

    const payload = {
      title: values.episode_details[0].episode_title,
      description: values.episode_details[0].episode_description,
      media_url: values.episode_details[0].episode_media,
      movie_id: showUploadedContentData?.id,
      season: activeSeason,
      episode: values.episode_details[0].episode,
    };

    uploadMutate(
      {
        payload,
        isAdmin: true,
      },
      {
        onSuccess: async ({ data, message }) => {
          toast.success(message);
          localStorage.removeItem("show-data");
          localStorage.removeItem("episode-data");
          setEpisodePreviewData([]);
          setShowModal(true);
          setUploadPercentage(0);
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

  // const handleFileDelete = () => {
  //   const payload = {
  //     file: episodePreviewData[0]?.file_path,
  //     module: "Episode",
  //   };

  //   deleteMutate(
  //     {
  //       payload,
  //       isAdmin: true,
  //     },
  //     {
  //       onSuccess: async ({ data, message }) => {
  //         toast.success(message);
  //         localStorage.removeItem("episode-data");
  //         localStorage.removeItem("show-data");
  //         setEpisodePreviewData([]);
  //         router.back();
  //       },
  //       onError: (error) => {
  //         if (typeof error?.message === "string") {
  //           toast.error(error.message);
  //           return;
  //         }
  //         Object.entries(error?.message).forEach(([key, message]) => {
  //           toast.error(`${message}`);
  //         });
  //       },
  //     }
  //   );
  // };

  useEffect(() => {
    checckingPreview();
  }, []);

  return (
    <>
      <div className="h-full w-full flex items-center justify-center">
        <UploadLayout
          cardClass={``}
          title={`Episode Details`}
          subTitle={`Upload your TV show video file and other media`}
          setShowModal={setShowDiscardModal}
          showModal={showDiscardModal}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={uploadEpisodeSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, isSubmitting }) => (
              <Form className="flex flex-col gap-5">
                <div className="h-[575px] overflow-y-auto scroll-hide">
                  <div className="w-full grid grid-cols-12  gap-4 pt-3 shrink-0">
                    <div className="col-span-4">
                      <ParentDiv className={`h-[222px] overflow-hidden`}>
                        <Image
                          src={
                            showUploadedContentData?.banner_image ||
                            trailerPreview
                          }
                          alt="movie-previw-image"
                          className="object-cover"
                          fill
                          sizes="100%"
                          priority
                        />
                      </ParentDiv>
                    </div>
                    <div className="col-span-8 flex flex-col gap-3">
                      <div className="flex items-center justify-start">
                        <h3 className="font-medium text-2xl">The Last of Us</h3>
                      </div>
                      <>
                        <AdminDropDown
                          name={`is_show_multi_season`}
                          labelText="Is this Tv Show will have multiple seasons?"
                          options={episodeDropDownData}
                        >
                          {values.is_show_multi_season ? (
                            <span className="text-sm">
                              {values.is_show_multi_season && "Yes"}
                            </span>
                          ) : (
                            <span className="text-sm opacity-60">
                              Select option
                            </span>
                          )}
                        </AdminDropDown>
                      </>

                      <>
                        <AdminDropDown
                          name={`show_seasons`}
                          placeholder="Select option"
                          labelText="How many seasons will this show have?"
                          options={
                            values.is_show_multi_season
                              ? episodeSeasonDropDownData
                              : [
                                  {
                                    text: "1 season",
                                    value: 1,
                                  },
                                ]
                          }
                          isSeasonDropDown={true}
                        >
                          <span className="text-sm">
                            {values.show_seasons}{" "}
                            {values.show_seasons && values.show_seasons > 1
                              ? "Seasons"
                              : "Season"}
                          </span>
                        </AdminDropDown>
                      </>
                    </div>
                  </div>

                  <div className="grow flex flex-col gap-4 mt-3">
                    <Separator />
                    <EpisodeSeasonList list={values.show_seasons} />
                    <Separator />
                    <div className="flex flex-col gap-4">
                      {values.episode_details?.map((_, i) => (
                        <EpisodeCard
                          titleName={`episode_details[${i}].episode_title`}
                          descriptionName={`episode_details[${i}].episode_description`}
                          episodeName={`episode_details[${i}].episode_media`}
                          episodeNo={i + 1}
                          localPreview={episodePreviewData}
                          setLocalPreview={setEpisodePreviewData}
                          id={i}
                          name={`episode_details[${i}].episode`}
                          key={i + 1}
                        />
                      ))}
                    </div>
                    <div className="">
                      <FieldArray name="episode_details">
                        {({ push }) => (
                          <Button
                            size={"lg"}
                            onClick={() => {
                              push({
                                episode_title: "",
                                episode_description: "",
                                episode_media: "",
                                episode: episode_details.episode + 1,
                              });
                            }}
                            className="bg-yellow-400 py-6 text-black rounded-[18px]"
                          >
                            <Plus className="size-5" />
                            Add Episode
                          </Button>
                        )}
                      </FieldArray>
                    </div>
                  </div>
                </div>

                <div className="">
                  <Separator className={`mb-2`} />
                  <UploadFormComps
                    uploadBtnText="Publish Tv Show"
                    showModal={showDiscardModal}
                    setShowModal={setShowDiscardModal}
                    isRemoveCondition={true}
                    isUploadLoading={uploadPending}
                    isDiscardLoading={deletePending}
                    // handleFileDeleteFn={handleFileDelete}
                    isGoBack={true}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </UploadLayout>
      </div>
      <SuccessDialog
        isOpen={showModal}
        setIsOpen={setShowModal}
        title="Upload Successful"
        subTitle="Your Tv Show is publish now!"
        movieImage={showUploadedContentData?.thumbnail}
        movieTitle={showUploadedContentData?.title}
        movieCategories={showUploadedContentData?.categories}
        backTo={"/admin/dashboard/tv-shows"}
      />
    </>
  );
};

export default AddEpisodePage;
