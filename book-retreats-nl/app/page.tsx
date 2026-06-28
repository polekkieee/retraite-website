// app/page.tsx
import { getRetreatsEurope, getRetreatsNL } from './lib/data';
import ClientHome from './ClientHome';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

// ── METADATA ──────────────────────────────────────────────────────────────────
// Overrides the root layout metadata for this specific page.
// Keywords based on Google Trends NL data (jun 2025 – jun 2026):
//   - "retraite france" (+1.050%), "retraite nederland" (#3), "retraite weekend" (#9)
//   - "retraite portugal" (+40%), "wat is retraite" (informational)
export const metadata: Metadata = {
  title: 'Creatieve Retraites in Nederland en Europa | CreatieveRetraites.nl',
  description:
    'Vind jouw creatieve retraite in Nederland, Frankrijk, Portugal en heel Europa. Van schrijfweken tot schilderateliers — ontdek de plek waar jouw creativiteit weer gaat stromen.',
  alternates: {
    canonical: 'https://www.creatieveretraites.nl',
    languages: {
      'nl-NL': 'https://www.creatieveretraites.nl',
      'nl-BE': 'https://www.creatieveretraites.nl',
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    url: 'https://www.creatieveretraites.nl',
    siteName: 'CreatieveRetraites.nl',
    locale: 'nl_NL',
    title: 'Creatieve Retraites in Nederland en Europa | CreatieveRetraites.nl',
    description:
      'Vind jouw creatieve retraite in Nederland, Frankrijk, Portugal en heel Europa. Van schrijfweken tot schilderateliers — ontdek de plek waar jouw creativiteit weer gaat stromen.',
    images: [
      {
        url: 'https://www.creatieveretraites.nl/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Creatieve retraites in Nederland en Europa – CreatieveRetraites.nl',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creatieve Retraites in Nederland en Europa | CreatieveRetraites.nl',
    description:
      'Van schrijfweken in Toscane tot schilderateliers aan zee — vind de plek waar jouw creativiteit weer gaat stromen.',
    images: ['https://www.creatieveretraites.nl/og-home.jpg'],
  },
};

// ── STRUCTURED DATA ───────────────────────────────────────────────────────────
function generateHomeStructuredData(): string {
  const webSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CreatieveRetraites.nl',
    url: 'https://www.creatieveretraites.nl',
    description:
      'Vind creatieve retraites in Nederland, Frankrijk, Portugal en heel Europa. Van schrijfweken tot schilderateliers.',
    inLanguage: 'nl',
    // Sitelinks searchbox: shows a search box in Google results
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.creatieveretraites.nl/?zoek={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CreatieveRetraites.nl',
    url: 'https://www.creatieveretraites.nl',
    logo: 'https://www.creatieveretraites.nl/logo.png',
    sameAs: ['https://www.instagram.com/CreatieveRetraites.nl'],
    description:
      'Redactioneel platform voor creatieve retraites in Nederland en Europa, voor makers die écht even weg willen.',
  };

  // speakable on homepage: the hero tagline is what AI crawlers should cite
  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Creatieve Retraites in Nederland en Europa',
    url: 'https://www.creatieveretraites.nl',
    isPartOf: { '@id': 'https://www.creatieveretraites.nl' },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['[data-speakable="hero"]'],
    },
  };

  return JSON.stringify([webSite, organization, webPage]);
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ locatie?: string; categorie?: string }>;
}) {
  const retreatsEurope = await getRetreatsEurope();
  const retreatsNL = await getRetreatsNL();
  const { locatie, categorie } = await searchParams;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateHomeStructuredData() }}
      />
      <ClientHome
        initialRetreatsEU={retreatsEurope}
        initialRetreatsNL={retreatsNL}
        urlLocatie={locatie || ''}
        urlCategorie={categorie || ''}
      />
    </>
  );
}