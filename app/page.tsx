import NoticeBanner from "@/components/home/NoticeBanner";
import StampShortcutButton from "@/components/home/StampShortcutButton";
import ImageSwiper from "@/components/ui/ImageSwiper";
import StageSection from "@/components/home/stage/StageSection";
import BoothSection from "@/components/home/BoothSection";
import FoodSection from "@/components/home/FoodSection";
import Footer from "@/components/layouts/Footer";
import { homeApi } from "@/lib/api/home";

export default async function Home() {
  const [topBooths, promotions, liveStages, hotFoods, activeNotices] =
  await Promise.all([
    homeApi.getTopBooth().catch(() => []),
    homeApi.getPromotion().catch(() => []),
    homeApi.getLiveStage().catch(() => []),
    homeApi.getHotFood().catch(() => []),
    homeApi.getActiveNotice().catch(() => []),
  ])

  return (
    <main className="flex flex-col p-4 gap-12">
      <div className="flex flex-col gap-8">
        <ImageSwiper promotions={promotions} />
        <div className="flex flex-col gap-2">
          <NoticeBanner notices={activeNotices} />
          <StampShortcutButton />
        </div>
      </div>

      <section className="flex flex-col gap-8">
        <StageSection stages={liveStages} />
        <BoothSection booths={topBooths} />
        <FoodSection foods={hotFoods} />
      </section>

      <Footer />
    </main>
  );
}