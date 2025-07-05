// src/data/bannerData.js
import { supabase } from '../lib/supabaseClient';

export const fetchBanners = async () => {
  const { data, error } = await supabase
    .from('banners')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Gagal memuat banner:', error);
    return [];
  }

  return data;
};
