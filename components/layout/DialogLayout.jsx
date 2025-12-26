import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

const DialogLayout = ({
  title,
  subTitle = "",
  stepCount,
  isOpen,
  setIsOpen,
  setFormIndex,
  children,
  totalSteps,
  isSignInBtn = false,
  router,
}) => {
  const handleClose = () => {
    if (setFormIndex) {
      setFormIndex(0);
    }

    if (stepCount <= 1) {
      setIsOpen(!isOpen);
    }

    if (stepCount > 1) {
      router.replace("/account");
      setIsOpen(false);
    }

    setIsOpen(!isOpen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => handleClose()}>
      <DialogTrigger asChild></DialogTrigger>

      <DialogContent className="max-[426px]:px-3 py-5 px-10 outline-none bg-transparent backdrop-blur-[25px] border border-[#313131] sm:!max-w-[650px] rounded-3xl">
        <DialogDescription className={`hidden`}></DialogDescription>
        <DialogHeader>
          {stepCount && (
            <div className="flex justify-start items-center">
              <h2 className="text-[#FFD400] text-xl font-medium">
                STEP {stepCount} OF <span>{totalSteps}</span>
              </h2>
            </div>
          )}
          <DialogTitle className="sm:text-5xl min-[426px]:text-4xl text-3xl font-bold text-white">
            {title}
            {subTitle && (
              <p className="font-medium md:text-xl min-[425px]:text-lg text-sm mt-2">
                {subTitle}
              </p>
            )}
          </DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogLayout;
