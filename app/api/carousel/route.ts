import { NextResponse } from "next/server";
import { getAdminCollections } from "@/services/content-service";
import { createCollectionHandler, deleteCollectionItem, normalizeCheckbox, text } from "@/lib/api-route";

export async function GET() {
  const data = await getAdminCollections();
  return NextResponse.json(data.carousel);
}

export async function POST(request: Request) {
  const body = await request.json();
  return createCollectionHandler({
    table: "carousel",
    body,
    buildPayload: (payload) => ({
      title: text(payload.title),
      subtitle: text(payload.subtitle),
      image_url: text(payload.image_url),
      href: text(payload.href),
      order_number: Number(payload.order_number || 1),
      is_active: normalizeCheckbox(payload.is_active),
    }),
  });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  return deleteCollectionItem("carousel", searchParams.get("id"));
}
