import { supabase } from '../utils/supabase';

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

export async function getRetreatsNL(): Promise<any[]> {
  const {data} = await supabase.from('retraitesNL').select();

  return data || [];
}

export async function getRetreatsEurope(): Promise<any[]> {
  const {data} = await supabase.from('retraitesEU').select();

  return data || [];
}