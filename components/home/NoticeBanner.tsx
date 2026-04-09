import Marquee from "@/components/ui/Marquee";
import type { ActiveNotice } from "@/types/home";

interface Props {
  notices: ActiveNotice[]
}

export default function NoticeBanner({ notices }: Props) {
  return (
    <div className="flex flex-row gap-2 whitespace-nowrap w-full p-2.5 rounded-[10px] bg-white text-black border-text-sub2 border">
      <div>📢 중요 공지</div>
      <Marquee text={notices[0]?.title ?? ""} />
    </div>
  );
}