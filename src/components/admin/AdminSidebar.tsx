"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { IconType } from "react-icons";
import { MdHome, MdCampaign, MdSearchOff, MdMenu, MdClose } from "react-icons/md";

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
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const currentItem = navItems.find((item) => isActive(item.href));

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* 데스크톱 사이드바 */}
      <aside className="admin-sidebar admin-sidebar--desktop">
        <div className="admin-sidebar__header">
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

      {/* 모바일 햄버거 바 */}
      <div className="admin-mobile-bar">
        <button
          className="admin-mobile-bar__hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="메뉴 열기"
        >
          {menuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>

        <span className="admin-mobile-bar__current">
          {currentItem?.label ?? "관리자"}
        </span>

        <Link href="/" className="admin-mobile-bar__back">
          사용자 페이지
        </Link>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {menuOpen && (
        <>
          <div
            className="admin-mobile-overlay"
            onClick={() => setMenuOpen(false)}
          />
          <nav className="admin-mobile-menu">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`admin-mobile-menu__item ${active ? "admin-mobile-menu__item--active" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </>
      )}
    </>
  );
}
