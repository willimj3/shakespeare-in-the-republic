import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  if (!client) {
    client = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(url && anonKey);
}

export const AUTHORS: Record<string, string> = {
  adams: "John Adams",
  franklin: "Benjamin Franklin",
  hamilton: "Alexander Hamilton",
  jefferson: "Thomas Jefferson",
  madison: "James Madison",
  washington: "George Washington",
  shakespeare: "William Shakespeare",
};
