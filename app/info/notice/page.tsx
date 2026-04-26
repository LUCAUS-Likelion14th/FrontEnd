"use client";

import Pagination from "@/components/common/Pagination";
import DetailHeader from "@/components/detail/DetailHeader";
import NoticeItem from "@/components/info/NoticeItem";
import { noticeApi } from "@/lib/api/noticeApi";
import { formatDate } from "@/lib/utils/date";
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
    <main className="pb-25">
      <DetailHeader title="축제기획단 공지" />

      <div className="px-4">
        <section className="border-t border-text-sub2">
          {isLoading ? (
            <div>로딩 중...</div>
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
      </div>
    </main>
  );
}
