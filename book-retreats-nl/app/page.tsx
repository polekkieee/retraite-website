'use client';

import React, { useState, useMemo } from 'react';
import { Search, MapPin, Star, Feather, Wind, Flame, Palette, PenTool, ChevronDown } from 'lucide-react';
import { Playfair_Display, Lato } from 'next/font/google';
import { retreatsEurope, retreatsNetherlands, CategoryId } from './lib/data';

// --- FONTS ---
const playfair = Playfair_Display({ subsets: ['latin'] });
const lato = Lato({ weight: ['300', '400', '700'], subsets: ['latin'] });

// --- CATEGORIES ---
const categories = [
  { id: 'all', name: 'Alles', icon: <Feather size={16} /> },
  { id: 'art', name: 'Kunst & Schilderen', icon: <Palette size={16} /> },
  { id: 'writing', name: 'Schrijven', icon: <PenTool size={16} /> },
  { id: 'silence', name: 'Stilte & Focus', icon: <Wind size={16} /> },
  { id: 'nature', name: 'Natuur & Hutjes', icon: <Flame size={16} /> },
];

export default function Home() {
  // State for filters
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<'europe' | 'nl'>('europe'); // Default to Europe
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Combine logic: Which dataset to use?
  const baseRetreats = locationFilter === 'europe' ? retreatsEurope : retreatsNetherlands;

  function scrollToProducts() {
    const element = document.getElementById('productGrid');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  const filteredRetreats = useMemo(() => {
    return baseRetreats.filter(retreat => {
      // 1. Check Category
      const matchesCategory = activeCategory === 'all'
        ? true
        : retreat.category.includes(activeCategory as CategoryId);

      // 2. Check Search (Title, Desc, or Location)
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        retreat.title.toLowerCase().includes(query) ||
        retreat.desc.toLowerCase().includes(query) ||
        retreat.location.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, locationFilter, searchQuery, baseRetreats]);

  return (
    <div className={`min-h-screen bg-[#FAFAF9] text-stone-800 ${lato.className}`}>

      {/* --- HEADER --- */}
      <nav className="fixed top-0 w-full z-50 bg-[#FAFAF9]/80 backdrop-blur-md border-b border-stone-200/50">
        
        {/* DE KLIKVANGER (OVERLAY) */}
        {/* Deze zit nu op z-90, dus BOVEN je pagina content, maar ONDER het menu */}
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
                  {/* <div className="px-6 mb-2 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">
                    Gidsen & Tips
                  </div>
                  <a href="/tips/top-10-nederland" className="block px-6 py-2.5 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition">
                    Top 10 in Nederland
                  </a>
                  <a href="/tips/schrijfretraite-plannen" className="block px-6 py-2.5 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition">
                    Hoe plan je een schrijfweek?
                  </a>
                  <a href="/tips/inpaklijst" className="block px-6 py-2.5 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition">
                    Inpaklijst voor makers
                  </a>
                  
                  <div className="h-px bg-stone-100 my-2 mx-6" />
                   */}
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
          Geef je ideeën de ruimte<br />die ze verdienen.
        </h1>
        <p className="text-sm text-stone-500 max-w-2xl mb-8 mx-auto font-soft leading-relaxed">
          Van <strong>schrijfweken</strong> in Toscane tot <strong>schilderateliers</strong> aan zee.<br />
          Vind de plek waar <strong>jouw creativiteit</strong> weer gaat stromen.
        </p>

        {/* Search Bar */}
        <div className="max-w-lg mx-auto relative group">
          <input
            type="text"
            placeholder="Zoek op 'Yoga', 'Zon' of 'Spanje'..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                (e.target as HTMLInputElement).blur();

                scrollToProducts();
              }
            }}
            className="w-full pl-12 pr-6 py-4 bg-white border border-stone-200 rounded-full shadow-sm text-stone-600 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all placeholder:text-stone-300"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-stone-800 transition-colors" size={20} />
        </div>
      </section>

      {/* --- FILTERS & LOCATION TOGGLE --- */}
      <div id='productGrid' className="sticky top-13 z-40 bg-[#FAFAF9] border-b border-stone-100 mb-8 shadow-md/20">
        <div className="max-w-7xl mx-auto px-4 pt-4 space-y-4">

          {/* 1. Location Toggle */}
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setLocationFilter('europe')}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${locationFilter === 'europe'
                ? 'bg-stone-800 text-white border-stone-800 shadow-md transform scale-105 '
                : 'bg-white text-stone-400 border-stone-200 hover:border-stone-400 cursor-pointer'
                }`}
            >
              🇪🇺 Europa
            </button>
            <button
              onClick={() => setLocationFilter('nl')}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${locationFilter === 'nl'
                ? 'bg-stone-800 text-white border-stone-800 shadow-md transform scale-105'
                : 'bg-white text-stone-400 border-stone-200 hover:border-stone-400 cursor-pointer'
                }`}
            >
              🇳🇱 Nederland
            </button>
          </div>

          {/* 2. Categories */}
          <div className="relative">

            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#FAFAF9] to-transparent z-10 pointer-events-none md:hidden" />

            <div className="flex justify-start md:justify-center overflow-x-auto no-scrollbar gap-2 pb-2 px-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full text-sm transition duration-300 border whitespace-nowrap shrink-0
                    ${activeCategory === cat.id
                      ? 'bg-stone-200 text-stone-900 border-stone-300 font-medium shadow-sm'
                      : 'bg-transparent text-stone-500 border-transparent hover:bg-white hover:shadow-sm cursor-pointer'
                    }
                  `}
                >
                  <span className={activeCategory === cat.id ? 'opacity-100' : 'opacity-50'}>
                    {cat.icon}
                  </span>
                  <span>{cat.name}</span>
                </button>
              ))}
              <div className="w-8 shrink-0 md:hidden" />
            </div>
          </div>
        </div>
      </div>

      {/* --- GRID --- */}
      <main className="max-w-7xl mx-auto px-6 pb-24">

        <div className="mb-8 text-stone-400 text-sm font-light text-center md:text-left animate-fade-in">
          {filteredRetreats.length} {filteredRetreats.length === 1 ? 'plek' : 'plekken'} gevonden
          {locationFilter === 'nl' ? ' in Nederland' : ' in Europa'}
          {searchQuery && ` voor "${searchQuery}"`}
        </div>

        {filteredRetreats.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {filteredRetreats.map((retreat) => (
              <div
                key={retreat.id}
                onClick={() => window.open(retreat.affiliateLink)}
                className="group cursor-pointer flex flex-col h-full relative" // relative toegevoegd
              >

                {/* --- IMAGE CARD MET HOVER EFFECT --- */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-stone-200 mb-4 shadow-sm">
                  <img
                    src={retreat.image}
                    alt={retreat.title}
                    loading="lazy"
                    className="object-cover w-full h-full group-hover:scale-105 transition duration-700 ease-in-out"
                  />

                  {/* --- DESKTOP: SLIDE UP TEXT OVERLAY --- */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
                      {/* Alleen zichtbaar op desktop (md:block) */}
                      <p className="text-sm font-medium leading-relaxed drop-shadow-2xl">
                        {retreat.desc}
                      </p>
                      <div className="mt-3 text-xs font-bold uppercase tracking-widest text-stone-200 underline decoration-stone-400 underline-offset-4">
                        Lees meer &rarr;
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- CONTENT ONDER DE FOTO --- */}
                <div className="flex flex-col flex-grow">
                  {/* Titel & Rating */}
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`text-lg text-stone-900 ${playfair.className} pr-2 leading-tight`}>
                      {retreat.title}
                    </h3>
                    <div className="flex items-center gap-1 text-sm font-medium text-stone-900 shrink-0 bg-stone-100 px-2 py-1 rounded-full">
                      <Star size={12} className="fill-stone-900" />
                      <span>{retreat.rating}</span>
                    </div>
                  </div>

                  {/* Locatie */}
                  <div className="flex items-center gap-1 text-stone-500 text-xs uppercase tracking-widest mb-3">
                    <MapPin size={12} />
                    {retreat.location}
                  </div>

                  {/* --- MOBIEL: KORTE TEKST --- */}
                  {/* Op desktop verbergen we deze tekst (md:hidden) omdat hij daar nu IN de foto staat. 
          Op mobiel tonen we hem wel, maar afgekort. */}
                  <p className="text-stone-500 text-sm leading-relaxed mb-4 line-clamp-2 md:hidden">
                    {retreat.desc}
                  </p>

                  {/* Prijs & Link */}
                  <div className="flex items-center justify-between border-t border-stone-100 pt-4 mt-auto">
                    <div>
                      <span className={`text-lg ${playfair.className}`}>€{retreat.price}</span>
                      <span className="text-stone-400 text-xs ml-1">totaal</span>
                    </div>
                    <span className="text-xs font-bold underline decoration-stone-300 underline-offset-4 hover:text-stone-900 transition">
                      Bekijk opties
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 text-stone-400">
            <p className="text-lg mb-2">Geen retraites gevonden in {locationFilter === 'nl' ? 'Nederland' : 'Europa'}.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="text-sm underline hover:text-stone-900 cursor-pointer"
            >
              Filters wissen
            </button>
          </div>
        )}
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
            <a href="/over-ons" className="hover:text-white transition">Over Ons</a>
            <a href="/privacy" className="hover:text-white transition">Privacy & Disclaimer</a>
            <a href="https://instagram.com/CreatieveRetraites.nl" target="_blank" className="hover:text-white transition">Instagram</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-[10px] text-center opacity-50">
          © 2026 CreatieveRetraites.nl - Onderdeel van de creatieve community.
        </div>
      </footer>
    </div>
  );
}