"use client";

import { useEffect, useState } from "react";
import { mypageApi } from "@/lib/api/mypageApi";
import { MypageClient } from "@/components";
import { MyPageData } from "@/types/mypage";

function MypageSkeleton() {
  return (
    <main className="flex flex-col gap-4 pb-25">
      <div className="h-[130px] bg-gray-200 animate-pulse" />
      <div className="flex flex-col px-4 gap-8">
        <div className="h-48 rounded-[10px] bg-gray-200 animate-pulse" />
        <div className="h-40 rounded-[10px] bg-gray-200 animate-pulse" />
      </div>
    </main>
  );
}

export default function MyPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [data, setData] = useState<MyPageData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    setIsLoggedIn(true);

    const fetchData = async () => {
      try {
        const res = await mypageApi.getMyPage();
        const nickname = localStorage.getItem("nickname");
        setData({ ...res, name: nickname ?? res.name });
      } catch (error) {
        console.error("Failed to fetch mypage:", error);
      }
    };

    fetchData();
  }, []);

  if (isLoggedIn === null) return <MypageSkeleton />;

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
