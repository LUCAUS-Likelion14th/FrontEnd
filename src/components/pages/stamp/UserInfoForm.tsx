"use client";

import { fetcher } from "@/lib/api/fetcher";
import { useState } from "react";
import { DetailHeader } from "../detail";
import Image from "next/image";
import RegisterModal from "./RegisterModal";

interface UserInfoFormProps {
  onComplete: () => void;
}

export default function UserInfoForm({ onComplete }: UserInfoFormProps) {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !studentId) {
      alert("이름과 학번을 모두 입력해 주세요.");
      return;
    }

    setIsModalOpen(true);
  };

  const handleFinalSubmit = async () => {
    setIsLoading(true);

    try {
      // 1. PATCH /stamp/init API 호출
      await fetcher<any>("/stamp/init", {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify({
          name: name,
          student_id: studentId,
        }),
      });

      setIsModalOpen(false);
      onComplete();
    } catch (error: any) {
      console.error("인적사항 등록 에러:", error);
      alert(error.message || "서버 통신 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="absolute inset-0 -z-10">
        <Image
          src="/stamp-register-bg.png"
          alt="도장판 인적사항 입력 배경 이미지"
          fill
          priority
          className="object-cover object-bottom"
        />
      </div>

      <div className="flex flex-col min-h-[calc(100vh-120px)]">
        <DetailHeader title="인적사항 입력" />

        <section className="flex-1 flex flex-col justify-center px-4">
          <form
            onSubmit={handlePreSubmit}
            className="flex flex-col gap-4.5 mb-[31px]"
          >
            <div className="flex items-center justify-center gap-12.5">
              <label className="text-[16px] font-normal">이름</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력해 주세요"
                className="w-[225px] bg-white border border-text-sub2 rounded-[10px] px-[15px] py-[10px] focus:outline-none focus:border-text-sub2"
              />
            </div>

            <div className="flex items-center justify-center gap-12.5">
              <label className="text-[16px] font-normal">학번</label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="학번을 입력해 주세요"
                className="w-[225px] bg-white border border-text-sub2 rounded-[10px] px-[15px] py-[10px] focus:outline-none focus:border-text-sub2"
              />
            </div>
          </form>

          <span className="text-[14px] font-normal text-text-sub text-center mb-7">
            입력하신 정보는 광장기획전 참여 상품 응모에 활용됩니다.
          </span>

          <button
            onClick={handlePreSubmit}
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white text-[16px] font-medium px-[15px] py-[10px] rounded-[10px] active:translate-y-0 active:scale-[0.98] transition-all duration-200"
          >
            별자리 완성하기
          </button>
        </section>
      </div>

      {isModalOpen && (
        <RegisterModal
          name={name}
          studentId={studentId}
          isLoading={isLoading}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleFinalSubmit}
        />
      )}
    </>
  );
}
