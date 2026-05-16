"use client";

import { useRouter } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="transition-opacity active:opacity-50"
    >
      <FiChevronLeft size={24} />
    </button>
  );
}
