"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function LoginBottomSheet({ isOpen, onClose }: Props) {
  const router = useRouter()
  const sheetRef = useRef<HTMLDivElement>(null)

  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  // 초기 터치 위치
  const startY = useRef(0)

  // 드래그
  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return

    const currentY = e.touches[0].clientY
    const diff = currentY - startY.current

    if (diff > 0) {
      setDragY(diff)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)

    if (dragY > 100) {
      onClose()
    } else {
      setDragY(0)
    }
  }

  useEffect(() => {
    if (isOpen) {
      setDragY(0)
    }
  }, [isOpen])


  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      <div
        ref={sheetRef}
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[20px] z-50 px-5 pt-3 pb-10 transition-transform duration-800"
        style={{
          transform: `translateY(${dragY}px)`
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >

        <div className="w-full flex justify-center mb-4">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        <div className="text-center mb-6">
          <span className="text-xl font-semibold">로그인 후 축제를 더 편하게 즐기세요</span>
        </div>

        <div className="flex justify-center">
          <Image src="/login-puang.png" alt="푸앙이 이미지" width={160} height={160} />
        </div>

        <div className="flex flex-col p-5 text-center text-sm text-text-sub">
          <span>✨ 좋아요 저장하고 나중에 다시 보기</span>
          <span>✨ 광장기획전 참여하고 경품 응모하기</span>
        </div>

        <button
          onClick={() => router.push("/login")}
          className="w-full flex items-center justify-center border border-gray-200 rounded-[10px] shadow-[0_2px_3px_0_rgba(0,0,0,0.168),0_0_3px_0_rgba(0,0,0,0.084)]"
        >
          <Image src="/icons/google.png" alt="구글" width={24} height={24} />
          <span className="text-xl font-medium text-[#0000008A] p-[15px]">Google로 시작하기</span>
        </button>
      </div>
    </>
  )
}
