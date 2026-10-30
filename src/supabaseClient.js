import { createClient } from '@supabase/supabase-js';

const url = String(import.meta.env.VITE_SUPABASE_URL || '').trim();
const key = String(import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

let client = null;
try {
  if (/^https?:\/\/\S+$/.test(url) && key) client = createClient(url, key);
} catch {
  client = null;
}

export const supabase = client;
export const supabaseReady = Boolean(client);
