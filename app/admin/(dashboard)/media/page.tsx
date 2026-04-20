"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export default function AdminMediaPage() {
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState("");

  async function handleUpload(formData: FormData) {
    setMessage("");
    const file = formData.get("file");
    if (!(file instanceof File)) return;
    setPreview(URL.createObjectURL(file));

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const payload = await response.json();
    setMessage(response.ok ? `Upload berhasil: ${payload.publicUrl}` : payload.message);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <form action={handleUpload} className="surface-card space-y-4 p-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Bucket</label>
          <Select name="bucket" defaultValue="posts">
            <option value="posts">posts</option>
            <option value="banners">banners</option>
            <option value="galleries">galleries</option>
            <option value="logos">logos</option>
            <option value="favicons">favicons</option>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Folder</label>
          <Input name="folder" defaultValue="uploads" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Pilih file</label>
          <Input name="file" type="file" accept="image/*" />
        </div>
        {message ? <p className="text-sm text-slate-600">{message}</p> : null}
        <Button type="submit" className="w-full">
          Upload ke Storage
        </Button>
      </form>

      <div className="surface-card p-6">
        <h2 className="text-xl font-semibold text-slate-900">Preview</h2>
        <div className="mt-4 flex min-h-80 items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Preview upload" className="max-h-72 rounded-2xl object-cover" />
          ) : (
            <p className="max-w-sm text-center text-sm leading-7 text-slate-500">
              Preview gambar akan muncul di sini sebelum atau sesudah upload.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
