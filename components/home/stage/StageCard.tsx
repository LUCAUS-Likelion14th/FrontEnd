import Image from "next/image";
import Link from "next/link";

type StageCardProps = {
  imageUrl: string;
  href: string;
  location: string;
  name: string;
  time: string;
};

export default function StageCard({ imageUrl, href, location, name, time }: StageCardProps) {
  return (
    <Link href={href}>
      <article className="flex items-center gap-[13px] w-full p-2.5 rounded-[10px] bg-white border border-text-sub2">
        
        <Image
          src={imageUrl}
          alt={name}
          width={76}
          height={76}
          className="rounded-[10px] object-cover shrink-0"
        />

        <div className="flex flex-col gap-3 flex-1 min-w-0">
          <span className="text-base">{location}</span>
          <div className="flex justify-between">
            <strong className="text-xl font-bold">{name}</strong>
            <time className="text-base text-text-sub2">{time}</time>
          </div>
        </div>

      </article>
    </Link>
  );
}