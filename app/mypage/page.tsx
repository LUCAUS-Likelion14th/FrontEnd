"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { MyPageData } from "@/types/mypage"
import { FiChevronRight } from "react-icons/fi"

const mockData: MyPageData = {
  name: "푸앙이",
  like_count: 5,
  booth_like_list: [
    { booth_id: 1, location_id: 1, booth_image: "/img.png", booth_name: "부스 이름", booth_owner: "단체 이름", booth_location: "해방광장", is_liked: true, like_count: 78 },
    { booth_id: 2, location_id: 2, booth_image: "/img.png", booth_name: "부스 이름", booth_owner: "단체 이름", booth_location: "해방광장", is_liked: false, like_count: 52 },
    { booth_id: 3, location_id: 3, booth_image: "/img.png", booth_name: "부스 이름", booth_owner: "단체 이름", booth_location: "해방광장", is_liked: true, like_count: 4 },
  ],
  food_like_list: [
    { food_id: 1, location_id: 1, image: "/img.png", food_name: "푸드트럭 이름", best_food: "대표 메뉴", location: "해방광장", is_liked: true, like_count: 5 },
    { food_id: 12, location_id: 2, image: "/img.png", food_name: "푸드트럭 이름", best_food: "대표 메뉴", location: "해방광장", is_liked: false, like_count: 6 },
  ],
  stamp_count: 4,
}

const TOTAL_STAMPS = 8 // TODO: 실제 전체 스탬프 개수로 변경 

export default function MyPage() {
  const router = useRouter()
  const isLoggedIn = true // TODO: 실제 인증 상태로 변경
  const data = mockData

  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold px-4 pt-2.5">마이페이지</h1>

      {!isLoggedIn ? (
        <>
        {/* 비로그인 상태일 때 */}
          <div className="flex items-end justify-between bg-[#C0C0C0] pt-17.5 pb-4 px-7.5">
            <div className="flex flex-col text-base font-semibold text-white">
              <span>로그인 후</span>
              <span >청:ON을 더 즐겨보세요!</span>
            </div>
            <button
              onClick={() => router.push("/login")}
              className="bg-primary w-25 text-white text-base font-semibold rounded-[28px] p-2.5"
            >
              로그인
            </button>
          </div>

          <div className="flex flex-col p-4 gap-5">
            <div className="flex flex-col gap-4 bg-white border border-text-sub2 rounded-[10px] p-4">
                <span className="text-2xl font-semibold">내 좋아요</span>
                <span className="text-base text-text-sub text-center mt-10 mb-16">로그인 후 확인할 수 있어요.</span>
            </div>

            <div className="flex flex-col bg-white border border-text-sub2 rounded-[10px] p-4">
                <span className="text-2xl font-semibold">도장판</span>
                <span className="text-base text-text-sub text-center mt-10 mb-16">로그인 후 확인할 수 있어요.</span>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* 로그인 상태일 때 */}
            <div className="flex items-end justify-between bg-[#C0C0C0] pt-17.5 pb-4 px-7.5">
                <span className="text-base font-semibold text-white">{data.name}님 환영합니다!</span>
                <button className="bg-white text-primary text-base font-semibold w-25 rounded-[28px] p-2.5">
                    로그아웃
                </button>
            </div>

            <div className="flex flex-col p-4 gap-5">
                
            {/* 내 좋아요 */}
            <div className="flex flex-col gap-5 bg-white border border-text-sub2 rounded-[10px] p-4">
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-semibold">내 좋아요</span>
                    <button onClick={() => router.push("/mypage/likes")}>
                        <FiChevronRight size={24} className="text-[#727272]" />
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                {data.booth_like_list.map((booth) => (
                    <div key={booth.booth_id} className="flex flex-col border border-gray-200 rounded-[7px]">
                    <div className="relative aspect-square">
                        <Image src={booth.booth_image} alt={booth.booth_name} fill className="object-cover" />
                    </div>
                    <div className="px-2 py-1 border-light-gray bg-gradient-to-t from-white to-[#d9d9d9]">
                        <span className="text-sm">{booth.booth_name}</span>
                    </div>
                    </div>
                ))}
                {data.food_like_list.map((truck) => (
                    <div key={truck.food_id} className="flex flex-col border border-gray-200 rounded-[10px] overflow-hidden">
                    <div className="relative aspect-square">
                        <Image src={truck.image} alt={truck.food_name} fill className="object-cover" />
                    </div>
                    <div className="px-2 py-1 border-light-gray bg-gradient-to-t from-white to-[#d9d9d9]">
                        <span className="text-sm">{truck.food_name}</span>
                    </div>
                    </div>
                ))}
                </div>
                
            </div>

            {/* 도장판 */}
            <div className="flex flex-col gap-4 bg-white border border-text-sub2 rounded-[10px] p-4">
                <div className="flex items-center justify-between mb-5">
                <span className="text-2xl font-semibold">도장판</span>
                <button onClick={() => router.push("/mypage/stamp")}>
                <FiChevronRight size={24} className="text-[#727272]" />
                </button>
                </div>
                <span className="text-base text-center">
                {TOTAL_STAMPS}개 중 {data.stamp_count}개를 모았어요
                </span>
                <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${(data.stamp_count / TOTAL_STAMPS) * 100}%` }}
                />
                </div>
                <span className="text-base text-text-sub text-center">광장기획전에 참여하고 푸짐한 경품 받아가세요!</span>
            </div>
            </div>
        </>
      )}
    </main>
  )
}