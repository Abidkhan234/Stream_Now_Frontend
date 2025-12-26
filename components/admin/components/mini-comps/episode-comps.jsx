"use client";

import { Button } from "@/components/ui/button";

import useAdminContext from "@/contexts/adminContext";
import AdminInput from "../inputs/admin-input";
import ParentDiv from "../shared/element-div";
import AdminVideoUpload from "../inputs/admin-video-upload";
import { useField } from "formik";
import { useEffect } from "react";

const EpisodeSeasonList = ({ list = 0 }) => {
  const { activeSeason, setActiveSeason } = useAdminContext();

  const items = Array.from({ length: list }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-4">
      {items.map((_, i) => (
        <Button
          className={`py-5 rounded-[18px] ${
            !(activeSeason == i + 1) && "bg-[#0C0C0C] opacity-80"
          }`}
          onClick={() => setActiveSeason(i + 1)}
          key={i}
        >
          Season {i + 1}
        </Button>
      ))}
    </div>
  );
};

const EpisodeCard = ({
  episodeNo = 1,
  titleName,
  descriptionName,
  episodeName,
  localPreview,
  setLocalPreview,
  id,
  name,
}) => {
  const [field, meta, helper] = useField(name);
  // Check if we have a file/preview for this specific card index
  const hasVideo = localPreview && localPreview[id];

  useEffect(() => {
    helper.setValue(episodeNo);
  }, [episodeNo]);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-medium text-2xl">Episode {episodeNo}</h3>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-3">
          {hasVideo ? (
            <ParentDiv
              className={`p-0 rounded-[22px] h-[225px] w-full overflow-hidden`}
            >
              <video
                src={localPreview[id]?.play_url}
                controls
                className="w-full h-full object-cover"
              ></video>
            </ParentDiv>
          ) : (
            <AdminVideoUpload
              name={episodeName}
              title={`Drop video files to upload`}
              localPreview={localPreview}
              setLocalPreview={setLocalPreview}
              islocalPreview={true}
              className={`rounded-[22px] h-[225px] w-full`}
            />
          )}
        </div>
        <div className="col-span-9 flex flex-col gap-3">
          <>
            <AdminInput
              labelText="Episode Title (required)"
              placeholder="Episode name"
              name={titleName}
              maxLength={50}
              totalLength={50}
            />
          </>
          <>
            <AdminInput
              labelText="Description"
              placeholder="Episode description"
              name={descriptionName}
              maxLength={500}
              totalLength={500}
            />
          </>
        </div>
      </div>
    </div>
  );
};

export { EpisodeSeasonList, EpisodeCard };
