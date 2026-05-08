import { MdTheaterComedy } from "react-icons/md";

export default function PerformancesAdminPage() {
  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-topbar__title">공연 관리</h1>
      </div>

      <div className="admin-main">
        <div className="admin-section">
          <div className="admin-section__header">
            <h2 className="admin-section__title">공연 목록</h2>
            <span className="admin-section__badge">준비 중</span>
          </div>
          <div
            style={{
              padding: 60,
              textAlign: "center",
              color: "#8d97a7",
              background: "#fff",
              borderRadius: 16,
              border: "1px solid #e8ecf1",
            }}
          >
            <MdTheaterComedy style={{ fontSize: 48, marginBottom: 12, opacity: 0.3 }} />
            <p style={{ fontSize: 15 }}>
              공연 관리 기능이 곧 추가됩니다.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
