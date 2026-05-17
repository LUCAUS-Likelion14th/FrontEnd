"use client";

import Link from "next/link";
import Image from "next/image";
import { preload } from "react-dom";
import { useEffect, useMemo, useState } from "react";
import { MyPageData } from "@/types/mypage";
import { FiChevronRight, FiImage, FiHeart, FiLogOut, FiLogIn } from "react-icons/fi";
import { PiStampLight } from "react-icons/pi";
import { fetcher } from "@/api/fetcher";
import {trackEvent} from "@/lib/api/analytics";

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

  const handleLogout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    await fetch("/api/auth/admin", { method: "DELETE" });
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="relative z-10 flex flex-col items-end gap-2.5">
              <div className="flex flex-col text-lg font-medium text-white text-right">
                <span>로그인 후</span>
                <span>청:ON을 더 즐겨보세요!</span>
              </div>
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/50 text-white text-sm active:scale-95 transition-transform"
              >
                <FiLogIn size={14} />
                로그인
              </Link>
            </div>
          </div>

          <div className="px-4 flex flex-col gap-8">
            {/* 좋아요 */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[20px] font-semibold">내 좋아요</span>
                <FiChevronRight size={24} className="text-[#727272]" />
              </div>
              <div className="flex flex-col items-center gap-2 py-6 text-text-sub">
                <FiHeart size={32} className="text-text-sub2" />
                <span className="text-sm">로그인 후 확인할 수 있어요.</span>
              </div>
            </div>

            {/* 도장판 */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[20px] font-semibold">도장판</span>
                <FiChevronRight size={24} className="text-[#727272]" />
              </div>
              <div className="flex flex-col items-center gap-2 py-6 text-text-sub">
                <PiStampLight size={32} className="text-text-sub2" />
                <span className="text-sm">로그인 후 확인할 수 있어요.</span>
              </div>
            </div>
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="relative z-10 flex flex-col items-end gap-2.5">
              <div className="flex flex-col text-base font-medium text-white text-right">
                <span>청:ON에 오신 걸</span>
                <span>환영합니다</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/50 text-white text-sm active:scale-95 transition-transform"
              >
                <FiLogOut size={14} />
                로그아웃
              </button>
            </div>
          </div>

          <div className="flex flex-col px-4 gap-8">
            {/* 좋아요 */}
            <div className="flex flex-col gap-3">
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
                <div className="flex flex-col items-center gap-2 py-6 text-text-sub">
                  <FiHeart size={32} className="text-text-sub2" />
                  <span className="text-sm">아직 좋아요한 항목이 없어요</span>
                </div>
              )}
            </div>

            {/* 도장판 */}
            <Link
                href="/stamp"
                className="flex flex-col gap-3"
                onClick={() => // 백 로그 시작
                    trackEvent({
                      eventType: "stamp_list_click",
                      targetType: "STAMP",
                      payload: { referral: "my" },
                    })
                } // 백 로그 끝
            >
              <div className="flex items-center justify-between">
                <span className="text-[20px] font-semibold">도장판</span>
                <FiChevronRight size={24} className="text-[#727272]" />
              </div>

              {stampData === null ? (
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full animate-shimmer shrink-0" />
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="h-3 w-24 rounded animate-shimmer" />
                    <div className="h-2 w-full rounded-full animate-shimmer" />
                    <div className="h-3 w-40 rounded animate-shimmer" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0 w-14 h-14">
                    <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
                      <circle cx="28" cy="28" r="22" fill="none" stroke="#dce2e9" strokeWidth="5" />
                      <circle
                        cx="28" cy="28" r="22" fill="none"
                        stroke="#06387d" strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 22}`}
                        strokeDashoffset={`${2 * Math.PI * 22 * (1 - stampProgress / 100)}`}
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-[13px] font-bold text-primary leading-none">{stampCount}</span>
                      <span className="text-[9px] text-text-sub leading-none">/{totalStamps}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[15px] font-semibold text-text-main">
                      {totalStamps}개 중 <span className="text-primary">{stampCount}개</span> 획득
                    </span>
                    <span className="text-sm text-text-sub">광장기획전에 참여하고 경품 받아가세요!</span>
                  </div>
                </div>
              )}
            </Link>
          </div>

        </div>
      )}
    </main>
  );
}

