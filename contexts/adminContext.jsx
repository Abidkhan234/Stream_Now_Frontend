"use client";

import localHelper from "@/helpers/localStorage";

import { createContext, useContext, useEffect, useState } from "react";

const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [adminData, setAdminData] = useState(null);
  const [activeSeason, setActiveSeason] = useState(1);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [preview, setPreview] = useState(null);
  const [showUploadedContentData, setShowuploadedContentData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("newReleases");

  const checkingUserLogin = async () => {
    const userData = await localHelper.getItem("adminData");

    console.log("Admindata", userData);

    if (!userData) {
      return;
    }

    setAdminData(userData);
  };

  const checkingPreview = async () => {
    const data = await localHelper.getItem("movie-data");

    console.log("movie-data", data);

    if (!data) {
      return;
    }

    setUploadPercentage(data.uploadPercentage);
    setPreview(data.preview);
  };

  const checkingUploadContentData = async () => {
    const data = await localHelper.getItem("show-data");

    console.log("show-data", data);

    if (!data) {
      return;
    }

    setShowuploadedContentData(data);
  };

  useEffect(() => {
    checkingUserLogin();
    checkingPreview();
    checkingUploadContentData();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        activeSeason,
        setActiveSeason,
        adminData,
        setAdminData,
        uploadPercentage,
        setUploadPercentage,
        preview,
        setPreview,
        showUploadedContentData,
        setShowuploadedContentData,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

const useAdminContext = () => useContext(AdminContext);

export default useAdminContext;
