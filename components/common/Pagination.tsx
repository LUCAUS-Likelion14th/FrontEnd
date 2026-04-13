"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const PAGE_GROUP_SIZE = 5;

export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const currentGroup = Math.ceil(page / PAGE_GROUP_SIZE);
  const startPage = (currentGroup - 1) * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <div className="fixed bottom-23 left-0 right-0 w-full flex justify-center gap-2 mt-6">
      <button
        onClick={() => onChange(Math.max(page - 1, 1))}
        disabled={page === 1}
      >
        <FiChevronLeft size={24} className="text-[#A1ABBC]" />
      </button>

      {pages.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onChange(pageNum)}
          className={`w-7 h-7 flex justify-center items-center rounded-full  ${
            page === pageNum ? "bg-primary text-white" : "text-[#A1ABBC]"
          }`}
        >
          {pageNum}
        </button>
      ))}

      <button
        onClick={() => onChange(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
      >
        <FiChevronRight size={24} className="text-[#A1ABBC]" />
      </button>
    </div>
  );
}
