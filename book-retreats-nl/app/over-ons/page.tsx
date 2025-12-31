import { Playfair_Display } from 'next/font/google';
import { Heart, PenTool, Palette } from 'lucide-react';

const playfair = Playfair_Display({ subsets: ['latin'] });

export default function OverOns() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-stone-800 pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className={`text-4xl md:text-5xl mb-8 ${playfair.className}`}>Onze Missie</h1>
        
        <div className="prose prose-stone lg:prose-lg leading-relaxed text-stone-600 space-y-6">
          <p>
            Bij <strong>CreatieveRetraites.nl</strong> geloven we dat creativiteit geen luxe is, maar een noodzaak. In een wereld die nooit stopt met praten, is het vinden van een plek waar je kunt horen wat je zelf denkt de grootste uitdaging voor elke maker.
          </p>
          
          <p>
            Of je nu werkt aan je debuutroman, een nieuw schilderij start, of simpelweg de tijd zoekt om die stapel boeken eindelijk eens te lezen; de omgeving waarin je bent bepaalt voor een groot deel je resultaat.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
            <div className="text-center">
              <div className="bg-white p-4 rounded-full w-fit mx-auto shadow-sm mb-4">
                <PenTool className="text-stone-800" size={24} />
              </div>
              <h3 className="font-bold text-sm uppercase tracking-widest">Focus</h3>
              <p className="text-xs">Plekken zonder afleiding.</p>
            </div>
            <div className="text-center">
              <div className="bg-white p-4 rounded-full w-fit mx-auto shadow-sm mb-4">
                <Palette className="text-stone-800" size={24} />
              </div>
              <h3 className="font-bold text-sm uppercase tracking-widest">Inspiratie</h3>
              <p className="text-xs">Esthetiek die aanzet tot maken.</p>
            </div>
            <div className="text-center">
              <div className="bg-white p-4 rounded-full w-fit mx-auto shadow-sm mb-4">
                <Heart className="text-stone-800" size={24} />
              </div>
              <h3 className="font-bold text-sm uppercase tracking-widest">Rust</h3>
              <p className="text-xs">Opladen in de natuur.</p>
            </div>
          </div>

          <p>
            Wij reizen de wereld (en het internet) af om de meest unieke, kleinschalige en inspirerende retraites te vinden. We kijken niet alleen naar de bedden, maar naar de lichtinval, de aanwezigheid van boekenwanden, de stilte in de omgeving en de kwaliteit van de koffie.
          </p>
          
          <p className="italic border-l-4 border-stone-200 pl-6 py-2">
            "Wij maken de ruimte. Jij vult hem in."
          </p>
        </div>
      </div>
    </div>
  );
}