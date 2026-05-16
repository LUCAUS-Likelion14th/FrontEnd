"use client";

import StampBoard from "@/components/pages/stamp/StampBoard";
import UserInfoForm from "@/components/pages/stamp/UserInfoForm";
import { fetcher } from "@/lib/api/fetcher";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CheckResponse {
  is_registered: boolean;
}

function StampSkeleton() {
  return (
    <div className="relative min-h-[calc(100vh-56px)]">
      <div className="absolute inset-0 -z-10">
        <Image
          src={"/stamp-bg.png"}
          alt=""
          fill
          priority
          className="object-cover object-top"
        />
      </div>
      <div className="px-4 py-5 flex justify-between mb-12">
        <div className="w-32 h-10 rounded-lg bg-white/20 animate-pulse" />
        <div className="w-28 h-10 rounded-lg bg-white/20 animate-pulse" />
      </div>
      <div className="flex justify-center mb-8">
        <div className="w-40 h-16 rounded-lg bg-white/20 animate-pulse" />
      </div>
      <div className="px-6 grid grid-cols-3 gap-y-8">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-full bg-white/20 animate-pulse" />
            <div className="w-14 h-4 rounded bg-white/20 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
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
    return <StampSkeleton />;
  }

  return (
    <div className="relative min-h-[calc(100vh-56px)]">
      {!isRegistered ? (
        <UserInfoForm onComplete={() => setIsRegistered(true)} />
      ) : (
        <StampBoard />
      )}
    </div>
  );
}
