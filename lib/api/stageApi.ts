import { fetcher } from "./fetcher";
import { Stage, StageDetail, TimeTable } from "@/types/stage";

export const stageApi = {
  getStage: () => fetcher<Stage[]>("/stage"),
  getStageDetail: (stageId: number) =>
    fetcher<StageDetail>(`/stage/${stageId}`),
  getTimeTable: () => fetcher<TimeTable[]>("/stage/timetable"),
};
