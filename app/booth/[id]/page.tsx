import BoothTitle from "@/components/detail/BoothTitle";
import DetailAction from "@/components/detail/DetailAction";
import DetailHeader from "@/components/detail/DetailHeader";
import DetailInfo from "@/components/detail/DetailInfo";
import { BoothApi } from "@/lib/api/boothApi";
import Image from "next/image";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BoothDetailPage({ params }: Props) {
  const { id } = await params;
  const booth = await BoothApi.getDetail(id);

  return (
    <main className="pb-12">
      <DetailHeader title="부스 정보" />
      <div className="relative w-full aspect-390/264">
        <Image src={booth.booth_image} alt="부스 사진" fill className="object-cover" />
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
