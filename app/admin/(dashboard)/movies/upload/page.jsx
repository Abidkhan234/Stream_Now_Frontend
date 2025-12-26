"use client";

import Image from "next/image";

import videoAddIcon from "@/public/icons/video-add.svg";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import useAdminContext from "@/contexts/adminContext";

import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import Resumable from "resumablejs";
import localHelper from "@/helpers/localStorage";

const UploadMoviePage = () => {
  const { setUploadPercentage, setPreview, adminData } = useAdminContext();
  const router = useRouter();
  const fileInputRef = useRef(null);
  const resumableRef = useRef(null);
  const dropZoneRef = useRef(null);
  const initializedRef = useRef(false);
  const [dragActive, setDragActive] = useState(false);
  // const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    if (!adminData?.api_token) return;
    if (initializedRef.current) return;

    if (resumableRef.current) {
      resumableRef.current.cancel();
      resumableRef.current = null;
    }

    initializedRef.current = true;
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

    // Check if Resumable is supported
    if (!resumable.support) {
      toast.error(
        "Your browser doesn't support chunked uploads. Please use a modern browser."
      );
      return;
    }

    // Assign browse button
    if (fileInputRef.current) {
      resumable.assignBrowse(fileInputRef.current);
    }

    // Assign drop zone
    if (dropZoneRef.current) {
      resumable.assignDrop(dropZoneRef.current);
    }

    // File added event
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

      // Check if there's a previous upload to resume
      const previousUploads = resumable.files.filter(
        (f) =>
          f.fileName === file.fileName && f.size === file.size && f !== file
      );
      if (previousUploads.length > 0) {
        // setPendingFile(file);

        // setShowResumeDialog(true);
        return false; // Don't start upload yet
      }
      startUpload(file);
    });

    // File progress event
    resumable.on("fileProgress", function (file) {
      const progress = Math.floor(file.progress() * 100);
      setCurrentProgress(progress);
      setUploadPercentage(progress);
    });

    // File success event
    resumable.on("fileSuccess", async (file, message) => {
      try {
        const parsedMessage = JSON.parse(message);

        toast.success(parsedMessage.message);

        setPreview({
          file_path: parsedMessage?.data?.file_path,
          play_url: parsedMessage?.data?.play_url,
        });

        await localHelper.setItem("movie-data", {
          preview: {
            file_path: parsedMessage?.data?.file_path,
            play_url: parsedMessage?.data?.play_url,
          },
          uploadPercentage: 100,
        });

        resumable.removeFile(file);
        resumable.files = [];

        // DESTROY INSTANCE
        initializedRef.current = false;
        if (resumableRef.current) {
          resumableRef.current.cancel();
          resumableRef.current = null;
        }

        setIsUploading(false);
        setUploadPercentage(100);
        setCurrentProgress(100);

        router.push("/admin/movies/upload/add-movie");
      } catch (error) {
        console.error("Error parsing upload response:", error);
        toast.error(
          "Upload completed but there was an error processing the response."
        );
        setIsUploading(false);
      }
    });

    // File error event
    resumable.on("fileError", function (file, message) {
      console.error("Upload error:", message);
      toast.error("File upload error. Please try again.");
      setIsUploading(false);
      setUploadPercentage(0);
      setCurrentProgress(0);
    });

    resumableRef.current = resumable;
  };

  const startUpload = (file) => {
    if (isUploading) return;

    setIsUploading(true);
    setUploadPercentage(0);
    setCurrentProgress(0);

    if (file) {
      resumableRef.current?.upload();
    }
  };

  // const handleResumeChoice = (shouldResume) => {
  //   // setShowResumeDialog(false);

  //   if (pendingFile && resumableRef.current) {
  //     if (!shouldResume) {
  //       // Remove previous uploads and start fresh
  //       const previousFiles = resumableRef.current.files.filter(
  //         (f) => f.fileName === pendingFile.fileName && f !== pendingFile
  //       );
  //       previousFiles.forEach((f) => resumableRef.current.removeFile(f));
  //     }

  //     startUpload(pendingFile);
  //     // setPendingFile(null);
  //   }
  // };

  const handleSelect = () => {
    if (!resumableRef.current && adminData?.api_token) {
      initializeResumable();
      initializedRef.current = true;
    }

    fileInputRef.current.click();
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
    <>
      {/* {showResumeDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#161616] border border-border rounded-lg p-6 max-w-md mx-4">
            <h2 className="text-xl font-semibold mb-4">Resume Upload?</h2>
            <p className="text-sm opacity-60 mb-6">
              We found a previous upload for this file. Would you like to resume
              from where you left off?
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="ghost"
                onClick={() => handleResumeChoice(false)}
                className="rounded-[18px]"
              >
                Start Fresh
              </Button>
              <Button
                onClick={() => handleResumeChoice(true)}
                className="rounded-[18px]"
              >
                Resume Upload
              </Button>
            </div>
          </div>
        </div>
      )} */}

      <div
        ref={dropZoneRef}
        className="w-full h-full flex items-center justify-center"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div
          className={`flex flex-col justify-center gap-4 w-full max-w-300 h-145 border border-border items-center text-center rounded-[22px] mx-5
          ${
            dragActive ? "bg-[#1f1f1f]" : "bg-[#161616]"
          } overflow-hidden transition-colors duration-200`}
        >
          <div className="bg-[#0C0C0C] rounded-full flex items-center justify-center size-20">
            <Image
              src={videoAddIcon}
              className="object-cover"
              width={38}
              height={38}
              alt="video-upload-icon"
            />
          </div>

          <h1 className="font-medium md:text-3xl text-xl">
            Drag and drop video files to upload
          </h1>

          <h3 className="md:text-lg text-sm opacity-60">
            Your movie will be saved on draft until you publish it
          </h3>

          {isUploading && (
            <div className="w-full max-w-md px-6">
              <div className="w-full bg-[#0C0C0C] rounded-full h-2 mb-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${currentProgress}%` }}
                />
              </div>
              <p className="text-sm opacity-60">
                Uploading... {currentProgress}%
              </p>
            </div>
          )}

          <div className="mt-2">
            <h4 className="md:text-lg text-sm opacity-60">
              Supported formats: MP4, MOV, DCP
            </h4>
            <span className="font-medium text-sm">(4gb size maximum)</span>
          </div>

          <div className="mt-2">
            <Button
              className="rounded-[18px] w-35"
              onClick={handleSelect}
              disabled={isUploading}
            >
              {isUploading && <Spinner />} Select File
            </Button>
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              accept="video/mp4,video/quicktime"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadMoviePage;
