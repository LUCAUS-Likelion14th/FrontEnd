import Image from "next/image";
import { AiOutlineYoutube } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import BackButton from "@/components/common/BackButton";
import { stageApi } from "@/lib/api/stageApi";

export default async function StageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const stageId = Number(id);

  let stage;
  try {
    stage = await stageApi.getStageDetail(stageId);
  } catch (error) {
    console.error("공연 상세 정보 로드 실패: ", error);
    return (
      <div className="p-4">공연 정보를 불러오는 중 오류가 발생했습니다.</div>
    );
  }

  if (!stage) {
    return <div className="p-4">공연 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <main className="px-4 py-2.5 pb-12">
      {/* 헤더 영역 */}
      <div className="flex items-center gap-1 mb-5">
        <BackButton />
        <h1 className="text-[20px] font-semibold">공연 정보</h1>
      </div>

      {/* 이미지 영역 */}
      <section className="flex justify-center mb-6.25">
        <Image
          src={stage.performer_image}
          alt={`${stage.performer} 사진`}
          width={315}
          height={420}
          className="object-cover"
        />
      </section>

      {/* 공연 상세정보 영역 */}
      <section className="mb-12">
        <div className="flex justify-between pb-[16.5px] mb-6 border-b border-text-sub2">
          <h2 className="text-[24px] font-semibold">{stage.performer}</h2>
          <div className="flex gap-2">
            {stage.youtube && (
              <a href={stage.youtube} target="_blank" rel="noopener noreferrer">
                <AiOutlineYoutube size={38} />
              </a>
            )}
            {stage.instagram && (
              <a
                href={stage.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiOutlineInstagram size={38} />
              </a>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-semibold text-text-sub">공연 일정</h3>
            <p className="text-base text-right">{stage.time}</p>
          </div>
          <div className="flex justify-between">
            <h3 className="text-base font-semibold text-text-sub">공연 곡</h3>
            <div className="flex flex-col text-base text-right">
              {stage.songs && stage.songs.length > 0 ? (
                stage.songs
                  .sort((a, b) => a.play_order - b.play_order)
                  .map((song) => <p key={song.song_id}>{song.title}</p>)
              ) : (
                <p>준비된 곡 정보가 없습니다.</p>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <h3 className="text-base font-semibold text-text-sub">소개글</h3>
            <p className="text-base text-right whitespace-pre-line">
              {stage.stage_info}
            </p>
          </div>
        </div>
      </section>

      <small className="block text-xs font-light text-center">
        *주최 측의 사정에 따라 일정이 변경될 수 있습니다
      </small>
    </main>
  );
}
