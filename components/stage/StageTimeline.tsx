import TimelineCard from "../stage/TimelineCard";

type Props = {
  data: {
    id: number;
    stageImage: string;
    category: string;
    artist: string;
    start: string;
    end: string;
  }[];
  activeId?: number;
};

export default function StageTimeline({ data, activeId }: Props) {
  const formatTime = (time: string) => {
    const date = new Date(time);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="flex flex-col min-h-101 border border-text-sub rounded-[10px] px-3 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {data.map((item, index) => {
        const isActive = item.id === activeId;
        const isFirst = index === 0;
        const isLast = index === data.length - 1;

        return (
          <div key={item.id} className="flex w-full min-h-[120px] items-start">
            {/* [1] 시간 영역: 원의 중심(24px)에 맞추기 위해 mt 조정 */}
            <div
              className={`mt-[21px] text-[14px] leading-none min-w-21 shrink-0 ${
                isActive ? "text-primary font-semibold" : "text-text-sub"
              }`}
            >
              {formatTime(item.start)} - {formatTime(item.end)}
            </div>

            {/* [2] 타임라인 축 (원 + 선) */}
            <div className="relative flex flex-col items-center w-8 shrink-0 self-stretch">
              {/* 위쪽 선: 상단에서 24px 지점까지 내려오되, 원과 닿지 않게 여백 부여 */}
              <div
                className={`w-px bg-text-sub ${isFirst ? "invisible" : "visible"}`}
                style={{
                  height: "28px",
                  // 원의 중심이 24px이므로, 위쪽 선은 (24px - 반지름 - 여백)만큼만 그려져야 함
                  paddingBottom: isActive ? "16px" : "14px",
                  backgroundClip: "content-box", // padding 영역에는 배경색(선)이 안 그려지게 함
                }}
              />

              {/* 중앙 원: 정확히 위에서 24px 지점 */}
              <div className="flex items-center justify-center shrink-0 h-0 relative z-10">
                {isActive ? (
                  <div className="relative flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full border-2 border-primary bg-white" />
                    <div className="absolute w-3 h-3 rounded-full bg-primary" />
                  </div>
                ) : (
                  <div className="w-2 h-2 rounded-full bg-white border border-text-sub" />
                )}
              </div>

              {/* 아래쪽 선: 원 아래부터 시작해서 다음 칸까지 쭉 연결 */}
              <div
                className={`w-px flex-1 bg-text-sub ${isLast ? "invisible" : "visible"}`}
                style={{
                  // 원의 중심 아래로 여백을 주고 시작
                  marginTop: isActive ? "16px" : "14px",
                }}
              />
            </div>

            {/* [3] 카드 영역 */}
            <div className="flex-1 pt-[14px] pr-3 pl-1">
              <TimelineCard
                id={item.id}
                image={item.stageImage}
                category={item.category}
                artist={item.artist}
                isActive={isActive}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
