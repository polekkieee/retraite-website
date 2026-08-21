'use client';

import { useState, useMemo } from 'react';
import { Search, MapPin, Star, Feather, Wind, Flame, Palette, PenTool, ChevronDown, Calendar } from 'lucide-react';
import { Playfair_Display, Lato } from 'next/font/google';
import { CategoryId } from './lib/data';

const playfair = Playfair_Display({ subsets: ['latin'] });
const lato = Lato({ weight: ['300', '400', '700'], subsets: ['latin'] });

const categories = [
  { id: 'all', name: 'Alles', icon: <Feather size={16} /> },
  { id: 'art', name: 'Kunst & Schilderen', icon: <Palette size={16} /> },
  { id: 'writing', name: 'Schrijven', icon: <PenTool size={16} /> },
  { id: 'silence', name: 'Stilte & Focus', icon: <Wind size={16} /> },
  { id: 'nature', name: 'Natuur & Hutjes', icon: <Flame size={16} /> },
];

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

export default function ClientHome({
  initialRetreatsEU,
  initialRetreatsNL,
  urlLocatie,
  urlCategorie,
  urlZoek,
}: {
  initialRetreatsEU: Retreat[];
  initialRetreatsNL: Retreat[];
  urlLocatie?: string;
  urlCategorie?: string;
  urlZoek?: string;
}) {
  const [retreatsEurope] = useState<Retreat[]>(initialRetreatsEU);
  const [retreatsNetherlands] = useState<Retreat[]>(initialRetreatsNL);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>('all');

  const startCategorie = useMemo(() => {
    switch (urlCategorie) {
      case 'schrijven': return 'writing';
      case 'kunst-schilderen': return 'art';
      case 'stilte-focus': return 'silence';
      case 'natuur-hutjes': return 'nature';
      default: return 'all';
    }
  }, [urlCategorie]);

  const [locationFilter, setLocationFilter] = useState<'europe' | 'nl'>(
    urlLocatie === 'nederland' ? 'nl' : 'europe'
  );
  const [activeCategory, setActiveCategory] = useState<string>(startCategorie);
  const [searchQuery, setSearchQuery] = useState<string>(urlZoek || '');

  const baseRetreats = locationFilter === 'europe' ? retreatsEurope : retreatsNetherlands;

  const availableMonths = useMemo(() => {
    const months = new Set<string>();

    const nu = new Date();
    const huidigJaar = nu.getFullYear();
    const huidigeMaand = String(nu.getMonth() + 1).padStart(2, '0');
    const huidigeJaarMaand = `${huidigJaar}-${huidigeMaand}`;

    baseRetreats.forEach(r => {
      if (r.startDate) {
        const retreatMaand = r.startDate.substring(0, 7);

        if (retreatMaand >= huidigeJaarMaand) {
          months.add(retreatMaand);
        }
      }
    });

    return Array.from(months).sort();
  }, [baseRetreats]);

  const formatMonthText = (yyyyMM: string) => {
    const [year, month] = yyyyMM.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    return date.toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' });
  };

  function scrollToProducts() {
    const element = document.getElementById('productGrid');
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 52;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  const filteredRetreats = useMemo(() => {
    return baseRetreats.filter(retreat => {
      const matchesCategory =
        activeCategory === 'all' ? true : retreat.category.includes(activeCategory as CategoryId);
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        retreat.title.toLowerCase().includes(query) ||
        retreat.desc.toLowerCase().includes(query) ||
        retreat.location.toLowerCase().includes(query);
      const matchesMonth =
        selectedMonth === 'all' || !retreat.startDate || retreat.startDate.startsWith(selectedMonth);
      return matchesCategory && matchesSearch && matchesMonth;
    }).sort((a, b) => a.id - b.id);
  }, [activeCategory, locationFilter, searchQuery, selectedMonth, baseRetreats]);

  return (
    <div>

      {/* HERO */}
      {/*
        data-speakable="hero": the intro paragraph is the text AI crawlers
        (Google SGE, Perplexity) will cite when answering "what is creatieveretraites.nl".
        Referenced in the WebPage speakable schema in page.tsx.
      */}
      <section
        aria-label="Creatieve retraites vinden in Nederland en Europa"
        className="pt-30 pb-4 px-6 max-w-7xl mx-auto text-center"
      >
        <h1 className={`text-4xl md:text-6xl text-stone-900 leading-tight mb-6 ${playfair.className}`}>
          Geef je ideeën de ruimte<br />die ze verdienen.
        </h1>
        <p data-speakable="hero" className="text-sm text-stone-500 max-w-2xl mb-8 mx-auto leading-relaxed">
          Van <strong>schrijfweken</strong> in Frankrijk tot <strong>schilderateliers</strong> aan zee.
          Vind de creatieve retraite in <strong>Nederland of Europa</strong> waar jouw creativiteit weer gaat stromen —
          voor een weekend weg of een hele week.
        </p>

        <div className="max-w-lg mx-auto relative group">
          <label htmlFor="retreat-search" className="sr-only">
            Zoek op bestemming, thema of discipline
          </label>
          <input
            id="retreat-search"
            type="search"
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
          <Search
            aria-hidden="true"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-stone-800 transition-colors"
            size={20}
          />
        </div>
      </section>

      {/* FILTERS */}
      <div id="productGrid" className="sticky top-13 z-40 bg-[#FAFAF9] border-b border-stone-100 mb-8 shadow-md/20">
        <div className="max-w-7xl mx-auto px-4 pt-4 space-y-4">

          <div className="flex flex-col md:flex-row justify-center items-center gap-3">
            <div className="flex gap-3" role="group" aria-label="Filter op locatie">
              <button
                onClick={() => { setLocationFilter('europe'); setSelectedMonth('all'); }}
                aria-pressed={locationFilter === 'europe'}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${locationFilter === 'europe'
                  ? 'bg-stone-800 text-white border-stone-800 shadow-md transform scale-105'
                  : 'bg-white text-stone-400 border-stone-200 hover:border-stone-400 cursor-pointer'
                  }`}
              >
                🇪🇺 Europa
              </button>
              <button
                onClick={() => { setLocationFilter('nl'); setSelectedMonth('all'); }}
                aria-pressed={locationFilter === 'nl'}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${locationFilter === 'nl'
                  ? 'bg-stone-800 text-white border-stone-800 shadow-md transform scale-105'
                  : 'bg-white text-stone-400 border-stone-200 hover:border-stone-400 cursor-pointer'
                  }`}
              >
                🇳🇱 Nederland
              </button>
            </div>

            <div className="relative w-full md:w-auto">
              <label htmlFor="month-filter" className="sr-only">Filter op maand</label>
              <select
                id="month-filter"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full appearance-none bg-white border border-stone-200 text-stone-500 hover:text-stone-800 text-xs font-bold uppercase tracking-widest px-6 py-2 pr-10 rounded-full focus:outline-none cursor-pointer transition-all shadow-sm"
              >
                <option value="all">🗓️ Alle datums</option>
                {availableMonths.map(month => (
                  <option key={month} value={month}>
                    🗓️ {formatMonthText(month)}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none"
              />
            </div>
          </div>

          <div className="relative" role="group" aria-label="Filter op categorie">
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#FAFAF9] to-transparent z-10 pointer-events-none md:hidden" aria-hidden="true" />
            <div className="flex justify-start md:justify-center overflow-x-auto no-scrollbar gap-2 pb-2 px-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  aria-pressed={activeCategory === cat.id}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition duration-300 border whitespace-nowrap shrink-0 ${activeCategory === cat.id
                    ? 'bg-stone-200 text-stone-900 border-stone-300 font-medium shadow-sm'
                    : 'bg-transparent text-stone-500 border-transparent hover:bg-white hover:shadow-sm cursor-pointer'
                    }`}
                >
                  <span aria-hidden="true" className={activeCategory === cat.id ? 'opacity-100' : 'opacity-50'}>
                    {cat.icon}
                  </span>
                  <span>{cat.name}</span>
                </button>
              ))}
              <div className="w-8 shrink-0 md:hidden" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      {/* GRID */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        <p
          aria-live="polite"
          aria-atomic="true"
          className="mb-8 text-stone-400 text-sm font-light text-center md:text-left animate-fade-in"
        >
          {filteredRetreats.length} {filteredRetreats.length === 1 ? 'plek' : 'plekken'} gevonden
          {locationFilter === 'nl' ? ' in Nederland' : ' in Europa'}
          {searchQuery && ` voor "${searchQuery}"`}
        </p>

        {filteredRetreats.length > 0 ? (
          <ul
            aria-label={`Creatieve retraites ${locationFilter === 'nl' ? 'in Nederland' : 'in Europa'}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 list-none p-0"
          >
            {filteredRetreats.map((retreat) => (
              <li key={retreat.id}>
                {/*
                  SEO: was onClick + window.open — invisible to crawlers.
                  Now a real <a> tag so Google can follow and index affiliate links.
                  Visual behaviour is identical; the whole card is still clickable.
                */}
                <a
                  href={retreat.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${retreat.title} – creatieve retraite in ${retreat.location}, vanaf €${retreat.price}`}
                  className="group cursor-pointer flex flex-col h-full relative no-underline"
                  itemScope
                  itemType="https://schema.org/LodgingBusiness"
                >
                  {/* IMAGE */}
                  <div className="relative aspect-[5/6] overflow-hidden rounded-sm bg-stone-200 mb-4 shadow-sm">
                    <img
                      src={retreat.image}
                      alt={`${retreat.title} – creatieve retraite in ${retreat.location}`}
                      loading="lazy"
                      width={400}
                      height={500}
                      itemProp="image"
                      className="object-cover w-full h-full group-hover:scale-105 transition duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div className="text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
                        <p className="text-sm font-medium leading-relaxed drop-shadow-2xl">
                          {retreat.desc}
                        </p>
                        <div className="mt-3 text-xs font-bold uppercase tracking-widest text-stone-200 underline decoration-stone-400 underline-offset-4">
                          Lees meer &rarr;
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-1">
                      <h2
                        itemProp="name"
                        className={`text-lg text-stone-900 ${playfair.className} pr-2 leading-tight`}
                      >
                        {retreat.title}
                      </h2>
                      {retreat.rating && (
                        <div
                          className="flex items-center gap-1 text-sm font-medium text-stone-900 shrink-0 bg-stone-100 px-2 py-1 rounded-full"
                          aria-label={`Beoordeling: ${retreat.rating} van 5`}
                          itemProp="aggregateRating"
                          itemScope
                          itemType="https://schema.org/AggregateRating"
                        >
                          <Star size={12} className="fill-stone-900" aria-hidden="true" />
                          <span itemProp="ratingValue">{retreat.rating}</span>
                          <meta itemProp="bestRating" content="5" />
                        </div>
                      )}
                    </div>

                    <div
                      className="flex flex-col gap-1 mb-3"
                      itemProp="address"
                      itemScope
                      itemType="https://schema.org/PostalAddress"
                    >
                      <div className="flex items-center gap-1 text-stone-500 text-xs uppercase tracking-widest">
                        <MapPin size={12} aria-hidden="true" />
                        <span itemProp="addressLocality">{retreat.location}</span>
                      </div>
                    </div>

                    <p
                      itemProp="description"
                      className="text-stone-500 text-sm leading-relaxed mb-4 line-clamp-2 md:hidden"
                    >
                      {retreat.desc}
                    </p>

                    <div className="flex items-center justify-between border-t border-stone-100 pt-4 mt-auto gap-4">
                      <div className="shrink-0">
                        {retreat.price && (
                          <span
                            className={`text-lg ${playfair.className}`}
                            itemProp="priceRange"
                          >
                            €{retreat.price}
                          </span>
                        )}
                      </div>

                      {retreat.dateDisplay && (
                        <div className="flex flex-row-reverse items-start ml-auto gap-1.5 text-stone-800 text-[10px] md:text-xs uppercase tracking-widest font-medium group-hover:text-stone-600 transition-colors w-fit">
                          <Calendar size={14} className="text-[#C8A663] shrink-0 mt-[2px]" aria-hidden="true" />
                          <time
                            dateTime={retreat.startDate || undefined}
                            className="leading-[1.4] text-right w-fit max-w-[140px] md:max-w-[180px]"
                          >
                            {retreat.dateDisplay}
                          </time>
                        </div>
                      )}
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-20 text-stone-400">
            <p className="text-lg mb-2">
              Geen retraites gevonden in {locationFilter === 'nl' ? 'Nederland' : 'Europa'}.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="text-sm underline hover:text-stone-900 cursor-pointer"
            >
              Filters wissen
            </button>
          </div>
        )}
      </main>

    </div>
  );
}