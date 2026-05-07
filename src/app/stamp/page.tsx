"use client";

import StampBoard from "@/components/pages/stamp/StampBoard";
import UserInfoForm from "@/components/pages/stamp/UserInfoForm";
import { fetcher } from "@/lib/api/fetcher";
import { useEffect, useState } from "react";

interface CheckResponse {
  is_registered: boolean;
}

export default function StampPage() {
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);

  useEffect(() => {
    const checkRegistration = async () => {
      try {
        const data = await fetcher<CheckResponse>("/stamp/check");

        if (data) {
          setIsRegistered(data.is_registered);
        }
      } catch (error) {
        console.error("등록 확인 실패: ", error);
        setIsRegistered(false);
      }
    };

    checkRegistration();
  }, []);

  if (isRegistered === null) {
    return <div>로딩중</div>;
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
