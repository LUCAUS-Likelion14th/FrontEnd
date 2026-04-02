import Image from "next/image";

type StageEventProps = {
  id: number;
  image: string;
  title: string;
  intro: string;
  start: string;
  end: string;
};

export default function StageEventSection({
  image,
  title,
  intro,
  start,
  end,
}: StageEventProps) {
  return (
    <div className="relative w-full h-46.75 rounded-[10px] overflow-hidden">
      <Image src={image} alt={`${title} 사진`} fill className="object-cover" />

      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-[20px] font-semibold mb-3">{title}</h3>
        <p className="text-[16px]">{intro}</p>
        <time className="text-[16px]">
          {start} - {end}
        </time>
      </div>
    </div>
  );
}
