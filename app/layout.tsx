import BottomNav from "@/components/layouts/BottomNav";
import "./globals.css";
import Header from "@/components/layouts/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main className="min-h-screen mt-14">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
