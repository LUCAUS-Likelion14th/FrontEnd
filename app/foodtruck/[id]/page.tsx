import DetailHero from "@/components/detail/DetailHero"
import DetailInfo from "@/components/detail/DetailInfo"
import FoodTruckTitle from "@/components/detail/FoodTruckTitle"
import { FoodTruckDetail } from "@/types/foodtruck"

export default async function FoodTruckDetailPage({ params }: { params: { id: string } }) {
  
    const foodTruck: FoodTruckDetail = {
    food_id: 15,
    location_id: 5,
    food_name: "푸드트럭 이름",
    image: "/img.png",
    location: "해방광장 4번",
    food_info: "설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명",
    is_liked: true,
    like_count: 10,
    date: [
      "화요일 10:00 - 17:00",
      "수요일 10:00 - 17:00",
      "목요일 10:00 - 17:00",
    ],
    food_menu: [
      { menu_name: "메뉴 이름", menu_price: "2,900원", menu_image: "/image.png" },
      { menu_name: "메뉴 이름", menu_price: "2,900원", menu_image: "/image.png" },
      { menu_name: "메뉴 이름", menu_price: "2,900원", menu_image: "/image.png" },
    ],
  }

  return (
    <main>
      <DetailHero title="푸드트럭 정보" imageUrl={foodTruck.image} />
      <div className="flex flex-col px-4">
        <FoodTruckTitle
            name={foodTruck.food_name}
            isLiked={foodTruck.is_liked}
            likeCount={foodTruck.like_count}
            info={foodTruck.food_info}
        />
        <DetailInfo location={foodTruck.location} date={foodTruck.date} />
      </div>
    </main>
  )
}