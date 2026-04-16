import Image from "next/image";
import Link from "next/link";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import LikeButton from "../common/LikeButton";

type ListCardProps = {
  imageUrl: string;
  href: string;
  location: string;
  name: string;
  isLiked: boolean;
  likeCount: number;

  department?: string;
};

export default function ListCard({
  imageUrl,
  href,
  location,
  name,
  isLiked,
  likeCount,
  department,
}: ListCardProps) {
  return (
    <Link href={href} className="ml-[30px]">
      <article className="flex items-center gap-[13px] w-full p-2.5 rounded-[10px] bg-white border border-text-sub2">
        <Image
          src={imageUrl}
          alt={name}
          width={76}
          height={76}
          className="rounded-[10px] object-cover shrink-0"
        />

        <div className="flex flex-1 min-w-0">
          <div className="flex flex-col gap-3 flex-1 min-w-0">
            <span className="text-base">{location}</span>
            <strong className="text-xl font-bold truncate">{name}</strong>
          </div>

          <div className="flex flex-col items-end gap-3 shrink-0">
            <LikeButton
              initialIsLiked={isLiked}
              initialLikeCount={likeCount}
              layout="horizontal"
            />
            <span className="text-base text-text-sub">{department}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
