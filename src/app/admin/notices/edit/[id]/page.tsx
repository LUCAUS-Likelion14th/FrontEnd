"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { adminNoticeApi } from "@/lib/api/adminNoticeApi";
import { Notice } from "@/types/notice";

export default function NoticeEditDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const noticeId = Number(id);

  const [notice, setNotice] = useState<Notice | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [isHomeExposed, setIsHomeExposed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminNoticeApi
      .getNotices(0, 100)
      .then((res) => {
        const found = res.content.find((n) => n.id === noticeId);
        if (found) {
          setNotice(found);
          setTitle(found.title);
          setContent(found.content);
          setIsPinned(found.important);
          setIsHomeExposed(found.active);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [noticeId]);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      await adminNoticeApi.updateNotice(noticeId, { title, content });

      if (isPinned) await adminNoticeApi.setImportant(noticeId);
      if (isHomeExposed) {
        await adminNoticeApi.setActive(noticeId);
      } else if (notice?.active) {
        await adminNoticeApi.setInactive(noticeId);
      }

      alert("공지가 수정되었습니다.");
      router.push("/admin/notices/edit");
    } catch (error) {
      console.error(error);
      alert("수정에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    setIsSubmitting(true);
    try {
      await adminNoticeApi.deleteNotice(noticeId);
      alert("공지가 삭제되었습니다.");
      router.push("/admin/notices/edit");
    } catch (error) {
      console.error(error);
      alert("삭제에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-main">
        <p className="admin-loading">불러오는 중...</p>
      </div>
    );
  }

  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-topbar__title">공지 수정하기</h1>
      </div>

      <div className="admin-main">
        <div className="admin-form">
          <div className="admin-form__field">
            <label className="admin-form__label" htmlFor="notice-title">제목 :</label>
            <input
              id="notice-title"
              type="text"
              className="admin-form__input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="공지사항 제목을 입력하세요"
            />
          </div>

          <div className="admin-form__field">
            <label className="admin-form__label" htmlFor="notice-content">내용 :</label>
            <textarea
              id="notice-content"
              className="admin-form__textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="공지사항 내용을 입력하세요"
            />
          </div>

          <div className="admin-form__options">
            <div className="admin-form__option-row">
              <span className="admin-form__option-label">중요한 공지 (상단에 고정될 예정) 입니까?</span>
              <div className="admin-form__radio-group">
                <label className="admin-form__radio">
                  <input type="radio" name="isPinned" checked={isPinned === true} onChange={() => setIsPinned(true)} />
                  <span className="admin-form__radio-custom" />
                  <span>예</span>
                </label>
                <label className="admin-form__radio">
                  <input type="radio" name="isPinned" checked={isPinned === false} onChange={() => setIsPinned(false)} />
                  <span className="admin-form__radio-custom" />
                  <span>아니오</span>
                </label>
              </div>
            </div>

            <div className="admin-form__option-row">
              <span className="admin-form__option-label">홈 화면에 노출 하시겠습니까?</span>
              <div className="admin-form__radio-group">
                <label className="admin-form__radio">
                  <input type="radio" name="isHomeExposed" checked={isHomeExposed === true} onChange={() => setIsHomeExposed(true)} />
                  <span className="admin-form__radio-custom" />
                  <span>예</span>
                </label>
                <label className="admin-form__radio">
                  <input type="radio" name="isHomeExposed" checked={isHomeExposed === false} onChange={() => setIsHomeExposed(false)} />
                  <span className="admin-form__radio-custom" />
                  <span>아니오</span>
                </label>
              </div>
            </div>
          </div>

          <div className="admin-form__actions">
            <button className="admin-form__delete" onClick={handleDelete} disabled={isSubmitting}>
              삭제하기
            </button>
            <button className="admin-form__submit" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "저장 중..." : "수정하기"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
