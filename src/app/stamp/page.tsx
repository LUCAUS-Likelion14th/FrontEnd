"use client";

import Image from "next/image";
import StampBoard from "@/components/stamp/StampBoard";
import UserInfoForm from "@/components/stamp/UserInfoForm";
import LoadingScreen from "@/components/ui/LoadingScreen";
import GoogleLoginButton from "@/components/ui/Button/GoogleLoginButton";
import { fetcher } from "@/api/fetcher";
import { useEffect, useState } from "react";

interface CheckResponse {
  is_registered: boolean;
}

// 로그인 후 이 페이지로 돌아오기 위해 목적지를 남겨둠 (src/app/login/success/page.tsx에서 소비)
const POST_LOGIN_REDIRECT_KEY = "postLoginRedirect";

function StampLoginPrompt() {
  return (
    <div className="relative isolate min-h-[calc(100vh-56px)] flex flex-col items-center justify-center gap-6 px-8 text-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/stamp-bg.webp"
          alt="도장판 배경 이미지"
          fill
          priority
          className="object-cover object-top"
        />
      </div>
      <div className="flex flex-col gap-2 text-white">
        <span className="text-[20px] font-semibold">
          도장판은 로그인 후 이용할 수 있어요
        </span>
        <span className="text-[15px] text-white/80">
          부스를 돌며 도장을 모으고
          <br />
          본무대 입장권 추첨에 응모해 보세요!
        </span>
      </div>
      <div className="w-full max-w-[320px]">
        <GoogleLoginButton
          onBeforeRedirect={() =>
            sessionStorage.setItem(POST_LOGIN_REDIRECT_KEY, "/stamp")
          }
        />
      </div>
    </div>
  );
}

export default function StampPage() {
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [isError, setIsError] = useState(false);
  const [needsLogin, setNeedsLogin] = useState(false);

  const checkRegistration = async () => {
    setIsError(false);
    setNeedsLogin(false);
    setIsRegistered(null);
    try {
      const data = await fetcher<CheckResponse>("/stamp/check", {
        suppressAuthRedirect: true,
      });
      if (data) {
        setIsRegistered(data.is_registered);
      }
    } catch (error: any) {
      // 백엔드가 비로그인 요청에 401 대신 500 등을 반환하는 경우가 있어,
      // 토큰 자체가 없으면 에러 종류와 무관하게 로그인 유도 화면을 보여줌
      const hasToken =
        typeof window !== "undefined" && !!localStorage.getItem("accessToken");
      if (error.message === "Unauthorized" || !hasToken) {
        setNeedsLogin(true);
        return;
      }
      setIsError(true);
    }
  };

  useEffect(() => {
    checkRegistration();
  }, []);

  if (needsLogin) {
    return <StampLoginPrompt />;
  }

  if (isError) {
    return (
      <div className="relative min-h-[calc(100vh-56px)] flex flex-col items-center justify-center gap-3">
        <p className="text-text-sub text-base">데이터를 불러오지 못했습니다.</p>
        <button
          onClick={checkRegistration}
          className="text-primary underline underline-offset-2 text-sm"
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (isRegistered === null) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative isolate min-h-[calc(100vh-56px)]">
      {!isRegistered ? (
        <UserInfoForm onComplete={() => setIsRegistered(true)} />
      ) : (
        <StampBoard />
      )}
    </div>
  );
}
