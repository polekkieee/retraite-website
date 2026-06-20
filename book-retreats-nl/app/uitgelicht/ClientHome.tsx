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

    const featuredRetreatsIds = JSON.parse(pageData.retraites as unknown as string) as number[];

    const featuredRetreats = featuredRetreatsIds.map(id => {
        return retreatsEurope.find(r => r.id === id);
    });

  return (
    <div className={`min-h-screen bg-[#FAFAF9] text-stone-800 ${lato.className}`}>
  
        {/* --- HEADER --- */}
        <nav className="fixed top-0 w-full z-50 bg-[#FAFAF9]/80 backdrop-blur-md border-b border-stone-200/50">
  
          {/* DE KLIKVANGER (OVERLAY) */}
          {/* Deze zit nu op z-90, dus BOVEN de pagina content, maar ONDER het menu */}
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
              {/* We geven dit blok z-100 zodat het BOVEN de overlay (z-90) zweeft */}
              <div className="relative z-[100]">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="text-[11px] md:text-xs uppercase tracking-widest font-bold text-stone-500 hover:text-stone-900 transition flex items-center gap-1 py-2"
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
        {/* --- HERO SECTION --- */}
        <section className="pt-30 pb-4 px-6 max-w-7xl mx-auto text-center">
          <h1 className={`text-4xl md:text-6xl text-stone-900 leading-tight mb-6 ${playfair.className}`}>
            {pageData.pageTitle}
          </h1>
          <p className="text-sm text-stone-500 max-w-2xl mb-8 mx-auto font-soft leading-relaxed">
            {pageData.introText}
          </p>
        </section>
  
        
    <main className="max-w-6xl mx-auto px-4 py-12">

      {/* Grid met Gekoppelde Retraites */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {featuredRetreats.map(retreat => (
          <div key={retreat?.id} className="border rounded-xl overflow-hidden shadow-sm flex flex-col">
            {/* Hier komt later het echte design van de Retreat card */}
            <div className="h-56 bg-gray-200 relative">
               <img
                      src={retreat?.image}
                      alt={retreat?.title}
                      loading="lazy"
                      className="object-cover w-full h-full group-hover:scale-105 transition duration-700 ease-in-out"
                    />
               <div className="absolute top-4 right-4 bg-white px-3 py-1 text-sm font-bold rounded-full">
                 €{retreat?.price}
               </div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <span className="text-sm text-blue-600 font-semibold mb-2">{retreat?.category}</span>
              <h2 className="font-bold text-xl mb-2">{retreat?.title}</h2>
              <p className="text-gray-500 mb-4">{retreat?.location}</p>
              
              <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm font-medium">{retreat?.dateDisplay}</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Dynamische Pagina Footer / Outro */}
      <footer className="bg-slate-50 p-8 rounded-2xl">
        <p className="text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
          {pageData.outroText}
        </p>
      </footer>
    </main>
    </div>
  );
}