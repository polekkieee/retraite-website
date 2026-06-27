// app/page.tsx
import { getRetreatsEurope, getRetreatsNL } from './lib/data';
import ClientHome from './ClientHome';

export const dynamic = 'force-dynamic'; // ← vervangt revalidate, zodat params werken

export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ locatie?: string; categorie?: string }> // ← Promise type
}) {
  const retreatsEurope = await getRetreatsEurope();
  const retreatsNL = await getRetreatsNL();
  const { locatie, categorie } = await searchParams; // ← await het hele object

  return (
    <ClientHome
      initialRetreatsEU={retreatsEurope}
      initialRetreatsNL={retreatsNL}
      urlLocatie={locatie || ''}
      urlCategorie={categorie || ''}
    />
  );
}