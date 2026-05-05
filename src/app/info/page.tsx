import { infoBarrierFree, infoCredit, infoLost, infoNotice, infoRoute } from '@/assets/webp/info';
import { InfoCard } from '@/components';
import Image from 'next/image';

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
          imageUrl={infoNotice}
          title="축제기획단 공지"
          link="info/notice"
        />
        <InfoCard
          imageUrl={infoLost}
          title="분실물 안내"
          link="info/lost"
        />
        <InfoCard
          imageUrl={infoBarrierFree}
          title="배리어프리"
          link="info/barrier-free"
        />
        <InfoCard
          imageUrl={infoRoute}
          title="통행 정책"
          link="info/route"
        />
        <InfoCard
          imageUrl={infoCredit}
          title="크레딧"
          link="info/credit"
        />
      </section>
    </main>
  );
}
