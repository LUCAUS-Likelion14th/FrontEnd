import Image from "next/image";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

type SectionHeaderProps = {
  title: string;
  description: string;
  href: string;
};

export default function SectionHeader({
  title,
  description,
  href,
}: SectionHeaderProps) {
  return (
    <header className="flex gap-2">
      <div className="relative w-[25px] h-[25px] shrink-0">
        <Image
          src="/icons/highlight.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      <Link href={href} className="flex flex-col gap-[2px] w-full">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-2xl">{title}</h2>
          <FiChevronRight
            size={20}
            className="text-[#727272]"
            aria-hidden="true"
          />
        </div>
        <p className="text-base text-text-sub">{description}</p>
      </Link>
    </header>
  );
}
