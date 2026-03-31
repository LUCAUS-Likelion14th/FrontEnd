import ListCard from "@/components/ui/ListCard";
import SectionHeader from "@/components/ui/SectionHeader";

const MOCK_FOOD = [
  {
    imageUrl: "/img.png",
    href: "/booth/1",
    location: "후문 #1",
    name: "부스 이름",
    likes: 23,
    liked: true,
  },
  {
    imageUrl: "/img.png",
    href: "/booth/2",
    location: "후문 #2",
    name: "부스 이름",
    likes: 10,
    liked: false,
  },
  {
    imageUrl: "/img.png",
    href: "/booth/3",
    location: "후문 #3",
    name: "부스 이름",
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
        description="현 시간 가장 핫한 부스!"
        href="/booth"
      />
      <div className="flex flex-col gap-2">
        {MOCK_FOOD.map((item) => (
          <ListCard key={item.href} {...item} />
        ))}
      </div>
    </section>
  );
}