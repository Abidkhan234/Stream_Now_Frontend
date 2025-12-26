"use client";

import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import { MovieItem, MovieItemLoader } from "../cards/MovieItem";
import useAdminContext from "@/contexts/adminContext";
import { BannerCard, BannerCardLoader } from "../cards/banner-card";
import { cn } from "@/lib/utils";
import useCustomMutation from "@/hooks/useCustomMutation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const DiscoveryPageContent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { selectedCategory } = useAdminContext();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data, isLoading } = useFetch({
    query_key: ["admin_discovery_fetch"],
    query_url: "/discover",
    isAdmin: true,
  });

  const { mutate: movie_show_mutate, isPending: movie_show_pending } =
    useCustomMutation({
      query_name: ["discovery_delete_mutation_movie_show"],
      query_url: "/movies",
      isAdmin: true,
    });

  const { mutate: bannerMutate, isPending: bannerMutatePending } =
    useCustomMutation({
      query_name: ["discovery_delete_mutation_banner"],
      query_url: "/banners",
      isAdmin: true,
    });

  const handleDelete = (slug, type, hasMediaUrl) => {
    let resetQuerykeyArr = [];

    if (!hasMediaUrl) {
      resetQuerykeyArr =
        type == "movie"
          ? ["admin_discovery_fetch", "admin_movies_fetch"]
          : ["admin_tvShow_mutation", "admin_discovery_fetch"];

      movie_show_mutate(
        { slug, isAdmin: true, method: "delete" },
        {
          onSuccess: ({ data, message }) => {
            toast.success(message);
            setShowDeleteModal(false);
            resetQuerykeyArr.forEach((item) =>
              queryClient.refetchQueries({
                queryKey: [item],
              })
            );
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
      return;
    }
    resetQuerykeyArr = ["admin_discovery_fetch", "admin_banner_fetch"];
    bannerMutate(
      {
        slug,
        isAdmin: true,
        method: "delete",
      },
      {
        onSuccess: ({ data, message }) => {
          toast.success(message);
          setShowDeleteModal(false);
          resetQuerykeyArr.forEach((item) =>
            queryClient.refetchQueries({
              queryKey: [item],
            })
          );
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

  const handleEdit = (slug) => {
    router.push(`/admin/movies/update-movie/${slug}`);
  };

  const selectedData = data?.[selectedCategory] || [];

  return (
    <div className={cn(`flex flex-col gap-5 pb-5`)}>
      {isLoading ? (
        <>
          {Array.from({ length: 4 }).map((_, i) => (
            <MovieItemLoader key={i} />
          ))}
        </>
      ) : (
        <>
          {selectedData.map((item) => (
            <MovieItem
              key={item.slug}
              isPending={movie_show_pending || bannerMutatePending}
              year={item.movie_year}
              title={item.title}
              description={item.description}
              rating={item.average_rating}
              duration={item.watch_duration}
              image={item.thumbnail}
              setShowDiscardModal={setShowDeleteModal}
              showDiscardModal={showDeleteModal}
              handleDelete={() =>
                handleDelete(item.slug, item.type, item.media_url)
              }
              handleEdit={() => handleEdit(item.slug, item.type)}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default DiscoveryPageContent;
