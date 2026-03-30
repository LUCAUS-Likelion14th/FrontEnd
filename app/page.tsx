import NoticeBanner from "@/components/home/NoticeBanner";
import StampShortcutButton from "@/components/home/StampShortcutButton";

export default function Home() {
  return (
    <main className="p-4">
      <div className="flex flex-col gap-2">
        <NoticeBanner />
        <StampShortcutButton />
      </div>
    </main>
  );
}