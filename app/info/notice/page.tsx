"use client";

import BackButton from "@/components/common/BackButton";
import Pagination from "@/components/common/Pagination";
import NoticeItem from "@/components/info/NoticeItem";
import { notices } from "@/data/notice";
import { useState } from "react";

const ITEMS_PER_PAGE = 10;

export default function NoticePage() {
  const [currentPage, setCurrentPage] = useState(1);

  const sortedNotices = [...notices].sort((a, b) => {
    if (a.category === "important" && b.category !== "important") return -1;
    if (a.category !== "important" && b.category === "important") return 1;

    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const totalPages = Math.ceil(sortedNotices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = sortedNotices.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <main className="px-4 pt-2.5 pb-25">
      <div className="flex items-center gap-1 mb-4">
        <BackButton />
        <h1 className="text-[24px] font-semibold">축제기획단 공지</h1>
      </div>

      <section className="border-t border-[#DCE2E9]">
        {currentData.map((notice) => (
          <NoticeItem
            key={notice.id}
            id={notice.id}
            category={notice.category}
            title={notice.title}
            date={notice.date}
          />
        ))}
      </section>

      <Pagination
        page={currentPage}
        totalPages={totalPages}
        onChange={setCurrentPage}
      />
    </main>
  );
}
