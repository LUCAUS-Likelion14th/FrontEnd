"use client";

import { Pagination, DetailHeader, NoticeItem, LoadingScreen } from "@/components";
import { FiBell } from "react-icons/fi";
import { formatDate } from "@/lib/utils/date";
import { useState } from "react";
import { useNotices } from "@/hooks/queries/notice";

export default function NoticePage() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useNotices({
    page: currentPage - 1,
    size: 10,
    sort: ["important,desc", "createdAt,desc"],
  });

  if (isLoading) return <LoadingScreen />;

  const noticeData = data?.content ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <main className="pb-25">
      <DetailHeader title="축제기획단 공지" />

      <div className="px-4">
        <div className="flex items-center h-12 px-[11.5px] mb-7 bg-[#EEF3FB] rounded-[10px] gap-2">
          <FiBell size={18} className="text-primary shrink-0" />
          <span className="text-[14px] text-primary leading-4.5">
            축제기획단의 공지사항을 확인하세요.
          </span>
        </div>

        <section className="border-t border-text-sub2">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[#DCE2E9]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-7.75 rounded-[8px] bg-gray-200 animate-pulse" />
                  <div className="w-40 h-5 rounded bg-gray-200 animate-pulse" />
                </div>
                <div className="w-16 h-5 rounded bg-gray-200 animate-pulse" />
              </div>
            ))
          ) : noticeData.length > 0 ? (
            noticeData.map((notice) => (
              <NoticeItem
                key={notice.id}
                id={notice.id}
                category={notice.important ? "important" : "notice"}
                title={notice.title}
                date={formatDate(notice.createdAt, "notice")}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-16">
              <div className="w-16 h-16 rounded-full bg-[#EEF3FB] flex items-center justify-center">
                <FiBell size={28} className="text-[#06387D]" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-[15px] font-semibold text-[#3B4A5A]">등록된 공지사항이 없어요</p>
                <p className="text-[13px] text-text-sub">새로운 공지가 올라오면 알려드릴게요</p>
              </div>
            </div>
          )}
        </section>

        {totalPages > 0 && (
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onChange={setCurrentPage}
          />
        )}
      </div>
    </main>
  );
}
