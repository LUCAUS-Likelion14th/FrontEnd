export type StageType = {
  id: number;
  artist: string;
  category: string;
  artistLogo: string;
  stageImage: string;
  start: string;
  end: string;
  songs?: string[];
  intro?: string;
};

export const STAGE_DATA: StageType[] = [
  {
    id: 101,
    artist: "NCT",
    category: "학생 공연",
    artistLogo: "/logo.png",
    stageImage: "/logo.png",
    start: "2026-05-21T09:30:00",
    end: "2026-05-21T11:00:00",
    songs: ["곡1", "곡2", "곡3"],
    intro: "안녕하세요\nNCT입니다\n많이 와주세요!",
  },
  {
    id: 102,
    artist: "DAY6",
    category: "청룡가요제",
    artistLogo: "/logo.png",
    stageImage: "/logo.png",
    start: "2026-05-21T15:00:00",
    end: "2026-05-21T16:00:00",
  },
  {
    id: 103,
    artist: "NewJeans",
    category: "아티스트 공연",
    artistLogo: "/logo.png",
    stageImage: "/logo.png",
    start: "2026-05-22T10:00:00",
    end: "2026-05-22T10:51:00",
  },
  {
    id: 104,
    artist: "BlackPink",
    category: "아티스트 공연",
    artistLogo: "/logo.png",
    stageImage: "/logo.png",
    start: "2026-05-22T10:52:00",
    end: "2026-05-22T15:00:00",
  },
  {
    id: 105,
    artist: "BigBang",
    category: "아티스트 공연",
    artistLogo: "/logo.png",
    stageImage: "/logo.png",
    start: "2026-05-22T15:00:00",
    end: "2026-05-22T18:00:00",
  },
];
