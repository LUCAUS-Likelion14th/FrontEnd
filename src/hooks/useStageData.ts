"use client";

import { useEffect, useMemo, useState } from "react";
import { stageApi } from "@/lib/api/stageApi";
import { Stage, TimeTable } from "@/types/stage";

const CATEGORY_MAP: Record<string, string> = {
  "학생 공연": "STUDENT_PERFORMANCE",
  청룡가요제: "CHEONGRYONG_FESTIVAL",
  "아티스트 공연": "ARTIST_PERFORMANCE",
};

export function useStageData(selectedDate: string, selected: string) {
  const [stage, setStage] = useState<Stage[]>([]);
  const [timeTable, setTimeTable] = useState<TimeTable[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    async function fetchData() {
      try {
        const timeLineData = await stageApi.getTimeTable(selectedDate);
        setTimeTable(timeLineData);

        if (selected !== "무대기획전") {
          const stageData = await stageApi.getStage(
            selectedDate,
            CATEGORY_MAP[selected],
          );
          setStage(stageData);
        }
      } catch (error) {
        console.error("데이터 로드 실패", error);
        setStage([]);
        setTimeTable([]);
      }
    }
    fetchData();
  }, [selectedDate, selected]);

  const timelineData = useMemo(() => {
    return [...timeTable].sort(
      (a, b) =>
        new Date(a.start_at).getTime() - new Date(b.start_at).getTime(),
    );
  }, [timeTable]);

  const activeId = useMemo(() => {
    const nowTime = currentTime.getHours() * 60 + currentTime.getMinutes();
    return timelineData.find((item) => {
      const start = new Date(item.start_at);
      const end = new Date(item.end_at);
      const startTime = start.getHours() * 60 + start.getMinutes();
      const endTime = end.getHours() * 60 + end.getMinutes();
      return nowTime >= startTime && nowTime < endTime;
    })?.stage_id;
  }, [timelineData, currentTime]);

  useEffect(() => {
    const now = new Date();
    const times = timelineData.flatMap((item) => [
      new Date(item.start_at),
      new Date(item.end_at),
    ]);

    const futureTimes = times.filter((time) => time > now);
    if (futureTimes.length === 0) return;

    const nextTime = new Date(
      Math.min(...futureTimes.map((t) => t.getTime())),
    );
    const timeout = setTimeout(() => {
      setCurrentTime(new Date());
    }, nextTime.getTime() - now.getTime());

    return () => clearTimeout(timeout);
  }, [selected, timelineData]);

  return { stage, timelineData, activeId };
}
