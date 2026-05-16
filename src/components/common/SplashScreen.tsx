"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const isNotFirst = sessionStorage.getItem("isFirst");

    if (isNotFirst === "false") {
      setIsVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("isFirst", "false");
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-20 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/landing-bg.png"
              alt="랜딩페이지 배경"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          <motion.div
            className="relative z-10 w-[259px] h-[118px]"
            initial={{ opacity: 0, filter: "blur(16px) drop-shadow(0 0 20px rgba(255,255,255,0.45))" }}
            animate={{ opacity: 1, filter: "blur(0px) drop-shadow(0 0 20px rgba(255,255,255,0.45))" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            <motion.div
              className="w-full h-full"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity, delay: 1 }}
            >
              <Image
                src="/lucaus-logo.png"
                alt="LUCAUS 로고"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
