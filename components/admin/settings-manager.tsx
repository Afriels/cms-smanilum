"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import type { SiteSetting } from "@/types";

type SettingField = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "image";
  bucket?: string;
  folder?: string;
  accept?: string;
  helpText?: string;
};

const siteFields: SettingField[] = [
  { key: "site_name", label: "Nama website" },
  { key: "site_tagline", label: "Tagline website" },
  { key: "site_description", label: "Deskripsi website", type: "textarea" },
  {
    key: "site_logo_url",
    label: "Logo website",
    type: "image",
    bucket: "logos",
    folder: "website",
    helpText: "Upload logo utama website ke bucket `logos`.",
  },
  {
    key: "site_favicon_url",
    label: "Favicon website",
    type: "image",
    bucket: "favicons",
    folder: "website",
    accept: ".ico,image/png,image/svg+xml",
    helpText: "Upload favicon ICO, PNG, atau SVG ke bucket `favicons`.",
  },
  { key: "contact_email", label: "Email kontak" },
  { key: "contact_phone", label: "Telepon kontak" },
  { key: "address", label: "Alamat", type: "textarea" },
];

const homepageFields: SettingField[] = [
  { key: "hero_badge", label: "Hero badge" },
  { key: "hero_secondary_cta_label", label: "Hero tombol sekunder" },
  { key: "hero_secondary_cta_href", label: "Hero link sekunder" },
  { key: "hero_card_1_title", label: "Hero kartu 1 judul" },
  { key: "hero_card_1_description", label: "Hero kartu 1 deskripsi", type: "textarea" },
  { key: "hero_card_2_title", label: "Hero kartu 2 judul" },
  { key: "hero_card_2_description", label: "Hero kartu 2 deskripsi", type: "textarea" },
  { key: "hero_card_3_title", label: "Hero kartu 3 judul" },
  { key: "hero_card_3_description", label: "Hero kartu 3 deskripsi", type: "textarea" },
  { key: "carousel_badge", label: "Label carousel" },
  { key: "carousel_cta_label", label: "Tombol carousel" },
  { key: "featured_eyebrow", label: "Featured eyebrow" },
  { key: "featured_title", label: "Featured title" },
  { key: "featured_description", label: "Featured description", type: "textarea" },
  { key: "featured_limit", label: "Jumlah featured" },
  { key: "latest_eyebrow", label: "Latest eyebrow" },
  { key: "latest_title", label: "Latest title" },
  { key: "latest_description", label: "Latest description", type: "textarea" },
  { key: "latest_button_label", label: "Label tombol latest" },
  { key: "latest_button_href", label: "Link tombol latest" },
  { key: "latest_limit", label: "Jumlah latest" },
  { key: "categories_eyebrow", label: "Kategori eyebrow" },
  { key: "categories_title", label: "Kategori title" },
  { key: "categories_description", label: "Kategori description", type: "textarea" },
  { key: "announcements_eyebrow", label: "Pengumuman eyebrow" },
  { key: "announcements_title", label: "Pengumuman title" },
  { key: "announcements_description", label: "Pengumuman description", type: "textarea" },
  { key: "announcements_limit", label: "Jumlah pengumuman" },
  { key: "gallery_eyebrow", label: "Galeri eyebrow" },
  { key: "gallery_title", label: "Galeri title" },
  { key: "gallery_description", label: "Galeri description", type: "textarea" },
  { key: "gallery_limit", label: "Jumlah galeri" },
  { key: "trending_title", label: "Judul trending sidebar" },
  { key: "cta_eyebrow", label: "CTA eyebrow" },
  { key: "cta_title", label: "CTA title" },
  { key: "cta_description", label: "CTA description", type: "textarea" },
  { key: "cta_primary_label", label: "CTA tombol utama" },
  { key: "cta_primary_href", label: "CTA link utama" },
  { key: "cta_secondary_label", label: "CTA tombol kedua" },
  { key: "cta_secondary_href", label: "CTA link kedua" },
];

