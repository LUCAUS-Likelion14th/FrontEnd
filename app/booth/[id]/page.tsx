import BoothTitle from "@/components/detail/BoothTitle";
import DetailAction from "@/components/detail/DetailAction";
import DetailHeader from "@/components/detail/DetailHeader";
import DetailInfo from "@/components/detail/DetailInfo";
import Image from "next/image";

type Props = {
  params: { id: string };
};

const booth = {
  booth_id: 3,
  location_id: 5,
  booth_image: "/img.png",
  booth_name: "부스 이름",
  booth_category: ["소개팅", "음식"],
  booth_info: "부스 설명입니다. 부스 설명입니다. 부스 설명입니다.",
  owner_insta: "https://instagram.com/",
  is_liked: true,
  like_count: 15,
  location: "해방광장 4번",
  date: [
    "월요일 : 10:00 - 17:00",
    "화요일 : 10:00 - 17:00",
    "수요일 : 10:00 - 17:00",
  ],
  location_image: "/img.png",
};

export default async function BoothDetailPage({ params }: Props) {
  return (
    <main className="pb-12">
      <DetailHeader title="부스 정보" />
      <div className="relative w-full aspect-390/264">
        <Image src="/img.png" alt="부스 사진" fill className="object-cover" />
      </div>

      <div className="flex flex-col px-4 gap-8">
        <BoothTitle
          name={booth.booth_name}
          categories={booth.booth_category}
          info={booth.booth_info}
        />

        <DetailAction
          ownerInsta={booth.owner_insta}
          likeCount={booth.like_count}
        />

        <DetailInfo
          location={booth.location}
          date={booth.date}
          hasBorder={false}
        />

        <div className="relative w-full h-60">
          <Image
            src={booth.location_image}
            alt={booth.location}
            fill
            className="object-cover rounded-[10px]"
          />
        </div>
      </div>
    </main>
  );
}
