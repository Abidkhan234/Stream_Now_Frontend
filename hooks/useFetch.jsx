"use client";

import useUIContext from "@/contexts/UIContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useGet } from "./useAxios";
import useAdminContext from "@/contexts/adminContext";

const useFetch = ({ query_key, query_url, isAdmin = false }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { setUserData } = useUIContext();
  const { setAdminData } = useAdminContext();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: query_key,
    queryFn: () =>
      useGet({
        api_url: query_url,
        api_name: query_key.join(" "),
        isAdmin: isAdmin,
      }),
  });

  useEffect(() => {
    const handleData = async () => {
      if (!isLoading && isError && error.statusCode == 401) {
        toast.error(error.message);
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
  }, [isError, error?.message, isLoading]);

  return {
    data: data?.data || data,
    meta: data?.meta,
    isLoading,
  };
};

export default useFetch;
