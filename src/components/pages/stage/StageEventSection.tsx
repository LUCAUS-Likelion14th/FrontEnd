import { formatDate } from "@/lib/utils/date";
import Image from "next/image";
import crimesceneImg from "@/assets/crimescene.png";

type StageEventProps = {
  description: string;
  artist: string;
  start: string;
  end: string;
};

export default function StageEventSection({
  artist,
  description,
  start,
  end,
}: StageEventProps) {
  return (
    <div className="relative w-full rounded-[10px] overflow-hidden" style={{ height: "188px" }}>
      {/* 배경 이미지 */}
      <Image
        src={crimesceneImg}
        alt={`${artist} 사진`}
        fill
        className="object-cover"
      />

      {/* 그라디언트 오버레이 + 텍스트 (Figma: padding 101px 16px 12px, column, gap 10px) */}
      <div
        className="absolute inset-0 flex flex-col justify-end text-white"
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.65) 27%, rgba(102,102,102,0) 100%)",
          padding: "101px 16px 12px",
          gap: "10px",
        }}
      >
        {/* Frame 747: column, gap 3px */}
        <div className="flex flex-col" style={{ gap: "3px" }}>
          {/* Frame 746: 제목 + 설명, column, gap 12px */}
          <div className="flex flex-col" style={{ gap: "12px" }}>
            <h3 className="text-[20px] font-semibold leading-tight">{artist}</h3>
            <p className="text-[13px] font-normal leading-tight">{description}</p>
          </div>

          {/* 시간 */}
          <time className="text-[14px] font-normal leading-tight">
            {formatDate(start, "time")} - {formatDate(end, "time")}
          </time>
        </div>
      </div>
    </div>
  );
}

