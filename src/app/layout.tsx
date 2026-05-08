import BottomNav from "@/components/layouts/BottomNav";
import "./globals.css";
import Header from "@/components/layouts/Header";
import Providers from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <Header />
          <main className="min-h-screen mt-14">{children}</main>
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
