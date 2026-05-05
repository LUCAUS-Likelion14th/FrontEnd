import { NoticeBanner, StageSection, StampShortcutButton, BoothSection, FoodSection, SplashScreen} from "@/components";
import ImageSwiper from "@/components/ui/ImageSwiper";
import Footer from "@/components/layouts/Footer";
import { homeApi } from "@/lib/api/homeApi";

export default async function Home() {
  const [topBooths, promotions, liveStages, hotFoods, activeNotices] =
    await Promise.all([
      homeApi.getTopBooth().catch(() => []),
      homeApi.getPromotion().catch(() => []),
      homeApi.getLiveStage().catch(() => []),
      homeApi.getHotFood().catch(() => []),
      homeApi.getActiveNotice().catch(() => []),
    ]);

  return (
    <>
      <SplashScreen />

      <main className="flex flex-col p-4 gap-12 mb-11">
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
      </main>

      <Footer />
    </>
  );
}
