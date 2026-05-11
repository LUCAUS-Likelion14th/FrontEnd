"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { FiChevronDown, FiImage } from "react-icons/fi";
import { adminLostApi } from "@/lib/api/adminLostApi";
import { LostItem } from "@/types/lost";

const dates = [
  { value: "05.18", label: "5월 18일 (월)" },
  { value: "05.19", label: "5월 19일 (화)" },
  { value: "05.20", label: "5월 20일 (수)" },
  { value: "05.21", label: "5월 21일 (목)" },
  { value: "05.22", label: "5월 22일 (금)" },
];
const categories = ["전자기기", "지갑/카드", "화장품", "우산", "기타"];

export default function LostItemEditDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const lostId = Number(id);

  const [item, setItem] = useState<LostItem | null>(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    adminLostApi
      .getLostItems(0, 100)
      .then((res) => {
        const found = res.find((i) => i.lost_id === lostId);
        if (found) {
          setItem(found);
          setName(found.name);
          setLocation(found.find_location);
          setDate(found.date);
          setPreviewUrl(found.image);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [lostId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
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
      formData.append("category", category);
      if (image) formData.append("image", image);

      await adminLostApi.updateLostItem(lostId, formData);
      alert("분실물이 수정되었습니다.");
      router.push("/admin/lost-items/edit");
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
      await adminLostApi.deleteLostItem(lostId);
      alert("분실물이 삭제되었습니다.");
      router.push("/admin/lost-items/edit");
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
        <h1 className="admin-topbar__title">분실물 수정하기</h1>
      </div>

      <div className="admin-main">
        <div className="admin-form">
          <div className="admin-form__grid">
            <div className="admin-form__grid-col">
              <div className="admin-form__field">
                <label className="admin-form__label">분실물 이름 :</label>
                <input
                  type="text"
                  className="admin-form__input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="분실물 이름을 입력하세요"
                />
              </div>
              <div className="admin-form__field">
                <label className="admin-form__label">발견 위치 :</label>
                <input
                  type="text"
                  className="admin-form__input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="발견 위치를 입력하세요"
                />
              </div>
            </div>

            <div className="admin-form__grid-col">
              <div className="admin-form__field">
                <label className="admin-form__label">날짜 :</label>
                <div className="admin-form__select-wrapper">
                  <select className="admin-form__select" value={date} onChange={(e) => setDate(e.target.value)}>
                    <option value="" disabled>날짜 선택</option>
                    {dates.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                  </select>
                  <FiChevronDown className="admin-form__select-icon" size={20} />
                </div>
              </div>
              <div className="admin-form__field">
                <label className="admin-form__label">종류 :</label>
                <div className="admin-form__select-wrapper">
                  <select className="admin-form__select" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="" disabled>종류 선택</option>
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <FiChevronDown className="admin-form__select-icon" size={20} />
                </div>
              </div>
            </div>
          </div>

          <div className="admin-form__image-upload" onClick={() => fileInputRef.current?.click()}>
            {previewUrl ? (
              <img src={previewUrl} alt="분실물 사진" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
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
