import Image from "next/image";

type StageEventProps = {
  stageImage: string;
  description: string;
  artist: string;
  start: string;
  end: string;
};

export default function StageEventSection({
  stageImage,
  artist,
  description,
  start,
  end,
}: StageEventProps) {
  return (
    <div className="relative w-full h-46.75 rounded-[10px] overflow-hidden">
      <Image
        src={stageImage}
        alt={`${artist} 사진`}
        fill
        className="object-cover"
      />

      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-[20px] font-semibold mb-3">{artist}</h3>
        <p className="text-[16px]">{description}</p>
        <time className="text-[16px]">
          {start} - {end}
        </time>
      </div>
    </div>
  );
}
