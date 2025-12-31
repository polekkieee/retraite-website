'use client';

import React, { useState, useMemo } from 'react';
import { Search, MapPin, Star, Heart, BookOpen, Coffee, Feather, Wind, Flame, Waves, Palette, PenTool, Music, Camera } from 'lucide-react';
import { Playfair_Display, Lato } from 'next/font/google';
import { retreatsData, CategoryId } from './lib/data';

// --- FONTS ---
const playfair = Playfair_Display({ subsets: ['latin'] });
const lato = Lato({ weight: ['300', '400', '700'], subsets: ['latin'] });

// --- CATEGORIES FOR NICHE ---
const categories = [
  { id: 'all', name: 'Alles', icon: <Feather size={16} /> },
  { id: 'writing', name: 'Schrijven', icon: <PenTool size={16} /> },
  { id: 'art', name: 'Kunst & Schilderen', icon: <Palette size={16} /> },
  { id: 'silence', name: 'Stilte & Focus', icon: <Wind size={16} /> },
  { id: 'nature', name: 'Natuur & Hutjes', icon: <Flame size={16} /> },
  { id: 'cabin', name: 'Erfgoed', icon: <BookOpen size={16} /> },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredRetreats = useMemo(() => {
    if (activeCategory === 'all') return retreatsData;

    return retreatsData.filter(retreat =>
      retreat.category.includes(activeCategory as CategoryId)
    );
  }, [activeCategory]);

  return (
    <div className={`min-h-screen bg-[#FAFAF9] text-stone-800 ${lato.className}`}>

      {/* --- HEADER --- */}
      <nav className="fixed top-0 w-full z-50 bg-[#FAFAF9]/80 backdrop-blur-md border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className={`text-2xl font-semibold tracking-tight text-stone-900 ${playfair.className}`}>
            CreatieveRetraites<span className="text-stone-400">.nl</span>
          </div>

          <div className="flex items-center gap-10">
            <button className="hidden md:block text-xs uppercase tracking-widest font-bold text-stone-500 hover:text-stone-900 transition">
              Over Ons
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION (REBRANDED) --- */}
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto text-center">
        <h1 className={`text-4xl md:text-6xl text-stone-900 leading-tight mb-6 ${playfair.className}`}>
          Geef je ideeën de ruimte<br />die ze verdienen.
        </h1>
        <p className="text-lg text-stone-500 max-w-2xl mx-auto font-light leading-relaxed">
          Van schrijfweken in Toscane tot schilderateliers aan zee.<br />
          Vind de plek waar jouw creativiteit weer gaat stromen.
        </p>
        <div className="mt-8">
          <a href="#productGrid" className="bg-stone-900 text-[#FAFAF9] px-10 py-3 rounded-full text-sm font-medium hover:bg-stone-700 transition shadow-lg shadow-stone-900/10">
            Vind jouw retraite
          </a>
        </div>
      </section>

      {/* --- MINIMALIST FILTER --- */}
      <div className="sticky top-20 z-40 bg-[#FAFAF9] border-b border-stone-100 mb-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex justify-start py-4 gap-3 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`
                flex items-center gap-2 px-6 py-2.5 rounded-full text-sm transition duration-300 border whitespace-nowrap
                ${activeCategory === cat.id
                  ? 'bg-stone-900 text-white border-stone-900 shadow-md'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400 cursor-pointer'
                }
              `}
            >
              <span className={activeCategory === cat.id ? 'opacity-100' : 'opacity-70'}>
                {cat.icon}
              </span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* --- EDITORIAL GRID --- */}
      <main id='productGrid' className="max-w-7xl mx-auto px-6 pb-24">

        <div className="mb-6 text-stone-400 text-sm font-light">
          {filteredRetreats.length} creatieve plekken gevonden
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {filteredRetreats.map((retreat) => (
            <div key={retreat.id} onClick={() => window.open(retreat.affiliateLink)} className="group cursor-pointer">

              {/* Image Card */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-stone-200 mb-5 shadow-sm">
                <img
                  src={retreat.image}
                  alt={retreat.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition duration-700 ease-in-out"
                />
              </div>

              {/* Typography & Details */}
              <div className="flex justify-between items-baseline mb-1">
                <h3 className={`text-lg text-stone-900 ${playfair.className} truncate pr-2`}>
                  {retreat.title}
                </h3>
                <div className="flex items-center gap-1 text-sm font-medium text-stone-900 shrink-0">
                  <Star size={13} className="fill-stone-900" />
                  <span>{retreat.rating}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-stone-500 text-xs uppercase tracking-widest mb-3">
                <MapPin size={12} />
                {retreat.location}
              </div>

              <p className="text-stone-500 text-sm leading-relaxed mb-4 line-clamp-2 min-h-[40px]">
                {retreat.desc}
              </p>

              <div className="flex items-center justify-between border-t border-stone-200 pt-4 mt-auto">
                <div>
                  <span className={`text-lg ${playfair.className}`}>€{retreat.price}</span>
                  <span className="text-stone-400 text-sm"> / totaal</span>
                </div>
                <a
                  className="text-xs font-bold underline decoration-stone-300 underline-offset-4 hover:text-stone-900 transition"
                >
                  Bekijk beschikbaarheid
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-stone-900 text-stone-400 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className={`text-2xl text-[#FAFAF9] mb-4 ${playfair.className}`}>CreatieveRetraites.nl</h2>
            <p className="max-w-xs font-light text-sm">
              Wij cureren de beste retraites voor schrijvers en kunstenaars.
            </p>
          </div> 
          <div className="flex gap-8 md:justify-end text-xs uppercase tracking-widest font-bold">
            <a href="/over-ons" className="hover:text-white transition">Over Ons</a>
            <a href="/privacy" className="hover:text-white transition">Privacy & Disclaimer</a>
            <a href="https://instagram.com/CreatieveRetraites" target="_blank" className="hover:text-white transition">Instagram</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-[10px] text-center opacity-50">
          © 2025 CreatieveRetraites.nl - Onderdeel van de creatieve community.
        </div>
      </footer>
    </div>
  );
}