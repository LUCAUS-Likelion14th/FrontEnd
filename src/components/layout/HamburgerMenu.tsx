"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {trackEvent} from "@/lib/api/analytics";

type HamburgerMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

type NavItem = {
  label: string;
  href: string;
  subItems?: { label: string; href: string }[];
};

const NAV_ITEMS: NavItem[] = [
  { label: "홈", href: "/" },
  {
    label: "공연",
    href: "/stage",
    subItems: [
      { label: "입장 정책", href: "/info/route" },
      { label: "배리어프리", href: "/info/barrier-free" },
    ],
  },
  {
    label: "부스",
    href: "/booth",
    subItems: [{ label: "도장판", href: "/stamp" }],
  },
  { label: "푸드", href: "/foodtruck" },
  {
    label: "안내",
    href: "/info",
    subItems: [
      { label: "공지", href: "/info/notice" },
      { label: "분실물", href: "/info/lost" },
      { label: "크레딧", href: "/info/credit" },
    ],
  },
  { label: "마이페이지", href: "/mypage" },
];

export default function HamburgerMenu({ isOpen, onClose }: HamburgerMenuProps) {
  const pathname = usePathname();
  const isMounted = useRef(false);

  // 라우트 변경 시 메뉴 닫기 (마운트 직후 실행 방지)
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // 스크롤 잠금
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 오버레이 — 터치하면 닫힘 */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.51)" }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* 사이드 패널 — Figma: layout_OD78Y4 */}
          <motion.div
            key="panel"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 35 }}
            className="fixed left-0 z-50"
            style={{
              top: "57px" /* 헤더(56px) 바로 아래 */,
              bottom: 0,
              width: "246px",
              backgroundColor: "rgba(6, 56, 125, 0.25)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderRadius: "0 10px 10px 0",
              boxShadow: "4px 4px 14px 4px rgba(0, 0, 0, 0.25)",
              /* padding: top 20px right 17px bottom 88px left 41px */
              padding: "20px 17px 88px 41px",
              display: "flex",
              flexDirection: "row",
              gap: "10px",
            }}
            aria-label="사이드 메뉴"
          >
            {/* 내부 컨테이너 — Figma: layout_Z0DAM0 (col, flex-end, gap 38) */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "35px",
                width: "188px",
              }}
            >
              {/* X 닫기 버튼 */}
              <button
                onClick={onClose}
                aria-label="메뉴 닫기"
                style={{ width: "24px", height: "24px", flexShrink: 0 }}
              >
                <Image
                  src="/icons/hamburger-close.svg"
                  alt="닫기"
                  width={24}
                  height={24}
                  style={{ filter: "brightness(0) invert(1)" }}
                  onError={(e) => {
                    const t = e.currentTarget as HTMLImageElement;
                    t.style.display = "none";
                    const p = t.parentElement;
                    if (p) {
                      p.textContent = "✕";
                      (p as HTMLElement).style.color = "#fff";
                      (p as HTMLElement).style.fontSize = "18px";
                    }
                  }}
                />
              </button>

              {/* 메뉴 목록 — Figma: layout_5CXZWT (col, stretch, gap 32) */}
              <motion.nav
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
                  },
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignSelf: "stretch",
                  gap: "38px",
                }}
              >
                {NAV_ITEMS.map((item) =>
                  item.subItems ? (
                    /* 서브메뉴 있는 항목 — Figma: layout_9GDCBS (col, gap 12, w 70) */
                    <motion.div
                      key={item.href + item.label}
                      variants={{
                        hidden: { opacity: 0, x: -18 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: { duration: 0.3, ease: "easeOut" },
                        },
                      }}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                        gap: "10px",
                      }}
                    >
                      {/* 메인 항목 — style_3CB3O9: SemiBold 24 */}
                      <Link
                        href={item.href}
                        onClick={onClose}
                        style={{
                          fontFamily:
                            "var(--font-pretendard, Pretendard, sans-serif)",
                          fontWeight: 600,
                          fontSize: "22px",
                          lineHeight: 1.2,
                          color: "#FFFFFF",
                          textDecoration: "none",
                        }}
                      >
                        {item.label}
                      </Link>
                      {/* 서브 항목 — style_RB3TJS: Regular 16 */}
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.href + sub.label}
                          href={sub.href}
                          onClick={() => {  // 백 로그
                            if (sub.href === "/stamp") {
                              trackEvent({
                                eventType: "stamp_list_click",
                                targetType: "STAMP",
                                payload: { referral: "hamburger" },
                              });
                            }
                            onClose();
                          }} // 백 로그 끝
                          style={{
                            fontFamily:
                              "var(--font-pretendard, Pretendard, sans-serif)",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: 1.2,
                            color: "#FFFFFF",
                            textDecoration: "none",
                          }}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  ) : (
                    /* 서브메뉴 없는 항목 — style_3CB3O9: SemiBold 24 */
                    <motion.div
                      key={item.href + item.label}
                      variants={{
                        hidden: { opacity: 0, x: -18 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: { duration: 0.3, ease: "easeOut" },
                        },
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        style={{
                          fontFamily:
                            "var(--font-pretendard, Pretendard, sans-serif)",
                          fontWeight: 600,
                          fontSize: "22px",
                          lineHeight: 1.2,
                          color: "#FFFFFF",
                          textDecoration: "none",
                        }}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ),
                )}
              </motion.nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
