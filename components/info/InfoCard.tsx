"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiChevronRight } from "react-icons/fi";

interface InfoCardProps {
  imageUrl: string;
  title: string;
  link: string;
}

export default function InfoCard({ imageUrl, title, link }: InfoCardProps) {
  const router = useRouter();

  return (
    <div className="flex flex-row items-center justify-between px-5 py-3 bg-[#F3F3F3] rounded-[10px]">
      <div className="flex flex-row items-center gap-8">
        <Image
          src={imageUrl}
          alt={title}
          width={85}
          height={85}
          className="rounded-lg"
        />
        <h2 className="text-[20px] font-semibold">{title}</h2>
      </div>
      <FiChevronRight
        size={24}
        className="cursor-pointer"
        onClick={() => router.push(link)}
      />
    </div>
  );
}
