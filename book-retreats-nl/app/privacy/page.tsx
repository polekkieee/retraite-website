import { Playfair_Display } from 'next/font/google';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';


const playfair = Playfair_Display({ subsets: ['latin'] });

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-stone-800 pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6 prose prose-stone">
        <Link
          href="/"
          className="flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium uppercase tracking-widest text-[11px]">
            Terug naar overzicht
          </span>
        </Link>
        <h1 className={playfair.className}>Privacy & Disclaimer</h1>

        <section className="mb-10">
          <h2 className={playfair.className}>Affiliate Disclaimer</h2>
          <p>
            CreatieveRetraites.nl is een onafhankelijk platform voor creatieve retraites. Om onze website gratis en up-to-date te houden, maken wij gebruik van affiliate links. Wanneer u via een link op onze website een boeking maakt, ontvangen wij mogelijk een kleine commissie.
          </p>
          <p className="font-medium text-stone-900">
            Dit kost u absoluut niets extra en heeft geen invloed op de prijs die u betaalt.
          </p>
          <p>
            Wij selecteren retraites uitsluitend op basis van kwaliteit en relevantie voor onze doelgroep van schrijvers en makers, ongeacht de commissie.
          </p>
        </section>

        <section>
          <h2 className={playfair.className}>Privacybeleid</h2>
          <p>
            CreatieveRetraites.nl respecteert uw privacy. Wij verzamelen geen persoonlijke gegevens zoals namen of e-mailadressen via deze website, tenzij u zelf contact met ons opneemt.
          </p>
          <h3>Cookies</h3>
          <p>
            Onze partners (zoals BookRetreats.com) gebruiken cookies om te registreren dat u via ons bent doorverwezen. Dit is noodzakelijk voor het toewijzen van de commissie. Wij maken zelf gebruik van geanonimiseerde analytics om te zien welke pagina's populair zijn, zodat we ons aanbod kunnen verbeteren.
          </p>
          <p>
            Voor vragen kunt u contact met ons opnemen via onze officiële kanalen.
          </p>
        </section>
      </div>
    </div>
  );
}