import polygonIcon from "@/public/Home-page/Polygon 1.svg";
import Image from "next/image";
import { Button } from "../ui/button";
import { forwardRef } from "react";

const PlayButton = forwardRef(({ ...props }, ref) => {
  return (
    <Button
      ref={ref}
      {...props}
      className="!bg-[linear-gradient(180deg,rgba(22,22,22,0.75)_0%,rgba(45,45,45,0.75)_100%)] cursor-pointer !rounded-full size-[55px] flex justify-center items-center !border border-[#313131] bg-transparent"
    >
      <Image
        src={polygonIcon}
        className="size-[20px]"
        width={"auto"}
        height={"auto"}
        alt="polygon"
      />
    </Button>
  );
});

PlayButton.displayName = "PlayButton";

export default PlayButton;
