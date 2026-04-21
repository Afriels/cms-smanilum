import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabaseServer";
import { getAdminCollections } from "@/services/content-service";
import { deleteCollectionItem, requireAdminAccess, text } from "@/lib/api-route";
import { deleteFromSupabaseStorage } from "@/services/upload-service";

export async function GET() {
  const data = await getAdminCollections();
  return NextResponse.json(data.settings);
}

export async function POST(request: Request) {
  const body = (await request.json()) as
    | Record<string, unknown>
    | { items?: Record<string, unknown>[] };
  const unauthorized = await requireAdminAccess();
  if (unauthorized) return unauthorized;

  const supabase = createSupabaseAdminClient();
  const items: Record<string, unknown>[] = Array.isArray(body?.items)
    ? body.items
    : [body];
  const payload = items.map((item) => ({
    key: text(item.key),
    value: text(item.value),
    group_name: text(item.group_name),
  }));

  if (!supabase) {
    return NextResponse.json({ success: true, fallback: true, data: payload });
  }

  const { data, error } = await supabase
    .from("site_settings")
    .upsert(payload, { onConflict: "key" })
    .select("*");

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, data });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  return deleteCollectionItem("site_settings", id, {
    beforeDelete: async (supabase) => {
      if (!id) return;
      const { data } = await supabase
        .from("site_settings")
        .select("key, value")
        .eq("id", id)
        .maybeSingle();

      if (!data) return;

      if (data.key === "site_logo_url") {
        await deleteFromSupabaseStorage({ bucket: "logos", publicUrl: data.value });
      }

      if (data.key === "site_favicon_url") {
        await deleteFromSupabaseStorage({
          bucket: "favicons",
          publicUrl: data.value,
        });
      }
    },
  });
}
