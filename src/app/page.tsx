import {
  NoticeBanner,
  StampShortcutButton,
  RankingSections,
  SplashScreen,
} from "@/components";
import ImageSwiper from "@/components/ui/ImageSwiper";
import Footer from "@/components/layout/Footer";
import { homeApi } from "@/api/homeApi";
import { RouteShortcutButton } from "@/components/home/RouteShortcutButton";
import {
  mockPromotions,
  mockLiveStages,
  mockActiveNotice,
} from "@/data/mockHome";

export default async function Home() {
  const [rawPromotions, rawStages, activeNotice] = await Promise.all([
    homeApi.getPromotion().catch(() => mockPromotions),
    homeApi.getLiveStage().catch(() => mockLiveStages),
    homeApi.getActiveNotice().catch(() => mockActiveNotice),
  ]);

  const promotions = Array.isArray(rawPromotions) ? rawPromotions : [];
  const liveStages = Array.isArray(rawStages)
    ? rawStages
    : rawStages
      ? [rawStages]
      : [];

  return (
    <>
      <SplashScreen />

      <main className="flex flex-col gap-12 mb-15">
        <div className="flex flex-col gap-8">
          <ImageSwiper promotions={promotions} />
          <div className="flex flex-col px-4 gap-2">
            <NoticeBanner notice={activeNotice} />
            {/* <StampShortcutButton /> */}
            <RouteShortcutButton />
          </div>
        </div>

        <section className="flex flex-col px-4 gap-8">
          <RankingSections stages={liveStages} />
        </section>
      </main>

      <Footer />
    </>
  );
}
