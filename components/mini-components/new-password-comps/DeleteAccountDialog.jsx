import CustomAlertDialog from "@/components/layout/customAlertDialog";
import useUIContext from "@/contexts/UIContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import trashIcon from "@/public/Account-Page/Trash.svg";
import { useState } from "react";
import useCustomMutation from "@/hooks/useCustomMutation";

const DeleteAccountDialog = () => {
  const { setUserData, setSelectedSubscription } = useUIContext();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending } = useCustomMutation({
    query_name: ["delete_account_mutation"],
    query_url: "/user/account/delete",
  });

  const handleClick = async () => {
    mutate(
      { payload: {}, method: "delete" },
      {
        onSuccess: ({ data, message }) => {
          toast.success(message);
          setUserData(null);
          setSelectedSubscription({});
          document.cookie = "userData=; path=/; samesite=strict";
          localStorage.clear();
          router.replace("/");
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
  return (
    <div>
      <CustomAlertDialog
        title={`Delete account?`}
        icon={trashIcon}
        subTitle={`Are you sure you want to delete your account?`}
        btnText={"Delete account"}
        isModifiedBtn
        handleFn={handleClick}
        isPending={isPending}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export default DeleteAccountDialog;
