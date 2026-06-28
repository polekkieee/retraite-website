// app/uitgelicht/page.tsx
import { getFeaturedPageData, getRetreatsEurope, getRetreatsNL } from '../lib/data';
import ClientHome from './ClientHome';
import { generateStructuredData } from './structuredData';
import type { Metadata } from 'next';

// Vercel onthoudt deze pagina voor 1 uur (3600 seconden)
export const revalidate = 3600;

// ── STATIC METADATA ────────────────────────────────────────────────────────────
// Focus keywords gebaseerd op Google Trends NL data (jun 2025 – jun 2026):
//   - "retraite france" (+1.050%), "retraite en france" (+350%)
//   - "retraite portugal" (+40%), "retraite nederland" (#3 volume)
//   - "retraite weekend" (#9 volume), "wat is retraite" (informationeel)
export const metadata: Metadata = {
  title: 'Uitgelichte Creatieve Retraites | CreatieveRetraites.nl',
  description:
    'Ontdek door onze redactie geselecteerde creatieve retraites in Frankrijk, Portugal, Nederland en heel Europa. Van een weekend weg tot een volle week — handpicked voor makers.',
  alternates: {
    canonical: 'https://www.creatieveretraites.nl/uitgelicht',
    languages: {
      'nl-NL': 'https://www.creatieveretraites.nl/uitgelicht',
      'nl-BE': 'https://www.creatieveretraites.nl/uitgelicht',
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    url: 'https://www.creatieveretraites.nl/uitgelicht',
    siteName: 'CreatieveRetraites.nl',
    locale: 'nl_NL',
    title: 'Uitgelichte Creatieve Retraites | CreatieveRetraites.nl',
    description:
      'Ontdek door onze redactie geselecteerde creatieve retraites in Frankrijk, Portugal, Nederland en heel Europa. Van een weekend weg tot een volle week — handpicked voor makers.',
    images: [
      {
        url: 'https://www.creatieveretraites.nl/og-uitgelicht.jpg',
        width: 1200,
        height: 630,
        alt: 'Uitgelichte creatieve retraites – CreatieveRetraites.nl',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Uitgelichte Creatieve Retraites | CreatieveRetraites.nl',
    description:
      'Handpicked creatieve retraites in Frankrijk, Portugal en Nederland, geselecteerd door onze redactie.',
    images: ['https://www.creatieveretraites.nl/og-uitgelicht.jpg'],
  },
};

// ── PAGE ───────────────────────────────────────────────────────────────────────
export default async function Page() {
  const featuredPageData = await getFeaturedPageData();
  const retreatsEurope = await getRetreatsEurope();
  const retreatsNL = await getRetreatsNL();

  // Build the featured list server-side so structured data matches what's rendered
  const retraitesArray =
    typeof featuredPageData?.retraites === 'string'
      ? JSON.parse(featuredPageData.retraites)
      : featuredPageData?.retraites || [];

  const featuredRetreats = retraitesArray
    .map((id: number) => retreatsEurope.find((r) => r.id === id))
    .filter(Boolean);

  const structuredData = generateStructuredData(featuredPageData, featuredRetreats);

  return (
    <>
      {/*
        JSON-LD structured data injected server-side so it's in the HTML
        before any JavaScript runs. Contains:
          - CollectionPage with speakable schema (GEO / AI answer engines)
          - ItemList with all featured retreats (name, location, price, image)
          - BreadcrumbList (Home → Uitgelicht)
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />

      <ClientHome
        initialFeaturedPageData={featuredPageData}
        initialRetreatsEU={retreatsEurope}
        initialRetreatsNL={retreatsNL}
      />
    </>
  );
}