const footerFields: SettingField[] = [
  { key: "footer_about_title", label: "Footer judul" },
  { key: "footer_about_description", label: "Footer deskripsi", type: "textarea" },
  { key: "footer_nav_title", label: "Footer judul navigasi" },
  {
    key: "footer_nav_links",
    label: "Footer link navigasi",
    type: "textarea",
    helpText: "Format per baris: Label|/path",
  },
  { key: "footer_contact_title", label: "Footer judul kontak" },
  {
    key: "footer_contact_lines",
    label: "Footer baris kontak",
    type: "textarea",
    helpText: "Satu baris untuk satu item kontak.",
  },
  { key: "footer_copyright", label: "Footer copyright" },
];

export function SettingsManager({ settings }: { settings: SiteSetting[] }) {
  const [values, setValues] = useState<Record<string, string>>(
    () =>
      settings.reduce<Record<string, string>>((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {}),
  );
  const [pendingFiles, setPendingFiles] = useState<Record<string, File | null>>({});
  const [loadingGroup, setLoadingGroup] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const groups = useMemo(
    () => [
      { name: "site", title: "Site Settings", fields: siteFields },
      { name: "homepage", title: "Homepage Settings", fields: homepageFields },
      { name: "footer", title: "Footer Settings", fields: footerFields },
    ],
    [],
  );

  async function saveGroup(
    groupName: string,
    fields: SettingField[],
  ) {
    setLoadingGroup(groupName);
    setMessage("");
    setError("");

    try {
      const nextValues = { ...values };

      for (const field of fields) {
        if (field.type !== "image" || !pendingFiles[field.key]) continue;

        const uploadFormData = new FormData();
        uploadFormData.set("file", pendingFiles[field.key] as File);
        uploadFormData.set("bucket", field.bucket || "logos");
        uploadFormData.set("folder", field.folder || "website");
        uploadFormData.set("replaceUrl", values[field.key] || "");

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });
        const uploadPayload = await uploadResponse.json().catch(() => ({}));

        if (!uploadResponse.ok) {
          throw new Error(uploadPayload.message || "Upload gambar gagal.");
        }

        nextValues[field.key] = uploadPayload.publicUrl;
      }

      const response = await fetch("/api/site-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: fields.map((field) => ({
            key: field.key,
            value: nextValues[field.key] || "",
            group_name: groupName,
          })),
        }),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.message || "Gagal menyimpan settings.");
      }

      setValues(nextValues);
      setPendingFiles((current) => {
        const next = { ...current };
        fields.forEach((field) => {
          delete next[field.key];
        });
        return next;
      });
      setMessage(`${groups.find((group) => group.name === groupName)?.title} berhasil disimpan.`);
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Gagal menyimpan settings.",
      );
    } finally {
      setLoadingGroup(null);
    }
  }

  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <section key={group.name} className="surface-card p-5 sm:p-6">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">{group.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Atur konten website yang akan tampil di public layout dan homepage.
              </p>
            </div>
            <Button
              type="button"
              disabled={loadingGroup === group.name}
              onClick={() => saveGroup(group.name, group.fields)}
            >
              {loadingGroup === group.name ? "Menyimpan..." : "Simpan perubahan"}
            </Button>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {group.fields.map((field) => {
              if (field.type === "textarea") {
                return (
                  <div key={field.key} className="space-y-2 lg:col-span-2">
                    <label className="text-sm font-medium text-slate-700">{field.label}</label>
                    <Textarea
                      value={values[field.key] || ""}
                      onChange={(event) =>
                        setValues((current) => ({
                          ...current,
                          [field.key]: event.target.value,
                        }))
                      }
                    />
                    {field.helpText ? (
                      <p className="text-xs leading-6 text-slate-500">{field.helpText}</p>
                    ) : null}
                  </div>
                );
              }

              if (field.type === "image") {
                return (
                  <ImageUploadField
                    key={field.key}
                    label={field.label}
                    value={values[field.key] || ""}
                    accept={field.accept}
                    helpText={field.helpText}
                    onFileChange={(file) =>
                      setPendingFiles((current) => ({ ...current, [field.key]: file }))
                    }
                  />
                );
              }

              return (
                <div key={field.key} className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">{field.label}</label>
                  <Input
                    value={values[field.key] || ""}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        [field.key]: event.target.value,
                      }))
                    }
                  />
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {message ? <p className="text-sm text-emerald-600">{message}</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
