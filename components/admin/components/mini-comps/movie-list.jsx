"use client";

import useCustomMutation from "@/hooks/useCustomMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import DashBoardPageLayout from "../../layout/page-layout";
import { MovieItem, MovieItemLoader } from "../cards/MovieItem";
import useFetch from "@/hooks/useFetch";
import { useState } from "react";
import { GenreCard, GenreCardLoader } from "../cards/genre-card";
import { BannerCard, BannerCardLoader } from "../cards/banner-card";
import { cn } from "@/lib/utils";

const Movielist = ({
  pageTitle = "",
  btnText = "",
  itemsPerPage = 4,
  uploadPath = "",
  queryUrl = "",
  queryName = "",
  deleteName = "",
  deleteUrl = "",
  editPath = "",
  pageType = "",
  isEpisodePage = false,
  isGrid = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, meta } = useFetch({
    query_key: [queryName, currentPage],
    query_url: `${queryUrl}?page=${currentPage}&limit=${itemsPerPage}`,
    isAdmin: true,
  });

  return (
    <DashBoardPageLayout
      pageTitle={pageTitle}
      btnText={btnText}
      itemsPerPage={itemsPerPage}
      totalLength={meta?.total || 1}
      to={`/admin/${uploadPath}`}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      isLoading={isLoading}
    >
      <div
        className={cn(
          "flex flex-col gap-4",
          isGrid &&
            "grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4 gap-y-5"
        )}
      >
        {isLoading ? (
          <>
            {(() => {
              switch (pageType) {
                case "category":
                  return Array.from({ length: itemsPerPage }).map((_, i) => (
                    <GenreCardLoader key={i} />
                  ));

                case "trailer":
                  return Array.from({ length: itemsPerPage }).map((_, i) => (
                    <BannerCardLoader key={i} />
                  ));
                default:
                  return Array.from({ length: itemsPerPage }).map((_, i) => (
                    <MovieItemLoader key={i} />
                  ));
              }
            })()}
          </>
        ) : (
          <>
            {data?.map((item, index) => (
              <MovieListItem
                key={item?.slug}
                title={item?.title}
                description={item?.description}
                year={item?.movie_year}
                categories={item?.categories}
                image={item?.thumbnail}
                duration={isEpisodePage ? item?.duration : item?.watch_duration}
                rating={item?.average_rating}
                slug={item?.slug}
                currentPage={currentPage}
                deleteUrl={deleteUrl}
                deleteName={deleteName}
                queryName={queryName}
                editPath={editPath}
                name={item?.name}
                number={index + 1}
                vadeoSrc={item?.media_url}
                pageType={pageType}
              />
            ))}
          </>
        )}
      </div>
    </DashBoardPageLayout>
  );
};

const MovieListItem = ({
  title,
  description,
  image,
  year,
  categories,
  rating,
  duration,
  currentPage,
  slug,
  deleteUrl,
  deleteName,
  queryName,
  editPath,
  name,
  number,
  pageType,
  vadeoSrc,
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const { mutate, isPending } = useCustomMutation({
    query_name: [deleteName],
    query_url: `${deleteUrl}`,
    isAdmin: true,
  });

  const handleDelete = () => {
    mutate(
      { slug, method: "delete", isAdmin: true },
      {
        onSuccess: async ({ data, message }) => {
          toast.success(message);
          queryClient.refetchQueries({
            queryKey: [queryName, currentPage],
          });
          setShowDiscardModal(false);
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

  const handleEdit = () => {
    router.push(`/admin/${editPath}/${slug}`);
  };

  return (
    <>
      {(() => {
        switch (pageType) {
          case "category":
            return (
              <GenreCard
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                title={name}
                number={number}
                isPending={isPending}
                showDiscardModal={showDiscardModal}
                setShowDiscardModal={setShowDiscardModal}
              />
            );

          case "trailer":
            return (
              <BannerCard
                description={description}
                title={title}
                src={vadeoSrc}
              />
            );
          default:
            return (
              <MovieItem
                title={title}
                description={description}
                year={year}
                categories={categories}
                image={image}
                duration={duration}
                rating={rating}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                isPending={isPending}
                showDiscardModal={showDiscardModal}
                setShowDiscardModal={setShowDiscardModal}
              />
            );
        }
      })()}
    </>
  );
};

export default Movielist;
