import BackButton from "@/components/common/BackButton";

export default function NoticePage() {
  return (
    <main className="px-4 pt-2.5 pb-25">
      <div className="flex items-center gap-1 mb-4">
        <BackButton />
        <h1 className="text-[24px] font-semibold">분실물 찾기</h1>
      </div>

      <div className="flex gap justify-center border border-[#A1ABBC] rounded-[10px] py-3.75">
        <p className="text-[14px] line-height-[18px] text-[#A1ABBC]">
          🔔 매일 축제 STAFF를 통해 접수된 분실물이 업데이트 됩니다.
        </p>
      </div>

      <div></div>
    </main>
  );
}
