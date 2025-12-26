"use client";

import ParentDiv from "../shared/element-div";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import sendIcon from "@/public/icons/send-square.svg";
import useAdminContext from "@/contexts/adminContext";
import Resumable from "resumablejs";
import localHelper from "@/helpers/localStorage";
import toast from "react-hot-toast";
import { useField } from "formik";

const AdminVideoUpload = ({
  name,
  title,
  subTitle,
  className,
  localPreview,
  setLocalPreview,
  islocalPreview = false,
}) => {
  const [field, meta, helper] = useField(name);
  const inputRef = useRef(null);
  const { setUploadPercentage, setPreview, adminData, preview } =
    useAdminContext();

  const resumableRef = useRef(null);
  const dropZoneRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!adminData?.api_token) return;
    if (resumableRef.current) return;

    initializeResumable();

    return () => {
      if (resumableRef.current) {
        resumableRef.current.cancel();
        resumableRef.current = null;
      }
    };
  }, [adminData?.api_token]);

  const initializeResumable = () => {
    const resumable = new Resumable({
      target: `${process.env.NEXT_PUBLIC_API_URL}/upload-chunk`,
      fileType: ["mp4", "mov"],
      chunkSize: 2 * 1024 * 1024, // 2MB chunks
      throttleProgressCallbacks: 1,
      simultaneousUploads: 1,
      testChunks: false,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${adminData?.api_token}`,
      },
      uploadMethod: "POST",
    });

    if (!resumable.support) {
      toast.error(
        "Your browser doesn't support chunked uploads. Please use a modern browser."
      );
      return;
    }

    if (inputRef.current) {
      resumable.assignBrowse(inputRef.current);
    }

    if (dropZoneRef.current) {
      resumable.assignDrop(dropZoneRef.current);
    }

    resumable.on("fileAdded", function (file) {
      if (isUploading) {
        resumable.removeFile(file);
        return;
      }
      const maxSize = 4 * 1024 * 1024 * 1024; // 4GB
      if (file.size > maxSize) {
        toast.error("File size should be under 4GB");
        resumable.removeFile(file);
        return false;
      }

      startUpload(file);
    });

    resumable.on("fileProgress", function (file) {
      setUploadPercentage(Math.floor(file.progress() * 100));
    });

    resumable.on("fileSuccess", async (file, message) => {
      try {
        const parsedMessage = JSON.parse(message);

        toast.success(parsedMessage.message);

        if (islocalPreview) {
          const newPreview = [
            {
              file_path: parsedMessage?.data?.file_path,
              play_url: parsedMessage?.data?.play_url,
            },
            ...localPreview,
          ];

          setLocalPreview(newPreview);

          helper.setValue(parsedMessage?.data?.file_path);

          await localHelper.setItem("episode-data", {
            preview: newPreview,
          });
        } else {
          setPreview({
            file_path: parsedMessage?.data?.file_path,
            play_url: parsedMessage?.data?.play_url,
          });
          helper.setValue(parsedMessage?.data?.file_path);

          await localHelper.setItem("movie-data", {
            preview: {
              file_path: parsedMessage?.data?.file_path,
              play_url: parsedMessage?.data?.play_url,
            },
            uploadPercentage: 100,
          });
        }

        setIsUploading(false);
        setUploadPercentage(100);

        resumable.removeFile(file);

        if (inputRef.current) inputRef.current.value = "";
      } catch (error) {
        console.error("Error parsing upload response:", error);
        toast.error(
          "Upload completed but there was an error processing the response."
        );
        setIsUploading(false);
      }
    });

    resumable.on("fileError", function (file, message) {
      console.error("Upload error:", message);
      toast.error("File upload error. Please try again.");
      setIsUploading(false);
      setUploadPercentage(0);
      resumable.removeFile(file);
      if (inputRef.current) inputRef.current.value = "";
    });

    resumableRef.current = resumable;
  };

  const startUpload = (file) => {
    if (isUploading) return;

    setIsUploading(true);
    setUploadPercentage(0);

    if (file) {
      resumableRef.current?.upload();
    }
  };

  const handleSelect = () => {
    if (!resumableRef.current && adminData?.api_token) {
      initializeResumable();
    }

    inputRef.current.click();
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    }

    if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  return (
    <ParentDiv
      className={cn(
        `w-full h-full relative ${
          !preview && "cursor-pointer"
        } overflow-hidden p-0 ${
          meta.touched && meta.error && "border-destructive"
        }`,
        className
      )}
    >
      <div
        className="w-full h-full flex items-center justify-center flex-col gap-2"
        onClick={handleSelect}
        ref={dropZoneRef}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {!preview ? (
          <>
            <Image src={sendIcon} width={24} height={24} alt="send-icon" />
            <h5 className="text-sm font-medium opacity-80">{title}</h5>
            <span className="opacity-60 text-xs">{subTitle}</span>
          </>
        ) : (
          <video
            src={preview?.play_url}
            className="object-cover w-full h-full"
            controls
          ></video>
        )}

        <input
          type="file"
          className="hidden"
          ref={inputRef}
          accept="video/mp4,video/quicktime"
        />
      </div>
    </ParentDiv>
  );
};

export default AdminVideoUpload;
