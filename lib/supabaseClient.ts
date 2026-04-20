"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { env, hasSupabaseEnv } from "@/lib/env";

let client: SupabaseClient | null = null;

export function getSupabaseBrowserClient() {
  if (!hasSupabaseEnv) return null;
  if (client) return client;

  client = createBrowserClient(env.supabaseUrl, env.supabaseAnonKey);
  return client;
}
