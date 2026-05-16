"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { adminNoticeApi } from "@/api/adminNoticeApi";
import { Notice } from "@/types/notice";

const PAGE_SIZE = 10;

export default function NoticeEditPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    adminNoticeApi
      .getNotices()
      .then((res) => {
        setNotices(res.content);
        setTotalPages(res.totalPages);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-topbar__title">공지 수정하기</h1>
      </div>

      <div className="admin-main">
        <div className="admin-list-container">
          <p className="admin-list-instruction">수정할 공지를 선택하세요</p>

          {loading ? (
            <p className="admin-loading">불러오는 중...</p>
          ) : (
            <div className="admin-list">
              {notices.map((notice) => (
                <Link
                  href={`/admin/notices/edit/${notice.id}`}
                  key={notice.id}
                  className="admin-list-item"
                >
                  <span className={`admin-list-badge ${notice.important ? "admin-list-badge--important" : "admin-list-badge--normal"}`}>
                    {notice.important ? "중요" : "공지"}
                  </span>
                  <span className="admin-list-title">{notice.title}</span>
                  <span className="admin-list-date">{notice.createdAt}</span>
                </Link>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="admin-pagination">
              <button
                className="admin-pagination-btn"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
              >
                <FiChevronLeft />
              </button>
              {pageNumbers.map((n) => (
                <button
                  key={n}
                  className={`admin-pagination-page ${n === page ? "admin-pagination-page--active" : ""}`}
                  onClick={() => setPage(n)}
                >
                  {n + 1}
                </button>
              ))}
              <button
                className="admin-pagination-btn"
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
              >
                <FiChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
