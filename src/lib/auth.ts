import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

/** Returns the signed-in user, or null (also null when Supabase is unconfigured). */
export async function getUser() {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}

/** Use in app pages/actions — redirects to /login when there is no session. */
export async function requireUser() {
  const user = await getUser();
  if (!user) redirect("/login");
  return user;
}
