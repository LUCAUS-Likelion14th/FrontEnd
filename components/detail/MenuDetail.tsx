import Image from "next/image";

interface Menu {
  menu_name: string;
  menu_price: string;
  menu_image: string;
  menu_info: string;
}

export default function MenuDetail({ menuList }: { menuList: Menu[] }) {
  return (
    <div>
      <div className="flex flex-col gap-10">
        {menuList.map((menu, index) => (
          <div key={index} className="flex justify-between">
            <div className="flex flex-col gap-4">
              <div className="max-w-[194px]">
                <h3 className="text-xl font-semibold">{menu.menu_name}</h3>
                <p className="text-base text-text-sub">
                  {menu.menu_info || "메뉴에 대한 설명이 없습니다"}
                </p>
              </div>
              <p className="text-xl font-semibold">{menu.menu_price}</p>
            </div>

            <div className="relative w-[106px] h-[106px] flex-shrink-0">
              <Image
                src={menu.menu_image}
                alt={menu.menu_name}
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
