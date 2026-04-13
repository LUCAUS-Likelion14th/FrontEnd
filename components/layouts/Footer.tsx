"use client";

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
    /* pb 값 조정하기 */
    <footer className="flex flex-col gap-4 bg-[#B6C2D4] px-8 py-4 text-center">
      <address className="flex flex-col gap-1 not-italic">
        <p className="text-[14px]">LIKELION CAU X 축제기획단</p>

        <small className="text-[10px]">Copyright © 2026 Likelion CAU</small>
      </address>

      <ul className="flex justify-center gap-22 list-none p-0 m-0">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              target={"_blank"}
              rel={"noopener noreferrer"}
              className="flex flex-col justify-center items-center gap-2 cursor-pointer"
            >
              {item.icon}
              <span className="text-[14px]">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
