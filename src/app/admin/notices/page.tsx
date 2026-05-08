import Link from "next/link";
import { MdNoteAdd, MdEditNote } from "react-icons/md";

export default function NoticesAdminPage() {
  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-topbar__title">공지사항</h1>
        <div className="admin-topbar__actions">
          <span style={{ fontSize: 13, color: "#8d97a7" }}>
            총 공지 관리
          </span>
        </div>
      </div>

      <div className="admin-main">
        <div className="admin-section">
          <div className="admin-section__header">
            <h2 className="admin-section__title">공지사항 관리</h2>
            <span className="admin-section__badge">2개 항목</span>
          </div>

          <div className="admin-cards">
            <Link href="/admin/notices/create" className="admin-card">
              <div className="admin-card__icon-wrapper">
                <MdNoteAdd />
              </div>
              <div className="admin-card__label">공지 등록하기</div>
              <div className="admin-card__description">
                새로운 공지사항을 작성하고
                <br />
                등록합니다
              </div>
            </Link>

            <Link href="/admin/notices/edit" className="admin-card">
              <div className="admin-card__icon-wrapper">
                <MdEditNote />
              </div>
              <div className="admin-card__label">공지 수정하기</div>
              <div className="admin-card__description">
                기존 공지사항을 수정하거나
                <br />
                삭제합니다
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
