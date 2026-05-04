"use client";

import Link from "next/link";

interface InfoCardProps {
  imageUrl: string;
  title: string;
  link: string;
}

export default function InfoCard({ imageUrl, title, link }: InfoCardProps) {
  return (
    <Link
      href={link}
      className="relative flex flex-row items-center justify-between py-[38px] pl-[35px] rounded-[10px] cursor-pointer overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="flex flex-row items-center gap-8">
        <h2 className="text-white text-[20px] font-semibold">{title}</h2>
      </div>
    </Link>
  );
}
