import { NextResponse } from "next/server";
import { getGalleries } from "@/services/content-service";
import { createCollectionHandler, defaultSlugFromBody, deleteCollectionItem, text } from "@/lib/api-route";

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
  return deleteCollectionItem("galleries", searchParams.get("id"));
}
