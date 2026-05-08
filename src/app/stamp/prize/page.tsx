"use client";

import PrizeApplyForm from "@/components/pages/stamp/PrizeApplyForm";
import { fetcher } from "@/lib/api/fetcher";
import { useEffect, useState } from "react";

interface StampData {
  name: string;
  student_id: string;
  stamp_count: number;
  stamp_all: number;
}

export default function PrizePage() {
  const [data, setData] = useState<StampData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const res = await fetcher<StampData>("/stamp");
        setData(res);
      } catch (err) {
        console.error("데이터 로드 실패: ", error);
        setError(true);
      }
    };
    loadUserData();
  }, []);

  if (error) return <div>데이터를 가져오지 못했습니다.</div>;

  if (!data) return <div>로딩 중...</div>;

  return (
    <PrizeApplyForm
      name={data.name}
      studentId={data.student_id}
      stampCount={data.stamp_count}
      stampAll={data.stamp_all}
    />
  );
}
