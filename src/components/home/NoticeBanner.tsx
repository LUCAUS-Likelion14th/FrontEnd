import Link from "next/link";
import type { ActiveNotice } from "@/types/home";
import { MdCampaign } from "react-icons/md";

interface Props {
  notice: ActiveNotice | null;
}

export function NoticeBanner({ notice }: Props) {
  const href = notice ? `/info/notice/${notice.id}` : "/info/notice";

  return (
    <Link
      href={href}
      className="flex flex-row gap-2 w-full p-2.5 rounded-[10px] bg-white text-black border border-[#EA3F89] transition-all duration-150 active:bg-gray-50 active:scale-[0.99]"
    >
      <div className="flex items-center gap-1 shrink-0">
        <MdCampaign size={20} color="#EA3F89" />
        <span className="font-semibold">중요 공지</span>
      </div>
      <span className={`truncate ${!notice ? "text-text-sub" : ""}`}>
        {notice?.title ?? "중요 공지가 없습니다"}
      </span>
    </Link>
  );
}