import { fetcher } from "@/lib/api/fetcher";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BoothStampModal from "./BoothStampModal";

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

function StampBoardSkeleton() {
  return (
    <div className="relative min-h-[calc(100vh-56px)]">
      <div className="absolute inset-0 -z-10">
        <Image src="/stamp-bg.png" alt="" fill priority className="object-cover object-top" />
      </div>
      <div className="px-4 py-5 flex justify-between mb-12">
        <div className="w-32 h-10 rounded-lg bg-white/20 animate-pulse" />
        <div className="w-28 h-10 rounded-lg bg-white/20 animate-pulse" />
      </div>
      <div className="flex justify-center mb-8">
        <div className="w-40 h-16 rounded-lg bg-white/20 animate-pulse" />
      </div>
      <div className="px-6 grid grid-cols-3 gap-y-8">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-full bg-white/20 animate-pulse" />
            <div className="w-14 h-4 rounded bg-white/20 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StampBoard() {
  const [data, setData] = useState<StampData | null>(null);
  const [selectedBooth, setSelectedBooth] = useState<Booth | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetcher<StampData>("/stamp");
        setData(res);
      } catch (error: any) {
        if (error.message === "Unauthorized") {
          router.replace("/login");
          return;
        }
        console.error("도장판 데이터 로딩 실패:", error);
      }
    };
    loadData();
  }, [refreshKey]);

  if (!data) return <StampBoardSkeleton />;

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

      <div className="flex justify-between relative z-10 px-4 py-5 mb-12">
        <div className="bg-white border border-text-sub px-[14.5px] py-2.5 text-base text-primary font-medium rounded-lg">
          {data.name}
          <span className="text-[16px] font-medium text-text-sub2"> | </span>
          {data.student_id}
        </div>
        <button
          onClick={() => router.push(`/stamp/prize`)}
          className="bg-primary px-[37.5px] py-2.5 text-base text-white font-semibold rounded-lg"
        >
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
        <span className="text-text-sub text-[14px] font-semibold underline underline-offset-4 cursor-pointer">
          상품은 언제 받을 수 있나요?
        </span>
      </div>

      <section className="grid grid-cols-3 gap-y-8 px-6 pb-20 relative z-10">
        {data.booths.map((booth) => (
          <div
            key={booth.booth_id}
            className="flex flex-col items-center gap-2"
          >
            <div
              onClick={() => !booth.is_stamped && setSelectedBooth(booth)}
              className={`relative w-[80px] h-[80px] flex justify-center items-center ${booth.is_stamped ? "cursor-default" : "cursor-pointer"}`}
            >
              <Image
                src={booth.is_stamped ? "/stamp-on.png" : "/stamp-off.png"}
                alt={booth.name}
                width={80}
                height={80}
              />
            </div>

            <span
              onClick={() => router.push(`/booth/${booth.booth_id}`)}
              className="text-text-sub text-[14px] font-medium text-center text-decoration-line: underline break-keep cursor-pointer"
            >
              {booth.name}
            </span>
          </div>
        ))}
      </section>

      {selectedBooth && (
        <BoothStampModal
          boothId={selectedBooth.booth_id}
          boothName={selectedBooth.name}
          onClose={() => setSelectedBooth(null)}
          onSuccess={() => {
            setRefreshKey((prev) => prev + 1);
          }}
        />
      )}
    </>
  );
}
