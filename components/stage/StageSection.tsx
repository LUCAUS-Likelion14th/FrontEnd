import StageCard from "@/components/stage/StageCard";
import SectionHeader from "../ui/SectionHeader";

const MOCK_STAGE = {
  imageUrl: "/img.png",
  href: "/stage",
  location: "잔디광장",
  name: "가수 이름",
  time: "14:00-15:00",
};

export default function StageSection() {
  return (
    <section className="flex flex-col gap-2">
        <SectionHeader
            icon="🎪"
            title="LIVE STAGE"
            description="현재 잔디광장에서 공연 중인 무대는?"
            href="/stage"
        />
        <StageCard {...MOCK_STAGE} />
</section>
  );
}