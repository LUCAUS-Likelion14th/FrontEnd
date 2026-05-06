'use client'

import Image from "next/image";

export default function LoadingScreen() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/login-bg.png"
          alt="로그인 배경 이미지"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flex flex-col items-center gap-12">
        <div className="relative animate-pulse">
          <Image
            src="/lucaus-logo.png"
            alt="루카우스 축제 로고"
            width={243}
            height={118}
            className="object-contain drop-shadow-2xl"
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="w-48 h-1 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white/30 animate-[loading_1.5s_infinite_ease-in-out] origin-left" 
                 style={{
                   width: '100%',
                   animationName: 'loading-bar' 
                 }}
            />
          </div>
          <p className="text-white text-sm font-medium animate-pulse">
            잠시만 기다려주세요 ..
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.5); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </main>
  );
}