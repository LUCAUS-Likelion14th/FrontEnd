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
    <div
      className="flex justify-between min-h-101 border border-text-sub rounded-[10px] px-3 py-3.5
    overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <section className="flex flex-col items-start">
        {data.map((item, index) => {
          const isLast = index === data.length - 1;

          return (
            <div key={item.id} className="flex items-start mt-1.75 gap-3">
              <div
                className={`text-[14px] leading-3.5 ${
                  item.id === activeId
                    ? "text-primary font-semibold"
                    : "text-text-sub"
                }`}
              >
                {formatTime(item.start)} - {formatTime(item.end)}
              </div>

              <div className="flex flex-col items-center mt-0.75 gap-2.5">
                <div
                  className={`rounded-full ${
                    item.id === activeId
                      ? "w-3 h-3 bg-primary border-2"
                      : "w-2 h-2 bg-white border border-text-sub"
                  }`}
                />

                {!isLast && <div className="h-21.75 w-px bg-text-sub" />}
              </div>
            </div>
          );
        })}
      </section>

      <section className="flex flex-col gap-5">
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
