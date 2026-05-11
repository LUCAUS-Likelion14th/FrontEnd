import localFont from "next/font/local";
import BottomNav from "@/components/layouts/BottomNav";
import "./globals.css";
import Header from "@/components/layouts/Header";
import Providers from "./providers";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={pretendard.variable} style={{ colorScheme: "light" }}>
      <body className={pretendard.className}>
        <Providers>
          <Header />
          <main className="min-h-screen mt-14">{children}</main>
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
