import { cn } from "@/lib/utils";

const ParentDiv = ({
  children,
  className,
  labelText,
  id = "",
  handleClick = null,
}) => {
  return (
    <div
      className={cn(
        "bg-[#0C0C0C] border border-border rounded-[16px] p-2 px-3 flex flex-col gap-2 relative w-full",
        className
      )}
      onClick={handleClick && handleClick}
    >
      {labelText && (
        <label htmlFor={id} className="text-xs font-medium">
          {labelText}
        </label>
      )}
      {children}
    </div>
  );
};

export default ParentDiv;
