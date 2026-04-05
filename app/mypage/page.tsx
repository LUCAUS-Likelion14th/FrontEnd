"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { MyPageData } from "@/types/mypage"

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
  const isLoggedIn = false // TODO: 실제 인증 상태로 변경
  const data = mockData

  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold px-4 pt-2.5">마이페이지</h1>

      {!isLoggedIn ? (
        <>
          <div className="flex items-center justify-between bg-[#C0C0C0] pt-17.5 pb-4 px-4">
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
          
        </>
      )}
    </main>
  )
}