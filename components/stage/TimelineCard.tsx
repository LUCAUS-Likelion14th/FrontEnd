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
  return (
    <Link href={`/stage/${id}`}>
      <article
        className={`flex items-center gap-4.75 w-full min-w-59.75 min-h-24 p-2.5 rounded-[10px] cursor-pointer ${
          isActive ? "border-2 border-primary" : "border border-text-sub2"
        }`}
      >
        <div className="rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={`${artist} 사진`}
            width={76}
            height={76}
            className="object-cover"
          />
        </div>

        <div className="flex flex-col max-w-30 gap-3">
          <p
            className={`text-1 font-normal leading-3.5 ${
              isActive ? "text-primary" : "text-black"
            }`}
          >
            {category}
          </p>
          <p
            className={`text-[20px] font-semibold leading-6 ${
              isActive ? "text-primary" : "text-black"
            }`}
          >
            {artist}
          </p>
        </div>
      </article>
    </Link>
  );
}
