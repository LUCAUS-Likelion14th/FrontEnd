import InfoCard from "@/components/info/InfoCard";

export default function InfoPage() {
  return (
    <main className="px-4 pt-2.5 pb-25">
      <h1 className="text-[24px] font-semibold mb-5">안내</h1>

      <section className="flex flex-col gap-3">
        <InfoCard
          imageUrl="/img.png"
          title="축제기획단 공지"
          link="info/notice"
        />
        <InfoCard imageUrl="/img.png" title="분실물 안내" link="info/lost" />
        <InfoCard
          imageUrl="/img.png"
          title="배리어프리"
          link="info/barrier-free"
        />
        <InfoCard imageUrl="/img.png" title="통행 정책" link="info/route" />
        <InfoCard imageUrl="/img.png" title="크레딧" link="info/credit" />
      </section>
    </main>
  );
}
