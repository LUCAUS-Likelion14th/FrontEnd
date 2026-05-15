"use client";

import ListCard from "@/components/ui/ListCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { useTopBooth } from "@/hooks/queries/home";
import { BsShop } from "react-icons/bs";
import { motion } from "framer-motion";

export function BoothSection() {
  const { data: booths = [], isLoading } = useTopBooth();

  return (
    <section className="flex flex-col gap-2">
      <SectionHeader
        title="TOP BOOTH"
        description="현 시간 가장 핫한 부스!"
        href="/booth"
      />
      <div className="flex flex-col gap-2">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="ml-[30px] h-[97px] rounded-[10px] bg-gray-200 animate-pulse" />
          ))
        ) : booths.length === 0 ? (
          <div className="ml-7.5 flex flex-col items-center justify-center gap-2.5 h-[110px] rounded-[10px] bg-gradient-to-r from-[#f7f9ff] to-[#e8f2ff]">
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <BsShop size={24} className="text-[#06387d]" />
            </motion.div>
            <span className="text-[13px] font-medium text-[#8D97A7]">
              운영 시간에 만나요!
            </span>
          </div>
        ) : (
          booths.map((booth, i) => (
            <motion.div
              key={booth.booth_id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.35, delay: i * 0.08, ease: "easeOut" }}
            >
              <ListCard
                id={booth.booth_id}
                type="booth"
                imageUrl={booth.booth_image}
                href={`/booth/${booth.booth_id}`}
                location={booth.location}
                name={booth.booth_name}
                isLiked={booth.is_liked}
                likeCount={booth.like_count}
                department={booth.owner}
              />
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
}
