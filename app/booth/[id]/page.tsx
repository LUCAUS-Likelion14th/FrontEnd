import DetailHero from "@/components/detail/DetailHero"

type Props = {
  params: { id: string }
}

export default async function BoothDetailPage({ params }: Props) {
    const booth_image ="/img.png"

  return (
    <main>
      <DetailHero title="부스 정보" imageUrl={booth_image} />

    </main>
  )
}