import StageCard from "@/components/home/stage/StageCard";
import SectionHeader from "../../ui/SectionHeader";
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
      {stages.map((stage) => (
        <StageCard
          key={stage.stage_id}
          imageUrl={stage.logo}
          href="/stage"
          location="잔디광장"
          name={stage.performer}
          time={stage.time}
        />
      ))}
    </section>
  );
}
