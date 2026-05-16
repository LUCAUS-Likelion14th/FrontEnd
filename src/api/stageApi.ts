import { fetcher } from "./fetcher";
import { Stage, StageDetail, TimeTable } from "@/types/stage";

export const stageApi = {
  getStage: (date: string, category: string) =>
    fetcher<Stage[]>(`/stage?date=${date}&category=${category}`),

  getStageDetail: (stageId: number) =>
    fetcher<StageDetail>(`/stage/${stageId}`),

  getTimeTable: (date: string) =>
    fetcher<TimeTable[]>(`/stage/timetable?date=${date}`),
};
