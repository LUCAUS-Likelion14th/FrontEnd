"use client";

import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoadingScreen } from "@/components";



function LoginSuccessContent() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const nickname = params.get("nickname");
    const isAdmin = params.get("isAdmin");

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
  }, [router]);

  return <LoadingScreen />;
}

export default function LoginSuccessPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <LoginSuccessContent />
    </Suspense>
  );
}