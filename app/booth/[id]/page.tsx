import BoothTitle from "@/components/detail/BoothTitle"
import DetailHero from "@/components/detail/DetailHero"

type Props = {
  params: { id: string }
}

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
}

export default async function BoothDetailPage({ params }: Props) {

  return (
    <main>
      <DetailHero title="부스 정보" imageUrl={booth.booth_image} />
      <div className="flex flex-col px-4">
      <BoothTitle
        name={booth.booth_name}
        categories={booth.booth_category}
        info={booth.booth_info}
      />

      </div>

    
    </main>
  )
}