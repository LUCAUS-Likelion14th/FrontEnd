"use client" 

import Image from "next/image"
import { useRouter } from "next/navigation" 
import { FiChevronLeft } from "react-icons/fi"

type Props = {
  title: '부스 정보' | '푸드트럭 정보'
  imageUrl?: string
}

export default function DetailHero({ title, imageUrl }: Props) {
  const router = useRouter()

  return (
    <div className="flex flex-col">
      <div className="flex gap-1 px-4 py-2.5">
        <button onClick={() => router.back()}>
          <FiChevronLeft size={24} className="block"/>
        </button>
        <span className="text-2xl font-semibold">{title}</span>
      </div>

      <div className="relative w-full aspect-390/264">
        {imageUrl && (
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        )}
      </div>
    </div>
  )
}