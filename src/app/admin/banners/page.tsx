"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiArrowLeft, FiImage, FiTrash2 } from "react-icons/fi";
import { adminPromotionApi } from "@/api/adminPromotionApi";
import { Promotion } from "@/types/home";

export default function BannersAdminPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [instagram, setInstagram] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchPromotions = () => {
    setLoading(true);
    adminPromotionApi
      .getPromotions()
      .then(setPromotions)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCreate = async () => {
    if (!image) {
      alert("이미지를 선택해주세요.");
      return;
    }
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("instagram", instagram);
      await adminPromotionApi.createPromotion(formData);
      alert("배너가 등록되었습니다.");
      setInstagram("");
      setImage(null);
      setPreviewUrl("");
      fetchPromotions();
    } catch (error) {
      console.error(error);
      alert("등록에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("배너를 삭제하시겠습니까?")) return;
    try {
      await adminPromotionApi.deletePromotion(id);
      setPromotions((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error(error);
      alert("삭제에 실패했습니다.");
    }
  };

  return (
    <>
      <div className="admin-topbar">
        <div className="admin-topbar__left">
          <Link href="/admin" className="admin-topbar__back">
            <FiArrowLeft /> 뒤로
          </Link>
          <h1 className="admin-topbar__title">배너 등록/수정</h1>
        </div>
      </div>

      <div className="admin-main">
        {/* 등록 폼 */}
        <div className="admin-section">
          <div className="admin-section__header">
            <h2 className="admin-section__title">새 배너 등록</h2>
          </div>

          <div className="admin-form">
            <div
              className="admin-form__image-upload"
              onClick={() => fileInputRef.current?.click()}
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="배너 미리보기"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <>
                  <FiImage size={48} color="#8d97a7" />
                  <span>배너 이미지를 업로드하세요</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>

            <div className="admin-form__field">
              <label className="admin-form__label">인스타그램 URL :</label>
              <input
                type="text"
                className="admin-form__input"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="https://www.instagram.com/..."
              />
            </div>

            <div className="admin-form__actions">
              <button
                className="admin-form__submit"
                onClick={handleCreate}
                disabled={isSubmitting}
              >
                {isSubmitting ? "등록 중..." : "등록하기"}
              </button>
            </div>
          </div>
        </div>

        {/* 현재 배너 목록 */}
        <div className="admin-section">
          <div className="admin-section__header">
            <h2 className="admin-section__title">현재 배너 목록</h2>
            <span className="admin-section__badge">{promotions.length}개</span>
          </div>

          {loading ? (
            <p style={{ color: "#8d97a7", textAlign: "center", padding: "40px 0" }}>
              불러오는 중...
            </p>
          ) : promotions.length === 0 ? (
            <p style={{ color: "#8d97a7", textAlign: "center", padding: "40px 0" }}>
              등록된 배너가 없습니다.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {promotions.map((promo) => (
                <div
                  key={promo.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: 16,
                    background: "#fff",
                    borderRadius: 12,
                    border: "1px solid #e8ecf1",
                  }}
                >
                  <img
                    src={promo.image}
                    alt="배너"
                    style={{
                      width: 120,
                      height: 60,
                      objectFit: "cover",
                      borderRadius: 8,
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ flex: 1, fontSize: 14, color: "#4a5568" }}>
                    {promo.instagram || "인스타그램 없음"}
                  </span>
                  <button
                    onClick={() => handleDelete(promo.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "6px 14px",
                      background: "transparent",
                      border: "1px solid #e53e3e",
                      color: "#e53e3e",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontSize: 13,
                    }}
                  >
                    <FiTrash2 size={14} />
                    삭제
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
