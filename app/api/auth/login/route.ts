import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { z } from "zod";
import { env, hasSupabaseEnv } from "@/lib/env";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  if (!hasSupabaseEnv) {
    return NextResponse.json(
      { message: "Supabase env belum diisi. Login admin membutuhkan konfigurasi Supabase." },
      { status: 400 },
    );
  }

  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Email atau password tidak valid." }, { status: 400 });
  }

  const cookieStore = await cookies();
  const response = NextResponse.json({ success: true });
  const supabase = createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error || !data.user) {
    return NextResponse.json({ message: error?.message || "Login gagal." }, { status: 401 });
  }

  return response;
}
