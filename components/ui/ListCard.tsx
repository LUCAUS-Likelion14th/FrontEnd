import Image from "next/image";
import Link from "next/link";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

type ListCardProps = {
  imageUrl: string;
  href: string;
  location: string;
  name: string;
  likes: number;
  liked: boolean;
  department?: string;
};

export default function ListCard({ imageUrl, href, location, name, likes, liked, department }: ListCardProps) {
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
            <div className="flex items-center gap-1">
              <span className="text-base text-text-sub">{likes}</span>
              {liked
                ? <FaHeart size={16} className="text-primary" />
                : <FiHeart size={16} className="text-text-sub" />
              }
            </div>
            <span className="text-base text-text-sub">{department}</span>
          </div>
        </div>

      </article>
    </Link>
  );
}