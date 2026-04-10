"use client";

import BackButton from "@/components/common/BackButton";
import Pagination from "@/components/common/Pagination";
import NoticeItem from "@/components/info/NoticeItem";
import { noticeApi } from "@/lib/api/noticeApi";
import { Notice } from "@/types/notice";
import { useEffect, useState } from "react";

export default function NoticePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [noticeData, setNoticeData] = useState<Notice[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNotices() {
      setIsLoading(true);
      try {
        const response = await noticeApi.getNotices({
          page: currentPage - 1,
          size: 10,
          sort: ["important,desc", "createdAt,desc"],
        });
        setNoticeData(response.content);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("공지사항 로드 실패: ", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNotices();
  }, [currentPage]);

  return (
    <main className="px-4 pt-2.5 pb-25">
      <div className="flex items-center gap-1 mb-4">
        <BackButton />
        <h1 className="text-[24px] font-semibold">축제기획단 공지</h1>
      </div>

      <section className="border-t border-[#DCE2E9]">
        {isLoading ? (
          <div>로딩 중...</div>
        ) : noticeData.length > 0 ? (
          noticeData.map((notice) => (
            <NoticeItem
              key={notice.id}
              id={notice.id}
              category={
                notice.category.toLowerCase() as
                  | "important"
                  | "notice"
                  | "event"
              }
              title={notice.title}
              date={notice.createdAt.split("T")[0].replace(/-/g, ".")}
            />
          ))
        ) : (
          <div>공지사항이 없습니다.</div>
        )}
      </section>

      {totalPages > 0 && (
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onChange={setCurrentPage}
        />
      )}
    </main>
  );
}
