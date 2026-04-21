"use client";

import { useEffect, useMemo, useState } from "react";
import { ImagePlus, RefreshCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ImageUploadFieldProps = {
  label: string;
  value?: string;
  accept?: string;
  helpText?: string;
  onFileChange: (file: File | null) => void;
};

export function ImageUploadField({
  label,
  value,
  accept = "image/*",
  helpText,
  onFileChange,
}: ImageUploadFieldProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const previewUrl = useMemo(() => {
    if (!selectedFile) return value || "";
    return URL.createObjectURL(selectedFile);
  }, [selectedFile, value]);

  useEffect(() => {
    if (!selectedFile) return;
    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl, selectedFile]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        {selectedFile ? (
          <button
            type="button"
            onClick={() => {
              setSelectedFile(null);
              onFileChange(null);
            }}
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-700"
          >
            <RefreshCcw className="h-3.5 w-3.5" />
            Batalkan file baru
          </button>
        ) : null}
      </div>
      <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-4">
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt={label}
            className="h-40 w-full rounded-2xl object-cover"
          />
        ) : (
          <div className="flex h-40 flex-col items-center justify-center gap-3 rounded-2xl bg-white text-center text-sm text-slate-500">
            <ImagePlus className="h-5 w-5" />
            <p>Belum ada gambar</p>
          </div>
        )}
      </div>
      <Input
        type="file"
        accept={accept}
        onChange={(event) => {
          const file = event.target.files?.[0] || null;
          setSelectedFile(file);
          onFileChange(file);
        }}
      />
      {helpText ? <p className="text-xs leading-6 text-slate-500">{helpText}</p> : null}
      {value ? (
        <Button
          type="button"
          variant="ghost"
          className="justify-start px-0 text-xs text-slate-500 hover:text-slate-700"
          onClick={() => window.open(value, "_blank", "noopener,noreferrer")}
        >
          Buka file saat ini
        </Button>
      ) : null}
    </div>
  );
}
