"use client";

import BackButton from "@/components/common/BackButton";
import NoticeItem from "@/components/info/NoticeItem";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { notices } from "@/data/notice";
import { useState } from "react";

const ITEMS_PER_PAGE = 10;
const PAGE_GROUP_SIZE = 5;

export default function NoticePage() {
  const [page, setPage] = useState(1);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  const currentNotices = notices.slice(start, end);
  const totalPages = Math.ceil(notices.length / ITEMS_PER_PAGE);

  const currentGroup = Math.ceil(page / PAGE_GROUP_SIZE);
  const startPage = (currentGroup - 1) * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

  return (
    <main className="px-4 pt-2.5 pb-25">
      <div className="flex items-center gap-1 mb-4">
        <BackButton />
        <h1 className="text-[24px] font-semibold">축제기획단 공지</h1>
      </div>

      <section className="border-t border-[#DCE2E9]">
        {currentNotices.map((notice) => (
          <NoticeItem
            key={notice.id}
            id={notice.id}
            category={notice.category}
            title={notice.title}
            date={notice.date}
          />
        ))}
      </section>

      <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          <FiChevronLeft size={24} className="text-[#A1ABBC]" />
        </button>

        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i,
        ).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            className={`w-7 h-7 flex justify-center items-center rounded-full ${
              page === pageNum ? "bg-primary text-white" : "text-[#A1ABBC]"
            }`}
          >
            {pageNum}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          <FiChevronRight size={24} className="text-[#A1ABBC]" />
        </button>
      </div>
    </main>
  );
}
