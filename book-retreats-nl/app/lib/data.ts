import { supabase } from '../utils/supabase';
import { unstable_cache } from 'next/cache';

export type CategoryId = 'all' | 'art' | 'writing' | 'silence' | 'nature';

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

export interface FeaturedPageData {
  id: number;
  created_at: string;
  pageTitle: string;
  metaDescription: string;
  introText: string;
  outroText: string;
  retraites: number[]; 
}

export const getRetreatsNL = unstable_cache(
  async (): Promise<Retreat[]> => {
    const { data } = await supabase.from('retraitesNL').select();
    return data || [];
  },
  ['retreats-nl'],
  { revalidate: 3600 }
);

export const getRetreatsEurope = unstable_cache(
  async (): Promise<Retreat[]> => {
    const { data } = await supabase.from('retraitesEU').select();
    return data || [];
  },
  ['retreats-europe'],
  { revalidate: 3600 }
);

export const getFeaturedPageData = unstable_cache(
  async (): Promise<FeaturedPageData> => {
    const { data } = await supabase
      .from('retraitesUitgelicht')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    return data || null;
  },
  ['featured-page'],
  { revalidate: 3600 }
);