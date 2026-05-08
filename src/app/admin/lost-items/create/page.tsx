"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FiChevronDown, FiImage } from "react-icons/fi";
import { adminLostApi } from "@/lib/api/adminLostApi";

export default function LostItemCreatePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dates = ["5월 18일 (월)", "5월 19일 (화)", "5월 20일 (수)", "5월 21일 (목)", "5월 22일 (금)"];
  const categories = ["전자기기", "지갑/카드", "화장품", "우산", "기타"];

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim() || !location.trim() || !date || !category) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("find_location", location);
      formData.append("date", date);
      formData.append("item_type", category);
      if (image) {
        formData.append("image", image);
      }
      
      await adminLostApi.createLostItem(formData);
      
      alert("분실물이 등록되었습니다.");
      router.push("/admin/lost-items");
    } catch (error) {
      console.error(error);
      alert("등록에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-topbar__title">분실물 등록하기</h1>
      </div>

      <div className="admin-main">
        <div className="admin-form">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '16px' }}>
            {/* 좌측: 이름, 위치 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="admin-form__field">
                <label className="admin-form__label" style={{ minWidth: 90 }}>분실물 이름 :</label>
                <input
                  type="text"
                  className="admin-form__input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="분실물 이름을 입력하세요"
                />
              </div>
              <div className="admin-form__field">
                <label className="admin-form__label" style={{ minWidth: 90 }}>발견 위치 :</label>
                <input
                  type="text"
                  className="admin-form__input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="발견 위치를 입력하세요"
                />
              </div>
            </div>

            {/* 우측: 날짜, 종류 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="admin-form__field">
                <label className="admin-form__label" style={{ minWidth: 60 }}>날짜 :</label>
                <div className="admin-form__select-wrapper">
                  <select 
                    className="admin-form__select"
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                  >
                    <option value="" disabled>날짜 선택</option>
                    {dates.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <FiChevronDown className="admin-form__select-icon" size={20} />
                </div>
              </div>
              <div className="admin-form__field">
                <label className="admin-form__label" style={{ minWidth: 60 }}>종류 :</label>
                <div className="admin-form__select-wrapper">
                  <select 
                    className="admin-form__select"
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="" disabled>종류 선택</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <FiChevronDown className="admin-form__select-icon" size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* 사진 업로드 */}
          <div className="admin-form__image-upload" onClick={handleImageClick}>
            {image ? (
              <img src={URL.createObjectURL(image)} alt="업로드된 사진" />
            ) : (
              <>
                <FiImage size={48} color="#8d97a7" />
                <span>사진을 업로드하세요</span>
              </>
            )}
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleImageChange}
            />
          </div>

          {/* 옵션 영역 */}
          <div className="admin-form__options">
            <div className="admin-form__option-row">
              <span className="admin-form__option-label">
                분실물 페이지에 노출하시겠습니까?
              </span>
              <div className="admin-form__radio-group">
                <label className="admin-form__radio">
                  <input
                    type="radio"
                    name="isVisible"
                    checked={isVisible === true}
                    onChange={() => setIsVisible(true)}
                  />
                  <span className="admin-form__radio-custom" />
                  <span>예</span>
                </label>
                <label className="admin-form__radio">
                  <input
                    type="radio"
                    name="isVisible"
                    checked={isVisible === false}
                    onChange={() => setIsVisible(false)}
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
