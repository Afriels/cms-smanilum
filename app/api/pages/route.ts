import { NextResponse } from "next/server";
import { getPages } from "@/services/content-service";
import { createCollectionHandler, defaultSlugFromBody, deleteCollectionItem, normalizeCheckbox, text } from "@/lib/api-route";

export async function GET() {
  return NextResponse.json(await getPages());
}

export async function POST(request: Request) {
  const body = await request.json();
  return createCollectionHandler({
    table: "pages",
    body,
    buildPayload: (payload) => ({
      title: text(payload.title),
      slug: defaultSlugFromBody(payload),
      excerpt: text(payload.excerpt),
      content: text(payload.content),
      is_published: normalizeCheckbox(payload.is_published),
      meta_title: text(payload.meta_title) || text(payload.title),
      meta_description: text(payload.meta_description) || text(payload.excerpt),
    }),
  });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  return deleteCollectionItem("pages", searchParams.get("id"));
}
