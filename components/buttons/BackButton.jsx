"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const BackButton = ({ className, isLoading }) => {
  const router = useRouter();
  return (
    <Button
      size={"lg"}
      className={cn(`bg-transparent`, className)}
      onClick={() => router.back()}
      disabled={isLoading}
    >
      <ArrowLeft className="size-5" />
      Back
    </Button>
  );
};

export default BackButton;
