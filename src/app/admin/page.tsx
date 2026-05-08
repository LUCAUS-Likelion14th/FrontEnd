import Link from "next/link";
import { MdImage, MdNotificationsActive, MdArticle, MdSearchOff } from "react-icons/md";
import { FiChevronRight } from "react-icons/fi";

export default function AdminHomePage() {
  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-topbar__title">홈</h1>
      </div>

      <div className="admin-main">
        <div className="admin-section">
          <div className="admin-section__header">
            <h2 className="admin-section__title">홈 화면 관리</h2>
            <span className="admin-section__badge">2개 항목</span>
          </div>

          <div className="admin-cards admin-cards--column">
            <Link href="/admin/banners" className="admin-card">
              <div className="admin-card__icon-wrapper">
                <MdImage />
              </div>
              <div className="admin-card__body">
                <div className="admin-card__label">배너 등록/수정</div>
                <div className="admin-card__description">
                  메인 페이지에 표시되는 배너 이미지를 등록하거나 수정합니다
                </div>
              </div>
              <FiChevronRight className="admin-card__arrow" />
            </Link>

            <Link href="/admin/main-notice" className="admin-card">
              <div className="admin-card__icon-wrapper">
                <MdNotificationsActive />
              </div>
              <div className="admin-card__body">
                <div className="admin-card__label">메인 공지 설정</div>
                <div className="admin-card__description">
                  메인 페이지 상단에 표시되는 공지사항을 설정합니다
                </div>
              </div>
              <FiChevronRight className="admin-card__arrow" />
            </Link>
          </div>
        </div>

        <div className="admin-section">
          <div className="admin-section__header">
            <h2 className="admin-section__title">빠른 바로가기</h2>
          </div>

          <div className="admin-cards admin-cards--column">
            <Link href="/admin/notices" className="admin-card">
              <div className="admin-card__icon-wrapper">
                <MdArticle />
              </div>
              <div className="admin-card__body">
                <div className="admin-card__label">공지사항 관리</div>
                <div className="admin-card__description">
                  축제 공지사항을 작성하고 관리합니다
                </div>
              </div>
              <FiChevronRight className="admin-card__arrow" />
            </Link>

            <Link href="/admin/lost-items" className="admin-card">
              <div className="admin-card__icon-wrapper">
                <MdSearchOff />
              </div>
              <div className="admin-card__body">
                <div className="admin-card__label">분실물 관리</div>
                <div className="admin-card__description">
                  분실물을 등록하고 관리합니다
                </div>
              </div>
              <FiChevronRight className="admin-card__arrow" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
