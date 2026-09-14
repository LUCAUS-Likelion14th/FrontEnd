"use client";

import Image from "next/image";
import { useState } from "react";
import { FiImage } from "react-icons/fi";

interface Props {
  src: string;
  alt: string;
}

export default function DetailHeroImage({ src, alt }: Props) {
  const [imgError, setImgError] = useState(false);

  if (imgError || !src) {
    return (
      <div className="relative w-full aspect-390/264 bg-gray-100 flex items-center justify-center md:mt-6 md:rounded-[16px] md:overflow-hidden">
        <FiImage size={48} className="text-gray-300" />
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-390/264 md:mt-6 md:rounded-[16px] md:overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setImgError(true)}
      />
    </div>
  );
}
