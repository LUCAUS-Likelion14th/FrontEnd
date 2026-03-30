import NoticeBanner from "@/components/home/NoticeBanner";
import StampShortcutButton from "@/components/home/StampShortcutButton";
import ImageSwiper from "@/components/ui/ImageSwiper";

export default function Home() {
  return (
    <main className="p-4">
      <div className="flex flex-col gap-8">
        <ImageSwiper />
        <div className="flex flex-col gap-2">
          <NoticeBanner />
          <StampShortcutButton />
        </div>
      </div>
    </main>
  );
}