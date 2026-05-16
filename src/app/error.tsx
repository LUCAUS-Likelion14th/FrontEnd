"use client";

import { useEffect } from "react";

export default function GlobalError({
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
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3 px-4">
      <p className="text-text-sub text-base text-center">
        오류가 발생했습니다.
      </p>
      <button
        onClick={reset}
        className="text-primary underline underline-offset-2 text-sm"
      >
        다시 시도
      </button>
    </div>
  );
}
