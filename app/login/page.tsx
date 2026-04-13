import Image from "next/image"
import GoogleLoginButton from "@/components/common/GoogleLoginButton"

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 gap-28">
      <Image src="/logo.png" alt="축제 로고" width={180} height={180} className="object-contain" />
      <GoogleLoginButton />
    </main>
  )
}