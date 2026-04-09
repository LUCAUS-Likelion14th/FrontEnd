import ListCard from "@/components/ui/ListCard";
import SectionHeader from "@/components/ui/SectionHeader";
import type { TopBooth } from "@/types/home";

interface Props {
  booths: TopBooth[]
}

export default function BoothSection({ booths }: Props) {
  return (
    <section className="flex flex-col gap-2">
      <SectionHeader
        icon="🎪"
        title="TOP BOOTH"
        description="현 시간 가장 핫한 부스!"
        href="/booth"
      />
      <div className="flex flex-col gap-2">
        {booths.map((booth) => (
          <ListCard
            key={booth.booth_id}
            imageUrl={booth.booth_image}
            href={`/booth/${booth.booth_id}`}
            location={booth.location}
            name={booth.booth_name}
            likes={booth.like_count}
            liked={booth.is_liked}
            department={booth.owner}
          />
        ))}
      </div>
    </section>
  );
}