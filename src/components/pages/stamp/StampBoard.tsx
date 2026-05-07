import { fetcher } from "@/lib/api/fetcher";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Booth {
  booth_id: number;
  name: string;
  is_stamped: boolean;
}

interface StampData {
  name: string;
  student_id: string;
  stamp_count: number;
  stamp_all: number;
  booths: Booth[];
}

export default function StampBoard() {
  const [data, setData] = useState<StampData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // GET /stamp API 하나로 모든 정보를 가져옵니다.
        const res = await fetcher<StampData>("/stamp");
        setData(res);
      } catch (error) {
        console.error("도장판 데이터 로딩 실패:", error);
      }
    };
    loadData();
  }, []);

  if (!data)
    return <div className="text-white text-center pt-20">로딩 중...</div>;

  const progressPercentage = (data.stamp_count / data.stamp_all) * 100;

  return (
    <>
      <div className="absolute inset-0 -z-10">
        <Image
          src="/stamp-bg.png"
          alt="도장판 배경 이미지"
          fill
          priority
          className="object-cover object-top"
        />
      </div>

      <div className="flex justify-between relative z-10 mb-12">
        <button className="bg-white border border-text-sub px-[14.5px] py-2.5 text-base text-primary font-medium rounded-lg">
          {data.name} | {data.student_id}
        </button>
        <button className="bg-primary px-[37.5px] py-2.5 text-base text-white font-semibold rounded-lg">
          경품 응모하기
        </button>
      </div>

      <div className="relative flex flex-col justify-center items-center mb-[30px]">
        <Image
          src="/stamp-light.png"
          alt="빛 그라데이션"
          width={152}
          height={72}
          className="z-0"
        />
        <div className="absolute flex flex-col text-[20px] font-semibold text-center z-10">
          <span>부스를 돌며</span>
          <span>별빛을 밝혀 주세요!</span>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mb-[43px] w-full px-4 relative z-10">
        <div className="w-full h-3 bg-white/30 rounded-full mb-3 overflow-hidden">
          <div
            className="bg-[#00337C] h-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <span className="text-text-sub text-[14px] font-semibold text-decoration-line: underline underline-offset-4 cursor-pointer">
          상품은 언제 받을 수 있나요?
        </span>
      </div>

      <section>
        <div>도장</div>
      </section>
    </>
  );
}
