import ListCard from "@/components/ui/ListCard";
import SectionHeader from "@/components/ui/SectionHeader";
import type { HotFood } from "@/types/home";

interface Props {
  foods: HotFood[]
}

export default function FoodSection({ foods }: Props) {
  return (
    <section className="flex flex-col gap-2">
      <SectionHeader
        icon="🎪"
        title="HOT FOOD"
        description="303관 지하 1층에서 음식을 무뎌보자~~^^"
        href="/foodtruck"
      />
      <div className="flex flex-col gap-2">
        {foods.map((food) => (
          <ListCard
            key={food.id}
            imageUrl={food.image}
            href={`/foodtruck/${food.id}`}
            location={food.bestMenu}
            name={food.name}
            likes={food.likeCount}
            liked={food.liked}
          />
        ))}
      </div>
    </section>
  );
}