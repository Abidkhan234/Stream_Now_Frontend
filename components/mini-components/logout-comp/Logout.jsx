import CustomAlertDialog from "@/components/layout/customAlertDialog";
import useUIContext from "@/contexts/UIContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import logoutIcon from "@/public/Account-Page/logout.svg";
import useCustomMutation from "@/hooks/useCustomMutation";

const Logout = ({ alertOpen, setAlertOpen }) => {
  const router = useRouter();
  const { setUserData } = useUIContext();

  const { mutate, isPending } = useCustomMutation({
    query_name: ["logout_mutation"],
    query_url: "/user/logout",
  });

  const handleLogoutClick = () => {
    mutate(
      {},
      {
        onSuccess: ({ data, message }) => {
          toast.success(message);
          router.replace("/");
          localStorage.removeItem("userData");
          document.cookie = "userData=; path=/; max-age=0; samesite=strict";
          setUserData(null);
          setAlertOpen(false);
          setIsOpen(false);
        },
        onError: (error) => {
          console.log("Logout mutation error", error);
          toast.error(error);
        },
      }
    );
  };

  return (
    <>
      <CustomAlertDialog
        title="Logout"
        subTitle="Are you sure you want to logout?"
        icon={logoutIcon}
        handleFn={handleLogoutClick}
        isOpen={alertOpen}
        setIsOpen={setAlertOpen}
        isPending={isPending}
        isModifiedBtn={false}
        isNoting={true}
      />
    </>
  );
};

export default Logout;
