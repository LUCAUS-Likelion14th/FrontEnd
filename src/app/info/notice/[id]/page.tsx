import { DetailHeader } from "@/components";
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
    return (
      <main>
        <DetailHeader title="축제기획단 공지" />
        <div className="flex items-center justify-center py-20 text-text-sub text-base">
          공지사항을 불러오는 중 오류가 발생했습니다.
        </div>
      </main>
    );
  }

  if (!notice)
    return (
      <main>
        <DetailHeader title="축제기획단 공지" />
        <div className="flex items-center justify-center py-20 text-text-sub text-base">
          존재하지 않는 공지입니다.
        </div>
      </main>
    );

  return (
    <main className="pb-12">
      <DetailHeader title="축제기획단 공지" />

      <section className="flex flex-col px-4 gap-5">
        <div className="flex flex-col gap-3 py-3 border-t border-b border-text-sub2">
          <h2 className="text-[20px] font-bold">{notice.title}</h2>
          <p className="text-[14px] text-text-sub">
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
