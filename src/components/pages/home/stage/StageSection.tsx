import StageCard from './StageCard'
import SectionHeader from '@/components/ui/SectionHeader'
import type { LiveStage } from "@/types/home";

interface Props {
  stages: LiveStage[];
}

export default function StageSection({ stages }: Props) {
  return (
    <section className="flex flex-col gap-2">
      <SectionHeader
        title="LIVE STAGE"
        description="현재 잔디광장에서 공연 중인 무대는?"
        href="/stage"
      />
      {(stages ?? []).length === 0 ? (
        <div className="ml-[30px] flex flex-col items-center justify-center gap-3 h-[110px] rounded-[14px] bg-gradient-to-b from-[#EEF2FF] to-[#F8F9FB]">
          <div className="flex items-end gap-[3px] h-5">
            {[0.4, 0.75, 1, 0.6, 0.85, 0.5, 0.9].map((h, i) => (
              <span
                key={i}
                className="w-[3px] rounded-full bg-[#06387d]/35 animate-bounce"
                style={{
                  height: `${h * 100}%`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${0.5 + (i % 3) * 0.15}s`,
                }}
              />
            ))}
          </div>
          <span className="text-[13px] font-medium text-[#8D97A7]">현재 진행 중인 공연이 없어요</span>
        </div>
      ) : (
        stages.map((stage) => (
          <StageCard
            key={stage.stage_id}
            imageUrl={stage.logo}
            href={`/stage/${stage.stage_id}`}
            location="잔디광장"
            name={stage.performer}
            time={stage.time}
          />
        ))
      )}
    </section>
  );
}
