import { createBrowserClient } from "@supabase/ssr";
import {
  getSupabaseConfig,
  SUPABASE_PLACEHOLDER_KEY,
  SUPABASE_PLACEHOLDER_URL,
} from "@/lib/env";

/** Browser-side Supabase client for use inside Client Components. */
export function createClient() {
  const { url, anonKey } = getSupabaseConfig();
  return createBrowserClient(
    url ?? SUPABASE_PLACEHOLDER_URL,
    anonKey ?? SUPABASE_PLACEHOLDER_KEY,
  );
}
