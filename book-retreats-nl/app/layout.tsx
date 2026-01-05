import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { GoogleTagManager } from '@next/third-parties/google'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      <GoogleTagManager gtmId="GTM-TMFS8L3X" />
    </html>
  );
}