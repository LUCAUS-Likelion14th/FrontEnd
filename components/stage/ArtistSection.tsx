import { Stage } from "@/types/stage";
import ArtistButton from "./ArtistButton";

type ArtistSectionProps = {
  data: Stage[];
};

export default function ArtistSection({ data }: ArtistSectionProps) {
  return (
    <div className="flex gap-4 overflow-x whitespace-nowrap">
      {data.map((item) => (
        <ArtistButton
          key={item.stage_id}
          id={item.stage_id}
          image={item.logo}
          artist={item.performer}
        />
      ))}
    </div>
  );
}
