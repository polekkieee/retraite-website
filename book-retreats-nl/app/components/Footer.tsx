// components/Footer.tsx
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'] });

export default function Footer() {
    return (
        <footer role="contentinfo" className="bg-stone-900 text-stone-400 py-16 mt-auto">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 md:gap-8">
                <div>
                    <h2 className={`text-2xl text-[#FAFAF9] mb-4 ${playfair.className}`}>
                        CreatieveRetraites.nl
                    </h2>
                    <p className="max-w-xs font-light text-sm">
                        De startplek voor jouw volgende creatieve retraite in Nederland en Europa.
                        Wij verbinden makers met unieke locaties — handpicked door onze redactie.
                    </p>
                </div>
                <nav
                    aria-label="Footernavigatie"
                    className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-8 md:justify-end text-xs uppercase tracking-widest font-bold"
                >
                    <a href="/uitgelicht" className="hover:text-white transition">Uitgelichte Retraites</a>
                    <a href="/over-ons" className="hover:text-white transition">Over Ons</a>
                    <a href="/privacy" className="hover:text-white transition">Privacy &amp; Disclaimer</a>
                    <a
                        href="https://instagram.com/CreatieveRetraites.nl"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition"
                    >
                        Instagram
                    </a>
                </nav>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-[10px] text-center opacity-50">
                <small>
                    &copy; {new Date().getFullYear()} CreatieveRetraites.nl &mdash; Onderdeel van de creatieve community.
                </small>
            </div>
        </footer>
    );
}