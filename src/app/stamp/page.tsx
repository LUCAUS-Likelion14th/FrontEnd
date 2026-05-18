"use client";

import StampBoard from "@/components/stamp/StampBoard";
import UserInfoForm from "@/components/stamp/UserInfoForm";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { fetcher } from "@/api/fetcher";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CheckResponse {
  is_registered: boolean;
}

export default function StampPage() {
  const router = useRouter();
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [isError, setIsError] = useState(false);

  const checkRegistration = async () => {
    setIsError(false);
    setIsRegistered(null);
    try {
      const data = await fetcher<CheckResponse>("/stamp/check");
      if (data) {
        setIsRegistered(data.is_registered);
      }
    } catch (error: any) {
      if (error.message === "Unauthorized") {
        router.replace("/login");
        return;
      }
      setIsError(true);
    }
  };

  useEffect(() => {
    checkRegistration();
  }, []);

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
