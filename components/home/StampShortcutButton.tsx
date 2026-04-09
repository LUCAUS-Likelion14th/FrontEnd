"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginBottomSheet from "../common/LoginBottomSheet";

export default function StampShortcutButton() {
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();

  const isLoggedIn = false; // TODO: auth store

  const handleClick = () => {
    if (!isLoggedIn) {
      setShowLogin(true);
      return;
    }
    router.push("/stamp");
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="block w-full p-[10px] rounded-[10px] bg-primary text-white text-[16px] text-center"
      >
        도장판 바로가기
      </button>

      <LoginBottomSheet
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
      />
    </div>
  );
}
