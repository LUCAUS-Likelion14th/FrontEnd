"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type HamburgerMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

type NavItem = {
  label: string;
  href: string;
  subItems?: { label: string; href: string; scrollTo?: string }[];
};

const NAV_ITEMS: NavItem[] = [
  { label: "마이페이지", href: "/mypage" },
  {
    label: "홈",
    href: "/",
    subItems: [
      { label: "Live Stage", href: "/#live-stage", scrollTo: "live-stage" },
      { label: "Top Booth", href: "/#top-booth", scrollTo: "top-booth" },
      { label: "Hot Food", href: "/#hot-food", scrollTo: "hot-food" },
    ],
  },
  {
    label: "공연",
    href: "/stage",
    subItems: [
      { label: "학생공연", href: "/stage?type=student" },
      { label: "청룡가요제", href: "/stage?type=festival" },
      { label: "아티스트 공연", href: "/stage?type=artist" },
      { label: "무대 기획전", href: "/stage?type=special" },
    ],
  },
  {
    label: "부스",
    href: "/booth",
    subItems: [{ label: "도장판", href: "/stamp" }],
  },
  {
    label: "푸드",
    href: "/foodtruck",
    subItems: [{ label: "푸드트럭 안내", href: "/foodtruck" }],
  },
  {
    label: "안내",
    href: "/info",
    subItems: [
      { label: "공지", href: "/info/notice" },
      { label: "분실물", href: "/info/lost" },
      { label: "입장 정책", href: "/info/route" },
      { label: "배리어프리", href: "/info/barrier-free" },
      { label: "크레딧", href: "/info/credit" },
    ],
  },
];

export default function HamburgerMenu({ isOpen, onClose }: HamburgerMenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

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

  const handleScrollLink = (scrollTo: string) => {
    onClose();
    if (pathname === "/") {
      setTimeout(() => {
        document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
    } else {
      router.push(`/#${scrollTo}`);
      setTimeout(() => {
        document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
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

          <motion.div
            key="panel"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 35 }}
            className="fixed left-0 z-50 flex flex-col"
            style={{
              top: "57px",
              bottom: 0,
              width: "220px",
              backgroundColor: "#ffffff",
              borderRadius: "0 10px 10px 0",
              boxShadow: "4px 4px 14px 4px rgba(0, 0, 0, 0.25)",
            }}
            aria-label="사이드 메뉴"
          >
            <nav
              className="flex flex-col justify-between h-full px-6"
              style={{ paddingTop: "32px", paddingBottom: "44px" }}
            >
              {NAV_ITEMS.map((item) =>
                item.subItems ? (
                  <div
                    key={item.href + item.label}
                    className="flex flex-col items-start gap-2 w-full"
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="text-gray-900"
                      style={{
                        fontFamily: "var(--font-pretendard, Pretendard, sans-serif)",
                        fontWeight: 600,
                        fontSize: "18px",
                        lineHeight: 1.3,
                      }}
                    >
                      {item.label}
                    </Link>
                    <div className="flex flex-col gap-1.5 pl-3">
                      {item.subItems.map((sub) =>
                        sub.scrollTo ? (
                          <button
                            key={sub.href + sub.label}
                            onClick={() => handleScrollLink(sub.scrollTo!)}
                            className="text-gray-500 text-left"
                            style={{
                              fontFamily: "var(--font-pretendard, Pretendard, sans-serif)",
                              fontWeight: 400,
                              fontSize: "13px",
                              lineHeight: 1.3,
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: 0,
                            }}
                          >
                            {sub.label}
                          </button>
                        ) : (
                          <Link
                            key={sub.href + sub.label}
                            href={sub.href}
                            onClick={onClose}
                            className="text-gray-500"
                            style={{
                              fontFamily: "var(--font-pretendard, Pretendard, sans-serif)",
                              fontWeight: 400,
                              fontSize: "13px",
                              lineHeight: 1.3,
                            }}
                          >
                            {sub.label}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    onClick={onClose}
                    className="text-gray-900"
                    style={{
                      fontFamily: "var(--font-pretendard, Pretendard, sans-serif)",
                      fontWeight: 600,
                      fontSize: "18px",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
