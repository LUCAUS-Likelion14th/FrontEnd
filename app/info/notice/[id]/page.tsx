import BackButton from "@/components/common/BackButton";
import { noticeApi } from "@/lib/api/noticeApi";

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const noticeId = Number(id);

  let notice;
  try {
    notice = await noticeApi.getNoticeDetail(noticeId);
  } catch (error) {
    console.error("상세 공지사항 로드 실패: ", error);
    return <div>공지사항을 불러오는 중 오류가 발생했습니다.</div>;
  }

  if (!notice) return <div>존재하지 않는 공지입니다.</div>;

  const formatDetailDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const yyyy = date.getFullYear();
    const mm = (date.getMonth() + 1).toString().padStart(2, "0");
    const dd = date.getDate().toString().padStart(2, "0");
    const hh = date.getHours().toString().padStart(2, "0");
    const mi = date.getMinutes().toString().padStart(2, "0");

    return `${yyyy}.${mm}.${dd} ${hh}:${mi}`;
  };

  return (
    <main className="px-4 py-2.5 pb-12">
      <div className="flex items-center gap-1 mb-4">
        <BackButton />
        <h1 className="text-[24px] font-semibold">축제기획단 공지</h1>
      </div>

      <section className="flex flex-col gap-3.75">
        <div className="flex flex-col gap-3 py-3 border-t border-b border-[#DCE2E9]">
          <h2 className="text-[16px] font-bold">{notice.title}</h2>
          <p className="text-[14px] text-[#808080]">
            {formatDetailDate(notice.createdAt)}
          </p>
        </div>

        <div className="text-[13px] leading-relaxed whitespace-pre-line">
          {notice.content}
        </div>
      </section>
    </main>
  );
}
