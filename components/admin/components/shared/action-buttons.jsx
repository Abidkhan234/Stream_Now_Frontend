"use client";

import deleteIcon from "@/public/icons/trash.svg";
import editIcon from "@/public/icons/movie-item-edit-icon.svg";
import Image from "next/image";
import CustomAlertDialog from "@/components/layout/customAlertDialog";
import trashIcon from "@/public/Account-Page/Trash.svg";
import { cn } from "@/lib/utils";

const ActionButtons = ({
  className,
  showText = true,
  handleDelete,
  handleEdit,
  isLoading,
  showDeleteModal,
  setShowDeleteModal,
}) => {
  return (
    <>
      <div className={cn("flex items-center gap-5 w-full", className)}>
        <div
          className="text-sm text-center cursor-pointer flex flex-col gap-1"
          onClick={handleEdit}
        >
          <div className="bg-[#0C0C0C] rounded-full size-[38px] flex items-center justify-center">
            <Image
              src={editIcon}
              alt="edit-icon"
              height={20}
              width={20}
              priority
            />
          </div>
          {showText && <span>Edit</span>}
        </div>
        <div
          className="text-sm text-center cursor-pointer flex flex-col gap-1"
          onClick={() => setShowDeleteModal(!showDeleteModal)}
        >
          <div className="bg-[#0C0C0C] rounded-full size-[40px] flex items-center justify-center">
            <Image
              src={deleteIcon}
              alt="edit-icon"
              height={20}
              width={20}
              priority
            />
          </div>
          {showText && <span>Delete</span>}
        </div>
      </div>

      <CustomAlertDialog
        isNoting
        isOpen={showDeleteModal}
        setIsOpen={setShowDeleteModal}
        icon={trashIcon}
        isPending={isLoading}
        title="Are you sure?"
        className={`max-w-[460px]`}
        subTitle="After this action this item is deleted permenantly."
        handleFn={handleDelete}
        customOpacity={0.2}
      />
    </>
  );
};

export default ActionButtons;
