'use client';

import { CategoryId } from '../lib/data';
import { useState } from 'react';
import { Playfair_Display, Lato } from 'next/font/google';
import { ChevronDown } from 'lucide-react';

// --- FONTS ---
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

export default function ClientHome({ initialFeaturedPageData, initialRetreatsEU, initialRetreatsNL }: { initialFeaturedPageData: pageData; initialRetreatsEU: Retreat[]; initialRetreatsNL: Retreat[] }) {

  const [pageData] = useState<pageData>(initialFeaturedPageData);
  const [retreatsEurope] = useState<Retreat[]>(initialRetreatsEU);
  const [retreatsNetherlands] = useState<Retreat[]>(initialRetreatsNL);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Veilige fallback voor als de data nog niet perfect is
  const retraitesArray = typeof pageData?.retraites === 'string'
    ? JSON.parse(pageData.retraites)
    : (pageData?.retraites || []);

  const featuredRetreats = retraitesArray.map((id: number) => {
    return retreatsEurope.find(r => r.id === id);
  }).filter(Boolean); // Filtert undefined items er direct uit

  return (
    <div className={`min-h-screen bg-[#FAFAF9] text-stone-800 ${lato.className}`}>

      {/* --- HEADER --- */}
      <nav className="fixed top-0 w-full z-50 bg-[#FAFAF9]/90 backdrop-blur-md border-b border-stone-200/50">
        {isDropdownOpen && (
          <div
            className="fixed inset-0 z-[90] bg-transparent cursor-default h-screen w-screen"
            onClick={() => setIsDropdownOpen(false)}
          />
        )}
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-13 md:h-13 flex items-center justify-between relative">
          {/* 1. LOGO */}
          <a href="/" className={`text-lg md:text-2xl font-semibold tracking-tight text-stone-900 ${playfair.className} relative z-[50]`}>
            CreatieveRetraites<span className="text-stone-400">.nl</span>
          </a>
          <div className="flex items-center gap-4 md:gap-8">
            {/* 2. INSPIRATIE DROPDOWN */}
            <div className="relative z-[100]">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-[11px] md:text-xs uppercase tracking-widest font-bold text-stone-500 hover:text-stone-900 transition flex items-center gap-1 py-2 cursor-pointer"
              >
                Inspiratie
                <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full right-[-50px] md:right-0 w-64 bg-white border border-stone-100 shadow-xl rounded-sm py-4 mt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-6 mb-2 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">
                    Tips
                  </div>
                  <a href="/uitgelicht" className="block px-6 py-2.5 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition">
                    Uitgelicht
                  </a>
                  <div className="h-px bg-stone-100 my-2 mx-6" />
                  <a href="/over-ons" className="block px-6 py-2.5 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition font-medium">
                    Over Ons
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* --- MAGAZINE HERO SECTION --- */}
      <section className="pt-30 pb-16 px-6 max-w-4xl mx-auto text-center md:text-left">
        <h1 className={`text-4xl md:text-6xl text-stone-900 leading-tight mb-8 ${playfair.className}`}>
          {pageData.pageTitle}
        </h1>
        <div className="w-12 h-1 bg-stone-900 mb-8 mx-auto md:mx-0"></div>
        <p className="text-base md:text-lg text-stone-600 max-w-2xl font-light leading-relaxed">
          {pageData.introText}
        </p>
      </section>

      {/* --- EDITORIAL LISTING --- */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex flex-col gap-16 mb-24">
          {featuredRetreats.map((retreat: Retreat, index: number) => (
            <article key={retreat?.id} className="group flex flex-col gap-6">

              {/* Nummering & Meta */}
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                <span className={`text-4xl text-stone-300 italic ${playfair.className}`}>
                  {String(index + 1).padStart(2, '0')}.
                </span>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold">
                  <span>{retreat?.location}</span>
                </div>
              </div>

              {/* Titel */}
              <h2 className={`text-3xl md:text-4xl text-stone-900 ${playfair.className}`}>
                {retreat?.title}
              </h2>

              {/* Grote, sfeervolle foto (Editorial style) */}
              <div className="w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-stone-100 relative mt-4 mb-2">
                <img
                  src={retreat?.image}
                  alt={retreat?.title}
                  loading="lazy"
                  className="object-cover w-full h-full group-hover:scale-105 transition duration-1000 ease-out"
                />
                {/* Minimalistische prijs tag */}
                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 text-xs font-bold uppercase tracking-widest text-stone-900 shadow-lg">
                  Vanaf €{retreat?.price}
                </div>
              </div>

              {/* Inhoud & Actie */}
              <div className="max-w-3xl ml-0 md:ml-12">
                <p className="text-stone-600 leading-loose mb-8 text-sm md:text-base">
                  {retreat?.desc}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-stone-200 pt-6 gap-4">
                  <span className="text-sm font-medium text-stone-500 italic">
                    Beschikbaar: {retreat?.dateDisplay || 'Op aanvraag'}
                  </span>
                  <a
                    href={retreat?.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-widest font-bold border-b-2 border-stone-900 pb-1 hover:text-stone-500 hover:border-stone-500 transition-colors w-fit"
                  >
                    Bekijk & Boek &rarr;
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Dynamische Pagina Footer / Outro */}
        <section className="bg-stone-100 p-8 md:p-12 mt-12 border-l-4 border-stone-900">
          <p className="text-stone-600 leading-loose max-w-3xl">
            {pageData.outroText}
          </p>
        </section>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-stone-900 text-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] hover:bg-stone-700 transition"
          >
            Zoek verder
          </a>
        </div>

      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-stone-900 text-stone-400 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className={`text-2xl text-[#FAFAF9] mb-4 ${playfair.className}`}>CreatieveRetraites.nl</h2>
            <p className="max-w-xs font-light text-sm">
              De startplek voor jouw volgende creatieve sprong. Wij verbinden makers met unieke locaties.
            </p>
          </div>
          <div className="flex gap-8 md:justify-end text-xs uppercase tracking-widest font-bold">
            <a href="/uitgelicht" className="hover:text-white transition">Uitgelichte Retraites</a>
            <a href="/over-ons" className="hover:text-white transition">Over Ons</a>
            <a href="/privacy" className="hover:text-white transition">Privacy & Disclaimer</a>
            <a href="https://instagram.com/CreatieveRetraites.nl" target="_blank" className="hover:text-white transition">Instagram</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-[10px] text-center opacity-50">
          © {new Date().getFullYear()} CreatieveRetraites.nl - Onderdeel van de creatieve community.
        </div>
      </footer>
    </div>
  );
}