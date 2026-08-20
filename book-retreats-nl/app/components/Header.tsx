// components/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import { Playfair_Display } from 'next/font/google';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const playfair = Playfair_Display({ subsets: ['latin'] });

export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
    const pathname = usePathname();

    useEffect(() => {
        setIsDropdownOpen(false);
    }, [pathname]);

    return (
        <>
            <nav className="fixed top-0 w-full z-50 bg-[#FAFAF9]/90 backdrop-blur-md border-b border-stone-200/50">
                {isDropdownOpen && (
                    <div
                        className="fixed inset-0 z-[90] bg-transparent cursor-default h-screen w-screen"
                        onClick={() => setIsDropdownOpen(false)}
                    />
                )}
                <div className="max-w-7xl mx-auto px-4 md:px-6 h-13 md:h-13 flex items-center justify-between relative">
                    <Link href="/" className={`text-lg md:text-2xl font-semibold tracking-tight text-stone-900 ${playfair.className} relative z-[50]`}>
                        CreatieveRetraites<span className="text-stone-400">.nl</span>
                    </Link>

                    <div className="flex items-center gap-4 md:gap-8">
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
                                    <Link href="/uitgelicht" className="block px-6 py-2.5 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition">
                                        Uitgelicht
                                    </Link>
                                    <div className="h-px bg-stone-100 my-2 mx-6" />
                                    <Link href="/over-ons" className="block px-6 py-2.5 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition font-medium">
                                        Over Ons
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}