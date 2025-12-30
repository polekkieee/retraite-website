// app/lib/affiliate.ts

const AFFILIATE_ID = 'ikczbydjowqaosbzwali'; // Your ID
const TRACKING_PARAM = 'a'; // The parameter BookRetreats uses for you

export function createAffiliateLink(originalUrl: string): string {
  try {
    const url = new URL(originalUrl);
    
    // Only add affiliate ID if it's a BookRetreats link
    if (url.hostname.includes('bookretreats.com')) {
      url.searchParams.set(TRACKING_PARAM, AFFILIATE_ID);
      // Optional: Add a source tag so you know it came from the Dutch site
      url.searchParams.set('s', 'leesretraites_nl'); 
    }
    
    return url.toString();
  } catch (e) {
    return originalUrl;
  }
}