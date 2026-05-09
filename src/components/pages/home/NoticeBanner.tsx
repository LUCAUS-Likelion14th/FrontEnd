import Image from "next/image";
import type { ActiveNotice } from "@/types/home";
import { noticeIcon } from "@/assets"

interface Props {
  notice: ActiveNotice | null;
}

export function NoticeBanner({ notice }: Props) {
  return (
    <div className="flex flex-row gap-2 w-full p-2.5 rounded-[10px] bg-white text-black border-text-sub2 border">
      <div className="flex items-center gap-1 shrink-0">
        <Image src={noticeIcon} alt="공지" width={20} height={20} />
        <span className="font-semibold">중요 공지</span>
      </div>
      <span className="truncate">{notice?.title ?? ""}</span>
    </div>
  );
}