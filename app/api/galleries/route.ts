import { NextResponse } from "next/server";
import { getGalleries } from "@/services/content-service";
import { createCollectionHandler, defaultSlugFromBody, deleteCollectionItem, text } from "@/lib/api-route";
import { deleteFromSupabaseStorage } from "@/services/upload-service";

export async function GET() {
  return NextResponse.json(await getGalleries());
}

export async function POST(request: Request) {
  const body = await request.json();
  return createCollectionHandler({
    table: "galleries",
    body,
    buildPayload: (payload) => ({
      title: text(payload.title),
      slug: defaultSlugFromBody(payload),
      description: text(payload.description),
      cover_image_url: text(payload.cover_image_url),
      published_at: text(payload.published_at) || new Date().toISOString(),
    }),
  });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  return deleteCollectionItem("galleries", id, {
    beforeDelete: async (supabase) => {
      if (!id) return;
      const [{ data: gallery }, { data: items }] = await Promise.all([
        supabase
          .from("galleries")
          .select("cover_image_url")
          .eq("id", id)
          .maybeSingle(),
        supabase.from("gallery_items").select("image_url").eq("gallery_id", id),
      ]);

      await Promise.all([
        deleteFromSupabaseStorage({
          bucket: "galleries",
          publicUrl: gallery?.cover_image_url,
        }),
        ...((items || []).map((item) =>
          deleteFromSupabaseStorage({
            bucket: "galleries",
            publicUrl: item.image_url,
          }),
        ) || []),
      ]);
    },
  });
}
