"use client";

import Image from "next/image";
import Link from "next/link";
import { BsInstagram } from "react-icons/bs";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "@likelion_cau",
    href: "https://www.instagram.com/likelion_cau/",
    icon: <BsInstagram className="w-6 h-6" aria-hidden="true" />,
  },
  {
    label: "@cau.festival",
    href: "https://www.instagram.com/",
    icon: <BsInstagram className="w-6 h-6" aria-hidden="true" />,
  },
];

export default function Footer() {
  return (
    <footer className="relative flex flex-col items-center gap-5 px-8 py-6 mb-21 text-white text-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/footer-bg.png"
          alt="푸터 배경"
          fill
          className="object-cover"
        />
      </div>

      <address className="flex flex-col gap-1 not-italic">
        <p className="text-[13px] font-medium">LIKELION CAU × 축제기획단</p>
        <small className="text-[10px] font-light text-white/60">Copyright © 2026 Likelion CAU</small>
      </address>

      <ul className="flex justify-center gap-12 list-none p-0 m-0">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              target={"_blank"}
              rel={"noopener noreferrer"}
              className="flex flex-col justify-center items-center gap-2 opacity-90 hover:opacity-100 transition-opacity"
            >
              {item.icon}
              <span className="text-[11px] font-light">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
