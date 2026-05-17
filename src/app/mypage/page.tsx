"use client";

import { useEffect, useState } from "react";
import { MypageClient } from "@/components";
import { useMyPage } from "@/hooks/mypage";

function MypageSkeleton() {
  return (
    <main className="flex flex-col gap-4 pb-25">
      <div className="h-[130px] animate-shimmer" />
      <div className="flex flex-col px-4 gap-8">
        <div className="h-48 rounded-[10px] animate-shimmer" />
        <div className="h-40 rounded-[10px] animate-shimmer" />
      </div>
    </main>
  );
}

export default function MyPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("accessToken"));
  }, []);

  const { data, isLoading } = useMyPage(isLoggedIn === true);

  if (isLoggedIn === null || (isLoggedIn && isLoading)) return <MypageSkeleton />;

  return (
    <MypageClient
      isLoggedIn={isLoggedIn}
      data={
        data ?? {
          name: "",
          like_count: 0,
          booth_like_list: [],
          food_truck_like_list: [],
          stamp_count: 0,
        }
      }
    />
  );
}
