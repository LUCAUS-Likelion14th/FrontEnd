"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminNoticeApi } from "@/lib/api/adminNoticeApi";

export default function NoticeCreatePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [isHomeExposed, setIsHomeExposed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      const notice = await adminNoticeApi.createNotice({ title, content });
      if (isPinned) await adminNoticeApi.setImportant(notice.id);
      if (isHomeExposed) await adminNoticeApi.setActive(notice.id);
      alert("공지가 등록되었습니다.");
      router.push("/admin/notices");
    } catch (error: any) {
      console.error(error);
      alert(error.message || "등록에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-topbar__title">공지 등록하기</h1>
      </div>

      <div className="admin-main">
        <div className="admin-form">
          {/* 제목 */}
          <div className="admin-form__field">
            <label className="admin-form__label" htmlFor="notice-title">
              제목 :
            </label>
            <input
              id="notice-title"
              type="text"
              className="admin-form__input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="공지사항 제목을 입력하세요"
            />
          </div>

          {/* 내용 */}
          <div className="admin-form__field">
            <label className="admin-form__label" htmlFor="notice-content">
              내용 :
            </label>
            <textarea
              id="notice-content"
              className="admin-form__textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="공지사항 내용을 입력하세요"
            />
          </div>

          {/* 옵션 영역 */}
          <div className="admin-form__options">
            {/* 중요 공지 여부 */}
            <div className="admin-form__option-row">
              <span className="admin-form__option-label">
                중요한 공지 (상단에 고정될 예정) 입니까?
              </span>
              <div className="admin-form__radio-group">
                <label className="admin-form__radio">
                  <input
                    type="radio"
                    name="isPinned"
                    checked={isPinned === true}
                    onChange={() => setIsPinned(true)}
                  />
                  <span className="admin-form__radio-custom" />
                  <span>예</span>
                </label>
                <label className="admin-form__radio">
                  <input
                    type="radio"
                    name="isPinned"
                    checked={isPinned === false}
                    onChange={() => setIsPinned(false)}
                  />
                  <span className="admin-form__radio-custom" />
                  <span>아니오</span>
                </label>
              </div>
            </div>

            {/* 홈 화면 노출 여부 */}
            <div className="admin-form__option-row">
              <span className="admin-form__option-label">
                홈 화면에 노출 (기존에 노출된 공지가 대체됩니다) 하시겠습니까?
              </span>
              <div className="admin-form__radio-group">
                <label className="admin-form__radio">
                  <input
                    type="radio"
                    name="isHomeExposed"
                    checked={isHomeExposed === true}
                    onChange={() => setIsHomeExposed(true)}
                  />
                  <span className="admin-form__radio-custom" />
                  <span>예</span>
                </label>
                <label className="admin-form__radio">
                  <input
                    type="radio"
                    name="isHomeExposed"
                    checked={isHomeExposed === false}
                    onChange={() => setIsHomeExposed(false)}
                  />
                  <span className="admin-form__radio-custom" />
                  <span>아니오</span>
                </label>
              </div>
            </div>
          </div>

          {/* 등록 버튼 */}
          <div className="admin-form__actions">
            <button
              className="admin-form__submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "등록 중..." : "등록하기"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
