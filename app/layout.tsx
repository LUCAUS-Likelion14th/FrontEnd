
import BottomNav from "@/components/layouts/BottomNav";
import "./globals.css"
import Footer from "@/components/layouts/Footer";
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
        <main className="min-h-screen">{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}