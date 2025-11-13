import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type MediaItem = {
  id: string;
  title: string;
  creator: string;
  thumbnail: string;
  duration?: string;
  read_time?: string;
  category: string;
  type: string;
  subtype?: string;
  is_premium: boolean;
  price?: number;
  rating?: number;
  sales?: number;
  views?: number;
  plays?: number;
  created_at: string;
  like_count?: number;
  is_liked?: boolean;
  is_followed?: boolean;
};

export type User = {
  id: string;
  email: string;
  display_name: string;
  tier: 'free' | 'premium';
  created_at: string;
};
