"use client"

import { useState } from "react"
import { FiHeart } from "react-icons/fi"
import { FaHeart } from "react-icons/fa"

type Props = {
  name: string
  isLiked: boolean
  likeCount: number
  info: string
}

export default function FoodTruckTitle({ name, isLiked, likeCount, info }: Props) {
  const [liked, setLiked] = useState(isLiked)
  const [count, setCount] = useState(likeCount)

  const handleLike = () => {
    setLiked((prev) => !prev)
    setCount((prev) => (liked ? prev - 1 : prev + 1))
  }

  return (
    <div className="flex flex-col gap-3 mt-[15px]">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-semibold">{name}</span>
        <div className="flex flex-col items-center gap-1">
          <button onClick={handleLike}>
            {liked
              ? <FaHeart size={24} className="text-primary" />
              : <FiHeart size={24} className="text-text-sub" />
            }
          </button>
          <span className="text-sm text-text-sub">{count}</span>
        </div>
      </div>
      <p className="min-h-19 text-base text-text-sub pb-6">{info}</p>
    </div>
  )
}