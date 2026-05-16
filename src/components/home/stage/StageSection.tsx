"use client";

import StageCard from './StageCard'
import SectionHeader from '@/components/ui/SectionHeader'
import type { LiveStage } from "@/types/home";
import { motion } from "framer-motion";

interface Props {
  stages: LiveStage[];
}

export default function StageSection({ stages }: Props) {
  return (
    <section className="flex flex-col gap-2">
      <SectionHeader
        title="LIVE STAGE"
        description="현재 잔디광장에서 공연 중인 무대는?"
        href="/stage"
      />
      {(stages ?? []).length === 0 ? (
        <div className="ml-7.5 flex flex-col items-center justify-center gap-3 h-[110px] rounded-[10px] bg-gradient-to-r from-[#f7f9ff] to-[#e8f2ff]">
          <div className="flex items-end gap-[3px] h-5">
            {[0.4, 0.75, 1, 0.6, 0.85, 0.5, 0.9].map((h, i) => (
              <span
                key={i}
                className="w-[3px] rounded-full bg-primary/35 animate-bounce"
                style={{
                  height: `${h * 100}%`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${0.5 + (i % 3) * 0.15}s`,
                }}
              />
            ))}
          </div>
          <span className="text-[13px] font-medium text-text-sub">현재 진행 중인 공연이 없어요</span>
        </div>
      ) : (
        stages.map((stage, i) => (
          <motion.div
            key={stage.stage_id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.35, delay: i * 0.08, ease: "easeOut" }}
          >
            <StageCard
              imageUrl={stage.logo}
              href={`/stage/${stage.stage_id}`}
              location="잔디광장"
              name={stage.performer}
              time={stage.time}
            />
          </motion.div>
        ))
      )}
    </section>
  );
}
