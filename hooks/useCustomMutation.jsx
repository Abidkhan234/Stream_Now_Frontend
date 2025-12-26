"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDelete, usePost, useUpdate } from "./useAxios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUIContext from "@/contexts/UIContext";
import useAdminContext from "@/contexts/adminContext";

const useCustomMutation = ({ query_url, query_name, isAdmin = false }) => {
  const queryClient = useQueryClient();
  const { setUserData } = useUIContext();
  const { setAdminData } = useAdminContext();
  const router = useRouter();
  const {
    mutate,
    isError,
    isPending,
    error,
    data,
    reset,
    isSuccess,
    mutateAsync,
  } = useMutation({
    mutationKey: query_name,
    mutationFn: ({
      payload,
      isFormData = false,
      slug = "",
      isCreditCard = false,
      method = "post",
      isAdmin = false,
    }) => {
      method = method.toLowerCase();
      if (method === "post") {
        return usePost({
          api_url: query_url,
          api_name: query_name.join(" "),
          payload,
          isFormData,
          isCreditCard,
          slug,
          isAdmin,
        });
      } else if (method === "delete") {
        return useDelete({
          api_url: query_url,
          api_name: query_name.join(" "),
          payload,
          slug,
          isAdmin,
        });
      } else if (method === "put") {
        return useUpdate({});
      }
    },
  });

  useEffect(() => {
    const handleData = async () => {
      if (!isPending && isError && error.statusCode == 401) {
        localStorage.clear();

        if (isAdmin) {
          setAdminData(null);
          router.replace("/admin/login");
          document.cookie = "adminData=; path=/; max-age=0; samesite=strict";
        } else {
          setUserData(null);
          router.replace("/");
          document.cookie = "userData=; path=/; max-age=0; samesite=strict";
        }

        queryClient.cancelQueries();
        return;
      }
    };
    handleData();
  }, [isError, error?.statusCode, isPending, error?.message]);

  return {
    mutate,
    mutateAsync,
    isPending,
    data,
    error,
    isError,
    isSuccess,
    reset,
  };
};

export default useCustomMutation;
