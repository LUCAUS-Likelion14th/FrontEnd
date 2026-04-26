import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
  icon: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "홈",
    href: "/",
    icon: "/icons/login/login-nav-home.png",
  },
  {
    label: "공연",
    href: "/stage",
    icon: "/icons/login/login-nav-stage.png",
  },
  {
    label: "부스",
    href: "/booth",
    icon: "/icons/login/login-nav-booth.png",
  },
  {
    label: "푸드",
    href: "/foodtruck",
    icon: "/icons/login/login-nav-food.png",
  },
  {
    label: "안내",
    href: "/info",
    icon: "/icons/login/login-nav-info.png",
  },
];

export default function LoginBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="하단 메뉴"
      className="fixed bottom-0 left-0 w-full bg-white/10 z-10"
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
