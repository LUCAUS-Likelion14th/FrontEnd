"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiArrowLeft, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { adminLostApi } from "@/api/adminLostApi";
import { LostItem } from "@/types/lost";

const PAGE_SIZE = 10;
const PAGE_GROUP_SIZE = 5;

export default function LostItemEditPage() {
  const [items, setItems] = useState<LostItem[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    adminLostApi
      .getLostItems(page, PAGE_SIZE)
      .then((res) => {
        setItems(res.content);
        setTotalPages(res.totalPages || 0);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page]);

  const displayPage = page + 1;

  const currentGroup = Math.ceil(displayPage / PAGE_GROUP_SIZE);
  const startPage = (currentGroup - 1) * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

  const pages = Array.from(
    { length: Math.max(0, endPage - startPage + 1) },
    (_, i) => startPage + i,
  );

  return (
    <>
      <div className="admin-topbar">
        <div className="admin-topbar__left">
          <Link href="/admin/lost-items" className="admin-topbar__back">
            <FiArrowLeft /> 뒤로
          </Link>
          <h1 className="admin-topbar__title">분실물 수정하기</h1>
        </div>
      </div>

      <div className="admin-main">
        <div className="admin-list-container">
          <p className="admin-list-instruction">수정할 분실물을 선택하세요</p>

          {loading ? (
            <p
              style={{
                color: "#8d97a7",
                textAlign: "center",
                padding: "40px 0",
              }}
            >
              불러오는 중...
            </p>
          ) : (
            <div className="admin-grid-list">
              {items.map((item) => (
                <Link
                  href={`/admin/lost-items/edit/${item.lost_id}`}
                  key={item.lost_id}
                  className="admin-grid-item"
                >
                  <div className="admin-grid-item__image">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>
                  <div className="admin-grid-item__content">
                    <div className="admin-grid-item__title">{item.name}</div>
                    <div className="admin-grid-item__meta">
                      <span className="admin-grid-item__date">{item.date}</span>
                      <span className="admin-grid-item__location">
                        {item.find_location}
                      </span>
                    </div>
                  </div>
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

              {pages.map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum - 1)}
                  className={`admin-pagination-page ${
                    displayPage === pageNum
                      ? "admin-pagination-page--active"
                      : ""
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                className="admin-pagination-btn"
                onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
                disabled={page >= totalPages - 1}
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
