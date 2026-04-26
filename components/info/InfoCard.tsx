"use client";

import Image from "next/image";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

interface InfoCardProps {
  imageUrl: string;
  title: string;
  link: string;
}

export default function InfoCard({ imageUrl, title, link }: InfoCardProps) {
  return (
    <Link
      href={link}
      className="flex flex-row items-center justify-between px-5 py-3 bg-[rgba(6,56,125,0.10)] rounded-[10px] cursor-pointer"
    >
      <div className="flex flex-row items-center gap-8">
        <Image
          src={imageUrl}
          alt={title}
          width={65}
          height={65}
          className="rounded-lg"
        />
        <h2 className="text-[20px] font-semibold">{title}</h2>
      </div>
      <FiChevronRight size={24} className="cursor-pointer" />
    </Link>
  );
}
