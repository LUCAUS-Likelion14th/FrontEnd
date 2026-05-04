import InfoCard from "@/components/info/InfoCard";
import Image from "next/image";

export default function InfoPage() {
  return (
    <main className="px-4 pt-5 pb-25">
      <div className="flex items-center h-12 px-[15px] mb-5 border border-primary rounded-[10px] gap-2">
        <Image
          src={"/icons/highlight.png"}
          alt={"하이라이트 아이콘"}
          width={32}
          height={32}
        />
        <span className="text-[14px] text-primary leading-4.5">
          축제 정보를 한눈에 확인해 보세요!
        </span>
      </div>

      <section className="flex flex-col gap-3">
        <InfoCard
          imageUrl="/notice-bg.png"
          title="축제기획단 공지"
          link="info/notice"
        />
        <InfoCard
          imageUrl="/lost-bg.png"
          title="분실물 안내"
          link="info/lost"
        />
        <InfoCard
          imageUrl="/barrier-free-bg.png"
          title="배리어프리"
          link="info/barrier-free"
        />
        <InfoCard
          imageUrl="/route-bg.png"
          title="통행 정책"
          link="info/route"
        />
        <InfoCard imageUrl="/credit-bg.png" title="크레딧" link="info/credit" />
      </section>
    </main>
  );
}
