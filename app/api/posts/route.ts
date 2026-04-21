import { NextResponse } from "next/server";
import { buildPostPayload, getPosts } from "@/services/content-service";
import { createCollectionHandler, defaultSlugFromBody, deleteCollectionItem, normalizeCheckbox, text } from "@/lib/api-route";
import { deleteFromSupabaseStorage } from "@/services/upload-service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") || 1);
  const q = searchParams.get("q") || undefined;
  const data = await getPosts({ page, query: q });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  return createCollectionHandler({
    table: "posts",
    body,
    buildPayload: (payload) =>
      buildPostPayload({
        title: text(payload.title),
        slug: defaultSlugFromBody(payload),
        excerpt: text(payload.excerpt),
        content: text(payload.content),
        thumbnail_url: text(payload.thumbnail_url) || null,
        og_image_url: text(payload.og_image_url) || text(payload.thumbnail_url) || null,
        category_id: text(payload.category_id) || null,
        is_featured: normalizeCheckbox(payload.is_featured),
        is_published: normalizeCheckbox(payload.is_published),
      }),
  });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  return deleteCollectionItem("posts", id, {
    beforeDelete: async (supabase) => {
      if (!id) return;
      const { data } = await supabase
        .from("posts")
        .select("thumbnail_url, og_image_url")
        .eq("id", id)
        .maybeSingle();

      await Promise.all([
        deleteFromSupabaseStorage({
          bucket: "posts",
          publicUrl: data?.thumbnail_url,
        }),
        data?.og_image_url && data.og_image_url !== data?.thumbnail_url
          ? deleteFromSupabaseStorage({
              bucket: "posts",
              publicUrl: data.og_image_url,
            })
          : Promise.resolve(),
      ]);
    },
  });
}
