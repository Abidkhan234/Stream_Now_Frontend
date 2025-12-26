"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import DashPagination from "../pagination/dash-pagination";
import FilterBtns from "../components/filter-btns";
import Link from "next/link";
import { SidebarSeparator } from "@/components/ui/sidebar";

const DashBoardPageLayout = ({
  pageTitle = "",
  btnText = "",
  btnClass,
  isTitleShow = true,
  isAddBtnShow = true,
  itemsPerPage,
  to = "",
  totalLength,
  currentPage,
  onPageChange,
  isLoading,
  noPagination = false,
  children,
}) => {
  return (
    <div className="flex flex-col justify-between w-full min-h-screen px-6 pt-23">
      {isTitleShow && (
        <div
          className={`flex ${
            isAddBtnShow
              ? "flex-row justify-between items-center"
              : "flex-col items-start gap-3.5"
          }`}
        >
          <h2 className="font-semibold text-3xl">{pageTitle}</h2>
          {isAddBtnShow ? (
            <Link href={to}>
              <Button
                className={cn(
                  "flex items-center gap-2 rounded-[18px] text-sm py-6",
                  btnClass
                )}
              >
                <Plus className="size-[22px]" />
                {btnText}
              </Button>
            </Link>
          ) : (
            <FilterBtns />
          )}
        </div>
      )}

      <SidebarSeparator className={`my-2 mt-3`} />

      <div className="grow border-border pt-5 shrink-0 w-full">{children}</div>

      {!noPagination && (
        <div className="flex items-center justify-between shrink-0 border-t border-border pt-5 py-4">
          <>
            <DashPagination
              isLoading={isLoading}
              itemsPerPage={itemsPerPage}
              totalLength={totalLength}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </>
          <span className="md:text-lg text-sm opacity-70">
            2025 Inevia, All Rights Reserved
          </span>
        </div>
      )}
    </div>
  );
};

export default DashBoardPageLayout;
