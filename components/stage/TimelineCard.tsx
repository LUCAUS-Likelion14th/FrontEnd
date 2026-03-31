import Image from "next/image";
import Link from "next/link";

type TimelineCardProps = {
  image: string;
  description: string;
  artist: string;
};

export default function TimelineCard({
  image,
  description,
  artist,
}: TimelineCardProps) {
  return (
    <Link href="">
      <article className="flex gap-4.75 w-full min-w-59.75 p-2.5 border rounded-[10px] bg-white cursor-pointer">
        <div className="rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={`${artist} 사진`}
            width={76}
            height={76}
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-1 font-normal leading-3.5">{description}</p>
          <p className="text-[20px] font-semibold leading-[1.2]">{artist}</p>
        </div>
      </article>
    </Link>
  );
}
