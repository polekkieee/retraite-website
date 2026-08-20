import type { Metadata } from "next";
import { Geist, Geist_Mono, Lato } from "next/font/google";
import "./globals.css";

import Footer from "./components/Footer";
import Header from "./components/Header";


import { GoogleTagManager } from '@next/third-parties/google';

import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lato = Lato({ weight: ['300', '400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Creatieve Retraites | Vind jouw ideale Schrijf- of Kunstretraite",
  description: "Ontdek de mooiste creatieve retraites in Nederland en Europa. Van schrijfweken tot schildervakanties: vind de ideale plek om je creativiteit weer te laten stromen.",
  openGraph: {
    title: "Creatieve Retraites",
    description: "Vind de retraite waar jouw creativiteit weer gaat stromen.",
    url: 'https://www.creatieveretraites.nl',
    siteName: 'Creatieve Retraites',
    locale: 'nl_NL',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className={`min-h-screen bg-[#FAFAF9] text-stone-800 ${lato.className}`}>

          <Header />

          {children}

          <Footer />

        </div>
      </body>
      <GoogleTagManager gtmId="GTM-TMFS8L3X" />
      <SpeedInsights />
    </html>
  );
}