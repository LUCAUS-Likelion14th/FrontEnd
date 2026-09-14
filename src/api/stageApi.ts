import { fetcher } from "./fetcher";
import { Stage, StageDetail, TimeTable } from "@/types/stage";
import {
  getMockStages,
  getMockTimeTable,
  getMockStageDetail,
} from "@/data/stageEventData";

const CATEGORY_KO: Record<string, string> = {
  STUDENT_PERFORMANCE: "학생 공연",
  CHEONGRYONG_FESTIVAL: "청룡가요제",
  ARTIST_PERFORMANCE: "아티스트",
};

export const stageApi = {
  getStage: async (date: string, category: string) => {
    try {
      return await fetcher<Stage[]>(`/stage?date=${date}&category=${category}`);
    } catch (error) {
      console.warn("공연 목록 API 연결 실패, 모의 데이터를 반환합니다:", error);
      return getMockStages(date, CATEGORY_KO[category]);
    }
  },

  getStageDetail: async (stageId: number) => {
    try {
      return await fetcher<StageDetail>(`/stage/${stageId}`);
    } catch (error) {
      console.warn("공연 상세 API 연결 실패, 모의 데이터를 반환합니다:", error);
      return getMockStageDetail(stageId) as StageDetail;
    }
  },

  getTimeTable: async (date: string) => {
    try {
      return await fetcher<TimeTable[]>(`/stage/timetable?date=${date}`);
    } catch (error) {
      console.warn("타임테이블 API 연결 실패, 모의 데이터를 반환합니다:", error);
      return getMockTimeTable(date);
    }
  },
};
