import Marquee from "@/components/ui/Marquee";

export default function NoticeBanner() {
  return (
    <div className="flex flex-row gap-2 whitespace-nowrap w-full p-2.5 rounded-[10px] bg-white text-black border-[#DCE2E9] border">
      <div>📢 중요 공지</div>
      <Marquee text="이것은 공지입니다. 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구" />
    </div>
  );
}
