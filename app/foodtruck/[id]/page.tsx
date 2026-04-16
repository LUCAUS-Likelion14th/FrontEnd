import DetailHeader from "@/components/detail/DetailHeader";
import DetailInfo from "@/components/detail/DetailInfo";
import FoodTruckTitle from "@/components/detail/FoodTruckTitle";
import MenuDetail from "@/components/detail/MenuDetail";
import { FoodTruckDetail } from "@/types/foodtruck";
import Image from "next/image";

export default async function FoodTruckDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const foodTruck: FoodTruckDetail = {
    truck_id: 15,
    location_id: 5,
    truck_name: "푸드트럭 이름",
    main_menu: "",
    truck_image: "/img.png",
    location: "해방광장 4번",
    truck_info:
      "설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명",
    is_liked: true,
    like_count: 10,
    date: [
      "화요일 10:00 - 17:00",
      "수요일 10:00 - 17:00",
      "목요일 10:00 - 17:00",
    ],
    truck_menu: [
      {
        menu_name: "메뉴 이름",
        menu_price: "2,900원",
        menu_image: "/img.png",
        menu_info: "메뉴설명설명설명메뉴설명ㅇ메뉴메뉴메뉴메뉴설명설명",
      },
      {
        menu_name: "메뉴 이름",
        menu_price: "2,900원",
        menu_image: "/img.png",
        menu_info: "메뉴설명설명설명메뉴설명ㅇ메뉴메뉴메뉴메뉴설명설명",
      },
      {
        menu_name: "메뉴 이름",
        menu_price: "2,900원",
        menu_image: "/img.png",
        menu_info: "메뉴설명설명설명메뉴설명ㅇ메뉴메뉴메뉴메뉴설명설명",
      },
      {
        menu_name: "메뉴 이름",
        menu_price: "2,900원",
        menu_image: "/img.png",
        menu_info: "메뉴설명설명설명메뉴설명ㅇ메뉴메뉴메뉴메뉴설명설명",
      },
      {
        menu_name: "메뉴 이름",
        menu_price: "2,900원",
        menu_image: "/img.png",
        menu_info: "메뉴설명설명설명메뉴설명ㅇ메뉴메뉴메뉴메뉴설명설명",
      },
    ],
  };

  return (
    <main className="pb-12">
      <DetailHeader title="푸드트럭 정보" />
      <div className="relative w-full aspect-390/264">
        <Image
          src="/img.png"
          alt="푸드트럭 사진"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col px-4 gap-10">
        <FoodTruckTitle
          name={foodTruck.truck_name}
          isLiked={foodTruck.is_liked}
          likeCount={foodTruck.like_count}
          info={foodTruck.truck_info}
        />
        <DetailInfo location={foodTruck.location} date={foodTruck.date} />

        <MenuDetail menuList={foodTruck.truck_menu} />
      </div>
    </main>
  );
}
