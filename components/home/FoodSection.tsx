import ListCard from "@/components/ui/ListCard";
import SectionHeader from "@/components/ui/SectionHeader";

const MOCK_FOOD = [
  {
    imageUrl: "/img.png",
    href: "/foodtruck/1",
    location: "메인메뉴",
    name: "푸드트럭 이름",
    likes: 23,
    liked: true,
  },
  {
    imageUrl: "/img.png",
    href: "/foodtruck/2",
    location: "메인메뉴",
    name: "푸드트럭 이름",
    likes: 10,
    liked: false,
  },
  {
    imageUrl: "/img.png",
    href: "/foodtruck/3",
    location: "메인메뉴",
    name: "푸드트럭 이름",
    likes: 5,
    liked: false,
  },
];

export default function FoodSection() {
  return (
    <section className="flex flex-col gap-2">
      <SectionHeader
        icon="🎪"
        title="HOT FOOD"
        description="303관 지하 1층에서 음식을 무뎌보자~~^^"
        href="/foodtruck"
      />
      <div className="flex flex-col gap-2">
        {MOCK_FOOD.map((item) => (
          <ListCard key={item.href} {...item} />
        ))}
      </div>
    </section>
  );
}