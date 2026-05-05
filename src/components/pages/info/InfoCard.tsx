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
      className="relative flex items-center justify-between w-full h-[120px] px-8 overflow-hidden rounded-[20px]"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          priority
        />
      </div>

      <h2 className="text-white text-[22px] font-semibold z-10">
        {title}
      </h2>
    </Link>
  );
}
