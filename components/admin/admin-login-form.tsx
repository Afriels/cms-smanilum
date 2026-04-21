"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdminLoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    const payload = await response.json();

    if (!response.ok) {
      setError(payload.message || "Login gagal.");
      setLoading(false);
      return;
    }

    router.push("/adminku");
    router.refresh();
  }

  return (
    <form
      action={handleSubmit}
      className="surface-card mx-auto max-w-md space-y-5 p-6 sm:p-8"
    >
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
          Login Admin
        </h1>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Masuk menggunakan akun admin Supabase untuk mengelola portal berita sekolah.
        </p>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Email</label>
        <Input name="email" type="email" placeholder="admin@sekolahku.sch.id" required />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Password</label>
        <Input name="password" type="password" placeholder="********" required />
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Memproses..." : "Masuk ke Dashboard"}
      </Button>
    </form>
  );
}
