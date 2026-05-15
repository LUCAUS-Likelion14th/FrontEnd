"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LoadingScreen } from "@/components";



function LoginSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const nickname = searchParams.get("nickname");
    const isAdmin = searchParams.get("isAdmin");

    if (!accessToken || !refreshToken) {
      router.replace("/login");
      return;
    }

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    if (nickname) localStorage.setItem("nickname", nickname);
    sessionStorage.setItem("_freshLogin", String(Date.now()));

    const redirect = async () => {
      if (isAdmin === "true") {
        try {
          await fetch("/api/auth/admin", { method: "POST" });
        } catch {
          // 쿠키 발급 실패해도 홈으로 이동
        }
      }
      router.replace("/");
    };

    redirect();
  }, [searchParams, router]);

  return <LoadingScreen />;
}

export default function LoginSuccessPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <LoginSuccessContent />
    </Suspense>
  );
}