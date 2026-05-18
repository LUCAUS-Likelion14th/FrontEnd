import { infoBarrierFree, infoLost, infoMypage, infoNotice, infoRoute } from '@/assets/webp/info';
import { InfoCard } from '@/components';
import Image from 'next/image';
import { FiSend } from 'react-icons/fi';

export default function InfoPage() {
  return (
    <main className="px-4 pt-5 overflow-hidden">
      <div className="flex items-center h-12 px-[15px] mb-5 bg-primary-light rounded-[10px] gap-2 shadow-[0_2px_12px_rgba(6,56,125,0.2)]">
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

      <a
        href="https://www.instagram.com/likelion_cau/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 mb-5 px-4 py-3.5 rounded-[14px] bg-white border border-primary/10 shadow-[0_2px_12px_rgba(6,56,125,0.1)] active:opacity-70 transition-opacity"
      >
        <div className="w-9 h-9 rounded-[10px] bg-primary-light flex items-center justify-center flex-shrink-0">
          <FiSend size={17} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-[#1A2536] leading-5">
            축제 사이트에 대해 궁금한 점이 있다면?
          </p>
          <p className="text-[12px] text-text-sub leading-5">
            @likelion_cau로 문의주세요
          </p>
        </div>
        <span className="flex-shrink-0 px-3.5 py-1.5 rounded-full bg-primary text-white text-[12px] font-medium">
          문의하기
        </span>
      </a>

      <section className="flex flex-col gap-3 pb-16">
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
          imageUrl={infoRoute}
          title="입장 정책"
          link="info/route"
        />
        <InfoCard
          imageUrl={infoBarrierFree}
          title="배리어프리"
          link="info/barrier-free"
        />
        <InfoCard
          imageUrl={infoMypage}
          title="마이페이지"
          link="/mypage"
        />
      </section>
    </main>
  );
}
