'use client';

import React, { useState } from 'react';
import { Search, MapPin, Star, Heart, BookOpen, Coffee, Feather, Wind, Flame, FilterIcon } from 'lucide-react';
import { Playfair_Display, Lato } from 'next/font/google';

// --- FONTS ---
// This brings in a "Book-style" font for headings and a clean font for reading
const playfair = Playfair_Display({ subsets: ['latin'] });
const lato = Lato({ weight: ['300', '400', '700'], subsets: ['latin'] });

// --- MOCK DATA ---
const categories = [
  { id: 'filter', name: 'Filter Specifiek', icon: <FilterIcon size={16} /> },
  { id: 'all', name: 'Alle Collecties', icon: <BookOpen size={16} /> },
  { id: 'cabin', name: 'Bos & Haardvuur', icon: <Flame size={16} /> },
  { id: 'castle', name: 'Historisch Erfgoed', icon: <Feather size={16} /> },
  { id: 'silence', name: 'Stilte Retraites', icon: <Wind size={16} /> },
  { id: 'coffee', name: 'Koffie & Boeken', icon: <Coffee size={16} /> },
];

const retreats = [
  {
    id: 1,
    title: "The Writer's Cabin",
    location: "Veluwe, Gelderland",
    desc: "Een afgelegen boshuisje met kamerbrede boekenkasten en een open haard. Perfect voor het afmaken van je manuscript.",
    rating: 4.9,
    price: 135,
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=800",
    link: "#"
  },
  {
    id: 2,
    title: "Landgoed De Leestafel",
    location: "Zuid-Limburg",
    desc: "Slaap in een gerenoveerd koetshuis op een 17e-eeuws landgoed. Inclusief toegang tot de privé-bibliotheek.",
    rating: 5.0,
    price: 190,
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800",
    link: "#"
  },
  {
    id: 3,
    title: "Duinhuisje 'Noorderwind'",
    location: "Vlieland",
    desc: "Alleen te bereiken per fiets. Geen wifi, wel uitzicht op zee en een vintage platenspeler.",
    rating: 4.8,
    price: 160,
    image: "https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?auto=format&fit=crop&q=80&w=800",
    link: "#"
  },
  {
    id: 4,
    title: "Het Klooster Atelier",
    location: "Brabant",
    desc: "Totale stilte binnen de muren van een actief klooster. Sobere luxe en vegetarisch ontbijt.",
    rating: 4.7,
    price: 95,
    image: "https://images.unsxplash.com/photo-1507643179173-4b0d049f4871?auto=format&fit=crop&q=80&w=800",
    link: "#"
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className={`min-h-screen bg-[#FAFAF9] text-stone-800 ${lato.className}`}>

      {/* --- ELEGANT HEADER --- */}
      <nav className="fixed top-0 w-full z-50 bg-[#FAFAF9]/80 backdrop-blur-md border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className={`text-2xl font-semibold tracking-tight text-stone-900 ${playfair.className}`}>
            LeesRetraites<span className="text-stone-600">.nl</span>
          </div>

          {/* <div className="hidden md:flex gap-8 text-sm font-medium text-stone-600 tracking-wide">
            <a href="#" className="hover:text-stone-900 transition">Collecties</a>
            <a href="#" className="hover:text-stone-900 transition">Over Ons</a>
            <a href="#" className="hover:text-stone-900 transition">Journal</a>
          </div> */}

          <div className="flex items-center gap-10">
            <button className="hidden md:block text-xs uppercase tracking-widest font-bold text-stone-500 hover:text-stone-900 transition">
              Over Ons
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto text-center">
        <h1 className={`text-5xl md:text-6xl text-stone-900 leading-tight mb-6 ${playfair.className}`}>
          Vind de stilte om<br />te verdwalen in een verhaal.
        </h1>
        <p className="text-lg text-stone-500 max-w-2xl mx-auto font-light leading-relaxed">
          Samengestelde locaties in Nederland speciaal voor boekenliefhebbers.
        </p>
      </section>

      {/* --- START SEARCHING BUTTON --- */}
      <section>
        <div className="flex items-center gap-10">
          <button className="bg-stone-900 text-[#FAFAF9] px-10 py-3 rounded-full text-sm font-medium hover:bg-stone-700 transition shadow-lg shadow-stone-900/10">
            Start Zoeken
          </button>
        </div>
      </section>

      {/* --- MINIMALIST FILTER --- */}
      <div className="sticky top-20 z-40 bg-[#FAFAF9] border-b border-stone-100 mb-12 shadow-lg shadow-stone-300/10">
        <div className="max-w-7xl mx-auto px-6 flex justify-start py-4 gap-3 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`
                flex items-center gap-2 px-6 py-2.5 rounded-full text-sm transition duration-200 border
                ${activeCategory === cat.id
                  ? 'bg-stone-900 text-white border-stone-900 shadow-md'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                }
              `}
            >
              <span className="opacity-70">{cat.icon}</span>
              <span className="min-w-[80px]">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* --- EDITORIAL GRID --- */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {retreats.map((retreat) => (
            <div key={retreat.id} className="group cursor-pointer">

              {/* Image Container - Aspect Ratio 4:5 for Editorial Look */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-stone-200 mb-5 shadow-sm">
                <img
                  src={retreat.image}
                  alt={retreat.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition duration-700 ease-in-out"
                />
                <button className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white hover:text-red-500 transition">
                  <Heart size={18} />
                </button>
              </div>

              {/* Typography & Details */}
              <div className="flex justify-between items-baseline mb-1">
                <h3 className={`text-lg text-stone-900 ${playfair.className}`}>
                  {retreat.title}
                </h3>
                <div className="flex items-center gap-1 text-sm font-medium text-stone-900">
                  <Star size={13} className="fill-stone-900" />
                  <span>{retreat.rating}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-stone-500 text-xs uppercase tracking-widest mb-3">
                <MapPin size={12} />
                {retreat.location}
              </div>

              <p className="text-stone-500 text-sm leading-relaxed mb-4 line-clamp-2">
                {retreat.desc}
              </p>

              <div className="flex items-center justify-between border-t border-stone-200 pt-4 mt-auto">
                <div>
                  <span className={`text-lg ${playfair.className}`}>€{retreat.price}</span>
                  <span className="text-stone-400 text-sm"> / nacht</span>
                </div>
                <span className="text-xs font-bold underline decoration-stone-300 underline-offset-4 hover:text-stone-900 transition">
                  Bekijk beschikbaarheid
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-stone-900 text-stone-400 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className={`text-2xl text-[#FAFAF9] mb-4 ${playfair.className}`}>LeesRetraites.nl</h2>
            <p className="max-w-xs font-light">
              Wij cureren de stilste plekjes in Nederland voor mensen die niets liever doen dan lezen.
            </p>
          </div>
          <div className="flex gap-8 md:justify-end text-sm">
            <a href="#" className="hover:text-white transition">Instagram</a>
            <a href="#" className="hover:text-white transition">Contact</a>
            <a href="#" className="hover:text-white transition">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}