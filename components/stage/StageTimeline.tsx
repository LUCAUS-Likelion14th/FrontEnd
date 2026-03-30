import StageCard from "./StageCard";

type Props = {
  data: {
    id: number;
    image: string;
    description: string;
    artist: string;
  }[];
};

export default function StageTimeline({ data }: Props) {
  return (
    <div className="flex justify-between border rounded-[10px] px-3 py-3.5">
      <section>타임라인</section>

      <section className="flex flex-col">
        {data.map((item) => (
          <StageCard key={item.id} {...item} />
        ))}
      </section>
    </div>
  );
}
