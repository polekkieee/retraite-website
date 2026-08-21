'use client';

import { CategoryId } from '../lib/data';
import { useState } from 'react';
import { Playfair_Display, Lato } from 'next/font/google';
import { ChevronDown } from 'lucide-react';

const playfair = Playfair_Display({ subsets: ['latin'] });
const lato = Lato({ weight: ['300', '400', '700'], subsets: ['latin'] });

export interface Retreat {
  id: number;
  created_at: string;
  bookretreatsId: number;
  title: string;
  desc: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  affiliateLink: string;
  category: CategoryId[];
  startDate?: string;
  dateDisplay?: string;
}

export interface pageData {
  id: number;
  created_at: string;
  pageTitle: string;
  metaDescription: string;
  introText: string;
  outroText: string;
  retraites: number[];
}

export default function ClientHome({
  initialFeaturedPageData,
  initialRetreatsEU,
  initialRetreatsNL,
}: {
  initialFeaturedPageData: pageData;
  initialRetreatsEU: Retreat[];
  initialRetreatsNL: Retreat[];
}) {
  const [pageData] = useState<pageData>(initialFeaturedPageData);
  const [retreatsEurope] = useState<Retreat[]>(initialRetreatsEU);
  const [retreatsNetherlands] = useState<Retreat[]>(initialRetreatsNL);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const retraitesArray =
    typeof pageData?.retraites === 'string'
      ? JSON.parse(pageData.retraites)
      : pageData?.retraites || [];

  const featuredRetreats = retraitesArray
    .map((id: number) => retreatsEurope.find((r) => r.id === id))
    .filter(Boolean) as Retreat[];

  return (
    <div>

      <section
        aria-label="Uitgelichte creatieve retraites – introductie"
        className="pt-30 pb-16 px-6 max-w-4xl mx-auto text-center md:text-left"
      >
        <h1 className={`text-4xl md:text-6xl text-stone-900 leading-tight mb-8 ${playfair.className}`}>
          {pageData.pageTitle}
        </h1>
        <div className="w-12 h-1 bg-stone-900 mb-8 mx-auto md:mx-0" aria-hidden="true" />
        <p
          data-speakable="intro"
          className="text-base md:text-lg text-stone-600 max-w-2xl font-light leading-relaxed"
        >
          {pageData.introText}
        </p>
      </section>

      <main
        aria-label="Redactionele selectie creatieve retraites"
        className="max-w-4xl mx-auto px-6 py-12"
      >
        <ol aria-label="Uitgelichte retraites" className="flex flex-col gap-16 mb-24 list-none p-0">
          {featuredRetreats.map((retreat: Retreat, index: number) => (
            <li key={retreat.id}>
              <article
                aria-label={`Retraite ${index + 1}: ${retreat.title} in ${retreat.location}`}
                className="group flex flex-col gap-6"
                itemScope
                itemType="https://schema.org/LodgingBusiness"
              >
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                  <span
                    aria-hidden="true"
                    className={`text-4xl text-stone-300 italic ${playfair.className}`}
                  >
                    {String(index + 1).padStart(2, '0')}.
                  </span>
                  <div
                    className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold"
                    itemProp="address"
                    itemScope
                    itemType="https://schema.org/PostalAddress"
                  >
                    <span itemProp="addressLocality">{retreat.location}</span>
                  </div>
                </div>

                <h2
                  itemProp="name"
                  className={`text-3xl md:text-4xl text-stone-900 ${playfair.className}`}
                >
                  {retreat.title}
                </h2>

                <div className="w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-stone-100 relative mt-4 mb-2">
                  <img
                    src={retreat.image}
                    alt={`${retreat.title} – creatieve retraite in ${retreat.location}`}
                    loading="lazy"
                    width={800}
                    height={450}
                    itemProp="image"
                    className="object-cover w-full h-full group-hover:scale-105 transition duration-1000 ease-out"
                  />
                  <div
                    className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 text-xs font-bold uppercase tracking-widest text-stone-900 shadow-lg"
                    aria-label={retreat.price ? `Prijs: vanaf €${retreat.price}` : "Prijs op aanvraag"}
                  >
                    {retreat.price ? (
                      <>
                        <span aria-hidden="true">Vanaf €</span>
                        <span itemProp="priceRange">{retreat.price}</span>
                      </>
                    ) : (
                      <span>Prijs op aanvraag</span>
                    )}
                  </div>
                </div>

                <div className="max-w-3xl ml-0 md:ml-12">
                  <p
                    itemProp="description"
                    className="text-stone-600 leading-loose mb-8 text-sm md:text-base"
                  >
                    {retreat.desc}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-stone-200 pt-6 gap-4">
                    <time
                      className="text-sm font-medium text-stone-500 italic"
                      dateTime={retreat.startDate || undefined}
                      itemProp="availabilityStarts"
                    >
                      Beschikbaar: {retreat.dateDisplay || 'Op aanvraag'}
                    </time>
                    <a
                      href={retreat.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Bekijk en boek: ${retreat.title} in ${retreat.location}`}
                      itemProp="url"
                      className="text-xs uppercase tracking-widest font-bold border-b-2 border-stone-900 pb-1 hover:text-stone-500 hover:border-stone-500 transition-colors w-fit"
                    >
                      Bekijk &amp; Boek &rarr;
                    </a>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <section
          aria-label="Redactioneel nawoord"
          className="bg-stone-100 p-8 md:p-12 mt-12 border-l-4 border-stone-900"
        >
          <p
            data-speakable="outro"
            className="text-stone-600 leading-loose max-w-3xl"
          >
            {pageData.outroText}
          </p>
        </section>

        <div className="mt-8 text-center">
          <a
            href="/"
            aria-label="Zoek verder in ons aanbod van creatieve retraites"
            className="inline-flex items-center justify-center rounded-full bg-stone-900 text-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] hover:bg-stone-700 transition"
          >
            Zoek verder
          </a>
        </div>
      </main>

    </div>
  );
}