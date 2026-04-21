import { createSupabaseAdminClient } from "@/lib/supabaseServer";
import { generateSlug } from "@/lib/utils";

const allowedBuckets = ["logos", "favicons", "posts", "banners", "galleries"];
const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/x-icon",
  "image/vnd.microsoft.icon",
];
const maxSizeInBytes = 5 * 1024 * 1024;

export function validateUpload(file: File, bucket?: string) {
  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      "Format file tidak didukung. Gunakan JPG, PNG, WEBP, SVG, atau ICO.",
    );
  }

  if (file.size > maxSizeInBytes) {
    throw new Error("Ukuran file melebihi batas 5MB.");
  }

  if (bucket && !allowedBuckets.includes(bucket)) {
    throw new Error("Bucket storage tidak diizinkan.");
  }
}

function getStorageClient() {
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    throw new Error("Konfigurasi Supabase Storage belum tersedia.");
  }
  return supabase;
}

export function extractStoragePath(
  bucket: string,
  publicUrl?: string | null,
): string | null {
  if (!publicUrl) return null;

  try {
    const url = new URL(publicUrl);
    const marker = `/storage/v1/object/public/${bucket}/`;
    const index = url.pathname.indexOf(marker);

    if (index === -1) return null;

    return decodeURIComponent(url.pathname.slice(index + marker.length));
  } catch {
    return null;
  }
}

export async function deleteFromSupabaseStorage({
  bucket,
  publicUrl,
  filePath,
}: {
  bucket: string;
  publicUrl?: string | null;
  filePath?: string | null;
}) {
  const resolvedPath = filePath || extractStoragePath(bucket, publicUrl);
  if (!resolvedPath) return { success: true, skipped: true };

  const supabase = getStorageClient();
  const { error } = await supabase.storage.from(bucket).remove([resolvedPath]);
  if (error) throw error;

  return { success: true, filePath: resolvedPath };
}

export async function uploadToSupabaseStorage({
  file,
  bucket,
  folder,
  replacePath,
  replaceUrl,
}: {
  file: File;
  bucket: string;
  folder: string;
  replacePath?: string | null;
  replaceUrl?: string | null;
}) {
  validateUpload(file, bucket);

  const supabase = getStorageClient();
  const extension = file.name.split(".").pop() || "jpg";
  const baseName = file.name.replace(/\.[^/.]+$/, "");
  const safeFolder = folder.trim().replace(/^\/+|\/+$/g, "") || "uploads";
  const filePath = `${safeFolder}/${generateSlug(baseName)}-${Date.now()}.${extension}`;
  const oldPath = replacePath || extractStoragePath(bucket, replaceUrl);

  if (oldPath) {
    await deleteFromSupabaseStorage({ bucket, filePath: oldPath });
  }

  const arrayBuffer = await file.arrayBuffer();
  const { error } = await supabase.storage.from(bucket).upload(filePath, arrayBuffer, {
    cacheControl: "3600",
    contentType: file.type,
    upsert: true,
  });

  if (error) throw error;

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return { publicUrl: data.publicUrl, filePath };
}
