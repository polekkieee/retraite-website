import { createAffiliateLink } from './affiliate';

export type CategoryId = 'all' | 'writing' | 'art' | 'silence' | 'nature' | 'cabin';

export interface Retreat {
  id: number;
  title: string;
  location: string;
  desc: string;
  rating: number;
  price: number;
  image: string;
  affiliateLink: string;
  category: CategoryId[];
}

export const retreatsData: Retreat[] = [
  // --- ITALY ---
  {
    id: 60590,
    title: "Creatief Schrijven in Toscane",
    location: "Toscane, Italië",
    desc: "Een week lang schrijven in een prachtig landgoed. Voed je creativiteit met Italiaanse uitzichten en gelijkgestemden.",
    rating: 5.0,
    price: 3652,
    image: "https://bookretreats.com/assets/photo/retreat/0m/60k/60590/p_2259120/1000_1760639004.jpg",
    affiliateLink: createAffiliateLink("https://bookretreats.com/r/7-day-living-the-creative-life-writing-retreat-in-tuscany-italy"),
    category: ['writing', 'cabin', 'silence']
  },
  {
    id: 31563,
    title: "Yoga & Hiken in Positano",
    location: "Positano, Italië",
    desc: "Ontwaak met yoga en wandel over de paden van de Amalfikust. Een perfecte balans tussen beweging en rust.",
    rating: 5.0,
    price: 1699,
    image: "https://bookretreats.com/assets/photo/retreat/0m/31k/31563/p_2252506/1000_1760533826.jpg",
    category: ['art', 'silence', 'nature'],
    affiliateLink: createAffiliateLink("https://bookretreats.com/r/7-day-retreat-yoga-adventures-hiking-in-positano-italy")
  },
  {
    id: 51851,
    title: "Kunst & Creatie in Toscane",
    location: "Lucca, Italië",
    desc: "Een kleinschalige retraite (max 4 personen) in de heuvels. Focus op kunst, reflectie en rust.",
    rating: 4.9,
    price: 875,
    image: "https://bookretreats.com/assets/photo/retreat/0m/51k/51851/p_2351306/1000_1765964222.jpg",
    category: ['art', 'silence', 'cabin'],
    affiliateLink: createAffiliateLink("https://bookretreats.com/r/8-day-small-group-art-course-in-tuscany-italy")
  },
  {
    id: 46676,
    title: "Creatieve Getaway in de Heuvels",
    location: "Toscane, Italië",
    desc: "Ontsnap aan de drukte. Een ongestructureerde retraite om te lezen, schilderen of gewoon te 'zijn'.",
    rating: 4.9,
    price: 695,
    image: "https://bookretreats.com/assets/photo/retreat/0m/46k/46676/p_1684217/1000_1700568749.jpg",
    category: ['nature', 'cabin'],
    affiliateLink: createAffiliateLink("https://bookretreats.com/r/8-day-creativereflective-getaway-retreat-in-tuscany-italy-46676")
  },

  // --- GREECE ---
  {
    id: 47355,
    title: "Leesretraite met Jessie Burton",
    location: "Naxos, Griekenland",
    desc: "Zon, zee en boeken. Ontmoet bestsellerauteurs en lees de hele dag op een goudgeel strand.",
    rating: 5.0,
    price: 1377,
    image: "https://bookretreats.com/assets/photo/retreat/0m/47k/47355/p_2257496/1000_1760941571.jpg",
    category: ['nature', 'silence'],
    affiliateLink: createAffiliateLink("https://bookretreats.com/r/7-day-reading-retreat-with-jessie-burton-in-naxos-greece")
  },
  {
    id: 58092,
    title: "Lezen in de Griekse Bergen",
    location: "Evrytania, Griekenland",
    desc: "Verruil het strand voor de frisse berglucht. Een unieke leeservaring ver weg van het toerisme.",
    rating: 5.0,
    price: 1148,
    image: "https://bookretreats.com/assets/photo/retreat/0m/58k/58092/p_2186807/1000_1754709153.jpg",
    category: ['nature', 'cabin'],
    affiliateLink: createAffiliateLink("https://bookretreats.com/r/7-day-reading-retreat-in-the-greek-mountains")
  },
  {
    id: 58345,
    title: "Thriller & Suspense Boekenweek",
    location: "Tolo, Griekenland",
    desc: "Met auteurs zoals Ruth Ware. Bezoek oude theaters en zeil naar eilanden, allemaal in het teken van boeken.",
    rating: 4.9,
    price: 1599,
    image: "https://bookretreats.com/assets/photo/retreat/0m/58k/58345/p_2184473/1000_1727422298.jpg",
    category: ['art', 'writing'],
    affiliateLink: createAffiliateLink("https://bookretreats.com/r/7-day-book-retreat-with-ruth-ware-mark-edwards-others-greece")
  },
  {
    id: 62301,
    title: "Santorini Reading Retreat",
    location: "Santorini, Griekenland",
    desc: "Lezen met het iconische uitzicht op de caldera. Een week vol verhalen, diners en zonsondergangen.",
    rating: 4.9,
    price: 2399,
    image: "https://bookretreats.com/assets/photo/retreat/0m/62k/62301/p_2324042/1000_1764691363.jpg",
    category: ['nature', 'silence'],
    affiliateLink: createAffiliateLink("https://bookretreats.com/r/7-day-a-santorini-reading-retreat-greece")
  },
  {
    id: 52311,
    title: "Schrijf Masterclass in Athene",
    location: "Athene, Griekenland",
    desc: "Word gepubliceerd! Een intensieve schrijfweek in de bakermat van de westerse literatuur.",
    rating: 4.9,
    price: 1499,
    image: "https://bookretreats.com/assets/photo/retreat/0m/52k/52311/p_1928959/1000_1742132469.jpg",
    category: ['writing', 'art'],
    affiliateLink: createAffiliateLink("https://bookretreats.com/r/7-day-writing-masterclassguaranteed-anthology-publicationgreece")
  },
  {
    id: 46314,
    title: "The Secret Reading Retreat",
    location: "Paphos, Cyprus",
    desc: "Voor wie wil ontsnappen aan de chaos. Dagen vullen met lezen aan het zwembad van een privévilla.",
    rating: 4.8,
    price: 1350,
    image: "https://bookretreats.com/assets/photo/retreat/0m/46k/46314/p_1673345/1000_1729068149.jpg",
    category: ['silence', 'art'],
    affiliateLink: createAffiliateLink("https://bookretreats.com/r/5-day-the-secret-reading-retreat-book-lovers-getaway-in-cyprus")
  },

  // --- SPAIN ---
  {
    id: 57907,
    title: "Qi Gong & Healing op Tenerife",
    location: "Tenerife, Spanje",
    desc: "Herstel je energie op het eeuwige lente-eiland. Yoga, Qi Gong en helende aanraking.",
    rating: 5.0,
    price: 1199,
    image: "https://bookretreats.com/assets/photo/retreat/0m/57k/57907/p_2167235/1000_1755262795.jpg",
    category: ['silence', 'nature', 'cabin'],
    affiliateLink: createAffiliateLink("https://bookretreats.com/r/7-day-yoga-qi-gong-healing-touch-retreat-in-tenerife-spain")
  },
  {
    id: 50490,
    title: "Island Bliss Yoga",
    location: "Mallorca, Spanje",
    desc: "Verbind met jezelf door beweging en ademhaling, direct aan het strand van Mallorca.",
    rating: 4.9,
    price: 450,
    image: "https://bookretreats.com/assets/photo/retreat/0m/50k/50490/p_1858233/1000_1738670319.jpg",
    category: ['nature', 'silence'],
    affiliateLink: createAffiliateLink("https://bookretreats.com/r/4-day-island-bliss-beach-yoga-retreat-in-mallorca-spain")
  },

  // --- FRANCE ---
  {
    id: 32196,
    title: "Kasteel Retraite nabij Parijs",
    location: "Hauts-de-France, Frankrijk",
    desc: "Yoga, feesten en creatieve vrijheid in een sprookjesachtig kasteel. Ottolenghi-stijl diners inbegrepen.",
    rating: 4.9,
    price: 860,
    image: "https://bookretreats.com/assets/photo/retreat/0m/32k/32196/p_2232444/1000_1759245071.jpg",
    category: ['cabin', 'art'],
    affiliateLink: createAffiliateLink("https://bookretreats.com/r/7-day-creativity-nature-yoga-chateau-retreat-nr-paris-france")
  },
  {
    id: 58325,
    title: "Schrijf Masterclass in de Loire",
    location: "Loire Vallei, Frankrijk",
    desc: "Schrijf waar de inspiratie je vindt. Verblijf in een Franse boerderij, bezoek kastelen en markten.",
    rating: 4.9,
    price: 2499,
    image: "https://bookretreats.com/assets/photo/retreat/0m/58k/58325/p_2183934/1000_1756307942.jpg",
    category: ['cabin', 'writing'],
    affiliateLink: createAffiliateLink("https://bookretreats.com/r/7-day-writing-masterclass-retreat-in-france")
  },
  {
    id: 60206,
    title: "Vrouwen Leesretraite",
    location: "Loire Vallei, Frankrijk",
    desc: "Een rustige, soulvolle retraite speciaal voor vrouwen. Bloeiende tuinen en goede boeken.",
    rating: 4.8,
    price: 1500,
    image: "https://bookretreats.com/assets/photo/retreat/0m/60k/60206/p_2246145/1000_1760106235.jpg",
    category: ['cabin', 'silence'],
    affiliateLink: createAffiliateLink("https://bookretreats.com/r/4-day-womens-reading-retreat-in-the-loire-valley-france")
  },
  {
    id: 38398,
    title: "Camino de Santiago Avontuur",
    location: "Zuidwest Frankrijk",
    desc: "7 dagen wandelen en ontstressen in het hart van de Gascogne. Vertraag en herlaad.",
    rating: 4.8,
    price: 1999,
    image: "https://bookretreats.com/assets/photo/retreat/0m/38k/38398/p_1310440/1000_1705561869.jpg",
    category: ['cabin', 'silence'],
    affiliateLink: createAffiliateLink("https://bookretreats.com/r/7-day-camino-de-santiago-hiking-adventure-southwest-france")
  },
  {
    id: 35880,
    title: "Camino Wandelen & Binge Reading",
    location: "Zuidwest Frankrijk",
    desc: "Voor wie van lezen houdt maar ook wil bewegen. Wandel de Camino en lees de rest van de dag.",
    rating: 4.8,
    price: 999,
    image: "https://bookretreats.com/assets/photo/retreat/0m/35k/35880/p_1645105/1000_1727257872.jpg",
    category: ['cabin', 'nature'],
    affiliateLink: createAffiliateLink("https://bookretreats.com/r/5-day-camino-walking-and-binge-reading-retreat-southwest-france")
  },
  {
    id: 10449,
    title: "Schrijven & Wandelen",
    location: "Zuidwest Frankrijk",
    desc: "Heb je een boek in je? Gebruik het ritme van de Camino om je schrijfstroom op gang te brengen.",
    rating: 4.8,
    price: 999,
    image: "https://bookretreats.com/assets/photo/retreat/0m/10k/10449/p_524228/1000_1601790956.jpg",
    category: ['cabin', 'writing', 'nature'],
    affiliateLink: createAffiliateLink("https://bookretreats.com/r/5-day-writing-and-walking-retreat-southwest-of-france")
  },
  {
    id: 10450,
    title: "5 Dagen Camino Wandelen",
    location: "Zuidwest Frankrijk",
    desc: "Even op de pauzeknop drukken. Wandel door wijngaarden en zonnebloemvelden.",
    rating: 4.8,
    price: 999,
    image: "https://bookretreats.com/assets/photo/retreat/0m/10k/10450/p_216939/1000_1540709487.jpg",
    category: ['cabin', 'silence', 'nature'],
    affiliateLink: createAffiliateLink("https://bookretreats.com/r/5-day-walk-the-camino-de-santiago-in-southwest-france")
  },

  // --- GERMANY ---
  {
    id: 25912,
    title: "Stilte & Natuur Retraite",
    location: "Duitsland (Noord)",
    desc: "8 dagen individuele retraite. Vind innerlijke rust, focus en helderheid in de natuur.",
    rating: 5.0,
    price: 739,
    image: "https://bookretreats.com/assets/photo/retreat/0m/25k/25912/p_1001570/1000_1679236239.jpg",
    category: ['silence', 'cabin', 'nature'],
    affiliateLink: createAffiliateLink("https://bookretreats.com/r/8-day-individual-retreat-w-silence-nature-meditation-germany")
  },
  {
    id: 50719,
    title: "Korte Stilte Retraite",
    location: "Duitsland (Noord)",
    desc: "6 dagen om te resetten. Perfect voor wie een drukke baan heeft en even totale stilte zoekt.",
    rating: 5.0,
    price: 599,
    image: "https://bookretreats.com/assets/photo/retreat/0m/50k/50719/p_1866134/1000_1657560565.jpg",
    category: ['silence', 'cabin'],
    affiliateLink: createAffiliateLink("https://bookretreats.com/r/6-day-individual-retreat-w-silence-nature-meditation-germany-50719")
  },
  {
    id: 51122,
    title: "31 Dagen Diepe Stilte",
    location: "Duitsland (Noord)",
    desc: "Een maand lang retraite. Voor wie echt diep wil gaan, een boek wil afmaken of het roer om wil gooien.",
    rating: 5.0,
    price: 2659,
    image: "https://bookretreats.com/assets/photo/retreat/0m/51k/51122/p_1881019/1000_1679236239.jpg",
    category: ['silence', 'cabin', 'writing', 'nature'],
    affiliateLink: createAffiliateLink("https://bookretreats.com/r/31-day-individual-retreat-w-silence-nature-meditation-germany")
  },

  // --- PORTUGAL ---
  {
    id: 40439,
    title: "Fire Your Imagination",
    location: "Alentejo, Portugal",
    desc: "Voed je creativiteit met een transformatieve schrijfpraktijk in de kurkbossen van Alentejo.",
    rating: 4.9,
    price: 550,
    image: "https://bookretreats.com/assets/photo/retreat/0m/40k/40439/p_1981440/1000_1744641489.jpg",
    category: ['cabin', 'writing', 'nature'],
    affiliateLink: createAffiliateLink("https://bookretreats.com/r/5-day-fire-your-imagination-writing-retreat-in-alentejo-portugal")
  },

  // --- UK / IRELAND ---
  {
    id: 62824,
    title: "Literair Edinburgh",
    location: "Edinburgh, Schotland",
    desc: "Een boeken-thema reis door de stad van Harry Potter en Sherlock Holmes. Inclusief museumbezoek.",
    rating: 5.0,
    price: 1245,
    image: "https://bookretreats.com/assets/photo/retreat/0m/62k/62824/p_2346271/1000_1765729867.jpg",
    category: ['writing', 'art', 'cabin'],
    affiliateLink: createAffiliateLink("https://bookretreats.com/r/4-day-literary-retreat-for-book-lovers-in-edinburgh-scotland")
  },
  {
    id: 57057,
    title: "Luxe Winter Landgoed",
    location: "Shropshire, Engeland",
    desc: "Verblijf in een 17e-eeuws landgoed. Open haarden, yoga en bibliotheken.",
    rating: 4.8,
    price: 1019,
    image: "https://bookretreats.com/assets/photo/retreat/0m/57k/57057/p_2130622/1000_1753217594.jpg",
    category: ['cabin', 'silence', 'nature'],
    affiliateLink: createAffiliateLink("https://bookretreats.com/r/3-day-luxurious-winter-yoga-retreat-weston-park-shropshire-uk")
  },

  // --- REST OF WORLD ---
  {
    id: 62828,
    title: "Secret Reading Retreat",
    location: "Nagymaros, Hongarije",
    desc: "Een zachte ontsnapping naar het Hongaarse platteland. Dagen vullen met lezen zonder onderbreking.",
    rating: 4.8,
    price: 1350,
    image: "https://bookretreats.com/assets/photo/retreat/0m/62k/62828/p_2346903/1000_1765782550.jpg",
    category: ['silence', 'art'],
    affiliateLink: createAffiliateLink("https://bookretreats.com/r/5-day-the-secret-reading-retreat-book-lovers-getaway-hungrary")
  },
  {
    id: 54084,
    title: "Write & Flow in de Caribbean",
    location: "Dominicaanse Republiek",
    desc: "Ontsnap naar het paradijs. Yoga voor focus en expert coaching voor je boek.",
    rating: 4.8,
    price: 2123,
    image: "https://bookretreats.com/assets/photo/retreat/0m/54k/54084/p_2011639/1000_1746200042.jpg",
    category: ['writing', 'silence', 'nature'],
    affiliateLink: createAffiliateLink("https://bookretreats.com/r/7-day-write-flow-yoga-book-coaching-dominican-republic")
  },
  {
    id: 56589,
    title: "Immersive Writers Retreat",
    location: "Costa Rica",
    desc: "Schrijf je boek in twee weken. Een intensieve, begeleide retraite in de jungle.",
    rating: 5.0,
    price: 1263,
    image: "https://bookretreats.com/assets/photo/retreat/0m/56k/56589/p_2113416/1000_1752117932.jpg",
    category: ['writing', 'nature', 'cabin'],
    affiliateLink: createAffiliateLink("https://bookretreats.com/r/12-day-immersive-book-writers-retreat-in-costa-rica")
  },
  {
    id: 40429,
    title: "Indian Summer Lezen",
    location: "Kerala, India",
    desc: "Luister naar de moessonregen terwijl je leest. Een luxe villa en heerlijk Indiaas eten.",
    rating: 5.0,
    price: 1911,
    image: "https://bookretreats.com/assets/photo/retreat/0m/40k/40429/p_2333743/1000_1747197444.jpg",
    category: ['silence', 'nature'],
    affiliateLink: createAffiliateLink("https://bookretreats.com/r/5-day-indian-summer-monsoon-reading-retreat-in-kerala-india")
  },
  {
    id: 47076,
    title: "Return to Presence",
    location: "Mexico (Mayan Jungle)",
    desc: "14 dagen diepe rust in de jungle. Herontdek jezelf ver weg van de ruis van alledag.",
    rating: 4.8,
    price: 1132,
    image: "https://bookretreats.com/assets/photo/retreat/0m/47k/47076/p_2252933/1000_1760733763.jpg",
    category: ['silence', 'nature', 'cabin'],
    affiliateLink: createAffiliateLink("https://bookretreats.com/r/14-day-return-to-presence-deep-connection-in-mexico")
  }
];