// app/page.tsx
import { getRetreatsEurope, getRetreatsNL } from './lib/data';
import ClientHome from './ClientHome';

// Vercel onthoudt deze pagina voor 1 uur (3600 seconden)
export const revalidate = 3600; 

export default async function Page() {
  // Schoon en simpel: we roepen de functie aan uit je lib/data.ts bestand
  const retreatsEurope = await getRetreatsEurope();
  const retreatsNL = await getRetreatsNL();

  // We geven de data mee aan de interactieve client component
  return <ClientHome initialRetreatsEU={retreatsEurope} initialRetreatsNL={retreatsNL} />;
}