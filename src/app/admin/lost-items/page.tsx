import Link from "next/link";
import { MdAddCircleOutline, MdEditNote } from "react-icons/md";

export default function LostItemsAdminPage() {
  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-topbar__title">분실물</h1>
        <div className="admin-topbar__actions">
          <span style={{ fontSize: 13, color: "#8d97a7" }}>
            분실물 관리
          </span>
        </div>
      </div>

      <div className="admin-main">
        <div className="admin-section">
          <div className="admin-section__header">
            <h2 className="admin-section__title">분실물 관리</h2>
            <span className="admin-section__badge">2개 항목</span>
          </div>

          <div className="admin-cards">
            <Link href="/admin/lost-items/create" className="admin-card">
              <div className="admin-card__icon-wrapper">
                <MdAddCircleOutline />
              </div>
              <div className="admin-card__label">분실물 등록하기</div>
              <div className="admin-card__description">
                새로운 분실물을 접수하고
                <br />
                등록합니다
              </div>
            </Link>

            <Link href="/admin/lost-items/edit" className="admin-card">
              <div className="admin-card__icon-wrapper">
                <MdEditNote />
              </div>
              <div className="admin-card__label">분실물 수정하기</div>
              <div className="admin-card__description">
                등록된 분실물 정보를 수정하거나
                <br />
                상태를 변경합니다
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
