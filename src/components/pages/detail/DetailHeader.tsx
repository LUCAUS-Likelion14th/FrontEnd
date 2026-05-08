"use client";

import { useRouter } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";

type Props = {
  title: string;
};

export default function DetailHeader({ title }: Props) {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <div
        className="flex items-center gap-1 px-4 py-5 cursor-pointer"
        onClick={() => router.back()}
      >
        <FiChevronLeft size={24} />
        <span className="text-[20px] font-semibold">{title}</span>
      </div>
    </div>
  );
}
