"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

type NavItem = {
  label: string;
  href: string;
  icon: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "홈", href: "/", icon: "/icons/nav-home.png" },
  { label: "공연", href: "/stage", icon: "/icons/nav-stage.png" },
  { label: "부스", href: "/booth", icon: "/icons/nav-booth.png" },
  { label: "푸드", href: "/food-truck", icon: "/icons/nav-food.png" },
  { label: "안내", href: "/info", icon: "/icons/nav-info.png" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="하단 메뉴"
      className="fixed bottom-0 left-0 w-full bg-white z-50"
    >
      <ul className="flex justify-around items-center my-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex flex-col items-center text-xs gap-2 cursor-pointer ${
                  isActive ? "text-blue-500" : "text-gray-400"
                }`}
              >
                <Image
                  src={item.icon}
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
