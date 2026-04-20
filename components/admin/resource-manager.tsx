"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type Field =
  | { name: string; label: string; type?: "text" | "textarea" | "checkbox" | "select" | "url" | "datetime-local"; options?: { label: string; value: string }[] }
  | { name: string; label: string; type: "hidden" };

export function ResourceManager({
  title,
  endpoint,
  fields,
  items,
  itemLabel,
}: {
  title: string;
  endpoint: string;
  fields: Field[];
  items: Record<string, unknown>[];
  itemLabel: string;
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setMessage("");
    setError("");

    const body = Object.fromEntries(formData.entries());
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      setError(payload.message || "Gagal menyimpan data.");
      setLoading(false);
      return;
    }

    setMessage(`${itemLabel} berhasil disimpan. Refresh halaman untuk melihat data terbaru dari fallback.`);
    setLoading(false);
  }

  async function onDelete(id: string) {
    const confirmed = window.confirm(`Hapus ${itemLabel.toLowerCase()} ini?`);
    if (!confirmed) return;

    const response = await fetch(`${endpoint}?id=${id}`, { method: "DELETE" });
    if (!response.ok) {
      setError("Gagal menghapus data.");
      return;
    }

    setMessage(`${itemLabel} berhasil dihapus.`);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1.2fr]">
      <form action={onSubmit} className="surface-card space-y-4 p-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Tambah {title}</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Form cepat untuk menambah data melalui API route internal.
          </p>
        </div>
        {fields.map((field) => {
          if (field.type === "hidden") {
            return <input key={field.name} type="hidden" name={field.name} />;
          }

          if (field.type === "textarea") {
            return (
              <div key={field.name} className="space-y-2">
                <label className="text-sm font-medium text-slate-700">{field.label}</label>
                <Textarea name={field.name} />
              </div>
            );
          }

          if (field.type === "checkbox") {
            return (
              <label key={field.name} className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700">
                <input type="checkbox" name={field.name} value="true" className="h-4 w-4" />
                {field.label}
              </label>
            );
          }

          if (field.type === "select") {
            return (
              <div key={field.name} className="space-y-2">
                <label className="text-sm font-medium text-slate-700">{field.label}</label>
                <Select name={field.name}>
                  <option value="">Pilih opsi</option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>
            );
          }

          return (
            <div key={field.name} className="space-y-2">
              <label className="text-sm font-medium text-slate-700">{field.label}</label>
              <Input name={field.name} type={field.type || "text"} />
            </div>
          );
        })}
        {message ? <p className="text-sm text-emerald-600">{message}</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Menyimpan..." : `Simpan ${itemLabel}`}
        </Button>
      </form>

      <div className="surface-card p-6">
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-slate-900">Data {title}</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Daftar data yang saat ini tersedia. Saat Supabase aktif, daftar ini akan mengambil data produksi.
          </p>
        </div>
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={String(item.id)}
              className="rounded-3xl border border-slate-100 bg-slate-50/70 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {String(item.title || item.name || item.key || item.slug || "Untitled")}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {String(item.excerpt || item.description || item.value || item.content || "")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onDelete(String(item.id))}
                  className="rounded-full bg-white p-3 text-slate-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
