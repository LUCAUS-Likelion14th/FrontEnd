import NoticeBanner from "@/components/home/NoticeBanner";
import StampShortcutButton from "@/components/home/StampShortcutButton";

export default function Home() {
  return (
    <main className="p-4">
      <NoticeBanner />
      <StampShortcutButton />
    </main>
  );
}