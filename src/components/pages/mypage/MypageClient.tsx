"use client";

import Link from "next/link";
import Image from "next/image";
import { preload } from "react-dom";
import { useEffect, useMemo, useState } from "react";
import { MyPageData } from "@/types/mypage";
import { FiChevronRight, FiImage } from "react-icons/fi";
import { fetcher } from "@/lib/api/fetcher";

interface MypageClientProps {
  isLoggedIn: boolean;
  data: MyPageData;
}

function MiniCard({ href, src, alt, name }: { href: string; src: string; alt: string; name: string }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link href={href} className="block">
      <article className="w-full rounded-[10px] overflow-hidden flex flex-col shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <div className="relative w-full h-[80px] bg-[#D9D9D9] shrink-0">
          {imgError || !src ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <FiImage size={20} className="text-gray-300" />
            </div>
          ) : (
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              onError={() => setImgError(true)}
            />
          )}
        </div>
        <div className="px-[10px] py-[8px] bg-white">
          <span className="text-[13px] font-semibold leading-normal text-black truncate block">{name}</span>
        </div>
      </article>
    </Link>
  );
}

export default function MypageClient({ isLoggedIn, data }: MypageClientProps) {
  preload("/mypage-login-bg.jpg", { as: "image" });
  const [stampData, setStampData] = useState<{
    stamp_count: number;
    stamp_all: number;
  } | null>(null);

  useEffect(() => {
    if (isLoggedIn) {
      const getStampStatus = async () => {
        try {
          const res = await fetcher<{ stamp_count: number; stamp_all: number }>("/stamp/my");
          setStampData(res);
        } catch (error) {
          console.error("도장 데이터를 가져오지 못했습니다.", error);
        }
      };
      getStampStatus();
    }
  }, [isLoggedIn]);

  const stampCount = stampData?.stamp_count ?? 0;
  const totalStamps = stampData?.stamp_all ?? 8;

  const stampProgress = useMemo(
    () => Math.min((stampCount / totalStamps) * 100, 100),
    [stampCount, totalStamps],
  );

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.replace("/");
  };

  const boothLikes = data.booth_like_list.slice(0, 3);
  const truckLikes = data.food_truck_like_list.slice(0, 3);
  const hasLikes = boothLikes.length > 0 || truckLikes.length > 0;

  return (
    <main className="flex flex-col gap-4 pb-25">
      {!isLoggedIn ? (
        <div className="flex flex-col gap-8">
          <div className="relative flex items-end justify-end pt-13.5 pb-[15px] px-4">
            <Image
              src="/mypage-login-bg.jpg"
              alt="마이페이지 배경"
              fill
              priority
              className="object-cover object-center"
            />
            <div className="relative z-10 flex flex-col items-end gap-2.5">
              <div className="flex flex-col text-base font-medium text-white text-right">
                <span>로그인 후</span>
                <span>청:ON을 더 즐겨보세요!</span>
              </div>
              <Link
                href="/login"
                className="bg-white w-[106px] text-primary text-base font-semibold rounded-[28px] p-2.5 text-center"
              >
                로그인
              </Link>
            </div>
          </div>

          <div className="px-4 flex flex-col gap-8">
            <EmptyBox title="내 좋아요" />
            <EmptyBox title="도장판" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <div className="relative flex items-end justify-end pt-13.5 pb-[15px] px-4">
            <Image
              src="/mypage-login-bg.jpg"
              alt="마이페이지 배경"
              fill
              priority
              className="object-cover object-center"
            />
            <div className="relative z-10 flex flex-col items-end gap-3">
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
            <div className="flex flex-col gap-5 bg-white border border-primary rounded-[10px] px-4 py-3">
              <Link href="/mypage/likes" className="flex items-center justify-between">
                <span className="text-[20px] font-semibold">내 좋아요</span>
                <FiChevronRight size={24} className="text-[#727272]" />
              </Link>

              {hasLikes ? (
                <div className="grid grid-cols-3 gap-2">
                  {boothLikes.map((booth) => (
                    <MiniCard
                      key={booth.booth_id}
                      href={`/booth/${booth.booth_id}`}
                      src={booth.booth_image}
                      alt={booth.booth_name}
                      name={booth.booth_name}
                    />
                  ))}
                  {truckLikes.map((truck) => (
                    <MiniCard
                      key={truck.id}
                      href={`/foodtruck/${truck.id}`}
                      src={truck.image}
                      alt={truck.name}
                      name={truck.name}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center py-6 text-text-sub text-base">
                  아직 좋아요한 항목이 없어요
                </div>
              )}
            </div>

            {/* 도장판 */}
            <Link
              href="/stamp"
              className="flex flex-col bg-white border border-primary rounded-[10px] px-4 py-3"
            >
              <div className="flex items-center justify-between mb-9">
                <span className="text-[20px] font-semibold">도장판</span>
                <FiChevronRight size={24} className="text-[#727272]" />
              </div>

              {stampData === null ? (
                <div className="flex flex-col gap-4 mb-5">
                  <div className="h-5 w-40 mx-auto rounded bg-gray-200 animate-pulse" />
                  <div className="w-full h-2 rounded-full bg-gray-200 animate-pulse" />
                </div>
              ) : (
                <>
                  <span className="text-base text-center mb-8">
                    {totalStamps}개 중 {stampCount}개를 모았어요
                  </span>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-5">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${stampProgress}%` }}
                    />
                  </div>
                </>
              )}

              <span className="text-base text-text-sub text-center">
                광장기획전에 참여하고 푸짐한 경품 받아가세요!
              </span>
            </Link>
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
