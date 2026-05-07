"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useMemo } from "react";
import { MyPageData } from "@/types/mypage";
import { FiChevronRight } from "react-icons/fi";

const TOTAL_STAMPS = 8; // TODO: 실제 전체 스탬프 개수로 변경

interface MypageClientProps {
  isLoggedIn: boolean;
  data: MyPageData;
}

export default function MypageClient({ isLoggedIn, data }: MypageClientProps) {
  const router = useRouter();

  const stampCount = 4; // mypage에 stamp 개수 없어서 생기면 연결
  const stampProgress = useMemo(
    () => Math.min((stampCount / TOTAL_STAMPS) * 100, 100),
    [stampCount],
  );

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.replace("/");
  };

  return (
    <main className="flex flex-col gap-4 pb-25">
      {!isLoggedIn ? (
        <div className="flex flex-col gap-8">
          <div
            className="flex items-end justify-end pt-13.5 pb-[15px] px-4 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/mypage-login-bg.png')" }}
          >
            <div className="flex flex-col items-end gap-2.5">
              <div className="flex flex-col text-base font-medium text-white text-right">
                <span>로그인 후</span>
                <span>청:ON을 더 즐겨보세요!</span>
              </div>
              <button
                onClick={() => router.push("/login")}
                className="bg-white w-[106px] text-primary text-base font-semibold rounded-[28px] p-2.5"
              >
                로그인
              </button>
            </div>
          </div>

          <div className="px-4 flex flex-col gap-8">
            <EmptyBox title="내 좋아요" />
            <EmptyBox title="도장판" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <div
            className="flex items-end justify-end pt-13.5 pb-[15px] px-4 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/mypage-login-bg.png')" }}
          >
            <div className="flex flex-col items-end gap-3">
              <span className="text-base font-medium text-white text-right">
                {data.name}님, 환영합니다!
              </span>
              <button
                onClick={handleLogout}
                className="bg-white text-primary text-base font-semibold w-[106px] rounded-[28px] p-2.5"
              >
                로그아웃
              </button>
            </div>
          </div>

          <div className="flex flex-col px-4 gap-8">
            {/* 좋아요 */}
            <div
              onClick={() => router.push("/mypage/likes")}
              className="flex flex-col gap-5 bg-white border border-primary rounded-[10px] px-4 py-3 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-[20px] font-semibold">내 좋아요</span>
                <FiChevronRight size={24} className="text-[#727272]" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {data.booth_like_list.map((booth) => (
                  <div
                    key={booth.booth_id}
                    className="flex flex-col border border-text-sub2 rounded-[7px] overflow-hidden"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={booth.booth_image}
                        alt={booth.booth_name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="px-2 py-1 border-light-gray bg-gradient-to-t from-white to-[#d9d9d9]">
                      <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                        {booth.booth_name}
                      </span>
                    </div>
                  </div>
                ))}

                {data.food_truck_like_list.map((truck) => (
                  <div
                    key={truck.id}
                    className="flex flex-col border border-text-sub2 rounded-[10px] overflow-hidden"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={truck.image}
                        alt={truck.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="px-2 py-1 border-light-gray bg-gradient-to-t from-white to-[#d9d9d9]">
                      <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                        {truck.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 도장판 */}
            <div
              onClick={() => router.push("/mypage/stamp")}
              className="flex flex-col bg-white border border-primary rounded-[10px] px-4 py-3 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-9">
                <span className="text-[20px] font-semibold">도장판</span>
                <FiChevronRight size={24} className="text-[#727272]" />
              </div>

              <span className="text-base text-center mb-8">
                {TOTAL_STAMPS}개 중 {stampCount}개를 모았어요
              </span>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-5">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${stampProgress}%` }}
                />
              </div>
              <span className="text-base text-text-sub text-center">
                광장기획전에 참여하고 푸짐한 경품 받아가세요!
              </span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function EmptyBox({ title }: { title: string }) {
  return (
    <div className="bg-white border rounded-[10px] p-4">
      <span className="font-semibold">{title}</span>
      <div className="text-center text-gray-400 mt-10 mb-16">
        로그인 후 확인할 수 있어요.
      </div>
    </div>
  );
}
