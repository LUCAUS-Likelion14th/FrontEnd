"use client";

import { useEffect, useState } from "react";
import { mypageApi } from "@/lib/api/mypageApi";
import { MypageClient } from "@/components";
import { MyPageData } from "@/types/mypage";

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
        setData(res);
      } catch (error) {
        console.error("Failed to fetch mypage:", error);
      }
    };

    fetchData();
  }, []);

  if (isLoggedIn === null) return null;

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