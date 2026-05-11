import { DetailHeader, FoodTruckTitle, DetailInfo, MenuDetail } from "@/components";
import { foodTruckApi } from "@/lib/api/foodTruckApi";
import DetailHeroImage from "@/components/pages/detail/DetailHeroImage";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function FoodTruckDetailPage({ params }: Props) {
  const { id } = await params;

  let foodTruck;
  try {
    foodTruck = await foodTruckApi.getDetail(id);
  } catch {
    return (
      <main>
        <DetailHeader title="푸드트럭 정보" />
        <div className="flex items-center justify-center py-20 text-text-sub text-base">
          푸드트럭 정보를 불러오는 중 오류가 발생했습니다.
        </div>
      </main>
    );
  }

  if (!foodTruck) {
    return (
      <main>
        <DetailHeader title="푸드트럭 정보" />
        <div className="flex items-center justify-center py-20 text-text-sub text-base">
          푸드트럭 정보를 찾을 수 없습니다.
        </div>
      </main>
    );
  }

  return (
    <main className="pb-12">
      <DetailHeader title="푸드트럭 정보" />
      <DetailHeroImage src={foodTruck.image} alt="푸드트럭 사진" />

      <div className="flex flex-col px-4 gap-10">
        <FoodTruckTitle
          id={foodTruck.id}
          type="foodtruck"
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
