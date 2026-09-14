"use client";

import { BoothSection } from "./BoothSection";
import { FoodSection } from "./FoodSection";
import { StageSection } from "./stage";
import { RankingEmptyState } from "./RankingEmptyState";
import { useTopBooth, useHotFood } from "@/hooks/home";
import type { LiveStage } from "@/types/home";

interface Props {
  stages: LiveStage[];
}

export function RankingSections({ stages }: Props) {
  const { data: booths, isLoading: isBoothLoading } = useTopBooth();
  const { data: foods, isLoading: isFoodLoading } = useHotFood();

  const isLoading = isBoothLoading || isFoodLoading;
  const isAllEmpty =
    !isLoading &&
    stages.length === 0 &&
    (booths?.length ?? 0) === 0 &&
    (foods?.length ?? 0) === 0;

  if (isAllEmpty) {
    return <RankingEmptyState />;
  }

  return (
    <>
      <div id="live-stage">
        <StageSection stages={stages} />
      </div>
      <div id="top-booth">
        <BoothSection />
      </div>
      <div id="hot-food">
        <FoodSection />
      </div>
    </>
  );
}
