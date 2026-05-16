"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface InfoCardProps {
  imageUrl: StaticImageData;
  title: string;
  link: string;
}

export default function InfoCard({ imageUrl, title, link }: InfoCardProps) {
  return (
    <Link
      href={link}
      className="group relative flex items-center justify-between w-full h-[90px] px-8 overflow-hidden rounded-[20px] active:scale-[0.98] transition-transform"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <h2 className="text-white text-[18px] font-semibold z-10">{title}</h2>
    </Link>
  );
}
