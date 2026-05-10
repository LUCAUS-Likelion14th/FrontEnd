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
        <div className="ml-[30px] flex items-center justify-center h-[97px] rounded-[10px] bg-white border border-text-sub2 text-text-sub text-base">
          현재 진행 중인 공연이 없어요
        </div>
      ) : (
        stages.map((stage) => (
          <StageCard
            key={stage.stage_id}
            imageUrl={stage.logo}
            href="/stage"
            location="잔디광장"
            name={stage.performer}
            time={stage.time}
          />
        ))
      )}
    </section>
  );
}
