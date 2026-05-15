import { DetailHeader } from "@/components";
import { noticeApi } from "@/lib/api/noticeApi";
import { formatDate } from "@/lib/utils/date";

const categoryMap = {
  important: {
    label: "중요",
    style: "bg-[#FFF0F0] text-[#E53935]",
  },
  notice: {
    label: "공지",
    style: "bg-[#EEF3FB] text-primary",
  },
};

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

  const categoryKey = notice.important ? "important" : "notice";
  const { label, style } = categoryMap[categoryKey];

  return (
    <main className="pb-12">
      <DetailHeader title="축제기획단 공지" />

      <section className="flex flex-col px-4 gap-5">
        <div className="flex flex-col gap-3 py-3 border-t border-b border-text-sub2">
          <div className="flex items-start gap-3 w-full">
            <span
              className={`inline-flex shrink-0 items-center justify-center h-[31px] px-2.5 rounded-[8px] text-[14px] font-semibold ${style}`}
            >
              {label}
            </span>

            <span className="flex-1 h-[31px] items-center text-[20px] font-bold">
              {notice.title}
            </span>
          </div>

          <p className="text-[14px] text-text-sub">
            {formatDate(notice.createdAt, "detail")}
          </p>
        </div>

        <div className="text-[15px] leading-relaxed whitespace-pre-line">
          {notice.content}
        </div>
      </section>
    </main>
  );
}
