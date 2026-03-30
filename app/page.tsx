import NoticeBanner from "@/components/home/NoticeBanner";
import StampShortcutButton from "@/components/home/StampShortcutButton";
import ImageSwiper from "@/components/ui/ImageSwiper";
import StageSection from "@/components/stage/StageSection";
import BoothSection from "@/components/booth/BoothSection";
import FoodSection from "@/components/food/FoodSection";

export default function Home() {
  return (
    <main className="flex flex-col p-4 gap-12">
      <div className="flex flex-col gap-8">
        <ImageSwiper />
        <div className="flex flex-col gap-2">
          <NoticeBanner />
          <StampShortcutButton />
        </div>
      </div>

      <section className="flex flex-col gap-8">
        <StageSection />
        <BoothSection />
        <FoodSection />
      </section>

    </main>
  );
}