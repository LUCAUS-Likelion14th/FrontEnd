import BackButton from "@/components/common/BackButton";
import { notices } from "@/data/notice";

export default async function NoticeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const notice = notices.find((n) => n.id === Number(id));

  const formatDetailDate = (dateStr: string) => {
    return `2026.${dateStr.replace("/", ".")}`;
  };

  if (!notice) return <div>존재하지 않는 공지입니다.</div>;

  return (
    <main className="px-4 py-2.5 pb-25">
      <div className="flex items-center gap-1 mb-4">
        <BackButton />
        <h1 className="text-[24px] font-semibold">축제기획단 공지</h1>
      </div>

      <section className="flex flex-col gap-3.75">
        <div className="flex flex-col gap-3 py-3 border-t border-b border-[#DCE2E9]">
          <h2 className="text-[16px] font-bold">{notice.title}</h2>
          <p className="text-[14px] text-[#808080]">
            {formatDetailDate(notice.date)}
          </p>
        </div>

        <div className="text-[13px]">{notice.content}</div>
      </section>
    </main>
  );
}
