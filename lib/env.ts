const fallbackUrl = "https://example-school-news.vercel.app";

export const env = {
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || fallbackUrl,
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  adminEmail: process.env.ADMIN_EMAIL || "admin@sekolahku.sch.id",
};

export const hasSupabaseEnv = Boolean(env.supabaseUrl && env.supabaseAnonKey);
export const hasSupabaseAdminEnv = Boolean(
  env.supabaseUrl && env.supabaseServiceRoleKey,
);
