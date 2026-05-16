import Image from "next/image";
import Link from "next/link";

type TimelineCardProps = {
  id: number;
  image: string;
  category: string;
  artist: string;
  isActive?: boolean;
};

export default function TimelineCard({
  id,
  image,
  category,
  artist,
  isActive,
}: TimelineCardProps) {
  const isLongText = artist.length > 10;

  return (
    <Link href={`/stage/${id}`}>
      <article
        className={`flex items-center gap-3.5 w-full min-h-24 pl-2.5 pr-3 py-2.5 rounded-[10px] cursor-pointer bg-white ${
          isActive ? "border-2 border-primary shadow-md" : "shadow-sm"
        }`}
      >
        <div className="w-[60px] h-[60px] shrink-0 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={`${artist} 사진`}
            width={76}
            height={76}
            className="object-cover w-full h-full"
          />
        </div>

        <div
          className={`flex flex-col w-full ${isLongText ? "gap-2" : "gap-2.5"}`}
        >
          <p
            className={`text-[11px] font-normal leading-3.5 ${
              isActive ? "text-primary" : "text-text-sub"
            }`}
          >
            {category}
          </p>
          <p
            className={`font-semibold break-keep ${
              isActive ? "text-primary" : "text-black"
            }
            ${isLongText ? "text-[13px] leading-tight" : "text-[15px] leading-5"}`}
          >
            {artist}
          </p>
        </div>
      </article>
    </Link>
  );
}
