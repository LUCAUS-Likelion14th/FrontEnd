import Link from "next/link";
import { MdNoteAdd, MdEditNote } from "react-icons/md";
import { FiChevronRight } from "react-icons/fi";

export default function NoticesAdminPage() {
  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-topbar__title">공지사항</h1>
        <div className="admin-topbar__actions">
          <span className="admin-topbar__subtitle">총 공지 관리</span>
        </div>
      </div>

      <div className="admin-main">
        <div className="admin-section">
          <div className="admin-section__header">
            <h2 className="admin-section__title">공지사항 관리</h2>
            <span className="admin-section__badge">2개 항목</span>
          </div>

          <div className="admin-cards admin-cards--column">
            <Link href="/admin/notices/create" className="admin-card">
              <div className="admin-card__icon-wrapper">
                <MdNoteAdd />
              </div>
              <div className="admin-card__body">
                <div className="admin-card__label">공지 등록하기</div>
                <div className="admin-card__description">새로운 공지사항을 작성하고 등록합니다</div>
              </div>
              <FiChevronRight className="admin-card__arrow" />
            </Link>

            <Link href="/admin/notices/edit" className="admin-card">
              <div className="admin-card__icon-wrapper">
                <MdEditNote />
              </div>
              <div className="admin-card__body">
                <div className="admin-card__label">공지 수정하기</div>
                <div className="admin-card__description">기존 공지사항을 수정하거나 삭제합니다</div>
              </div>
              <FiChevronRight className="admin-card__arrow" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
