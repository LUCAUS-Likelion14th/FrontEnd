"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

function LoginSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (!accessToken || !refreshToken) {
      router.replace("/login");
      return;
    }

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    router.replace("/");
  }, [searchParams, router]);

  return <div>로그인 처리 중...</div>;
}

export default function LoginSuccessPage() {
  return (
    <Suspense fallback={<div>로그인 처리 중...</div>}>
      <LoginSuccessContent />
    </Suspense>
  );
}