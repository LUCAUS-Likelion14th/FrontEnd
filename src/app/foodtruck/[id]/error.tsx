"use client";

import { useEffect } from "react";
import { DetailHeader } from "@/components";
import ErrorFallback from "@/components/ui/ErrorFallback";

export default function FoodTruckDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main>
      <DetailHeader title="푸드트럭 정보" />
      <ErrorFallback
        title="푸드트럭 정보를 불러올 수 없어요"
        onReset={reset}
      />
    </main>
  );
}
