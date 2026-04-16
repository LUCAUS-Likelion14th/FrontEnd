import BackButton from "@/components/common/BackButton";
import DetailHeader from "@/components/detail/DetailHeader";
import { noticeApi } from "@/lib/api/noticeApi";
import { formatDate } from "@/lib/utils/date";

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

  return (
    <main className="pb-12">
      <DetailHeader title="축제기획단 공지" />

      <section className="flex flex-col px-4 gap-5">
        <div className="flex flex-col gap-3 py-3 border-t border-b border-text-sub2">
          <h2 className="text-[20px] font-bold">{notice.title}</h2>
          <p className="text-[14px] text-[#808080]">
            {formatDate(notice.createdAt, "detail")}
          </p>
        </div>

        <div className="text-[16px] leading-relaxed whitespace-pre-line">
          {notice.content}
        </div>
      </section>
    </main>
  );
}
