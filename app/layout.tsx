
import BottomNav from "@/components/layouts/BottomNav";
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <main className="pb-20">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}