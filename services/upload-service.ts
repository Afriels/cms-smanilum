import { createSupabaseAdminClient } from "@/lib/supabaseServer";
import { generateSlug } from "@/lib/utils";

const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
const maxSizeInBytes = 5 * 1024 * 1024;

export function validateUpload(file: File) {
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Format file tidak didukung. Gunakan JPG, PNG, WEBP, atau SVG.");
  }

  if (file.size > maxSizeInBytes) {
    throw new Error("Ukuran file melebihi batas 5MB.");
  }
}

export async function uploadToSupabaseStorage({
  file,
  bucket,
  folder,
  replacePath,
}: {
  file: File;
  bucket: string;
  folder: string;
  replacePath?: string | null;
}) {
  validateUpload(file);

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    throw new Error("Konfigurasi Supabase Storage belum tersedia.");
  }

  const extension = file.name.split(".").pop() || "jpg";
  const filePath = `${folder}/${generateSlug(file.name.replace(/\.[^/.]+$/, ""))}-${Date.now()}.${extension}`;

  if (replacePath) {
    await supabase.storage.from(bucket).remove([replacePath]);
  }

  const arrayBuffer = await file.arrayBuffer();
  const { error } = await supabase.storage
    .from(bucket)
    .upload(filePath, arrayBuffer, {
      cacheControl: "3600",
      contentType: file.type,
      upsert: true,
    });

  if (error) throw error;

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return { publicUrl: data.publicUrl, filePath };
}
