import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export async function getAdminSession() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return {
      user: { id: "demo-admin", email: "demo@local.dev" },
      profile: { id: "demo-admin", email: "demo@local.dev", full_name: "Demo Admin", role: "admin" as const },
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("users")
    .select("id, email, full_name, role")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  if (!profile || profile.role !== "admin") return null;

  return { user, profile };
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}
