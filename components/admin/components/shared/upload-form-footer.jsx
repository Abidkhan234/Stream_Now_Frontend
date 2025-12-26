"use client";

import CustomAlertDialog from "@/components/layout/customAlertDialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import useAdminContext from "@/contexts/adminContext";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const UploadFormComps = ({
  uploadBtnText,
  handleFileDeleteFn,
  showModal,
  setShowModal,
  isDiscardLoading,
  isUploadLoading,
  isUploadShow = true,
  isGoBack = false,
  isRemoveCondition = false,
}) => {
  const router = useRouter();
  const { uploadPercentage } = useAdminContext();

  const handleClick = () => {
    if (isGoBack) {
      router.back();
      return;
    }
    handleFileDeleteFn();
  };

  return (
    <>
      <div
        className={cn(
          "flex items-center justify-between mt-2 w-full",
          !isUploadShow && "justify-end"
        )}
      >
        {isUploadShow && (
          <div className="opacity-60">
            <h2 className="">
              Movie Uploading:{" "}
              <span className="font-medium">{uploadPercentage}%</span>
            </h2>
          </div>
        )}

        <div className="flex items-center gap-4">
          <Button
            disabled={
              !isRemoveCondition &&
              ((isUploadShow && uploadPercentage < 100) ||
                isDiscardLoading ||
                isUploadLoading)
            }
            className={`opacity-60 bg-[#0C0C0C] rounded-[18px]`}
            onClick={() => setShowModal(!showModal)}
          >
            Discard Changes
          </Button>

          <Button
            type={"submit"}
            disabled={
              !isRemoveCondition &&
              ((isUploadShow && uploadPercentage < 100) ||
                isDiscardLoading ||
                isUploadLoading)
            }
            className={`rounded-[18px]`}
          >
            {isUploadLoading && <Spinner />}
            {uploadBtnText}
          </Button>
        </div>
      </div>

      <CustomAlertDialog
        isOpen={showModal}
        isNoting
        setIsOpen={setShowModal}
        title="Are you sure you want to discard changes?"
        subTitle="By doing this your movie data will be lost"
        titleClass={"min-[376px]:text-2xl text-lg"}
        handleFn={handleClick}
        isPending={isDiscardLoading}
      />
    </>
  );
};

export default UploadFormComps;
