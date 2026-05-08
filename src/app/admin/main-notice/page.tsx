"use client";

import { useEffect, useState } from "react";
import { adminNoticeApi } from "@/lib/api/adminNoticeApi";
import { Notice } from "@/types/notice";

export default function MainNoticeAdminPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [submittingId, setSubmittingId] = useState<number | null>(null);

  useEffect(() => {
    adminNoticeApi
      .getNotices()
      .then((res) => setNotices(res.content))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSetActive = async (notice: Notice) => {
    setSubmittingId(notice.id);
    try {
      if (notice.active) {
        await adminNoticeApi.setInactive(notice.id);
        setNotices((prev) =>
          prev.map((n) => (n.id === notice.id ? { ...n, active: false } : n))
        );
      } else {
        await adminNoticeApi.setActive(notice.id);
        setNotices((prev) =>
          prev.map((n) => ({ ...n, active: n.id === notice.id }))
        );
      }
    } catch (error) {
      console.error(error);
      alert("변경에 실패했습니다.");
    } finally {
      setSubmittingId(null);
    }
  };

  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-topbar__title">메인 공지 설정</h1>
        <div className="admin-topbar__actions">
          <span style={{ fontSize: 13, color: "#8d97a7" }}>
            메인 화면에 고정할 공지를 선택하세요
          </span>
        </div>
      </div>

      <div className="admin-main">
        <div className="admin-section">
          <div className="admin-section__header">
            <h2 className="admin-section__title">공지 목록</h2>
            <span className="admin-section__badge">{notices.length}개</span>
          </div>

          {loading ? (
            <p style={{ color: "#8d97a7", textAlign: "center", padding: "40px 0" }}>
              불러오는 중...
            </p>
          ) : (
            <div className="admin-list">
              {notices.map((notice) => (
                <div key={notice.id} className="admin-list-item" style={{ cursor: "default" }}>
                  <span
                    className={`admin-list-badge ${
                      notice.important ? "admin-list-badge--important" : "admin-list-badge--normal"
                    }`}
                  >
                    {notice.important ? "중요" : "공지"}
                  </span>
                  <span className="admin-list-title">{notice.title}</span>
                  <span className="admin-list-date">{notice.createdAt}</span>
                  <button
                    onClick={() => handleSetActive(notice)}
                    disabled={submittingId === notice.id}
                    style={{
                      marginLeft: 12,
                      padding: "5px 14px",
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      border: notice.active ? "none" : "1px solid #9a0000",
                      background: notice.active ? "#9a0000" : "transparent",
                      color: notice.active ? "#fff" : "#9a0000",
                      flexShrink: 0,
                    }}
                  >
                    {submittingId === notice.id
                      ? "처리 중..."
                      : notice.active
                      ? "고정 중 (해제)"
                      : "메인 고정"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
