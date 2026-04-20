import { NextResponse } from "next/server";
import { getAdminCollections } from "@/services/content-service";
import { createCollectionHandler, deleteCollectionItem, normalizeCheckbox, text } from "@/lib/api-route";

export async function GET() {
  const data = await getAdminCollections();
  return NextResponse.json(data.banners);
}

export async function POST(request: Request) {
  const body = await request.json();
  return createCollectionHandler({
    table: "banners",
    body,
    buildPayload: (payload) => ({
      title: text(payload.title),
      subtitle: text(payload.subtitle),
      image_url: text(payload.image_url),
      cta_label: text(payload.cta_label),
      cta_href: text(payload.cta_href),
      is_active: normalizeCheckbox(payload.is_active),
    }),
  });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  return deleteCollectionItem("banners", searchParams.get("id"));
}
