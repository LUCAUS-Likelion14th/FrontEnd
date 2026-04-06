import BackButton from "@/components/common/BackButton";
import NoticeItem from "@/components/info/NoticeItem";
import { notices } from "@/data/notice";

export default function NoticePage() {
  return (
    <main className="px-4 pt-2.5 pb-25">
      <div className="flex items-center gap-1 mb-4">
        <BackButton />
        <h1 className="text-[24px] font-semibold">축제기획단 공지</h1>
      </div>

      <section className="border-t border-[#DCE2E9]">
        {notices.map((notice) => (
          <NoticeItem
            key={notice.id}
            id={notice.id}
            category={notice.category}
            title={notice.title}
            date={notice.date}
          />
        ))}
      </section>
    </main>
  );
}
