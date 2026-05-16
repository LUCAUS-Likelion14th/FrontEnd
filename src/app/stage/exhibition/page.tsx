import Image from "next/image";
import { AiOutlineYoutube, AiOutlineInstagram } from "react-icons/ai";
import { FiClock } from "react-icons/fi";
import { stageApi } from "@/api/stageApi";
import { DetailHeader } from "@/components";
import { formatDateLabel } from "@/utils/date";

export const dynamic = "force-dynamic";

export default async function StageExhibitionPage() {
  let stage;
  try {
    const list = await stageApi.getStage("2026-05-21", "STAGE_EXHIBITION");
    const stageId = list?.[0]?.stage_id;
    if (!stageId) throw new Error("stage_id 없음");
    stage = await stageApi.getStageDetail(stageId);
  } catch (error) {
    console.error("무대기획전 정보 로드 실패:", error);
    return (
      <main>
        <DetailHeader title="무대기획전" />
        <div className="flex items-center justify-center py-20 text-text-sub text-base">
          공연 정보를 불러오는 중 오류가 발생했습니다.
        </div>
      </main>
    );
  }

  if (!stage) {
    return (
      <main>
        <DetailHeader title="무대기획전" />
        <div className="flex items-center justify-center py-20 text-text-sub text-base">
          공연 정보를 찾을 수 없습니다.
        </div>
      </main>
    );
  }

  return (
    <main className="pb-12">
      <DetailHeader title="무대기획전" />

      {/* 히어로 이미지 */}
      <section className="mb-4">
        <div className="relative w-full h-78 overflow-hidden">
          <Image
            src={stage.performer_image}
            alt={`${stage.performer} 사진`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-4 py-3">
            <h2 className="text-[22px] font-bold text-white leading-tight">{stage.performer}</h2>
            <div className="flex gap-2">
              {stage.youtube && (
                <a
                  href={stage.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-black/20 flex items-center justify-center text-white hover:bg-black/40 transition-colors"
                >
                  <AiOutlineYoutube size={22} />
                </a>
              )}
              {stage.instagram && (
                <a
                  href={stage.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-black/20 flex items-center justify-center text-white hover:bg-black/40 transition-colors"
                >
                  <AiOutlineInstagram size={20} />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="px-4 flex flex-col gap-3">
        {/* 공연 일정 */}
        <div className="flex items-center justify-between bg-[#EEF3FB] rounded-[12px] px-4 py-3.5">
          <div className="flex items-center gap-2 text-primary">
            <FiClock size={14} />
            <span className="text-[13px] font-semibold">공연 일정</span>
          </div>
          <span className="text-[14px] font-semibold text-[#273850]">
            {stage.date ? `${formatDateLabel(stage.date)} ` : ""}{stage.time}
          </span>
        </div>

        {/* 소개글 */}
        {stage.stage_info && (
          <div className="flex flex-col gap-2 px-1">
            <span className="text-[13px] font-semibold text-text-sub">소개글</span>
            <p className="text-[14px] text-[#3B4A5A] leading-relaxed whitespace-pre-line break-keep">
              {stage.stage_info}
            </p>
          </div>
        )}

        {/* 공연 곡 */}
        {stage.songs && stage.songs.length > 0 && (
          <div className="flex flex-col gap-2 px-1">
            <span className="text-[13px] font-semibold text-text-sub">프로그램</span>
            <div className="flex flex-col">
              {stage.songs
                .sort((a, b) => a.play_order - b.play_order)
                .map((song, index) => (
                  <div key={song.song_id} className="flex items-center gap-3 py-2.5 border-b border-[#E5EAF0] last:border-b-0">
                    <span className="text-[13px] font-semibold text-primary w-5 text-center shrink-0">{index + 1}</span>
                    <span className="text-[14px] text-[#3B4A5A] break-keep">{song.title}</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        <small className="block text-xs font-light text-center text-text-sub mt-6">
          *주최 측의 사정에 따라 일정이 변경될 수 있습니다
        </small>
      </div>
    </main>
  );
}
