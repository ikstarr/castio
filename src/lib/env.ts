/**
 * Environment helpers.
 *
 * Castio must build and render its public pages even when Supabase is not yet
 * configured. Everything that talks to Supabase first checks `isSupabaseConfigured()`
 * and degrades to a clean setup notice instead of crashing.
 */

export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  return { url, anonKey };
}

export function isSupabaseConfigured(): boolean {
  const { url, anonKey } = getSupabaseConfig();
  return Boolean(
    url &&
      anonKey &&
      url.startsWith("http") &&
      !url.includes("your-project-ref"),
  );
}

/** Public origin used for canonical URLs, embed snippets and OpenGraph tags. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

/** Placeholders keep the Supabase SDK from throwing during a build with no env. */
export const SUPABASE_PLACEHOLDER_URL = "https://placeholder.supabase.co";
export const SUPABASE_PLACEHOLDER_KEY = "placeholder-anon-key";
