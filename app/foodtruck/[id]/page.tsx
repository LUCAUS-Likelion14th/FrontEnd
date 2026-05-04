import DetailHeader from "@/components/detail/DetailHeader";
import DetailInfo from "@/components/detail/DetailInfo";
import FoodTruckTitle from "@/components/detail/FoodTruckTitle";
import MenuDetail from "@/components/detail/MenuDetail";
import { foodTruckApi } from "@/lib/api/foodTruckApi";
import Image from "next/image";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function FoodTruckDetailPage({ params }: Props) {
  const { id } = await params;
  const foodTruck = await foodTruckApi.getDetail(id);

  return (
    <main className="pb-12">
      <DetailHeader title="푸드트럭 정보" />
      <div className="relative w-full aspect-390/264">
        <Image
          src={foodTruck.image}
          alt="푸드트럭 사진"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col px-4 gap-10">
        <FoodTruckTitle
          name={foodTruck.name}
          isLiked={foodTruck.liked}
          likeCount={foodTruck.likeCount}
          info={foodTruck.foodTruckInfo}
        />
        <DetailInfo location={foodTruck.location} date={foodTruck.date} />
        <MenuDetail menuList={foodTruck.menu} />
      </div>
    </main>
  );
}
