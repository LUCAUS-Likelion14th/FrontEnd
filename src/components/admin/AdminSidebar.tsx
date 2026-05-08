"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { MdHome, MdCampaign, MdSearchOff } from "react-icons/md";

interface NavItem {
  label: string;
  href: string;
  icon: IconType;
}

const navItems: NavItem[] = [
  { label: "홈", href: "/admin", icon: MdHome },
  { label: "공지사항", href: "/admin/notices", icon: MdCampaign },
  { label: "분실물", href: "/admin/lost-items", icon: MdSearchOff },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__header">
        <span className="admin-sidebar__subtitle">관리자 대시보드</span>
        <Image src="/lucaus-logo.png" alt="LUCAUS" width={180} height={24} />
      </div>

      <nav className="admin-sidebar__nav">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-sidebar__item ${active ? "admin-sidebar__item--active" : ""}`}
            >
              <Icon className="admin-sidebar__icon" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="admin-sidebar__footer">
        <Link href="/" className="admin-sidebar__back-link">
          ← 사용자 페이지로 돌아가기
        </Link>
      </div>
    </aside>
  );
}
