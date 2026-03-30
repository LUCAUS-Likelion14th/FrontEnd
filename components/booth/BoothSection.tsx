import ListCard from "@/components/ui/ListCard";
import SectionHeader from "@/components/ui/SectionHeader";

const MOCK_BOOTH = [
  {
    imageUrl: "/img.png",
    href: "/booth/1",
    location: "해방광장 #1",
    name: "부스 이름",
    likes: 23,
    liked: true,
    department: "소속",
  },
  {
    imageUrl: "/img.png",
    href: "/booth/2",
    location: "해방광장 #2",
    name: "부스 이름",
    likes: 10,
    liked: false,
    department: "소속",
  },
  {
    imageUrl: "/img.png",
    href: "/booth/3",
    location: "해방광장 #3",
    name: "부스 이름",
    likes: 5,
    liked: false,
    department: "소속",
  },
];

export default function BoothSection() {
  return (
    <section className="flex flex-col gap-2">
      <SectionHeader
        icon="🎪"
        title="TOP BOOTH"
        description="현 시간 가장 핫한 부스!"
        href="/booth"
      />
      <div className="flex flex-col gap-2">
        {MOCK_BOOTH.map((item) => (
          <ListCard key={item.href} {...item} />
        ))}
      </div>
    </section>
  );
}