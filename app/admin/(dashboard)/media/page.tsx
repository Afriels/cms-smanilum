"use client";

import { useState } from "react";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUploadField } from "@/components/admin/image-upload-field";

export default function AdminMediaPage() {
  const [message, setMessage] = useState("");
  const [bucket, setBucket] = useState("posts");
  const [folder, setFolder] = useState("uploads");
  const [file, setFile] = useState<File | null>(null);

  async function handleUpload() {
    setMessage("");
    if (!file) return;

    const formData = new FormData();
    formData.set("file", file);
    formData.set("bucket", bucket);
    formData.set("folder", folder);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const payload = await response.json();
    setMessage(response.ok ? `Upload berhasil: ${payload.publicUrl}` : payload.message);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="surface-card space-y-4 p-5 sm:p-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Bucket</label>
          <Select value={bucket} onChange={(event) => setBucket(event.target.value)}>
            <option value="posts">posts</option>
            <option value="banners">banners</option>
            <option value="galleries">galleries</option>
            <option value="logos">logos</option>
            <option value="favicons">favicons</option>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Folder</label>
          <Input value={folder} onChange={(event) => setFolder(event.target.value)} />
        </div>
        <ImageUploadField
          label="Pilih file"
          value=""
          accept="image/*,.ico"
          onFileChange={(nextFile) => setFile(nextFile)}
        />
        {message ? <p className="text-sm text-slate-600">{message}</p> : null}
        <Button type="button" className="w-full" onClick={handleUpload}>
          Upload ke Storage
        </Button>
      </div>

      <div className="surface-card p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-slate-900">Preview</h2>
        <div className="mt-4 flex min-h-64 items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-4 sm:min-h-80">
          <p className="max-w-sm text-center text-sm leading-7 text-slate-500">
            Gunakan uploader di panel kiri untuk melihat preview, validasi file, dan mengunggah media ke bucket yang dipilih.
          </p>
        </div>
      </div>
    </div>
  );
}
