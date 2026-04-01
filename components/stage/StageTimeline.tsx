import TimelineCard from "../stage/TimelineCard";

type Props = {
  data: {
    id: number;
    stageImage: string;
    description: string;
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
    // 타임라인 박스 전체
    <div
      className="flex justify-between min-h-101 border border-text-sub rounded-[10px] px-3
    overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {/* 타임라인 */}
      <section className="flex flex-col">
        {data.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === data.length - 1;

          return (
            // 타임라인
            <div key={item.id} className="flex items-start">
              {/* 시간 텍스트 */}
              <div
                className={`py-5.25 text-[14px] leading-3.5 ${
                  item.id === activeId
                    ? "text-primary font-semibold"
                    : "text-text-sub"
                }`}
              >
                {formatTime(item.start)} - {formatTime(item.end)}
              </div>

              {/* 타임라인 시간선 (원 + 선) */}
              <div className="flex flex-col items-center w-9">
                {/* 원 */}
                <div className="flex items-center justify-center">
                  {item.id === activeId ? (
                    <div className="relative flex items-center justify-center">
                      {/* 활성화 시 바깥 원 */}
                      <div
                        className={`w-5 h-5 rounded-full border-2 border-primary ${
                          isFirst ? "mt-4.5" : "mt-[4.5px]"
                        }`}
                      />

                      {/* 활성화 시 안쪽 원 */}
                      <div
                        className={`absolute w-3 h-3 rounded-full bg-primary ${
                          isFirst ? "mt-4.5" : "mt-[4.5px]"
                        }`}
                      />
                    </div>
                  ) : (
                    // 비활성화 시 원
                    <div
                      className={`w-2 h-2 rounded-full bg-white border border-text-sub ${
                        isFirst ? "mt-6" : "gap-[10.5px]"
                      } 
                    `}
                    />
                  )}
                </div>

                {/* 선 (마지막 일정이면 선 표시 X) */}
                {!isLast && <div className="h-21.75 w-px bg-text-sub" />}
              </div>
            </div>
          );
        })}
      </section>

      {/* 타임라인 카드 */}
      <section className="flex flex-col py-3.5 gap-5">
        {data.map((item) => (
          <TimelineCard
            key={item.id}
            image={item.stageImage}
            description={item.description}
            artist={item.artist}
            isActive={item.id === activeId}
          />
        ))}
      </section>
    </div>
  );
}
