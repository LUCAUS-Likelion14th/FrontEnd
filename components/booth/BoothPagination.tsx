"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function BoothPagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-6 h-6 flex items-center justify-center disabled:opacity-30"
      >
        <FiChevronLeft size={24} />
      </button>

      {pages.map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-7 h-7 flex items-center justify-center rounded-full text-base transition-colors ${
              isActive
                ? "bg-primary text-white"
                : "text-text-sub"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-6 h-6 flex items-center justify-center disabled:opacity-30"
      >
        <FiChevronRight size={24} />
      </button>
    </div>
  );
}
