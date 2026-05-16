import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#05061A",
};
import localFont from "next/font/local";
import Script from "next/script";
import BottomNav from "@/components/layouts/BottomNav";
import "./globals.css";
import Header from "@/components/layouts/Header";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "청:ON '26",
  icons: {
    icon: "/icon.png",
  },
};

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
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="ko" className={pretendard.variable} style={{ colorScheme: "light" }}>
      <body className={pretendard.className}>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        <Providers>
          <Header />
          <main className="min-h-screen mt-14" style={{ paddingTop: "env(safe-area-inset-top)" }}>{children}</main>
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
