import GoogleLoginButton from "@/components/common/GoogleLoginButton";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main
      className="relative flex flex-col items-center justify-center min-h-screen px-7 gap-41"
      style={{ backgroundImage: "url('/login-bg.png)" }}
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/login-bg.png"
          alt="로그인 배경 이미지"
          fill
          className="object-cover"
          priority
        />
      </div>

      <Image
        src="/lucaus-logo.png"
        alt="루카우스 축제 로고"
        width={243}
        height={118}
        className="object-contain"
      />
      <GoogleLoginButton />
    </main>
  );
}
