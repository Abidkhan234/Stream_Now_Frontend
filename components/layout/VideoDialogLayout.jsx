import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import arrowLeft from "@/public/Account-Page/arrow-left.svg";
import videoImage from "@/public/Video-Dialog/d286bf6a492eb618c4d0cfe164c9bd663c11628f.png";
import pauseIcon from "@/public/Video-Dialog/Pause.svg";
import volumeIcon from "@/public/Video-Dialog/Volume Loud.svg";
import libraryIcon from "@/public/Video-Dialog/Library.svg";
import settingIcon from "@/public/Video-Dialog/Settings.svg";
import fullScreenIcon from "@/public/Video-Dialog/Full Screen.svg";

import Image from "next/image";
import PlayButton from "../buttons/PlayButton";

const VideoDialogLayout = ({ movieDetail }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <PlayButton />
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className={`bg-[#181818] border-none h-[95%] w-[90%] !max-w-full p-0 outline-none overflow-y-auto`}
      >
        <DialogHeader className={`overflow-visible`}>
          <DialogTitle className={`h-[700px] !rounded-none relative`}>
            <Image
              src={videoImage}
              className="object-cover"
              fill
              sizes="100%"
              alt="video"
            />
            {/* <div className="absolute bottom-0 left-0 right-0 bg-black opacity-85 backdrop-blur-[8px] z-20 h-[70px] sm:px-10 px-5 content-center overflow-x-auto">
              <div className="w-full flex justify-between items-center">
                <div className="flex items-center gap-5 shrink-0">
                  <>
                    <VideoIconBtn icon={pauseIcon} />
                  </>
                  <>
                    <VideoIconBtn icon={volumeIcon} />
                  </>
                  <div className="flex items-center gap-2 text-white">
                    <h5 className="sm:text-xl text-lg font-semibold">Jurassic World</h5>
                    <span className="opacity-50 sm:text-sm text-xs">Fallen Kingdom</span>
                  </div>
                </div>

                <div className="flex items-center sm:gap-7 gap-5 shrink-0">
                  <>
                    <VideoIconBtn icon={settingIcon} />
                  </>
                  <>
                    <VideoIconBtn icon={libraryIcon} />
                  </>
                  <>
                    <VideoIconBtn icon={fullScreenIcon} />
                  </>
                </div>
              </div>
            </div> */}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <DialogClose
          className={`absolute top-3 left-4 outline-none rounded-full bg-[#333333] p-1.5 z-50 cursor-pointer`}
        >
          <Image
            src={arrowLeft}
            alt="video"
            className="size-[25px]"
            width={`auto`}
            height={`auto`}
          />
        </DialogClose>
        <DialogFooter className={`py-5 px-2.5`}>
          <>{movieDetail}</>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const VideoIconBtn = ({ icon }) => {
  return (
    <button className="cursor-pointer">
      <Image
        src={icon}
        className="size-[25px]"
        width={"auto"}
        height={"auto"}
        alt="volume-icon"
      />
    </button>
  );
};

export default VideoDialogLayout;
