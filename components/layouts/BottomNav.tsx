"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import LoginBottomNav from "./LoginBottomNav";

type NavItem = {
  label: string;
  href: string;
  icon: string;
  activeIcon: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "홈",
    href: "/",
    icon: "/icons/nav/nav-home.png",
    activeIcon: "/icons/nav/nav-home-active.png",
  },
  {
    label: "공연",
    href: "/stage",
    icon: "/icons/nav/nav-stage.png",
    activeIcon: "/icons/nav/nav-stage-active.png",
  },
  {
    label: "부스",
    href: "/booth",
    icon: "/icons/nav/nav-booth.png",
    activeIcon: "/icons/nav/nav-booth-active.png",
  },
  {
    label: "푸드",
    href: "/foodtruck",
    icon: "/icons/nav/nav-food.png",
    activeIcon: "/icons/nav/nav-food-active.png",
  },
  {
    label: "안내",
    href: "/info",
    icon: "/icons/nav/nav-info.png",
    activeIcon: "/icons/nav/nav-info-active.png",
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const shouldHide = [
    pathname.startsWith("/stage/"),
    pathname.startsWith("/booth/"),
    pathname.startsWith("/foodtruck/"),
    pathname.startsWith("/info/notice/"),
    pathname === "/mypage/likes",
  ].some(Boolean);

  if (shouldHide) return null;

  if (pathname === "/login") {
    return <LoginBottomNav />;
  }

  return (
    <nav
      aria-label="하단 메뉴"
      className="fixed bottom-0 left-0 w-full bg-white/35 z-10 backdrop-blur-xs"
    >
      <ul className="flex justify-around items-center my-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex flex-col items-center text-xs gap-2 cursor-pointer ${
                  isActive ? "text-[#06387D]" : "text-[#AEB9CD]"
                }`}
              >
                <Image
                  src={isActive ? item.activeIcon : item.icon}
                  alt={item.label}
                  width={36}
                  height={36}
                />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
