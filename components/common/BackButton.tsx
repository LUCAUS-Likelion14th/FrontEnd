"use client";

import { useRouter } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";

export default function BackButton() {
  const router = useRouter();

  return (
    <FiChevronLeft
      size={24}
      className="cursor-pointer"
      onClick={() => router.back()}
    />
  );
}
