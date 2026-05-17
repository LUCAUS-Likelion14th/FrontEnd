"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { stageApi } from "@/api/stageApi";
import { TimeTable } from "@/types/stage";

const CATEGORY_MAP: Record<string, string> = {
  "학생 공연": "STUDENT_PERFORMANCE",
  청룡가요제: "CHEONGRYONG_FESTIVAL",
  "아티스트 공연": "ARTIST_PERFORMANCE",
};

export function useStageData(selectedDate: string, selected: string) {
  const [currentTime, setCurrentTime] = useState(new Date());

  const { data: stage = [] } = useQuery({
    queryKey: ["stage", selectedDate, selected],
    queryFn: () => stageApi.getStage(selectedDate, CATEGORY_MAP[selected]),
    enabled: selected !== "무대기획전",
    staleTime: 5 * 60_000,
  });

  const { data: timeTable = [] } = useQuery({
    queryKey: ["stage", "timetable", selectedDate],
    queryFn: () => stageApi.getTimeTable(selectedDate),
    staleTime: 5 * 60_000,
  });

  const timelineData = useMemo(() => {
    const sorted = [...timeTable].sort(
      (a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime(),
    );

    return sorted.reduce<TimeTable[]>((acc, curr) => {
      const isArtist =
        curr.category === "아티스트 공연" ||
        curr.category === "ARTIST_PERFORMANCE";
      const lastItem = acc[acc.length - 1];
      const isLastArtist =
        lastItem &&
        (lastItem.category === "아티스트 공연" ||
          lastItem.category === "ARTIST_PERFORMANCE");

      if (isArtist && isLastArtist) {
        lastItem.end_at = curr.end_at;
      } else {
        acc.push({
          ...curr,
          performer: isArtist ? "아티스트" : curr.performer,
        });
      }

      return acc;
    }, []);
  }, [timeTable]);

  const activeId = useMemo(() => {
    const now = currentTime;
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    if (selectedDate !== todayStr) return undefined;

    const nowTime = now.getHours() * 60 + now.getMinutes();
    return timelineData.find((item) => {
      const start = new Date(item.start_at);
      const end = new Date(item.end_at);
      const startTime = start.getHours() * 60 + start.getMinutes();
      const endTime = end.getHours() * 60 + end.getMinutes();
      return nowTime >= startTime && nowTime < endTime;
    })?.start_at;
  }, [timelineData, currentTime, selectedDate]);

  useEffect(() => {
    const now = new Date();
    const times = timelineData.flatMap((item) => [
      new Date(item.start_at),
      new Date(item.end_at),
    ]);
    const futureTimes = times.filter((time) => time > now);
    if (futureTimes.length === 0) return;

    const nextTime = new Date(Math.min(...futureTimes.map((t) => t.getTime())));
    const timeout = setTimeout(
      () => setCurrentTime(new Date()),
      nextTime.getTime() - now.getTime(),
    );
    return () => clearTimeout(timeout);
  }, [selected, timelineData]);

  return { stage, timelineData, activeId };
}
