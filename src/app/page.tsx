import { NoticeBanner, StageSection, StampShortcutButton, BoothSection, FoodSection, SplashScreen} from "@/components";
import ImageSwiper from "@/components/ui/ImageSwiper";
import Footer from "@/components/layout/Footer";
import { homeApi } from "@/api/homeApi";

export default async function Home() {
  const [promotions, liveStages, activeNotice] =
    await Promise.all([
      homeApi.getPromotion().catch(() => []),
      homeApi.getLiveStage().catch(() => []),
      homeApi.getActiveNotice().catch(() => null),
    ]);

  return (
    <>
      <SplashScreen />

      <main className="flex flex-col gap-12 mb-15">
        <div className="flex flex-col gap-8">
          <ImageSwiper promotions={promotions} />
          <div className="flex flex-col px-4 gap-2">
            <NoticeBanner notice={activeNotice} />
            <StampShortcutButton />
          </div>
        </div>

        <section className="flex flex-col px-4 gap-8">
          <div id="live-stage"><StageSection stages={liveStages} /></div>
          <div id="top-booth"><BoothSection /></div>
          <div id="hot-food"><FoodSection /></div>
        </section>
      </main>

      <Footer />
    </>
  );
}
