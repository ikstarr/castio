import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import {
  getSupabaseConfig,
  SUPABASE_PLACEHOLDER_KEY,
  SUPABASE_PLACEHOLDER_URL,
} from "@/lib/env";

/**
 * Server-side Supabase client for Server Components, Server Actions and Route
 * Handlers. In Next.js 16 `cookies()` is async, so this factory is async too.
 */
export async function createClient() {
  const cookieStore = await cookies();
  const { url, anonKey } = getSupabaseConfig();

  return createServerClient(
    url ?? SUPABASE_PLACEHOLDER_URL,
    anonKey ?? SUPABASE_PLACEHOLDER_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // `setAll` was called from a Server Component. This can be ignored
            // because the proxy (middleware) refreshes the session on every
            // request and writes the cookies there.
          }
        },
      },
    },
  );
}
