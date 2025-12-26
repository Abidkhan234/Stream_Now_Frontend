"use client";

import { useField } from "formik";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

import ParentDiv from "../shared/element-div";
import Image from "next/image";
import sendIcon from "@/public/icons/send-square.svg";
import closeIcon from "@/public/icons/close.svg";

const AdminFileInput = ({
  name = "",
  title = "",
  subTitle = "",
  className,
  isSubmitted,
}) => {
  const inputRef = useRef(null);
  const [field, meta, helper] = useField(name);
  const [preview, setPreview] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      helper.setValue("");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    helper.setValue(file);
  };

  useEffect(() => {
    if (!isSubmitted) {
      setPreview(false);
    }
  }, [isSubmitted]);

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <ParentDiv
      className={cn(
        `w-full h-full items-center justify-center relative ${
          !preview && "cursor-pointer"
        } overflow-hidden ${
          meta.touched && meta.error && "border-destructive"
        }`,
        className
      )}
      handleClick={() => (!preview ? handleClick() : null)}
    >
      {!preview ? (
        <>
          <Image src={sendIcon} width={24} height={24} alt="send-icon" />
          <h5 className="text-sm font-medium opacity-80">{title}</h5>
          <span className="opacity-60 text-xs">{subTitle}</span>
        </>
      ) : (
        <>
          <Image
            src={preview}
            className="object-cover object-center"
            alt="preview-image"
            fill
            sizes="100%"
          />
          <button
            className="z-30 absolute size-[32px] bg-[#0C0C0C] rounded-full top-2 right-2 flex items-center justify-center cursor-pointer"
            onClick={() => {
              setPreview(null);
              helper.setValue("");
            }}
          >
            <Image src={closeIcon} alt="close-icon" width={16} height={16} />
          </button>
        </>
      )}

      <input
        type="file"
        onChange={(e) => handleFile(e)}
        className="hidden"
        ref={inputRef}
      />
    </ParentDiv>
  );
};

export default AdminFileInput;
