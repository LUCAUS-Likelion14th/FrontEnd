"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type StageCardProps = {
  imageUrl: string;
  href: string;
  category: string;
  name: string;
  time: string;
};

export default function StageCard({
  imageUrl,
  href,
  category,
  name,
  time,
}: StageCardProps) {
  const isDisableLink = category === "청룡가요제" || category === "행사";

  // 공통 카드 스타일
  const cardClassName =
    "relative w-full pl-[10px] pr-[16px] py-[16px] rounded-[10px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]";

  // 카드 내부 콘텐츠
  const CardContent = (
    <>
      <Image
        src={imageUrl}
        alt={name}
        width={76}
        height={76}
        className="rounded-[8px] object-cover shrink-0"
      />
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <span className="text-[14px] text-black truncate">{category}</span>
        <div className="flex items-end justify-between gap-2">
          <strong className="text-[18px] font-semibold truncate">{name}</strong>
          <time className="text-[14px] text-text-sub shrink-0">{time}</time>
        </div>
      </div>
    </>
  );

  return (
    <div className="ml-7.5">
      {isDisableLink ? (
        // 링크가 비활성화되는 경우
        <article className={`${cardClassName} cursor-default`}>
          <div className="flex items-center gap-[13px]">{CardContent}</div>
        </article>
      ) : (
        // 링크가 활성화되는 경우
        <motion.article
          className={`${cardClassName} cursor-pointer`}
          whileHover={{ y: -2, transition: { duration: 0.18 } }}
          whileTap={{ scale: 0.99, transition: { duration: 0.1 } }}
        >
          <Link href={href} className="flex items-center gap-[13px]">
            {CardContent}
          </Link>
        </motion.article>
      )}
    </div>
  );
}
