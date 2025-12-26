import BackButton from "../buttons/BackButton";
import { cn } from "@/lib/utils";

const CustomAuthForm = ({
  children,
  step,
  title,
  subTitle = "",
  className,
  titleClasses,
  subTitleClasses,
  isLoading,
  showBackButton = true,
}) => {
  return (
    <div
      className={cn(
        "max-[426px]:px-3 py-5 px-10 outline-none bg-transparent backdrop-blur-[38px] border border-[#313131] sm:max-w-[650px] rounded-3xl flex flex-col gap-2",
        className
      )}
    >
      {showBackButton && (
        <div className="w-full flex justify-start items-center">
          <BackButton isLoading={isLoading} className={`p-0!`} />
        </div>
      )}
      {step && (
        <div className="flex justify-start items-center">
          <h2 className="text-[#FFD400] text-xl font-medium">
            STEP {step} OF <span>3</span>
          </h2>
        </div>
      )}

      <FormTitle className={titleClasses} title={title} />
      {subTitle && (
        <FormSubTitle subTitle={subTitle} className={subTitleClasses} />
      )}
      <div className="">{children}</div>
    </div>
  );
};

const FormTitle = ({ className, title }) => {
  return (
    <div
      className={cn(
        "sm:text-5xl min-[426px]:text-4xl text-3xl font-bold text-white",
        className
      )}
    >
      {title}
    </div>
  );
};

const FormSubTitle = ({ subTitle, className }) => {
  return (
    <p
      className={cn(
        "font-medium md:text-xl min-[425px]:text-lg text-sm mt-2",
        className
      )}
    >
      {subTitle}
    </p>
  );
};

export default CustomAuthForm;
