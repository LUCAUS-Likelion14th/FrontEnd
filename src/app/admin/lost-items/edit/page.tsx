"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { adminLostApi } from "@/api/adminLostApi";
import { LostItem } from "@/types/lost";

const PAGE_SIZE = 10;

export default function LostItemEditPage() {
  const [items, setItems] = useState<LostItem[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    adminLostApi
      .getLostItems(page, PAGE_SIZE)
      .then((res) => {
        setItems(res.content);
        setHasMore(!res.totalPages || page < res.totalPages - 1);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-topbar__title">분실물 수정하기</h1>
      </div>

      <div className="admin-main">
        <div className="admin-list-container">
          <p className="admin-list-instruction">수정할 분실물을 선택하세요</p>

          {loading ? (
            <p style={{ color: "#8d97a7", textAlign: "center", padding: "40px 0" }}>불러오는 중...</p>
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
                      <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    )}
                  </div>
                  <div className="admin-grid-item__content">
                    <div className="admin-grid-item__title">{item.name}</div>
                    <div className="admin-grid-item__meta">
                      <span className="admin-grid-item__date">{item.date}</span>
                      <span className="admin-grid-item__location">{item.find_location}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="admin-pagination">
            <button
              className="admin-pagination-btn"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
            >
              <FiChevronLeft />
            </button>
            <button className="admin-pagination-page admin-pagination-page--active">
              {page + 1}
            </button>
            <button
              className="admin-pagination-btn"
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasMore}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
