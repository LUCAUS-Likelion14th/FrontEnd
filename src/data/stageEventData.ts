import type { Stage, StageDetail, TimeTable } from "@/types/stage";

export const STAGE_EVENT_DATA = [
  {
    id: 201,
    description: "축제 공연 당일, 공연 동아리 회장이 살해당했다...",
    artist: "크라임씬: 사건의중앙",
    category: "무대기획전",
    start: "2026-05-21T17:00:00",
    end: "2026-05-21T18:00:00",
  },
];

// 백엔드 연결이 끊겼을 때 화면이 비어 보이지 않도록 쓰는 데모용 공연 데이터.
// category는 hooks/stage의 CATEGORY_MAP 키와, date는 app/stage의
// CATEGORIES_BY_DATE 키와 맞춰야 목록/타임라인에 실제로 노출된다.
type MockStage = {
  stage_id: number;
  performer: string;
  category: "학생 공연" | "청룡가요제" | "아티스트";
  date: string;
  startAt: string;
  endAt: string;
  logoImage: string;
  performerImage: string;
  stageInfo: string;
  instagram: string;
  youtube: string;
  songs: string[];
};

const MOCK_STAGES: MockStage[] = [
  {
    stage_id: 103,
    performer: "중앙대 보컬라인",
    category: "학생 공연",
    date: "2026-05-22",
    startAt: "2026-05-22T17:00:00",
    endAt: "2026-05-22T18:30:00",
    logoImage: "/lucaus-logo.png",
    performerImage: "/landing-bg.png",
    stageInfo:
      "보컬 동아리 연합이 준비한 합동 무대입니다. 발라드부터 어쿠스틱까지 다양한 색깔의 목소리를 만나보세요.",
    instagram: "",
    youtube: "",
    songs: ["서시", "이 밤의 끝을 잡고", "가로수 그늘 아래 서면"],
  },
  {
    stage_id: 104,
    performer: "도시의 하루 끝에",
    category: "청룡가요제",
    date: "2026-05-21",
    startAt: "2026-05-21T17:00:00",
    endAt: "2026-05-21T17:30:00",
    logoImage: "/lucaus-logo.png",
    performerImage: "/landing-bg.png",
    stageInfo: "청룡가요제 본선에 오른 팀의 자작곡 무대입니다.",
    instagram: "",
    youtube: "",
    songs: ["도시의 하루 끝에"],
  },
  {
    stage_id: 105,
    performer: "숲길",
    category: "청룡가요제",
    date: "2026-05-21",
    startAt: "2026-05-21T17:30:00",
    endAt: "2026-05-21T18:00:00",
    logoImage: "/lucaus-logo.png",
    performerImage: "/landing-bg.png",
    stageInfo: "청룡가요제 본선에 오른 팀의 자작곡 무대입니다.",
    instagram: "",
    youtube: "",
    songs: ["숲길"],
  },
  {
    stage_id: 106,
    performer: "청춘스캔들",
    category: "청룡가요제",
    date: "2026-05-21",
    startAt: "2026-05-21T18:00:00",
    endAt: "2026-05-21T18:30:00",
    logoImage: "/lucaus-logo.png",
    performerImage: "/landing-bg.png",
    stageInfo: "청룡가요제 본선에 오른 팀의 자작곡 무대입니다.",
    instagram: "",
    youtube: "",
    songs: ["청춘스캔들"],
  },
  {
    stage_id: 107,
    performer: "적운",
    category: "청룡가요제",
    date: "2026-05-21",
    startAt: "2026-05-21T18:30:00",
    endAt: "2026-05-21T19:00:00",
    logoImage: "/lucaus-logo.png",
    performerImage: "/landing-bg.png",
    stageInfo: "청룡가요제 본선에 오른 팀의 자작곡 무대입니다.",
    instagram: "",
    youtube: "",
    songs: ["적운"],
  },
];

function toTimeLabel(iso: string) {
  const [, time] = iso.split("T");
  return time.slice(0, 5);
}

export function getMockStages(date: string, category?: string): Stage[] {
  return MOCK_STAGES.filter(
    (s) => s.date === date && (!category || s.category === category),
  ).map(({ stage_id, performer, logoImage }) => ({
    stage_id,
    performer,
    logoImage,
  }));
}

export function getMockTimeTable(date: string): TimeTable[] {
  return MOCK_STAGES.filter((s) => s.date === date).map((s) => ({
    stage_id: s.stage_id,
    start_at: s.startAt,
    end_at: s.endAt,
    time: toTimeLabel(s.startAt),
    status: "ENDED",
    logo_image: s.logoImage,
    performer: s.performer,
    category: s.category,
  }));
}

export function getMockStageDetail(stageId: number): StageDetail | undefined {
  const stage = MOCK_STAGES.find((s) => s.stage_id === stageId);
  if (!stage) return undefined;

  return {
    stage_id: stage.stage_id,
    time: `${toTimeLabel(stage.startAt)} ~ ${toTimeLabel(stage.endAt)}`,
    date: stage.date,
    stage_info: stage.stageInfo,
    performer: stage.performer,
    performer_image: stage.performerImage,
    instagram: stage.instagram,
    youtube: stage.youtube,
    songs: stage.songs.map((title, i) => ({
      song_id: stage.stage_id * 100 + i,
      title,
      play_order: i + 1,
    })),
  };
}

export { MOCK_STAGES };
