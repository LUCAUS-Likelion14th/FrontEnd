import Image from "next/image";
import type { MenuItem } from "@/types/foodtruck";

export default function MenuDetail({ menuList }: { menuList: MenuItem[] }) {
  return (
    <div>
      <div className="flex flex-col gap-10">
        {menuList.map((menu, index) => (
          <div key={index} className="flex justify-between">
            <div className="flex flex-col gap-4">
              <div className="max-w-[194px]">
                <h3 className="text-xl font-semibold">{menu.name}</h3>
              </div>
              <p className="text-xl font-semibold">
                {menu.price.toLocaleString()}원
              </p>
            </div>

            <div className="relative w-[106px] h-[106px] flex-shrink-0">
              <Image
                src={menu.image}
                alt={menu.name}
                fill
                className="object-cover rounded-[10px]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
