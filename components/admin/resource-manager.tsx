"use client";

import { useMemo, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadField } from "@/components/admin/image-upload-field";

type Field =
  | {
      name: string;
      label: string;
      type?:
        | "text"
        | "textarea"
        | "checkbox"
        | "select"
        | "url"
        | "datetime-local"
        | "number"
        | "image";
      options?: { label: string; value: string }[];
      bucket?: string;
      folder?: string;
      accept?: string;
      placeholder?: string;
      helperText?: string;
    }
  | { name: string; label: string; type: "hidden" };

type ImageField = {
  name: string;
  label: string;
  type: "image";
  options?: { label: string; value: string }[];
  bucket?: string;
  folder?: string;
  accept?: string;
  placeholder?: string;
  helperText?: string;
};

function getInitialValues(
  fields: Field[],
  item?: Record<string, unknown> | null,
): Record<string, string | boolean> {
  return fields.reduce<Record<string, string | boolean>>((acc, field) => {
    if (field.type === "hidden") {
      acc[field.name] = typeof item?.[field.name] === "string" ? String(item?.[field.name]) : "";
      return acc;
    }

    if (field.type === "checkbox") {
      acc[field.name] = Boolean(item?.[field.name]);
      return acc;
    }

    if (field.type === "datetime-local" && typeof item?.[field.name] === "string") {
      acc[field.name] = new Date(String(item[field.name])).toISOString().slice(0, 16);
      return acc;
    }

    acc[field.name] = typeof item?.[field.name] === "string" ? String(item?.[field.name]) : "";
    return acc;
  }, {});
}

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
  const [records, setRecords] = useState(items);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string | boolean>>(
    getInitialValues(fields),
  );
  const [pendingFiles, setPendingFiles] = useState<Record<string, File | null>>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const imageFields = useMemo(
    () => fields.filter((field): field is ImageField => field.type === "image"),
    [fields],
  );

  function resetForm(nextItem?: Record<string, unknown> | null) {
    setEditingId(nextItem?.id ? String(nextItem.id) : null);
    setFormValues(getInitialValues(fields, nextItem));
    setPendingFiles({});
    setError("");
    setMessage("");
  }

  async function uploadPendingImages() {
    const updates: Record<string, string> = {};

    for (const field of imageFields) {
      const file = pendingFiles[field.name];
      if (!file) continue;

      const uploadFormData = new FormData();
      uploadFormData.set("file", file);
      uploadFormData.set("bucket", field.bucket || "posts");
      uploadFormData.set("folder", field.folder || "uploads");
      uploadFormData.set("replaceUrl", String(formValues[field.name] || ""));

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.message || "Gagal mengunggah gambar.");
      }

      updates[field.name] = payload.publicUrl;
    }

    return updates;
  }

  async function onSubmit() {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const uploadedValues = await uploadPendingImages();
      const body = {
        ...(editingId ? { id: editingId } : {}),
        ...formValues,
        ...uploadedValues,
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.message || "Gagal menyimpan data.");
      }

      const savedRecord = payload.data || body;

      setRecords((current) => {
        const next = [...current];
        const index = next.findIndex((item) => String(item.id) === String(savedRecord.id));

        if (index >= 0) {
          next[index] = savedRecord;
          return next;
        }

        return [savedRecord, ...next];
      });

      resetForm();
      setMessage(
        editingId
          ? `${itemLabel} berhasil diperbarui.`
          : `${itemLabel} berhasil disimpan.`,
      );
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Gagal menyimpan data.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(id: string) {
    const confirmed = window.confirm(`Hapus ${itemLabel.toLowerCase()} ini?`);
    if (!confirmed) return;

    const response = await fetch(`${endpoint}?id=${id}`, { method: "DELETE" });
    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      setError(payload.message || "Gagal menghapus data.");
      return;
    }

    setRecords((current) => current.filter((item) => String(item.id) !== id));
    if (editingId === id) resetForm();
    setMessage(`${itemLabel} berhasil dihapus.`);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <div className="surface-card space-y-4 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {editingId ? `Edit ${title}` : `Tambah ${title}`}
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Kelola data {itemLabel.toLowerCase()} beserta upload gambar langsung ke Supabase Storage.
            </p>
          </div>
          {editingId ? (
            <Button type="button" variant="ghost" onClick={() => resetForm()}>
              Reset
            </Button>
          ) : null}
        </div>

        <div className="space-y-4">
          {fields.map((field) => {
            if (field.type === "hidden") return null;

            if (field.type === "textarea") {
              return (
                <div key={field.name} className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">{field.label}</label>
                  <Textarea
                    value={String(formValues[field.name] || "")}
                    placeholder={field.placeholder}
                    onChange={(event) =>
                      setFormValues((current) => ({
                        ...current,
                        [field.name]: event.target.value,
                      }))
                    }
                  />
                </div>
              );
            }

            if (field.type === "checkbox") {
              return (
                <label
                  key={field.name}
                  className="flex min-h-11 items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700"
                >
                  <input
                    type="checkbox"
                    checked={Boolean(formValues[field.name])}
                    onChange={(event) =>
                      setFormValues((current) => ({
                        ...current,
                        [field.name]: event.target.checked,
                      }))
                    }
                    className="h-4 w-4"
                  />
                  {field.label}
                </label>
              );
            }

            if (field.type === "select") {
              return (
                <div key={field.name} className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">{field.label}</label>
                  <Select
                    value={String(formValues[field.name] || "")}
                    onChange={(event) =>
                      setFormValues((current) => ({
                        ...current,
                        [field.name]: event.target.value,
                      }))
                    }
                  >
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

            if (field.type === "image") {
              return (
                <ImageUploadField
                  key={field.name}
                  label={field.label}
                  value={String(formValues[field.name] || "")}
                  accept={field.accept}
                  helpText={field.helperText}
                  onFileChange={(file) =>
                    setPendingFiles((current) => ({ ...current, [field.name]: file }))
                  }
                />
              );
            }

            return (
              <div key={field.name} className="space-y-2">
                <label className="text-sm font-medium text-slate-700">{field.label}</label>
                <Input
                  type={field.type || "text"}
                  value={String(formValues[field.name] || "")}
                  placeholder={field.placeholder}
                  onChange={(event) =>
                    setFormValues((current) => ({
                      ...current,
                      [field.name]: event.target.value,
                    }))
                  }
                />
              </div>
            );
          })}
        </div>

        {message ? <p className="text-sm text-emerald-600">{message}</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="button" className="w-full sm:w-auto" disabled={loading} onClick={onSubmit}>
            {loading
              ? "Menyimpan..."
              : editingId
                ? `Update ${itemLabel}`
                : `Simpan ${itemLabel}`}
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="w-full sm:w-auto"
            onClick={() => resetForm()}
          >
            <Plus className="mr-2 h-4 w-4" />
            Data baru
          </Button>
        </div>
      </div>

      <div className="surface-card min-w-0 p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-slate-900">Data {title}</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Klik edit untuk memuat data ke formulir dan memperbarui konten tanpa refresh penuh.
          </p>
        </div>
        <div className="space-y-4">
          {records.map((item) => {
            const previewField = imageFields.find((field) => item[field.name]);
            return (
              <div
                key={String(item.id)}
                className="rounded-3xl border border-slate-100 bg-slate-50/70 p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    {previewField ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={String(item[previewField.name])}
                        alt={String(item.title || item.name || item.key || "Preview")}
                        className="mb-4 h-36 w-full rounded-2xl object-cover"
                      />
                    ) : null}
                    <h3 className="font-semibold text-slate-900">
                      {String(item.title || item.name || item.key || item.slug || "Untitled")}
                    </h3>
                    <p className="mt-2 break-words text-sm leading-7 text-slate-600">
                      {String(
                        item.excerpt ||
                          item.description ||
                          item.value ||
                          item.content ||
                          item.subtitle ||
                          "",
                      )}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => resetForm(item)}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-500 hover:text-blue-600"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(String(item.id))}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
