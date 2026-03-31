import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

type SectionHeaderProps = {
  icon: string;
  title: string;
  description: string;
  href: string;
};

export default function SectionHeader({ icon, title, description, href }: SectionHeaderProps) {
  return (
    <header className="flex gap-2">
      <span className="text-2xl" aria-hidden="true">
        {icon}
      </span>
      <Link href={href} className="flex flex-col gap-[2px] w-full">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-2xl">{title}</h2>
          <FiChevronRight size={20} className="text-[#727272]" aria-hidden="true" />
        </div>
        <p className="text-base text-text-sub">{description}</p>
      </Link>
    </header>
  );
}