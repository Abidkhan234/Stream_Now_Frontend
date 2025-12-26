"use client";

import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DashPagination = ({
  itemsPerPage,
  totalLength,
  currentPage,
  onPageChange,
  isLoading,
}) => {
  const totalPages = Math.ceil(totalLength / itemsPerPage);

  return (
    <div className="flex justify-between items-center z-10">
      <div className="flex items-center gap-4">
        <div className="text-base font-semibold">
          Showing {currentPage} of {totalPages}
        </div>
        <ButtonGroup
          className={`bg-[#161616] border border-[#3B3B3B] rounded-[8px]`}
        >
          <button
            disabled={currentPage === 1 || isLoading}
            onClick={() => onPageChange(currentPage - 1)}
            className={`bg-transparent py-1 px-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer`}
          >
            <ChevronLeft className="size-5" />
          </button>
          <ButtonGroupSeparator className={`border-[#3B3B3B]`} />
          <button
            disabled={currentPage === totalPages || isLoading}
            className={`bg-transparent py-1 px-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer`}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <ChevronRight className="size-5" />
          </button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default DashPagination;
