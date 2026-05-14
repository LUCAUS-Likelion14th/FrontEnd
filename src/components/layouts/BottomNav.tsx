"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { loginNavHome, loginNavInfo } from "@/assets";

type NavItem = {
  label: string;
  href: string;
  icon: string;
  activeIcon: string;
  loginIcon: string | StaticImageData;
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "홈",
    href: "/",
    icon: "/icons/nav/nav-home.png",
    activeIcon: "/icons/nav/nav-home-active.png",
    loginIcon: loginNavHome,
  },
  {
    label: "공연",
    href: "/stage",
    icon: "/icons/nav/nav-stage.png",
    activeIcon: "/icons/nav/nav-stage-active.png",
    loginIcon: "/icons/login/login-nav-stage.png",
  },
  {
    label: "부스",
    href: "/booth",
    icon: "/icons/nav/nav-booth.png",
    activeIcon: "/icons/nav/nav-booth-active.png",
    loginIcon: "/icons/login/login-nav-booth.png",
  },
  {
    label: "푸드",
    href: "/foodtruck",
    icon: "/icons/nav/nav-food.png",
    activeIcon: "/icons/nav/nav-food-active.png",
    loginIcon: "/icons/login/login-nav-food.png",
  },
  {
    label: "안내",
    href: "/info",
    icon: "/icons/nav/nav-info.png",
    activeIcon: "/icons/nav/nav-info-active.png",
    loginIcon: loginNavInfo,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  const shouldHide = [
    pathname.startsWith("/stage/"),
    pathname.startsWith("/booth/"),
    pathname.startsWith("/foodtruck/"),
    pathname.startsWith("/info/"),
    pathname === "/mypage/likes",
  ].some(Boolean);

  if (shouldHide) return null;

  const isLogin = pathname === "/login";

  const activeIndex = NAV_ITEMS.findIndex((item) => item.href === pathname);

  return (
    <nav
      aria-label="하단 메뉴"
      className={`fixed bottom-0 left-0 w-full z-10 ${
        isLogin ? "bg-white/10" : "bg-white/90 backdrop-blur-md"
      }`}
    >
      <ul className="relative flex justify-around items-center my-1">
        {!isLogin && activeIndex !== -1 && (
          <motion.div
            className="absolute -top-1 h-[2px] w-[43px] bg-primary rounded-[5px]"
            animate={{
              left: `calc(${activeIndex} * 20% + 10% - 21.5px)`,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 35,
            }}
          />
        )}

        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;

          const iconSrc = isLogin
            ? item.loginIcon
            : isActive
              ? item.activeIcon
              : item.icon;

          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={`flex flex-col items-center text-xs gap-2 transition-colors ${
                  isLogin
                    ? isActive
                      ? "text-[#06387D]"
                      : "text-[#AEB9CD]"
                    : isActive
                      ? "text-primary"
                      : "text-text-sub"
                }`}
              >
                <div className="relative w-9 h-9 mt-1">
                  <Image
                    src={iconSrc}
                    alt={item.label}
                    fill
                    className="object-contain"
                  />
                </div>

                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
